import * as fs from 'fs';

export async function readJsonFile(filePath: string) {
    try {
        const data = await fs.promises.readFile(filePath, 'utf-8');
        console.log(data);
        const jsonData = JSON.parse(data);
        return jsonData;
    } catch (error) {
        console.error(`Error reading JSON file: ${error}`);
        throw error;
    }
}

