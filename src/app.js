import React from 'react';
import axios from './axios';

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    componentDidMount() {
        axios.get('/user').then(
            ({data}) => {
                this.setState({
                    ...data
                });
            }
        );
    }
    render() {
        if (!this.state.id) {
            return (
                <div>
                    Hang on!
                    <img src="/spinner.gif">;
                </div>
            );
        }
        return (
            <div>
                <img src="/logo.gif" />
                <ProfilePic
                    image={this.state.image}
                    first={this.state.first}
                    clickHandler={() => this.setState({ isUploaderVisible: true })}
                />
                {this.state.isUploaderVisible && <Uploader /> }
            </div>
        )
    }
}
