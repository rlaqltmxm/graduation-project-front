import React, { Component } from "react";
import { Form, Button, Card } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

export default class ConnectTest extends Component {

    constructor(props){
        super(props);
        this.state = {
            url: sessionStorage.getItem('connURL'),
            active: false
        }
    }

    handleChange = (event) => {
        this.setState({
          [event.target.name]: event.target.value,
        });
    };

    getQuiz = () => {
        this.setState({ active: !this.state.active })
    }

    render(){
        return(
            
            <div style={{marginTop: 150}}>
                <h2>Phase1. Connect your device to '{this.state.url}'</h2>
                <h4 style={{padding: 10}}>
                    **Message payload should contain: <br/>
                    DeviceID (1), State, and Mode (push/pull)
                </h4>
                <Button
                    variant="outline-success"
                    color="success"
                    size="small"
                    onClick={
                        this.getQuiz
                    }>GO TEST
                </Button>
                {this.state.active && <Quiz1></Quiz1>}
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
    }

    handleChange = (event) => {
        this.setState({
          [event.target.name]: event.target.value,
        });
    };

    handleSubmit = () => {

        sessionStorage.setItem("submit1", this.state.try)
        axios.get(localStorage.getItem('serverURL')+'/obs')
        .then( 
            response => { 
                sessionStorage.setItem("obsURL", response.data.url)
                this.nextPath('/coap/coapClient/connect/observer')
            } 
            
        )
        .catch( response => { console.log(response) } );
    }

    nextPath = (path) => {
        window.location = path
    }

    render(){
        return(
            <div style={{padding:10, marginTop: 30, paddingRight: 150, paddingLeft: 150}}>
                <h3>Q1. What response did you get?</h3>
                <Form>
                    <Form.Group>
                    <div style={{paddingRight: 100, paddingLeft: 100, textAlign: 'left'}}>
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