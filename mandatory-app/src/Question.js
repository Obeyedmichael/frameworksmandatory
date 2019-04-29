import React, {Component} from 'react';
import {Link} from "react-router-dom";

class Question extends Component {

    render() {
        let question = this.props.question;
        let list = [];

        question.answers.forEach((elm) => {
            list.push(<li>
                <Link to={`/question/with/${elm}`}>{elm}</Link>
            </li>)
        });



        return (
            <div>
                <h3>{question.title}</h3>

                <p>{question.body}</p>


                <p>
                    answers:
                    <ul>
                        {list}
                    </ul>
                </p>
            </div>
        );
    }
}

export default Question;