import React, {Component} from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import PostQuestion from './PostQuestion'

class QuestionList extends Component {

    render() {
        let list = [];

        this.props.questions.map((elm) => {
            list.push(<li>
                <Link to={`/question/${elm.id}`}>{elm.title}</Link>
            </li>)
        });



        return (
            <div>
                <h3>{this.props.header}</h3>
                <ul>
                    {list}
                </ul>
                <PostQuestion addQuestions={this.props.addQuestions}/>
            </div>
        );
    }
}

export default QuestionList;