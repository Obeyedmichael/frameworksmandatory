/**** External libraries ****/
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');

/**** Configuration ****/
const appName = "Foobar";
const port = (process.env.PORT || 8080);
const app = express();
app.use(bodyParser.json()); // Parse JSON from the request body
app.use(morgan('combined')); // Log all requests to the console
app.use(express.static(path.join(__dirname, '../build')));

// Additional headers for the response to avoid trigger CORS security
// errors in the browser
// Read more here: https://en.wikipedia.org/wiki/Cross-origin_resource_sharing
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Authorization, Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");

    // intercepts OPTIONS method
    if ('OPTIONS' === req.method) {
      // respond with 200
      console.log("Allowing OPTIONS");
      res.send(200);
    }
    else {
      // move on
      next();
    }
});

let mongoose = require('mongoose');
mongoose.connect('mongodb://dbuser:aa12t@cluster1-44tla.azure.mongodb.net/test?retryWrites=true', {useNewUrlParser: true});

let db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    // we're connected!
});

let answerSchema = new mongoose.Schema(
    {

        answer: String,
        vote: Number,
    }
);

let questionSchema = new mongoose.Schema(
    {
        title: String,
        body: String,
        answers: [answerSchema]
    }
);

let Question = mongoose.model('Question', questionSchema);
let Answers = mongoose.model('Answer',answerSchema);


function getFromId(id) {
    return Question.find((elm) => elm.id === Number(id));
}

/*function findNextId() {
    const reducer = (acc, curr) => Math.max(acc, curr);
    let nextId = Question.map(el => el.id).reduce(reducer) + 1;
    return nextId;
}*/

/**** Routes ****/
/*
/**** Reroute all unknown requests to the React index.html ****

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '../build/index.html'));
});
 */

app.get('/api/questions', (req, res) => {
    res.json(Question)
});

app.get('/api/questions/:id/', (req, res) => {
    res.json(getFromId(req.params.id));
});

app.post('/api/questions', (req, res) => {
    let newQuestion = new Question({
        title: req.body.title,
        body: req.body.body
    });

    newQuestion.save(function(error,Question){
        if(error){
            return console.log(error);
        }
        else{
            console.log("yay",Question);
        }
    });
    res.json({ msg: `You new question is posted`, Question: questionSchema});
    res.send()
});

app.get('/api/answers/', (req, res) => {
    res.json(Answers)
});

app.get('/api/answers/:id/', (req, res) => {
    res.json(getFromId(req.params.id));
});

app.post('/api/answers', (req, res) => {
    let newAnswer = req.answer;
    newAnswer.id = findNextId();
    Answers.push(newAnswer);
    res.json({ msg: `You new question is posted`, Answers: answerSchema});
});


/**** Start! ****/
app.listen(port, () => console.log(`${appName} API running on port ${port}!`));




