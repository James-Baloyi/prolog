const axios = require('axios');
import { AxiosResponse } from "axios";
import { readJsonFile } from "./utils/fetch-config-file";
import errorMessages from "./utils/errors";

const alphabetArray:string[] = [
    "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", 
    "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z",
    "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", 
    "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"
  ];
  
const numbersArray:string[] = [
    "0", "1", "2", "3", "4", "5", "6", "7", "8", "9"
];

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
        throw new Error(errorMessages.INVALID_API_KEY);
    }
}

export class Prolog {
    constructor(){
        this.log = this.log.bind(this);
        this.error = this.error.bind(this);
        this.warn = this.warn.bind(this);
    }


    public async log(message: string) {
        const isKeyValid = await validateKey();
        if(isKeyValid){
            console.log(`[LOG] ${message}`);
        }else{
            throw new Error(errorMessages.INVALID_API_KEY);
        }            
    }

    private static async generateLogToken():Promise<string>{
        let token = '';
        for(let i = 0; i < 10; i++){
            const randomIndex = Math.floor(Math.random() * alphabetArray.length);
            token += alphabetArray[randomIndex];
        }
        for(let i = 0; i < 10; i++){
            const randomIndex = Math.floor(Math.random() * numbersArray.length);
            token += numbersArray[randomIndex];
        }
        return token;
    }

    private static async submitLogToServer(message: string, token: string, level: string):Promise<AxiosResponse>{
        const date = new Date();
        const logDate = `${date.getDate()} - ${date.getMonth()} - ${date.getFullYear()}`;
        const log = {
            message: message,
            token: token,
            date: logDate,
            level: level
        }
        const res = await axios.post(`https://prlg-jnb-1.akamai.com/api/v1/log-handler`, log);
        return res;
    }

     public async warn(message: string) {
        const isKeyValid = await validateKey();
        if(isKeyValid){
            const token = await Prolog.generateLogToken();
            Prolog.submitLogToServer(message, token, 'warning');
        }else{
            throw new Error(errorMessages.INVALID_API_KEY);
        }
    }    

    public async error(message: string) {
            console.error(`[ERROR] ${message}`);
    }
}