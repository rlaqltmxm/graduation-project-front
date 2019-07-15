import React, { Component } from "react";
import { Form, Button } from 'react-bootstrap';
import axios from "axios";

export default class UnitResult extends Component {

    constructor(props){
        super(props);
        this.state = {
            score1: localStorage.getItem("methodScore"),
            score2: localStorage.getItem('postScore'),
            score3: localStorage.getItem('putScore'),
            str1: "\"Success\"",
            str2: "\"Failed\""
        }
    }

    nextPath = (path) => {
        window.location = path
    }

    messages = (target) => {
        return target == 0
    }

    sendResult = () => {

        var temp = {
            sname: localStorage.getItem('sname'),
            sno: localStorage.getItem('sno'),
            sip: localStorage.getItem('sip'),
            sport: localStorage.getItem('sport'),
        }

        axios.post(localStorage.getItem('serverURL')+'/unit_result', temp)
        .then(
            res => { console.log(this.state)}
        ).catch( response => { console.log(response) } );
    }

    render(){

        const container = {
            width: 400,
            paddingRight: 80,
            paddingTop: 30, 
            marginTop: 50, 
            margin: 'auto', 
            display: 'flex', 
            flexDirection: 'column',
            textAlign: 'right'
        }

        const divStyle1 = {
            color: this.state.score1 == 0 ? "red" : "blue",
            marginBottom: 10
        };

        const divStyle2 = {
            color: this.state.score2 == 0 ? "red" : "blue",
            marginBottom: 10
        };

        const divStyle3 = {
            color: this.state.score3 == 0 ? "red" : "blue",
            marginBottom: 10
        };

        return(
            <div style={{marginTop: 100}}>
                <h2>Scores</h2>
                <h4 
                    style={container}>
                    Method sequence: {this.state.score1}pts <br/>
                    <div style={divStyle1}>
                        {this.messages(this.state.score1) ? this.state.str2 : this.state.str1}<br/></div>
                    POST payload: {this.state.score2}pts <br/>
                    <div style={divStyle2}>
                        {this.messages(this.state.score2) ? this.state.str2 : this.state.str1}</div>
                    PUT payload: {this.state.score3}pts <br/>
                    <div style={divStyle3}>
                        {this.messages(this.state.score3) ? this.state.str2 : this.state.str1}</div>
                </h4>
                <div style = {{marginTop: 30}}><h3>
                    Total: &nbsp;
                    {parseInt(this.state.score1) + parseInt(this.state.score2)+ parseInt(this.state.score3)}pts
                </h3></div>
                <div style={{marginTop: 50, display: 'flex', justifyContent:'center'}}>
                <Form inline>
                    <div style={{padding: 10}}>
                    <Button
                        variant="outline-success"
                        color="success"
                        size="small"
                        onClick={this.sendResult}
                        >SUBMIT
                    </Button></div>
                    <div style={{padding: 10}}>
                    <Button
                        variant="outline-success"
                        color="success"
                        size="small"
                        onClick={
                            () => {
                                localStorage.clear()
                                this.nextPath('/connect')
                            }
                        }>RETRY
                    </Button></div>
                    <div style={{padding: 10}}>
                    <Button
                        variant="outline-success"
                        color="success"
                        size="small"
                        onClick={
                            () => {                                 
                                localStorage.clear()
                                this.nextPath('/')
                            }
                        }>MAIN PAGE
                    </Button></div>
                </Form></div>
            </div>
        )
    }
}