import Video from "../domain/entity/Video";
import RepositoryFactory from "../domain/repository/repositoryFactory";
import VideoRepository from "../domain/repository/VideoRepository";

export default class UploadVideo {

    private readonly videoRepository: VideoRepository;

    constructor(repositoryFactory: RepositoryFactory) {
        this.videoRepository = repositoryFactory.createVideoRepository();
    }

    async execute(title: string, description: string, content: string): Promise<void> {
        const video = new Video(1, title, description, '', content, 0, new Date(), 0, 0, 0);
        await this.videoRepository.save(video);
    }
}
