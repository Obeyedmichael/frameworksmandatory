import React, {Component} from 'react';
import {Link} from "react-router-dom";
import QuestionList from "./QuestionList"
import PostAnswer from "./PostAnswer"
import PostQuestion from "./QuestionList";
import AnswerList from "./Answerlist";

class Question extends Component
{
    API_URL = process.env.REACT_APP_API_URL;

    constructor(props) {
        super(props);
        this.state = {
            question: "",
            answer: ""
        };



        fetch(`${this.API_URL}/questions/${props.match.params.id}`,
        {
            method:'GET',
            headers: {"Content-type": "application/json; charset=UTF-8"}
        })
            .then((response) => {
                return response.json()
            })
            .then((questions, answers) =>
                this.setState(
                    {
                        question: questions,
                        answer: answers
                    }))
            .catch(error =>
        {
            console.error(error);
        });

    }



    render() {
        let answercontent = "no answers";
        if(this.state.question.answers)
        {
            let answercontent = this.state.question.answers;
            {console.log(this.state.question.answers)}
            answercontent =
                <AnswerList
                    answer={this.state.question.answers}
                    id={this.props.id}
                />
        }

        let content = "LOADING";
        if(this.state.question)
        {
            let question = this.state.question;
            {console.log(this.state.question)}
            content =
                <div>
                    <div>
                        <p className="q_title">Title: {question.title}</p>
                        <p className="q_question">Question: {question.question}</p>
                    </div>
                    <div className="comments_list">

                    </div>
                    <div>

                        {answercontent}


                    </div>
                    <div>
                        <addAnswer
                            AddAnswers={this.props.addAnswer}
                            id={this.props.id}
                        />
                    </div>
                    <Link to={'/'}> Home</Link>
                </div>
        }

        /*questions.answers.forEach((elm) => {
            list.push(<li>
                <Link to={`/questions/with/${elm}`}>{elm}</Link>
            </li>)
        });*/



        return content;


}
}

export default Question;