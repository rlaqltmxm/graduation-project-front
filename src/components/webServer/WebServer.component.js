import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form, Button, Dropdown, DropdownButton } from 'react-bootstrap';

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

    handleSubmit() {
        sessionStorage.setItem('accessInfo', JSON.stringify(this.state));
    }

    nextPath(path) {
        this.props.history.push(path)
    }

    handleChange(event) {
        this.setState({
          [event.target.name]: event.target.value,
        });
    };

    render(){

        const values = this.state;
        const isValidInput = values.sname == '' || values.sno == '' 
                        || values.sip == '' || values.sport == '';

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
                                        isValid={values.sname != ''}
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
                                        isValid={values.sno != ''}
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
                                        isValid={values.sip != ''}
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
                                        isValid={values.sport != ''}
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
                        disabled={isValidInput}
                        style={{marginRight: 50, width: 120}}
                        variant="outline-success"
                        color="success"
                        size="small"
                        href="/webServer/result"
                        onClick={this.handleSubmit.bind(this)}
                    >
                        Go Test
                    </Button>
                    <div style={{width: 150}}>
                        <DropdownButton disabled={isValidInput} variant="outline-info" title="Go Unit Test">
                            <Dropdown.Item 
                                href="/webServer/statusCodeResult"
                                onClick={this.handleSubmit.bind(this)} 
                            >Status code Test</Dropdown.Item>
                            <Dropdown.Item 
                                href="/webServer/headerLineResult"
                                onClick={this.handleSubmit.bind(this)}
                            >Header lines Test</Dropdown.Item>
                        </DropdownButton>
                    </div>
                </div>
            </div>

        )
    }

}
