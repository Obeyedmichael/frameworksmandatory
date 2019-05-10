import React, {Component} from 'react';


class PostAnswer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            answer:'',
            vote:0
        };
        this.onChangeAnswer = this.onChangeAnswer.bind(this);
        this.handleInput = this.handleInput.bind(this);
    }

    onChangeAnswer(event) {
        this.setState({
            answer: event.target.value
        });
    }
    handleInput(event) {
        event.preventDefault();
        this.props.postAnswer(this.state.answer, this.props.id)
    }


    render() {
        return (
            <div className="card">
                <div className="card-body">
                    <form>
                        <div className="form-group">
                            <label htmlFor="itemText">New Item</label>
                            <input type="text" className="form-control" id="itemText"
                                   placeholder="Your Answer"
                                   onChange={this.onChangeAnswer}
                            />
                            <small className="form-text text-muted">
                            </small>
                        </div>
                        <button onClick={this.handleInput}
                                type="submit" id="submitItemBtn" className="btn btn-primary">Submit Answer
                        </button>
                    </form>
                </div>
            </div>
        );
    }
}


export default PostAnswer;