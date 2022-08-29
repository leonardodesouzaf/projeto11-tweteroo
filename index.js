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
    const latestTweets = tweets.map(tweet => {
        let userAvatar;
        users.forEach(user => {
            if(user.username === tweet.username){
                userAvatar = user.avatar;
            }
        })
        return {
            username: tweet.username,
            avatar: userAvatar,
            tweet: tweet.tweet
        }
    });
    let sliceRes=latestTweets.slice(-10);
    let response = sliceRes.reverse();
    res.send(response);
});

app.listen(5000);