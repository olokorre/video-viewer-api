import RepositoryFactory from "../domain/repository/RepositoryFactory";
import VideoRepository from "../domain/repository/VideoRepository";

interface Output {
    id: string;
    title: string;
    description: string;
    thumbnail: string
}

export default class ListVideos {

    private videoRepository: VideoRepository;

    constructor(repositoryFactory: RepositoryFactory) {
        this.videoRepository = repositoryFactory.createVideoRepository();
    }

    async execute(): Promise<Output[]> {
        const videos = await this.videoRepository.getAll();
        return videos.map((video) => {
            return {
                id: video.id,
                title: video.title,
                description: video.description,
                thumbnail: video.thumbnail,
            }
        });
    }
}
