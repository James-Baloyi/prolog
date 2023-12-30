import express from 'express';
const firebase = require('./firebase-config')

const app = express();
const port = 3000;

app.post('/validate-key', (req: { body: { configObject: ConfigureProlog }; }, res) => {
    const conf = req.body.configObject;
    console.log(conf);
    const json = {
        apiKey: "1234",
        environment: "development",
        project: "prolog-playground"
    }

    firebase.database().ref('prolog').once('value').then((snapshot: { val: () => any; }) => {
    }).catch((error: string) => {    throw new Error("Error: " + error);    });


    if(json.apiKey == "1234"){
        const responseObj = {
            isConfigValid: true,
    }
    res.status(200).send(JSON.stringify(responseObj));
    }else{
        const responseObj = {
            isConfigValid: false,
    }
    res.status(200).send(JSON.stringify(responseObj));
}
});

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}/validate-key`);
});
