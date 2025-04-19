import RepositoryFactory from "../../../domain/repository/RepositoryFactory";
import VideoRepository from "../../../domain/repository/VideoRepository";
import Connection from "../connections/Connection";
import VideoRepositoryDatabase from "./database/VideoRepositoryDatabase";

export default class DatabaseRepositoryFactory implements RepositoryFactory {

    private videoRepository: VideoRepository;

    constructor(connection: Connection) {
        this.videoRepository = new VideoRepositoryDatabase(connection);
    }

    createVideoRepository(): VideoRepository {
        return this.videoRepository;
    }
}
