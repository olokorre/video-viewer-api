import fs from 'fs';
import path from 'path';
import ffmpeg from 'fluent-ffmpeg';
import { v4 as uuidv4 } from 'uuid';
import { promisify } from 'util';

const writeFile = promisify(fs.writeFile);
const readFile = promisify(fs.readFile);
const unlink = promisify(fs.unlink);

export async function generateThumbnailFromBase64(base64Video: string): Promise<string> {
    const videoBuffer = Buffer.from(base64Video.replace(/^data:video\/\w+;base64,/, ''), 'base64');
    const tempId = uuidv4();
    const tempVideoPath = path.resolve(__dirname, `${tempId}.mp4`);
    const tempImagePath = path.resolve(__dirname, `${tempId}.png`);

    try {
        // 1. Salva o vídeo temporariamente
        await writeFile(tempVideoPath, videoBuffer);

        // 2. Gera a thumbnail com ffmpeg
        await new Promise<void>((resolve, reject) => {
            ffmpeg(tempVideoPath)
                .screenshots({
                    timestamps: ['00:00:01'],
                    filename: path.basename(tempImagePath),
                    folder: path.dirname(tempImagePath),
                    size: '320x240',
                })
                .on('end', () => resolve())
                .on('error', reject);
        });

        // 3. Lê a imagem e converte para base64
        const thumbBuffer = await readFile(tempImagePath);
        const base64Thumbnail = `data:image/png;base64,${thumbBuffer.toString('base64')}`;

        return base64Thumbnail;
    } finally {
        // 4. Limpeza
        await unlink(tempVideoPath).catch(() => { });
        await unlink(tempImagePath).catch(() => { });
    }
}
