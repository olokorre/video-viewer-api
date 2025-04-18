import { Express } from 'express';
import multer from "multer";
import RepositoryFactory from '../domain/repository/RepositoryFactory';
import VideoController from './controller/VideoController';
import { v4 } from 'uuid';

export default class Router {
    private videoController: VideoController;

    constructor(private readonly app: Express, private readonly repositoryFactory: RepositoryFactory) {
        this.videoController = new VideoController(this.repositoryFactory);
    }

    init(): void {
        const upload = multer({
            storage: multer.diskStorage({
                destination: "uploads/",
                filename: (req, file, cb) => {
                    const [, extention] = file.mimetype.split('/');
                    return cb(null, v4() + '.' + extention);
                },
            }),
            limits: { fileSize: 1024 * 1024 * 1024 }, // Limite de 1GB
        });

        this.app.get('/', (req, res) => {
            res.json({ message: 'Hello World!' });
        });

        this.app.post('/videos/upload', upload.single("video"), async (req, res) => {
            const { title, description } = req.body;
            if (!title || !description) {
                res.status(400).json({ error: 'Title, description, and content are required.' });
                return;
            }
            try {
                const content = req.file?.path;
                if (!content) {
                    res.status(400).json({ error: 'Video file is required.' });
                    return;
                }
                await this.videoController.uploadVideo(title, description, content);
            } catch (error) {
                console.error('Error uploading video:', error);
                res.status(500).json({ error: 'Failed to upload video.' });
                return;
            }
            res.json({ message: 'Video uploaded successfully!' });
        });

        this.app.get('/videos/list', async (req, res) => {
            try {
                const videos = await this.videoController.listVideos();
                res.json(videos);
            } catch (error) {
                console.error('Error listing videos:', error);
                res.status(500).json({ error: 'Failed to list videos.' });
            }
        });

        this.app.get('/videos/:id', async (req, res) => {
            const { id } = req.params;
            if (!id) {
                res.status(400).json({ error: 'Video ID is required.' });
                return;
            }
            try {
                const video = await this.videoController.viewVideo(id);
                res.json(video);
            } catch (error) {
                console.error('Error viewing video:', error);
                res.status(500).json({ error: 'Failed to view video.' });
            }
        });
    }
}
