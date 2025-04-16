import express from 'express';
import cors from 'cors';
import Router from './infra/Router';
import MemoryRepositoryFactory from './infra/repository/MemoryRepositoryFactory';
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

const repositoryFactory = new MemoryRepositoryFactory();
const router = new Router(app, repositoryFactory);
router.init();

app.listen(5000, () => {
    console.log('Server is running on port 5000');
});
