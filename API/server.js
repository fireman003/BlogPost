const express = require('express');
const app = express();

const sequelize = require('sequelize');
const bodyParser = require("body-parser");

const cors = require('cors');

app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({
    extended: true
}));
    
app.use(bodyParser.json());
app.use(express.json());

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

const db = new sequelize('blogPost', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
});

const users = db.define('users', {
    uuid: {
        type: sequelize.UUID,
        primaryKey: true
    },
    username: {
        type: sequelize.STRING,
        allowNull: false
    },
    email: {
        type: sequelize.STRING,
        allowNull: false
    },
    firstName: {
        type: sequelize.STRING,
        allowNull: false
    },
    lastName: {
        type: sequelize.STRING,
        allowNull: false
    },
    telefon: {
        type: sequelize.STRING,
        allowNull: false
    },
    profilePicture: { 
        type: sequelize.STRING,
        allowNull: true
    }
});

const posts = db.define('posts', {
    uuid: {
        type: sequelize.STRING,
        allowNull: false
    },
    Maintitle: {
        type: sequelize.STRING,
        allowNull: false
    },
    post: {
        type: sequelize.JSON,
        allowNull: false
    },
    category: {
        type: sequelize.STRING,
        allowNull: false
    },
    language: {
        type: sequelize.STRING,
        allowNull: false
    },
});

/*
 db.sync({ force: true }).then(() => {
     console.log('Database created');
 }); 
*/

app.get('/API/createUser/:uuid/:username/:email/:firstName/:lastName/:telefon', (req, res) => {
    const uuid = req.params.uuid;
    const username = req.params.username;
    const email = req.params.email;
    const firstName = req.params.firstName;
    const lastName = req.params.lastName;
    const telefon = req.params.telefon;

    users.findOne({
        where: {
            uuid: uuid
        }
    }).then((user) => {
        if(!user) {
            const data = users.build({
                uuid: uuid,
                username: username,
                email: email,
                firstName: firstName,
                lastName: lastName,
                telefon: telefon,
                profilePicture: null
            })
            
            data.save() 
            .then(() => {
                res.send({result: 'User created'});
                console.log('User created');
            });
        }
        else {
            console.log('User already exists');
        }
    }).catch((error) => {
        console.log(error);
    })
});

app.get('/API/getUsername/:uuid', (req, res) => {
    users.findOne({
        where: {
            uuid: req.params.uuid
        }
    }).then((user) => {
        if(user) {
            res.send({username: user.username, photoURL: user.profilePicture});
        } else {
            res.send({username: 'User not found'});
        }
    });
});

app.get('/API/getUserData/:uuid', (req, res) => {
    users.findOne({
        where: {
            uuid: req.params.uuid
        }
    }).then((user) => {
        if(user) {
            res.send({email: user.email, username: user.username, firstName: user.firstName, lastName: user.lastName, phone: user.telefon, photoURL: user.profilePicture});
        } else {
            console.log('User not found');
        }
    });
});

app.get('/API/getUserProfilePicture/:uuid', (req, res) => {
    // get user profile picture
});

app.get('/API/updateUser/:uuid/:username/:email/:firstName/:lastName/:telefon/:photoURL', (req, res) => {
    const uuid = req.params.uuid;
    const username = req.params.username;
    const email = req.params.email;
    const firstName = req.params.firstName;
    const lastName = req.params.lastName;
    const telefon = req.params.telefon;
    const photoURL = req.params.photoURL;

    console.log(photoURL);

    users.update({
        username: username,
        email: email,
        firstName: firstName,
        lastName: lastName,
        telefon: telefon,
        profilePicture: photoURL
    }, {
        where: {
            uuid: uuid
        }
    }).then(() => {
        res.send({result: 'User updated'});
        console.log('User updated');
    }).catch((error) => {
        console.log(error);
    });
});

app.post('/API/savePost', (req, res) => {
    const formData = req.body;
    // Access form data properties using formData.propertyName
    // Example: const title = formData.title;
    // Example: const content = formData.content;
    // Example: const category = formData.category;
    // Example: const language = formData.language;

    // Process the form data and save the post to the database

    res.send({result: 'Post saved'});
    console.log(formData);
});

app.get('/', (req, res) => {
    res.send('Hello World');
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});