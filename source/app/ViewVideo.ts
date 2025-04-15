import RepositoryFactory from "../domain/repository/RepositoryFactory";
import VideoRepository from "../domain/repository/VideoRepository";

interface Output {
    id: string;
    title: string;
    description: string;
    thumbnail: string;
    videoUrl: string;
    duration: number;
    uploadDate: Date;
    views: number;
    likes: number;
    dislikes: number;
}

export default class ViewVideo {

    private videoRepository: VideoRepository;

    constructor(repositoryFactory: RepositoryFactory) {
        this.videoRepository = repositoryFactory.createVideoRepository();
    }

    async execute(id: string): Promise<Output> {
        const video = await this.videoRepository.findById(id);
        return {
            ...video
        }
    }

}
