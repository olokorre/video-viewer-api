import express from 'express';
import cors from 'cors';
import Router from './infra/Router';
import MemoryRepositoryFactory from './infra/database/repository/MemoryRepositoryFactory';
import SQLiteConnection from './infra/database/connections/SQLiteConnection';
import Migration from './infra/database/migrations/Migration';
import DatabaseRepositoryFactory from './infra/database/repository/DatabaseRepositoryFactory';
const app = express();

app.use(cors());
app.use(express.json({ limit: '900mb' }));
app.use(express.urlencoded({ limit: '900mb', extended: true }));
app.use("/videos/watch", (req, res, next) => {
    if (req.path.endsWith(".m3u8")) {
        res.set("Content-Type", "application/x-mpegURL");
    } else if (req.path.endsWith(".ts")) {
        res.set("Content-Type", "video/mp2t");
    }
    next();
}, express.static("videos"));

const connection = new SQLiteConnection('database.db');
const migration = new Migration(connection);
const repositoryFactory = new DatabaseRepositoryFactory(connection);
const router = new Router(app, repositoryFactory);
router.init();

migration.run().then(() => {
    app.listen(5000, () => {
        console.log('Server is running on port 5000');
    });
}).catch((e) => {
    console.error(`Falha ao rodar as migrations: ${e}`);
});
