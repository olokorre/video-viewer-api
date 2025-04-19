import Video from "../../../../domain/entity/Video";
import VideoRepository from "../../../../domain/repository/VideoRepository";
import Connection from "../../connections/Connection";
import fs from 'fs/promises';
import path from 'path';

interface VideoData {
    id: string;
    title: string;
    description: string;
    url: string;
    created_at: string;
}

export default class VideoRepositoryDatabase implements VideoRepository {
    private readonly thumbnailsPath: string;

    constructor(private readonly connection: Connection) {
        this.thumbnailsPath = path.resolve(__dirname, '../../../../../uploads/thumbnails');
    }

    async save(video: Video): Promise<void> {
        const thumbnailFileName = `${video.id}.png`;
        await fs.writeFile(
            path.join(this.thumbnailsPath, thumbnailFileName),
            Buffer.from(video.thumbnail.split(',')[1], 'base64')
        );
        await this.connection.execute(
            `INSERT INTO video (id, title, description, url, created_at)
             VALUES (?, ?, ?, ?, ?)`,
            [video.id, video.title, video.description, video.videoUrl, new Date().toISOString()]
        );
    }

    async getAll(): Promise<Video[]> {
        const videos = await this.connection.execute<VideoData>('SELECT * FROM video');
        return Promise.all(videos.map(async video => {
            const thumbnailBuffer = await fs.readFile(
                path.join(this.thumbnailsPath, `${video.id}.png`)
            );
            const base64Thumbnail = `data:image/png;base64,${thumbnailBuffer.toString('base64')}`;
            return new Video(
                video.id,
                video.title,
                video.description,
                base64Thumbnail,
                video.url,
                0,
                new Date(video.created_at),
                0,
                0,
                0
            );
        }));
    }

    async findById(id: string): Promise<Video> {
        const [video] = await this.connection.execute<VideoData>('SELECT * FROM video WHERE id = ?', [id]);
        if (!video) {
            throw new Error("Video not found");
        }

        const thumbnailBuffer = await fs.readFile(
            path.join(this.thumbnailsPath, `${id}.png`)
        );
        return new Video(
            video.id,
            video.title,
            video.description,
            thumbnailBuffer.toString('base64'),
            video.url,
            0,
            new Date(video.created_at),
            0,
            0,
            0
        );
    }
}
