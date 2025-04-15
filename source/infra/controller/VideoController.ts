import ListVideos from "../../app/ListVideos";
import UploadVideo from "../../app/UploadVideo";
import ViewVideo from "../../app/ViewVideo";
import RepositoryFactory from "../../domain/repository/RepositoryFactory";

export default class VideoController {
    private repositoryFactory: RepositoryFactory;

    constructor(repositoryFactory: RepositoryFactory) {
        this.repositoryFactory = repositoryFactory;
    }

    async uploadVideo(title: string, description: string, content: string): Promise<void> {
        const uploadVideo = new UploadVideo(this.repositoryFactory);
        await uploadVideo.execute(title, description, content);
    }

    async listVideos() {
        const listVideos = new ListVideos(this.repositoryFactory);
        return await listVideos.execute();
    }

    async viewVideo(id: string) {
        const viewVideo = new ViewVideo(this.repositoryFactory);
        return await viewVideo.execute(id);
    }
}
