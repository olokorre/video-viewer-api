import { v4 } from "uuid";
import Video from "../domain/entity/Video";
import RepositoryFactory from "../domain/repository/RepositoryFactory";
import VideoRepository from "../domain/repository/VideoRepository";
import { generateThumbnailFromBase64 } from "../infra/helper/generateThumbnailFromBase64";
import { transcodeToHLS } from "../infra/helper/transcodeToHLS";
import fs from 'node:fs';

export default class UploadVideo {

    private readonly videoRepository: VideoRepository;

    constructor(repositoryFactory: RepositoryFactory) {
        this.videoRepository = repositoryFactory.createVideoRepository();
    }

    async execute(title: string, description: string, contentPath: string): Promise<void> {
        const id = v4();
        fs.mkdirSync(`videos/${id}`);
        const outputPath = `videos/${id}/content.m3u8`;
        await transcodeToHLS(contentPath, outputPath);
        const thumbnail = await generateThumbnailFromBase64(contentPath);
        const video = new Video(id, title, description, thumbnail, outputPath, 0, new Date(), 0, 0, 0);
        await this.videoRepository.save(video);
    }
}
