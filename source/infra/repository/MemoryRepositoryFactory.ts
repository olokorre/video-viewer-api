import VideoRepository from "../../domain/repository/VideoRepository";
import VideoRepositoryMemory from "./memory/VideoRepositoryMemory";

export default class MemoryRepositoryFactory {
    private videoRepository: VideoRepository;

    constructor() {
        this.videoRepository = new VideoRepositoryMemory();
    }

    createVideoRepository(): VideoRepository {
        return this.videoRepository;
    }
}
