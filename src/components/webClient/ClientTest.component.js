import React, { Component } from 'react';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';
import { FormHelperText } from '@material-ui/core';

export default class ClientTest extends Component {

    constructor(props){
        super(props);
        this.state = {
            testingURL: sessionStorage.getItem('webClientURL'),
            active: {
                get: false,
                post: false,
                put: false,
                delete: false
            }
        }

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange = (target) => {
        let temp = this.state.active;
        temp[target] = !this.state.active[target];
        this.setState({ active: temp });
    };

    render(){
        return(
            <div>
                {<Quiz1 callbackFromParent={this.handleChange}></Quiz1>}
                {this.state.active.post ? <Quiz2 callbackFromParent={this.handleChange}></Quiz2> : <Hidden></Hidden>}
                {this.state.active.put ? <Quiz3 callbackFromParent={this.handleChange}></Quiz3> : <Hidden></Hidden>}
                {this.state.active.delete ? <Quiz4 callbackFromParent={this.handleChange}></Quiz4> : <Hidden></Hidden>}
            </div>
        )
    }

}

class Hidden extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return(
            <div>
                <h3 style={{color: 'grey'}}>HIDDEN</h3>
            </div>
        )
    }

}

class Quiz1 extends Component {

    constructor(props){
        super(props);
        this.state = {
            try: "",
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange = (event) => {
        this.setState({
          [event.target.name]: event.target.value,
        });
    };

    handleSubmit = () => {

        console.log('check');
        sessionStorage.setItem('webclient-get', this.state.try);
        this.props.callbackFromParent('post');
    }

    render(){
        return(
            <div>
                <Form style={{display: 'flex', padding: 50}}>
                    <div>
                        Quiz1. Send GET request to '{this.state.testingURL}', What message did you get?
                    </div>
                    <Form.Label for="try">Answer: </Form.Label>
                    <Form.Control 
                        style={{width: 400}}
                        type="try" 
                        name="try" 
                        id="exampleEmail" 
                        placeholder="your answer"
                        onChange={this.handleChange}></Form.Control>
                    <Button
                        onClick={this.handleSubmit}>
                        next</Button>                                                                                   
                </Form>
            </div>
        )
    }

}

class Quiz2 extends Component {

    constructor(props){
        super(props);
        this.state = {
            try: "",
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange = (event) => {
        this.setState({
          [event.target.name]: event.target.value,
        });
    };

    handleSubmit = () => {

        console.log('check');
        sessionStorage.setItem('webclient-post', this.state.try);
        this.props.callbackFromParent('put');
    }

    render(){
        return(
            <div>
                <Form style={{display: 'flex', padding: 50}}>
                    <div>
                        Quiz2. Send POST request to '{this.state.testingURL}', What response did you get?
                    </div>
                    <Form.Label for="try">Answer: </Form.Label>
                    <Form.Control 
                        style={{width: 400}}
                        type="try" 
                        name="try" 
                        id="exampleEmail" 
                        placeholder="your answer"
                        onChange={this.handleChange}></Form.Control>
                    <Button
                        onClick={this.handleSubmit}>
                        next</Button>                                                                                   
                </Form>
            </div>
        )
    }
}

class Quiz3 extends Component {

    constructor(props){
        super(props);
        this.state = {
            try: "",
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange = (event) => {
        this.setState({
          [event.target.name]: event.target.value,
        });
    };

    handleSubmit = () => {

        console.log('check');
        sessionStorage.setItem('webclient-post', this.state.try);
        this.props.callbackFromParent('delete');
    }

    render(){
        return(
            <div>
                <Form style={{display: 'flex', padding: 50}}>
                    <div>
                        Quiz3. Send PUT request to '{this.state.testingURL}', What response did you get?
                    </div>
                    <Form.Label for="try">Answer: </Form.Label>
                    <Form.Control 
                        style={{width: 400}}
                        type="try" 
                        name="try" 
                        id="exampleEmail" 
                        placeholder="your answer"
                        onChange={this.handleChange}></Form.Control>
                    <Button
                        onClick={this.handleSubmit}>
                        next</Button>                                                                                   
                </Form>
            </div>
        )
    }
}

class Quiz4 extends Component {

    constructor(props){
        super(props);
        this.state = {
            try: "",
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange = (event) => {
        this.setState({
          [event.target.name]: event.target.value,
        });
    };

    handleSubmit = () => {

        console.log('check');
        sessionStorage.setItem('webclient-post', this.state.try);
        this.props.callbackFromParent('submit');
    }

    render(){
        return(
            <div>
                <Form style={{display: 'flex', padding: 50}}>
                    <div>
                        Quiz4. Send DELETE request to '{this.state.testingURL}', What response did you get?
                    </div>
                    <Form.Label for="try">Answer: </Form.Label>
                    <Form.Control 
                        style={{width: 400}}
                        type="try" 
                        name="try" 
                        id="exampleEmail" 
                        placeholder="your answer"
                        onChange={this.handleChange}></Form.Control>
                    <Button
                        onClick={this.handleSubmit}>
                        next</Button>                                                                                   
                </Form>
            </div>
        )
    }
}