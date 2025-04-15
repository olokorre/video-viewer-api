import Video from "../entity/Video";

export default interface VideoRepository {
    save(video: Video): Promise<void>;
    getAll(): Promise<Video[]>;
    findById(id: string): Promise<Video>;
}
