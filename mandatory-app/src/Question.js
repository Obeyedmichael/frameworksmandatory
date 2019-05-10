import React, {Component} from 'react';
import {Link} from "react-router-dom";
import QuestionList from "./QuestionList"
import PostAnswer from "./PostAnswer";
import Answer from "./Answer";
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
                    answers={this.state.question.answers}
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
                        <p className="q_question">Question: {question.body}</p>
                    </div>
                    <div className="answers_list">

                    </div>
                    <div>
                        <AnswerList
                            answers={this.state.question.answers}
                            id={this.props.id}
                        />

                        <PostAnswer
                           postAnswers={this.props.postAnswer}
                            id={this.props.id}
                        />

                    </div>
                    <div>

                    </div>
                    <Link to={'/'}> Home</Link>
                </div>
        }

        /*questions.answers.forEach((elm) => {
            list.push(<li>
                <Link to={`/questions/with/${elm}`}>{elm}</Link>
            </li>)
        });*/

        /*<addAnswer
                                    AddAnswers={this.props.addAnswer}
                                    id={this.props.id}
                                />*/

        return content;


}
}

export default Question;