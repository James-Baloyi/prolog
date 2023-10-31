import express from 'express';

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
    console.log(json);

    //implement firebase API key validation here
    if(json.apiKey == "1234"){
        const responseObj = {
            isConfigValid: true,
    }
    res.status(200).send(JSON.stringify(responseObj));
    }else{
        const responseObj = {
            isConfigValid: false,
    }
    res.status(204).send(JSON.stringify(responseObj));
}
});

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}/validate-key`);
});
