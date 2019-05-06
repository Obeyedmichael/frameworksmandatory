import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";

import Question from "./Question";
import QuestionList from "./QuestionList";
import NotFound from "./NotFound";

class App extends Component {

    API_URL = process.env.REACT_APP_API_URL;

    constructor(props) {
        super(props);


        this.getData = this.getData.bind(this);



        this.state = {
            questions: [],
            answers:[]
        };
        this.addQuestions = this.addQuestions.bind(this);
        this.addAnswer = this.addAnswer.bind(this);
    }

    componentDidMount() {
        console.log("App component has mounted");
        this.getData();
    }

    getData() {
        fetch(`${this.API_URL}/questions`)
            .then((response) =>
            {
                return response.json()
            })
            .then((questions) =>
                this.setState(
                    {
                        questions: questions
                    }));
    }


    addQuestions(title,body){
        let newQuestion = {
            title: title,
            body: body
        };
        console.log(JSON.stringify(newQuestion));
        fetch(`${this.API_URL}/questions`,
            {
            method:'POST',
            body:JSON.stringify(newQuestion),
            headers: {"Content-type": "application/json; charset=UTF-8"}
        })
            .then(response => response.json())
            .then(json => {
                console.log("Result of posting a new Question:");
                console.log(json);
                {this.getData()}
            })
            .catch(error => console.error(error));
    }

    getQuestionFromId(id) {
        return this.state.questions.find((elm) => elm._id === Number(id));
    }

    /*getAnswerFromQuestionId(id){
        return this.state.questions.answers, this.questions.find((elm) => elm._id === Number(id));
    }*/

    addAnswer(answer, id) {
        let newAnswer = {
            answer: answer,
            id: id
        };
        console.log(JSON.stringify(newAnswer));
        fetch(`${this.API_URL}/questions/answers/${id}`, {
            method: 'POST',
            body: JSON.stringify(newAnswer),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })

            .then(response => response.json())
            .then(json => {
                console.log("Result of posting a new answer:");
                console.log(json);

            })
            .then(()=>{
                this.setState({
                    answers:''
                })

            });
        this.getData()
            this.setState({
            answers: [...this.state.answers, newAnswer]

        });
    }


  render() {
    return (
        <Router>
            <div className="container">
                <h1>Questions</h1>

                <Switch>
                    <Route exact path={'/'}
                           render={(props) =>
                               <QuestionList {...props}
                                             questions={this.state.questions}
                                             addQuestions={this.addQuestions}
                                             header={'All Questions'}/>}
                    />

                    <Route exact path={'/questions/:id'}
                           render={(props) => <Question {...props}
                                                        question={this.getQuestionFromId(props.match.params._id)}
                                                        /*answers={this.getAnswerFromQuestionId(props.match.params._id)}*/
                                                        addAnswer={this.addAnswer}
                                                        id={props.match.params.id}
                                                        />}
                    />

                    <Route component={NotFound} />
                </Switch>

            </div>
        </Router>
    );
  }
}

export default App;
