import VideoRepository from "./VideoRepository";

export default interface RepositoryFactory {
    createVideoRepository(): VideoRepository;
}
