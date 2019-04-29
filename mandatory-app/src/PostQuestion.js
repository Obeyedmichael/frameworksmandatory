import React, {Component} from 'react';

export default class PostQuestion extends Component {
    constructor(props) {
        super(props);

        this.state = {
            input: ""
        };

        this.onChange = this.onChange.bind(this);
        this.handleInput = this.handleInput.bind(this);
    }

    onChange(event) {
        this.setState({
            input: event.target.value
        });
    }

    handleInput(event) {
        event.preventDefault();
        this.props.PostQuestion(this.state.input);
    }

    render() {
        return (
            <div className="card">
                <div className="card-body">
                    <form>
                        <div className="form-group">
                            <label htmlFor="itemText">New question</label>
                            <input type="text" className="form-control" id="itemText"
                                   placeholder="What to aks"
                                   onChange={this.onChange}
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