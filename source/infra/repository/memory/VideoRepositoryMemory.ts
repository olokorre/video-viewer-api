import Video from "../../../domain/entity/Video";
import VideoRepository from "../../../domain/repository/VideoRepository";

export default class VideoRepositoryMemory implements VideoRepository {

    private videos: Video[] = [];

    constructor() {
        this.videos = [];
    }

    async save(video: Video): Promise<void> {
        this.videos.push(video);
    }

    async getAll(): Promise<Video[]> {
        return [...this.videos];
    }
}
