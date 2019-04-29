import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";

import QuestionList from "./QuestionList";
import NotFound from "./NotFound";

class App extends Component {
    constructor(props) {
        super(props);



        this.state = {
            questions: []
        };


    }

    getQuestionFromId(id) {
        return this.state.Questions.find((elm) => elm.id === Number(id));
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
                                           recipes={this.state.Questions}
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
