import React, { Component } from "react";
import { Form, Button, Card } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

export default class UnitPhase extends Component {

    constructor(props){
        super(props);
        this.state = {
            url: null,
            active: false
        }
    }

    componentDidMount() {
        axios.get(localStorage.getItem('serverURL') + '/unit_test')
        .then(res => {
            this.setState({
                url: res.data.url,
            })
        })
    }

    nextPath = (path) => {
        this.props.history.push(path)
    }

    handleChange = (event) => {
        this.setState({
          [event.target.name]: event.target.value,
        });
    };


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
                        () => this.nextPath('/coap/unitTest/unitPhase/unitResult')
                    }>FINISH
                </Button>
            </div>

        )
    }

}
