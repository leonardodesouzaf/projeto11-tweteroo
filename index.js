import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

const tweets = [];
const users = [];

app.post('/sign-up', function (req,res) {
    const user = req.body;
    users.push(user);
    if(!user.username || !user.avatar){
        return res.status(400).send('Todos os campos são obrigatórios!');
    }
    return res.status(201).send('OK'); 
});

app.post('/tweets', function (req,res) {
    const tweet = req.body;
    tweets.push(tweet);
    if(!tweet.username || !tweet.tweet){
        return res.status(400).send('Todos os campos são obrigatórios!');
    }
    return res.status(201).send('OK');
});

app.get('/tweets', function (req,res) {
    const latestTweets = [];
    for(let i=tweets.length; i>(tweets.length-11); i--){
        let userAvatar = '';
        for(let j=0; j<users.length; j++){
            if(users[j].username === tweets[i].username){
                userAvatar = users[j].avatar;
            }
        }
        let newObject = {
            username: tweets[i].username,
            avatar: userAvatar,
            tweet: tweets[i].tweet
        }
        latestTweets.push(newObject);
    }
    res.send(latestTweets);
});

app.listen(5000);