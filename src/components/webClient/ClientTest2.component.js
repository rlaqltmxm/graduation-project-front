import React, { Component } from 'react';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';

export default class ClientTest2 extends Component {

    constructor(props){
        super(props);
        this.state = {
            testingURL: sessionStorage.getItem('postURL'),
            active: false
        }
    }

    getQuiz = () => {
        this.setState({ active: !this.state.active })
    }

    render(){
        return(
            <div style={{marginTop:200}}>
                <h2>Step3. Send POST request to '{this.state.testingURL}'</h2>
                <div style={{marginTop: 20}}>
                    <Button
                        variant="outline-success"
                        color="success"
                        size="small"
                        onClick={this.getQuiz.bind(this)}>GO TEST</Button>
                    {this.state.active && <Quiz2></Quiz2>}
                </div>
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
    }

    handleChange = (event) => {
        this.setState({
          [event.target.name]: event.target.value,
        });
    };

    handleSubmit = () => {

        sessionStorage.setItem('postSubmit', this.state.try);

        axios.get(localStorage.getItem('serverURL')+'/http_result')
        .then((response) => {
            console.log(response);
            sessionStorage.setItem('getAnswer', response.data.getAnswer);
            sessionStorage.setItem('postAnswer', response.data.postAnswer);
        })
        .catch((response) => {
            console.log(response);
        })

        

        this.nextPath('/webClient/result')
    }

    nextPath = (path) => {
        window.location = path
    }

    render(){
        return(
            <div style={{padding:10, marginTop: 30, marginRight: 300, marginLeft: 300}}>
                <h3>What message did you GET?</h3>
                <Form>
                    <Form.Group>
                    <div style={{padding:10, marginLeft: 5, textAlign: 'left'}}>
                        <Form.Label for="try">Answer: </Form.Label>
                        <Form.Control 
                            type="try" 
                            name="try" 
                            id="exampleEmail" 
                            placeholder="your answer"
                            onChange={this.handleChange}></Form.Control></div>
                    </Form.Group>
                    <Button
                        variant="outline-success"
                        color="success"
                        size="small"
                        onClick={this.handleSubmit}>Submit</Button>
                </Form>
            </div>
        )
    }

}