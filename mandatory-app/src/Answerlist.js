import React, {Component} from 'react';
import Answer from "./Answer";
import PostAnswer from "./PostAnswer";

class AnswerList extends Component {

    render() {
        let list= [];

        this.props.answers.forEach((answer)=>{
            list.push(

                <Answer
                    answer={answer.answer}
                    vote={answer.vote}
                    questionId={this.props.id}
                    AnswerId={answer._id}
                />

            )
        });


        return (
            <div>
                <h3>{this.props.header}</h3>
                <div className="card">
                    <div className="card-header">
                        The Answers
                    </div>
                    <div className="card-body">
                        <ul className="list-group" id="itemList">
                            {list}
                        </ul>
                    </div>
                    <div>

                    </div>
                </div>
            </div>
        );
    }
}

export default AnswerList;
