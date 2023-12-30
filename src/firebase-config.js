const admin = require('firebase-admin');

const serviceAccount = require('./path/to/your/serviceAccountKey.json'); 

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    apiKey: "AIzaSyA8pLz0it3fsyGDM897C-5d447BsbQQyWA",
    authDomain: "my-awesome-project-ebf03.firebaseapp.com",
    databaseURL: "https://my-awesome-project-ebf03.firebaseio.com",
    projectId: "my-awesome-project-ebf03",
    storageBucket: "my-awesome-project-ebf03.appspot.com",
    messagingSenderId: "1097690692681",
    appId: "1:1097690692681:web:c4fa8df4549fe75f38d398"
});

module.exports = admin;