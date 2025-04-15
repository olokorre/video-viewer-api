export default class Video {
    id: number;
    title: string;
    description: string;
    thumbnail: string;
    videoUrl: string;
    duration: number;
    uploadDate: Date;
    views: number;
    likes: number;
    dislikes: number;

    constructor(
        id: number,
        title: string,
        description: string,
        thumbnail: string,
        videoUrl: string,
        duration: number,
        uploadDate: Date,
        views: number,
        likes: number,
        dislikes: number
    ) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.thumbnail = thumbnail;
        this.videoUrl = videoUrl;
        this.duration = duration;
        this.uploadDate = uploadDate;
        this.views = views;
        this.likes = likes;
        this.dislikes = dislikes;
    }
}
