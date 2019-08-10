import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';

export default class WebClient extends Component {

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

    goSenario = () => {

        sessionStorage.setItem('accessInfo', this.state)

        axios.get(sessionStorage.getItem('serverURL')+'/http_scenario')
        .then( 
            (response) => { 

                console.log(response.data)
                sessionStorage.setItem('webClientURL', response.data.url)
                this.nextPath('/webClient/test_1')
            } 
            
        )
        .catch( response => { console.log(response) } );

    }

    goUnit = () => {

        sessionStorage.setItem('accessInfo', this.state)

        axios.get(localStorage.getItem('serverURL')+'/http_get')
        .then( 
            (response) => { 

                sessionStorage.setItem('getURL', response.data.url)
                axios.get(localStorage.getItem('serverURL')+'/http_post')
                .then(
                    (res) => {
                        sessionStorage.setItem('postURL', res.data.url);
                        this.nextPath('/webClient/unit');
                    }
                ).catch(err => console.log(err));
            }    
        )
        .catch(err => console.log(err));
        
    }


    render(){

        return(

            <div style={{marginTop: 200}}>
                <h2>Step1. Type your profile and WEB Client Information</h2>
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
                        style={{marginRight: 50, width: 150}}
                        variant="outline-success"
                        color="success"
                        size="small"
                        onClick={
                            this.goSenario.bind(this)
                        }
                        >Go Scenario Test</Button>
                    <Button
                        style={{width: 150}}
                        variant="outline-info"
                        color="success"
                        size="small"
                        onClick={
                            this.goUnit.bind(this)
                        }
                        >Go Unit Test</Button>
                </div>
            </div>

        )
    }

}
