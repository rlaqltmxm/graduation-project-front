import React, { Component } from 'react';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';

export default class ClientTest extends Component {

    constructor(props){
        super(props);
        this.state = {
            testingURL: localStorage.getItem('getURL'),
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
            <div style={{marginTop:200}}>
                <h2>Step2. Send GET request to '{this.state.testingURL}'</h2>
                <div style={{marginTop: 20}}>
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

        localStorage.setItem('getSubmit', this.state.try);

        axios.get(localStorage.getItem('serverURL') + '/http_post')
        .then( 
            (response) => { 
                console.log(response.data)
                localStorage.setItem("postURL", response.data.url);
                this.nextPath('/webClient/test_2')
            } 
            
        )
        .catch( (response) => { console.log(response) } );
        this.nextPath('/webClient/test_2')
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