import React, { Component } from 'react';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';

export default class ClientTest2 extends Component {

    constructor(props){
        super(props);
        this.state = {
            testingURL: 'null',
            active: false
        }
        this.getQuiz = this.getQuiz.bind(this);
    }

    getQuiz() {
        this.setState({ active: !this.state.active })
    }

    componentDidMount() {
        axios.post(localStorage.getItem('serverURL') + '/scenario_post', JSON.parse(sessionStorage.getItem('accessInfo')))
        .then((res) => {
            this.setState({ testingURL: res.url });
        }).catch((err) => {
            console.log(err);
        })
    }

    render(){
        return(
            <div style={{marginTop: 100}}>
                <h2>Step3. Send POST request to '{this.state.testingURL}'</h2>
                <h4 style={{padding: 10, textAlign: "left", marginLeft: 500}}>
                    You should follow the protocols below: <br/><br/>
                    <h5 style={{fontStyle: "italic"}}>
                    *HTTP Version should be "1.1" <br/>
                    *User-Agent header should be "ComputerNetwork" <br/>
                    *The Message should include your student ID like below <br/>
                    {JSON.stringify({ "studentID" : 20150044466 })}
                    </h5>
                </h4>
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
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({
          [event.target.name]: event.target.value,
        });
    };

    handleSubmit() {

        sessionStorage.setItem('postSubmit', this.state.try);

        axios.post(localStorage.getItem('serverURL')+'/http_result', JSON.parse(sessionStorage.getItem('accessInfo')))
        .then((response) => {
            console.log(response);
            sessionStorage.setItem('httpCheck', response.data.httpCheck);
            sessionStorage.setItem('httpVersion', response.data.httpVersion);
            sessionStorage.setItem('headerUserAgent', response.data.headerUserAgent);
            sessionStorage.setItem('getAnswer', response.data.getAnswer);
            sessionStorage.setItem('postAnswer', response.data.postAnswer);
        })
        .catch((response) => {
            console.log(response);
        })
        .finally (() => {
            window.location = '/web/webClient/get/post/result';   
        })
    }
    render(){
        return(
            <div style={{padding:10, marginTop: 30, marginRight: 300, marginLeft: 300}}>
                <h3>Q2. What message did you GET?</h3>
                <Form style={{width: 300, alignContent: 'center', margin: 'auto'}}>
                    <div style={{padding:10, margin: 'auto', textAlign: 'left'}}>
                        <Form.Label for="try">Answer: </Form.Label>
                        <Form.Control
                            type="try"
                            name="try"
                            id="exampleEmail"
                            placeholder="your answer"
                            onChange={this.handleChange}></Form.Control></div><br/>
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
