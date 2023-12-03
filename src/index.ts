const axios = require('axios');
import { AxiosResponse } from "axios";
import { readJsonFile } from "./utils/fetch-config-file";

const alphabetArray:string[] = [
    "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", 
    "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z",
    "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", 
    "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"
  ];
  
const numbersArray:string[] = [
    "0", "1", "2", "3", "4", "5", "6", "7", "8", "9"
];
  

const json = {
    apiKey: "1234",
    environment: "development",
    project: "prolog-playground"
}

async function fetchConfigJsonFile() {
    readJsonFile('../prolog.config.json')
    .then((jsonData) => {
        return jsonData;
    })
    .catch((error) => {
        throw new Error("Error: " + error);
    });
}

async function validateKey():Promise<boolean> {
    let isKeyValid: boolean = false;
    const configObject = fetchConfigJsonFile();
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
            console.log(`[LOG] ${message}`);
        }else{
            throw new Error("Please check your config file and try again");
        }            
    }

    private static async generateLogToken():Promise<string>{
        const token = '';
        return token;
    }

    private static async submitLogToServer(message: string, token: string):Promise<AxiosResponse>{
        const log_token = await Prolog.generateLogToken()
        const res = await axios.get(`https://log-handler.com/api/v1/log-handler?log=${message}&log_token=${log_token}&type=warn`);
        return res;
    }

    static async warn(message: string) {
        const isKeyValid = await validateKey();
        if(isKeyValid){
            const token = await Prolog.generateLogToken();
            this.submitLogToServer(message, token);
        }else{
            throw new Error("Please check your config file and try again");
        }
    }    

    static error(message: string) {
            console.error(`[ERROR] ${message}`);

    }
}
