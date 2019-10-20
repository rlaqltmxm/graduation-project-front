import React, { Component } from "react";
import { Form, Button, Card } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

export default class UnitPhase extends Component {

    constructor(props){
        super(props);
        this.state = {
            url: sessionStorage.getItem('unitURL'),
            active: false
        }
    }

    nextPath = (path) => {
        this.props.history.push(path)
    }

    handleChange = (event) => {
        this.setState({
          [event.target.name]: event.target.value,
        });
    };

    onSubmit = () => {
        axios.get(localStorage.getItem('serverURL')+'/unit_score')
        .then( 
            response => { 
                sessionStorage.setItem("methodScore", response.data.MethodScore) //60
                sessionStorage.setItem("postScore", response.data.PostScore) //20
                sessionStorage.setItem("putScore", response.data.PutScore) //20
                this.nextPath('/coap/unitTest/unitResult')
            }   
        )
        .catch( response => { console.log(response) } );
    }

    render(){
        return(
            
            <div style={{marginTop: 200}}>
                <h2>Send Your Coap GET to '{this.state.url}'</h2>
                <h4 style={{padding: 10}}>
                    **You Should Implement Coap Client <br/>
                    Followed the Manual below.
                </h4>
                <Button
                    variant="outline-success"
                    color="success"
                    size="small"
                    onClick={
                        () => this.onSubmit()
                    }>FINISH
                </Button>
            </div>

        )
    }

}
