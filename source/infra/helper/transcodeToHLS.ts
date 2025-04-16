import { spawn } from "child_process";

export async function transcodeToHLS(inputPath: string, outputPath: string): Promise<void> {
    return new Promise((resolve, reject) => {
        const ffmpegArgs = [
            "-i", inputPath,
            "-c:v", "h264",
            "-c:a", "aac",
            "-f", "hls",
            "-hls_time", "10",
            "-hls_list_size", "0",
            outputPath
        ];
        const ffmpeg = spawn("ffmpeg", ffmpegArgs);
        ffmpeg.on("close", (code) => {
            if (code === 0) resolve();
            else reject(new Error("Transcoding failed"));
        });
    });
}
