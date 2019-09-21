import React, { Component } from "react";
import { Form, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

export default class ClientTest extends Component {

    constructor(props){
        super(props);
        this.state = {
            testingURL: 'null',
            active: false
        }
        this.handleChange = this.handleChange.bind(this);
        this.getQuiz = this.getQuiz.bind(this);
    }

    componentDidMount() {
        axios.post(localStorage.getItem('serverURL')+'/scenario_get', JSON.parse(sessionStorage.getItem('accessInfo')))
        .then((response) => { 
                this.setState({ testingURL: response.data.url });
            } 
        ).catch( response => { console.log(response) } );
    }

    handleChange(event) {
        this.setState({
          [event.target.name]: event.target.value,
        });
    };

    getQuiz() {
        this.setState({ active: !this.state.active })
    }

    render(){
        return(

            <div style={{marginTop: 150}}>
                <h2>Step2. Send GET message to URL '{this.state.testingURL}'</h2>
                <h4 style={{padding: 10, textAlign: "left", marginLeft: 500}}>
                    You should follow the protocols below: <br/><br/>
                    <h5 style={{fontStyle: "italic"}}>
                    *HTTP Version should be "1.1" <br/>
                    *User-Agent header should be "ComputerNetwork"</h5>
                </h4>
                <Button
                    variant="outline-success"
                    color="success"
                    size="small"
                    onClick={this.getQuiz}>GO TEST
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
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({
          [event.target.name]: event.target.value,
        });
    };

    handleSubmit() {

        sessionStorage.setItem('getSubmit', this.state.try);
        this.nextPath('/webClient/post')
    }

    nextPath(path) {
        window.location = path
    }

    render(){
        return(
            <div style={{padding:10, marginTop: 30, paddingRight: 150, paddingLeft: 150}}>
                <h3>Q1. What response did you get?</h3>
                <Form>
                    <div style={{width: 400, margin: 'auto', textAlign: 'left'}}>
                        <Form.Label for="try">Answer: </Form.Label>
                        <Form.Control
                            type="try"
                            name="try"
                            id="exampleEmail"
                            placeholder="your answer"
                            onChange={this.handleChange.bind(this)}></Form.Control></div>
                    <Button
                        style={{marginTop:20}}
                        variant="outline-success"
                        color="success"
                        size="small"
                        onClick={this.handleSubmit}>Submit</Button>
                </Form>
            </div>
        )
    }

}
