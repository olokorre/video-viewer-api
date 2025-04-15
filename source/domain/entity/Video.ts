export default class Video {

    constructor(
        readonly id: string,
        readonly title: string,
        readonly description: string,
        readonly thumbnail: string,
        readonly videoUrl: string,
        readonly duration: number,
        readonly uploadDate: Date,
        readonly views: number,
        readonly likes: number,
        readonly dislikes: number
    ) { }
}
