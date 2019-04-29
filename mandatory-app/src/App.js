import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";

import QuestionList from "./QuestionList";
import NotFound from "./NotFound";

class App extends Component {
    constructor(props) {
        super(props);
        this.addQuestions = this.addQuestions.bind(this);

        this.state = {
            questions: []
        };


    }

    addQuestions(title,body){
        let newQuestion = {
            title: title,
            body: body
        };
        console.log(JSON.stringify(newQuestion));
        fetch('http://localhost:8080/api/questions',
            {
            method:'POST',
            body:JSON.stringify(newQuestion),
            headers: {"Content-type": "application/json; charset=UTF-8"}
        })
            .then(response => response.json())
            .then(json => {
                console.log("Result of posting a new Question:");
                console.log(json);
                this.getData()
            });
    }

    getQuestionFromId(id) {
        return this.state.questions.find((elm) => elm.id === Number(id));
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

                    <Route exact path={'/question/:id'}
                           render={(props) => <question {...props}
                                                      recipe={this.getQuestionFromId(props.match.params.id)}/>}
                    />



                    <Route component={NotFound} />
                </Switch>

            </div>
        </Router>
    );
  }
}

export default App;
