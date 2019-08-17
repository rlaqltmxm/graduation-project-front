import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';

export default class WebServer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            sname: '',
            sno: '',
            sip: '',
            sport: '',
        }
        this.handleChange = this.handleChange.bind(this)
    }

    nextPath(path) {
        this.props.history.push(path)
    }

    handleChange(event) {
        this.setState({
          [event.target.name]: event.target.value,
        });
    };

    handleSubmit() {
        const url = localStorage.getItem('serverURL')+'/webserver_result';
        axios.post(url, this.state)
        .then((response) => {

            sessionStorage('webServerResult', response);
            console.log(response);
            this.nextPath('/webServer/result')
        }).catch(err => console.log(err));
    }

    render(){

        return(

            <div style={{marginTop: 150}}>
                <h2>Step1. Type your profile and WEB Server Information</h2>
                <div style={{padding: 10, display: 'flex', justifyContent: 'center'}}>
                        <Form>
                            <Form.Row>
                                <Form.Group>
                                    <div style={{padding:10, marginLeft: 5, textAlign: 'left'}}>
                                        <Form.Label for="name">Name: </Form.Label>
                                    <Form.Control
                                        type="name"
                                        name="sname"
                                        id="exampleEmail"
                                        placeholder="type name"
                                        onChange={this.handleChange}></Form.Control></div>
                                </Form.Group>
                                <Form.Group>
                                    <div style={{padding:10, marginLeft: 5, textAlign: 'left'}}>
                                        <Form.Label for="name">Student ID: </Form.Label>
                                    <Form.Control
                                        type="name"
                                        name="sno"
                                        id="exampleEmail"
                                        placeholder="type student id"
                                        onChange={this.handleChange}></Form.Control></div>
                                </Form.Group>
                                <Form.Group>
                                    <div style={{padding:10, marginLeft: 5, textAlign: 'left'}}>
                                        <Form.Label for="name">Your IP: </Form.Label>
                                    <Form.Control
                                        type="name"
                                        name="sip"
                                        id="exampleEmail"
                                        placeholder="type ip"
                                        onChange={this.handleChange}></Form.Control></div>
                                </Form.Group>
                                <Form.Group>
                                    <div style={{padding:10, marginLeft: 5, textAlign: 'left'}}>
                                    <Form.Label for="name">Your Port: </Form.Label>
                                    <Form.Control
                                        type="name"
                                        name="sport"
                                        id="exampleEmail"
                                        placeholder="type port"
                                        onChange={this.handleChange}></Form.Control></div>
                                </Form.Group>
                            </Form.Row>
                        </Form>

                </div>
                <div style={{display: "flex", justifyContent: "center", marginTop: 20}}>
                    <Button
                        style={{width: 150}}
                        variant="outline-success"
                        color="success"
                        size="small"
                        onClick={
                            this.handleSubmit.bind(this)
                        }
                        >Go Test</Button>
                </div>
            </div>

        )
    }

}
