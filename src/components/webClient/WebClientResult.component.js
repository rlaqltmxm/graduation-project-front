import React, { Component } from "react";
import { Form, Button } from 'react-bootstrap';
import axios from "axios";

export default class Result extends Component {

    constructor(props){
        super(props);
        this.state = {
            score1: sessionStorage.getItem("getSubmit") === sessionStorage.getItem('getAnswer') ? "\"Correct\"" : "\"Wrong\"",
            score2: sessionStorage.getItem("postSubmit") == sessionStorage.getItem('postAnswer') ? "\"Correct\"" : "\"Wrong\"",
            score3: true,
            score4: true,
            score5: true
        }
    }

    nextPath(path) {
        window.location = path
    }

    messages(target) {
        return target == 0
    }

    sendResult() {
        var temp = JSON.parse(sessionStorage.getItem("userInfo"));

        // need score1, score2

        axios.post(localStorage.getItem('serverURL')+'/http_submit', temp)
        .then(
            res => { console.log(res)}
        ).catch( response => { console.log(response) } );
    }

    colorize(target) {
        if(target ==="\"Correct\"") return "blue"
        else if(target === "\"Wrong\"") return "red"
        else return "black"
    }

    colorizeBool(target) {
        if(target) return "blue"
        else return "red"
    }

    render(){

        return(
            <div style={{marginTop: 100}}>
                <h2>Scores</h2>
                <div style={{ paddingTop: 50,
                                textAlign: "left",
                                width: 400,
                                margin: 'auto',}}>
                    <h4 style={{ color: this.colorize(this.state.score1)}}>
                        Q1 -GET Answer:     {this.state.score1} <br/>
                    </h4>
                    <h4 style={{ color: this.colorize(this.state.score2) }}>
                        Q2 -POST Answer:     {this.state.score2} <br/>
                    </h4>
                    <h4 style={{ color: this.colorizeBool(this.state.score3) }}>
                        Q3 -HTTP Check:     {this.state.score3.toString()} <br/>
                    </h4>
                    <h4 style={{ color: this.colorizeBool(this.state.score4) }}>
                        Q4 -HTTP Version:     {this.state.score4.toString()} <br/>
                    </h4>
                    <h4 style={{ color: this.colorizeBool(this.state.score5) }}>
                        Q5 -Header User Agent:     {this.state.score5.toString()} <br/>
                    </h4>
                </div>
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
                                    this.nextPath('/webClient/get')
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
                    </Form>
                </div>
            </div>
        )
    }
}
