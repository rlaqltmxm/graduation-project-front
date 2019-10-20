import React, { Component } from 'react';
import { Form, Button } from 'react-bootstrap'; 
import axios from 'axios';

const tableStyle = {
    margin: 'auto',
    marginTop: 50,
    textAlign: "left",
    width: 380,
    fontSize: 17,
    fontStyle: 'bold',
    fontFamily: 'verdana'
}

const tempData = {
    "connTest" : "Scoring..", 
    "multiThread" : "Scoring..", 
    "contentLengthTest" : "Scoring..", 
    "contentHtmlTest" : "Scoring..", 
    "contentImageTest" : "Scoring..",
    "elapsedTime" : "Unknown",
}

export default class HeaderLineTest extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: tempData,
        }
    }

    componentDidMount() {
        const url = localStorage.getItem('serverURL')+'/server-header';
        const userInfo = JSON.parse(sessionStorage.getItem('accessInfo'));
        axios.post(url, userInfo)
        .then((res) => {
            console.log(res.data)
            this.setState({
                data: res.data == null ? tempData : 
                res.data,
            })        
        }).catch(err => 
            console.log(err)
        )
    }

    colorizeBool(target) {
        const fontStyle = {};
        if (target == "Scoring..") {
            fontStyle.fontSize = 15;
            fontStyle.color = "black";
            fontStyle.fontStyle = "italic";
        }
        else {
            if (target) fontStyle.color = "blue";
            else fontStyle.color = "red";
            fontStyle.fontWeight = "bolder";
        }
        return fontStyle;
    }

    nextPath(path) {
        window.location = path;
    }

    render() {

        const data = this.state.data;
        return(
            <div style={{marginTop: 100}}>
                <h2>Web Server Unit Test Result</h2>
                <h4>    -HTTP Header Lines</h4>
                <table style={tableStyle}>
                    <tr>
                        <td>Web Server Socket</td>
                        <td style={this.colorizeBool(data.connTest)}>
                            {(data.connTest).toString().toUpperCase()}
                        </td>
                    </tr>
                    <tr id="multiThread">
                        <td>Handling Multi-thread</td>
                        <td style={this.colorizeBool(data.multiThread)}>
                            {(data.multiThread).toString().toUpperCase()}
                        </td>
                    </tr>
                    <tr id="contentLengthTest">
                        <td>Content-Length</td>
                        <td style={this.colorizeBool(data.contentLengthTest)}>
                            {(data.contentLengthTest).toString().toUpperCase()}
                        </td>
                    </tr>
                    <tr id="contentHtmlTest">
                        <td>Content-Type: text/html</td>
                        <td style={this.colorizeBool(data.contentHtmlTest)}>
                            {(data.contentHtmlTest).toString().toUpperCase()}
                        </td>
                    </tr>
                    <tr id="contentImageTest">
                        <td>Content-Type: image/jpeg</td>
                        <td style={this.colorizeBool(data.contentImageTest)}>
                            {(data.contentImageTest).toString().toUpperCase()}
                        </td>
                    </tr>
                    <tr style={{height: 30}}></tr>
                    <tr id="elapsedTime">
                        <td style={{columnSpan: 2, textAlign: "right", color: "grey", fontStyle: "italic"}}>
                            Total elapsed time: {data.elapsedTime} ms
                        </td>
                    </tr>
                </table>
                <div style={{marginTop: 20, display: 'flex', justifyContent:'center'}}>
                    <Form inline>
                        <div style={{padding: 10}}>
                        <Button
                            variant="outline-success"
                            color="success"
                            size="small"
                            onClick={
                                () => {
                                    sessionStorage.clear()
                                    this.nextPath('/web/webServer')
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
                    </Form>
                </div>
            </div>
        )
    }
}