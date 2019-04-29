import React, {Component} from 'react';

export default class PostQuestion extends Component {
    constructor(props) {
        super(props);

        this.state = {
            questionsTitle: "",
            questionsBody: ""
        };

        this.onChangeTitle = this.onChangeTitle.bind(this);
        this.onChangeBody = this.onChangeBody.bind(this);
        this.handleInput = this.handleInput.bind(this);
    }

    onChangeTitle(event) {
        this.setState({
            questionsTitle: event.target.value
        });
    }

    onChangeBody(event) {
        this.setState({
            questionsBody: event.target.value
        });
    }

    handleInput(event) {
        event.preventDefault();
        this.props.addQuestions(this.state.questionsTitle,this.state.questionsBody);

    }

    render() {
        return (
            <div className="card">
                <div className="card-body">
                    <form>
                        <div className="form-group">

                            <input type="text" className="form-control" id="itemTitle"
                                   placeholder="Title"
                                   onChange={this.onChangeTitle}
                            />

                            <input type="text" className="form-control" id="itemText"
                                   placeholder="What to aks"
                                   onChange={this.onChangeBody}
                            />
                        </div>
                        <button onClick={this.handleInput}
                                type="submit" id="submitItemBtn" className="btn btn-primary">Post Question
                        </button>
                    </form>
                </div>
            </div>
        );
    }
}