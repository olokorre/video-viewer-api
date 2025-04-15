import express from 'express';
import cors from 'cors';
import Router from './infra/Router';
import MemoryRepositoryFactory from './infra/repository/MemoryRepositoryFactory';
const app = express();

app.use(cors());
app.use(express.json({ limit: '900mb' }));

const repositoryFactory = new MemoryRepositoryFactory();
const router = new Router(app, repositoryFactory);
router.init();

app.listen(5000, () => {
    console.log('Server is running on port 5000');
});
