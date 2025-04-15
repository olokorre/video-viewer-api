import { Express } from 'express';
import RepositoryFactory from '../domain/repository/repositoryFactory';
import VideoController from './controller/VideoController';

export default class Router {
    private videoController: VideoController;

    constructor(private readonly app: Express, private readonly repositoryFactory: RepositoryFactory) {
        this.videoController = new VideoController(this.repositoryFactory);
    }

    init(): void {
        this.app.get('/', (req, res) => {
            res.json({ message: 'Hello World!' });
        });

        this.app.post('/videos/upload', async (req, res) => {
            const { title, description, content } = req.body;
            if (!title || !description || !content) {
                res.status(400).json({ error: 'Title, description, and content are required.' });
                return;
            }
            try {
                await this.videoController.uploadVideo(title, description, content);
            } catch (error) {
                console.error('Error uploading video:', error);
                res.status(500).json({ error: 'Failed to upload video.' });
                return;
            }
            res.json({ message: 'Video uploaded successfully!' });
        });
    }
}
