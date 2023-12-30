import * as fs from 'fs';
import errorMessages from './errors';

export async function readJsonFile(filePath: string) {
    try {
        const data = await fs.promises.readFile(filePath, 'utf-8');
        const jsonData = JSON.parse(data);
        return jsonData;
    } catch (error) {
        console.error();
        throw error;
    }
}

