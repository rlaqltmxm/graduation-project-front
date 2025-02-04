import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form, Button, DropdownButton, Dropdown } from 'react-bootstrap';

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

    handleChange(event) {
        this.setState({
          [event.target.name]: event.target.value,
        });
    };

    nextPath(path) {
        sessionStorage.setItem('accessInfo', JSON.stringify(this.state));
        this.props.history.push(path);
    }

    render(){

        const values = this.state;
        const isValidInput = values.sname == '' || values.sno == '' 
                        || values.sip == '' || values.sport == '';
        return(
            <div style={{marginTop: 150}}>
                <h2>Step1. Type your profile and WEB Client Information</h2>
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
                        style={{marginRight: 50, width: 150}}
                        variant="outline-success"
                        color="success"
                        size="small"
                        onClick={
                            this.nextPath.bind(this, '/web/webClient/get')
                        }
                        >Go Scenario Test</Button>
                    <DropdownButton disabled={isValidInput} variant="outline-info" title="Go Unit Test">
                        <Dropdown.Item onClick={this.nextPath.bind(this, '/web/webClient/getUnitTest')}>GET method Test</Dropdown.Item>
                        <Dropdown.Item onClick={this.nextPath.bind(this, '/web/webClient/postUnitTest')}>POST method Test</Dropdown.Item>
                        <Dropdown.Item onClick={this.nextPath.bind(this, '/web/webClient/putUnitTest')}>PUT method Test</Dropdown.Item>
                        <Dropdown.Item onClick={this.nextPath.bind(this, '/web/webClient/deleteUnitTest')}>DELETE method Test</Dropdown.Item>
                    </DropdownButton>   
                </div>
            </div>

        )
    }

}
