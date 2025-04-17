import fs from 'fs';
import path from 'path';
import ffmpeg from 'fluent-ffmpeg';
import { v4 as uuidv4 } from 'uuid';
import { promisify } from 'util';

const readFile = promisify(fs.readFile);
const unlink = promisify(fs.unlink);

export async function generateThumbnailFromBase64(tempVideoPath: string): Promise<string> {
    const tempId = uuidv4();
    const tempImagePath = path.resolve(__dirname, `${tempId}.png`);
    try {
        await new Promise<void>((resolve, reject) => {
            ffmpeg(tempVideoPath)
                .screenshots({
                    timestamps: ['00:00:25'],
                    filename: path.basename(tempImagePath),
                    folder: path.dirname(tempImagePath),
                    size: '320x240',
                })
                .on('end', () => resolve())
                .on('error', reject);
        });
        const thumbBuffer = await readFile(tempImagePath);
        const base64Thumbnail = `data:image/png;base64,${thumbBuffer.toString('base64')}`;
        return base64Thumbnail;
    } finally {
        await unlink(tempVideoPath).catch(() => { });
        await unlink(tempImagePath).catch(() => { });
    }
}
