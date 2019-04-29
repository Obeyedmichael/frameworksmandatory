import React, {Component} from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom'
import AnswerList from "./Answerlist";

class Answer extends Component {
    API_URL = process.env.REACT_APP_API_URL;

    constructor(props) {
        super(props);
        this.state = {
            answer: "",
            vote: 0
        }
        this.VotePlus = this.VotePlus.bind(this);
        this.VoteMinus = this.VoteMinus.bind(this);

    }
    VoteMinus(event) {
        event.preventDefault();
        this.setState({
            vote: this.state.vote - 1
        });
    }
    VotePlus(event) {
        event.preventDefault();
        console.log(event.target);
        fetch(`${this.API_URL}/question/${this.props.questionId}/answers/${event.target.className}`, {
            method: 'PUT',
            body: JSON.stringify(
                {
                    vote: this.props.vote + 1
                }
            ),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => res.json())
            .then(response => console.log('Success:', JSON.stringify(response)))
            .catch(error => console.error('Error:', error));
    }
    VoteMinus(event) {
        event.preventDefault();
        console.log(event.target);
        fetch(`${this.API_URL}/question/${this.props.questionId}/answers/${event.target.className}`, {
            method: 'PUT',
            body: JSON.stringify(
                {
                    vote: this.props.vote - 1
                }
            ),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => res.json())
            .then(response => console.log('Success:', JSON.stringify(response)))
            .catch(error => console.error('Error:', error));
    }

    render() {


        return(

            <li>
                {this.props.answer}<br/>
                {this.props.vote}
                <button onClick={this.VotePlus}
                        id="voteBtn" className={this.props.answerId}>vote up
                </button>
                <button onClick={this.VoteMinus}
                        className={this.props.answerId}>vote down
                </button>



            </li>
        )
    }
}

export default Answer;
