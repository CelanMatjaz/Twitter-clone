const express = require('express');
const bb = require('express-busboy');
const fs = require('fs');
const cors = require('cors');
const jwt = require('jsonwebtoken');
 
const app = express();
app.use(cors());
app.set('trust proxy', true);

bb.extend(app, {
    upload: true,
    path: '/files',
    allowedPath: /./
});

const PORT = process.env.PORT || 2000;

app.listen(PORT, () => {
	console.log('Server started\nListening on port', PORT);
});

//Send saved tweets
app.get('/tweets', (req, res) => {    
    jwt.verify(req.token, 'secret', function(err, decoded) {
        if(err){
            let data = fs.readFileSync('./fakeDB/tweets.json');
            data = JSON.parse(data);
            res.json(data.reverse());
        }
        else{
            res.json({error: 'Not logged in'});
        }
    });
});

//Login
app.post('/login', (req, res) => {
    let data = fs.readFileSync('./fakeDB/users.json');
    data = JSON.parse(data);

    const user = data.find(user => user.username === req.body.username);

     if(user){
        if(user.password === 'password'){
            jwt.sign({username: user.username, id: user.id}, 'secret', (err, token) => {
                res.json({username: 'user', id: 1, token})
            })
        }
        else{
            res.json({error: 'Wrong password'});
        }
     }
     else{
         res.json({error: 'User with that username does not exist'});
     }
});

//Logsout - don't realyl need it
app.post('/logout', (req, res) => {
    res.sendStatus(200);
});
 
//Checks for token on front-end
app.post('/check-login', checkForToken, (req, res) => {
    jwt.verify(req.token, 'secret', function(err, decoded) {
        if(!err){
            res.json({username: decoded.username, id: decoded.id, token: req.token});
        }
        else{
            res.json({error: 'Not logged in'});
        }
    });
});

//Registration with fake db
app.post('/register', (req, res) => {
    let data = fs.readFileSync('./fakeDB/users.json');
    data = JSON.parse(data);

    let errors = [];

    const { email, username, password, passwordRepeat } = req.body;

    if(email && username && password && passwordRepeat){
        if(data.find(user => user.username === username)){
            errors.push({error: 'Username already exists!'});
        }

        if(data.find(user => user.email === email)){
            errors.push({error: 'Email already exists!'});
        }

        if(password !== passwordRepeat){
            errors.push({error: 'Passwords do not match!'});
        }

        if(errors.length === 0){
            const user = {
                email,
                username,
                password,
                id: data.length + 1
            };

            data.push(user);
            fs.writeFileSync('./fakeDB/users.json', JSON.stringify(data));
            res.json({errors: []});
        }
        else{
            res.json({errors});
        }	
    }
});

//Send saved tweets
app.get('/tweets', (req, res) => {
    jwt.verify(req.token, 'secret', function(err, decoded) {
        if(!err){
            let data = fs.readFileSync('./fakeDB/tweets.json');
            data = JSON.parse(data);
            res.json(data.reverse());
        }
        else{
            res.json({error: 'Not logged in'});
        }
    });
});

app.get('/tweets/:id', (req, res) => {
    jwt.verify(req.token, 'secret', function(err, decoded) {
        if(err){
            let data = fs.readFileSync('./fakeDB/tweets.json');
            data = JSON.parse(data);
            const tweets = data.filter(tweet => {
                return tweet.authorID === parseInt(req.params.id)
            })
            res.json(tweets.reverse());
        }
        else{
            res.json({error: 'Not logged in'});
        }
    });
});

//Adds a new tweet and sends it back
app.post('/add-tweet', checkForToken, (req, res) => {
    let data = fs.readFileSync('./fakeDB/tweets.json');
    data = JSON.parse(data);

    jwt.verify(req.token, 'secret', function(err, decoded) {
        if(err) throw err;
        let errors = [];
        let date = new Date();
        let id;

        if(data.length > 0){
            id = (data[data.length - 1].id + 1);
        }
        else{
            id = 0;
        }

        let tempTweet = {
            authorID: decoded.id,
            id,
            title: req.body.title,
            body: req.body.body,
            author: decoded.username,
            date: date.getDate() + '. ' + (date.getMonth() + 1) + '. ' + date.getFullYear()
        }

        if(tempTweet.title.length < 1) errors.push('Tweet title is not long enough');
        if(tempTweet.body.length < 1) error.push('Tweet body does not contain enough characters');
        
        if(errors.length === 0){
            data.push(tempTweet);
            fs.writeFileSync('./fakeDB/tweets.json', JSON.stringify(data));
            res.json({});
        } 
        else{
            res.json(errors);
        }
    });	
});

//Deletes tweet in file
app.post('/delete-tweet/:id', checkForToken, (req, res) => {
    jwt.verify(req.token, 'secret', function(err, decoded) {
        if(!err){
            const json = fs.readFileSync('./fakeDB/tweets.json');
            const data = JSON.parse(json);

            const filtered = data.filter(tweet => {
                return parseInt(tweet.id) !== parseInt(req.params.id);
            });
            
            fs.writeFileSync('./fakeDB/tweets.json', JSON.stringify(filtered));
            res.status(200);
            res.json({ error: null})
        }
        else{
            res.json({ error: 'Not logged in' });
        }
    });
});

//Check for token middleware
function checkForToken(req, res, next){
    const token = req.token = req.headers['authorization'].split(' ')[1];
    if(req.headers['authorization'].startsWith('Bearer ') && token){
        req.token = token;
    }    
    next();
}