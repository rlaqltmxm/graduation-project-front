import React, { Component } from "react";
import { Form, Button } from 'react-bootstrap';
import axios from "axios";

export default class Result extends Component {

    constructor(props){
        super(props);
        this.state = {
            getAnswer: 'Scoring...',
            postAnswer: 'Scoring...',
            httpCheck: 'Scoring...',
            httpVersion: 'Scoring...',
            headerUserAgent: 'Scoring...',
        }
    }

    componentDidMount() {
         axios.post(localStorage.getItem('serverURL')+'/http_result', JSON.parse(sessionStorage.getItem('accessInfo')))
        .then((response) => {
            let { getAnswer, postAnswer, httpCheck, httpVersion, headerUserAgent } = response.data;
            getAnswer = getAnswer != null && getAnswer.length > 0 ? 
                sessionStorage.getItem('getSubmit') === getAnswer : false;
            postAnswer = postAnswer != null && postAnswer.length > 0 ? 
                sessionStorage.getItem('postSubmit') === postAnswer : false;
            this.setState({ getAnswer, postAnswer, httpCheck, httpVersion, headerUserAgent });
        })
        .catch((response) => {
            console.log(response);
        })
    }

    componentWillUnmount() {
        sessionStorage.clear();
    }

    messages(target) {
        return target == 0
    }

    sendResult() {
        var temp = JSON.parse(sessionStorage.getItem("accessInfo"));
        temp = {
            ...temp,
            getScore: this.state.getAnswer,
            postScore: this.state.postAnswer,
        };
        axios.post(localStorage.getItem('serverURL')+'/http_submit', temp)
        .then(res => { 
            if (res.status == 200) {
                alert(`Your score applied to DB. (student ID: ${temp.sno})`);
            } else {
                alert(`DB access failed for some network connection error.`);
            }
        })
        .catch( response => { console.log(response) } );
    }

    colorize(target) {
        if(target === true) return "blue"
        else if(target === false) return "red"
        else return "black"
    }

    render(){

        return(
            <div style={{marginTop: 100}}>
                <h2>Scores</h2>
                <div style={{ paddingTop: 50,
                                textAlign: "left",
                                width: 400,
                                margin: 'auto',}}>
                    <h4 style={{ color: this.colorize(this.state.getAnswer)}}>
                        Q1 -GET Answer:     {this.state.getAnswer.toString()} <br/>
                    </h4>
                    <h4 style={{ color: this.colorize(this.state.postAnswer) }}>
                        Q2 -POST Answer:     {this.state.postAnswer.toString()} <br/>
                    </h4>
                    <h4 style={{ color: this.colorize(this.state.httpCheck) }}>
                        Q3 -HTTP Check:     {this.state.httpCheck.toString()} <br/>
                    </h4>
                    <h4 style={{ color: this.colorize(this.state.httpVersion) }}>
                        Q4 -HTTP Version:     {this.state.httpVersion.toString()} <br/>
                    </h4>
                    <h4 style={{ color: this.colorize(this.state.headerUserAgent) }}>
                        Q5 -Header User Agent:     {this.state.headerUserAgent.toString()} <br/>
                    </h4>
                </div>
                <div style={{marginTop: 50, display: 'flex', justifyContent:'center'}}>
                    <Form inline>
                        <div style={{padding: 10}}>
                        <Button
                            variant="outline-success"
                            color="success"
                            size="small"
                            onClick={this.sendResult.bind(this)}
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
                                    this.props.history.go(-3);
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
                                    this.props.history.go(-4);
                                }
                            }>MAIN PAGE
                        </Button></div>
                    </Form>
                </div>
            </div>
        )
    }
}
