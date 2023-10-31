const axios = require('axios');
import { readJsonFile } from "./utils/fetch-config-file";

const json = {
    apiKey: "1234",
    environment: "development",
    project: "prolog-playground"
}

function fetchConfigJsonFile() {
    readJsonFile('../prolog.config.json')
    .then((jsonData) => {
        return json;
    })
    .catch((error) => {
        throw new Error("Error: " + error);
    });
}

async function validateKey():Promise<boolean> {
    let isKeyValid: boolean = false;
    const configObject = json;
    console.log(configObject);
    const serverUrl = 'http://localhost:3000/validate-key';
    const response = await axios.post(serverUrl, configObject);
    isKeyValid = response.data.isKeyValid;
    
    if(isKeyValid === true){
        return isKeyValid;
    }else{
        throw new Error("The API key provided is invalid, please get a new API key.\nAdditional logging: " + JSON.stringify(configObject));
    }
}


export class Prolog {

    static async log(message: string) {
        const isKeyValid = await validateKey();
        if(isKeyValid){
            //push log to server
            console.log(`[LOG] ${message}`);
        }else{
            throw new Error("Please check your config file and try again");
        }
            

    }

    static warn(message: string) {

            console.warn(`[WARN] ${message}`);

    }

    static error(message: string) {
            console.error(`[ERROR] ${message}`);

    }
}
