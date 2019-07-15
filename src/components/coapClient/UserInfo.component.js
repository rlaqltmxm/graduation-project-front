import React, { Component } from "react";
import { Form, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

class UserInfo extends Component {
    
    constructor(props){
        super(props);
        this.state = {
            sname: '',
            sno: '',
            sip: '',
            sport: ''
        }
        this.handleChange = this.handleChange.bind(this)
        // this.sendInfo = this.sendInfo.bind(this)

    }

    nextPath = (path) => {
        this.props.history.push(path)
    }

    handleChange = (event) => {
        this.setState({
          [event.target.name]: event.target.value,
        });
    };

    sendInfo = () => {

        console.log(this.state)

        localStorage.setItem("sname", this.state.sname)
        localStorage.setItem('sno', this.state.sno)
        localStorage.setItem('sip', this.state.sip)
        localStorage.setItem('sport', this.state.sport)

        var url = localStorage.getItem('serverURL') + '/conn'        // var headers = { 'Access-Control-Allow-Origin': '*' }
        axios.get(url)
        .then( 
            response => { 
                console.log(response.data)
                localStorage.setItem("connURL", response.data.url)

                // this.setState({ answer: response.data.max })
                // console.log(this.state.answer)
                this.nextPath('/coapClient/connect')
            } 
            
        )
        .catch( response => { console.log(response) } );
        
    }

    render(){
        return(

            <div style={{marginTop: 200}}>
                <h2>Type your profile and CoAP Client Information</h2>
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
                <div>
                    <Button
                        variant="outline-success"
                        color="success"
                        size="small"
                        onClick={
                            this.sendInfo
                        }
                        >Submit</Button>
                    </div>
            </div>

        )
    }
}

export default UserInfo;