import React, { Component } from "react";
import { Form, Button } from 'react-bootstrap';
import axios from "axios";

export default class Result extends Component {

    constructor(props){
        super(props);
        this.state = {
            score1: null,
            score2: null,
            str1: "\"Connection Success\"",
            str2: "\"Connection Failed\"",
            str3: "\"Observer Success\"",
            str4: "\"Observer Failed\"",
            color1: "red",
            color2: "red"
        }
    }

    componentDidMount() {
        axios.get(localStorage.getItem('serverURL')+'/result')
        .then( 
            res => { 
                var answer1 = res.data.message
                var answer2 = res.data.max
                this.setState({ 
                    score1: answer1 == sessionStorage.getItem("submit1") ? 50 : 0, 
                    score2: answer2 == sessionStorage.getItem("submit2") ? 50 : 0,
                });
            } 
            
        )
        .catch( response => { console.log(response) } );

    }

    nextPath = (path) => {
        window.location = path
    }

    messages = (target) => {
        return target == 0
    }

    sendResult = () => {
        var temp = {
            sname: sessionStorage.getItem('sname'),
            sno: sessionStorage.getItem('sno'),
            sip: sessionStorage.getItem('sip'),
            sport: sessionStorage.getItem('sport'),
            msgScore: sessionStorage.getItem('score1'),
            maxScore: sessionStorage.getItem('score2')
        }

        axios.post(localStorage.getItem('serverURL')+'/score', temp)
        .then(
            res => { console.log(res)}
        ).catch( response => { console.log(response) } );
    }

    render(){

        const divStyle1 = {
            color: this.state.score1 == 0 ? "red" : "blue"
        };

        const divStyle2 = {
            color: this.state.score2 == 0 ? "red" : "blue"
        };

        return(
            <div style={{marginTop: 100}}>
                <h2>Scores</h2>
                <div style={{marginTop: 50}} >
                <h4>
                    Q1:     {this.state.score1}pts <br/>
                    <h4 style={divStyle1}>
                        {this.messages(this.state.score1) ? this.state.str2 : this.state.str1}<br/></h4>
                    <br/>
                    Q2:     {this.state.score2}pts <br/>
                    <h4 style={divStyle2}>
                        {this.messages(this.state.score2) ? this.state.str4 : this.state.str3}</h4>
                </h4></div>
                <div style = {{marginTop: 30}}><h3>
                    Total:  {parseInt(this.state.score1) + parseInt(this.state.score2)}pts
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
                                sessionStorage.clear()
                                this.nextPath('/coap/coapClient')
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
                                sessionStorage.clear()
                                this.nextPath('/')
                            }
                        }>MAIN PAGE
                    </Button></div>
                </Form></div>
            </div>
        )
    }
}