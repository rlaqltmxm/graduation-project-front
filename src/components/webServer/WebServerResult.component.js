import React, { Component } from 'react';
import { Form, Button, Modal } from 'react-bootstrap'; 
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
    "errorTest200" : "Scoring..",
    "errorTest404" : "Scoring..",
    "errorTest400" : "Scoring..", 
    "contentLengthTest" : "Scoring..", 
    "contentHtmlTest" : "Scoring..", 
    "contentImageTest" : "Scoring..",
    "cookieTest" : "Scoring..",
    "elapsedTime": "Unknown",
}

function colorizeBool(target) {
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

export default class WebServerResult extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: tempData,
        }
    }

    componentDidMount() {
        const url = localStorage.getItem('serverURL')+'/web_server';
        const userInfo = JSON.parse(sessionStorage.getItem('accessInfo'));
        axios.post(url, userInfo)
        .then((res) => {
            console.log(res.data);
            this.setState({
                data: res.data == null ? [] : 
                res.data,
            });
        }).catch(err => { 
                console.log(err);
            }
        )

    }

    nextPath(path) {
        window.location = path;
    }

    render() {

        const data = this.state.data;
        return(
            <div style={{ marginTop: 100, display: 'flex' }}>
                <div id="score-board" style={{ flex: 1, marginLeft: 100 }}>
                    <h2>Scores</h2>
                    <table style={tableStyle}>
                        <tr>
                            <td>Web Server Socket</td>
                            <td style={colorizeBool(data.connTest)}>
                                {(data.connTest).toString().toUpperCase()}
                            </td>
                        </tr>
                        <tr id="multiThread">
                            <td>Handling Multi-thread</td>
                            <td style={colorizeBool(data.multiThread)}>
                                {(data.multiThread).toString().toUpperCase()}
                            </td>
                        </tr>
                        <tr id="errorTest200">
                            <td>Status Code: 200 OK</td>
                            <td style={colorizeBool(data.errorTest200)}>
                                {(data.errorTest200).toString().toUpperCase()}
                            </td>
                        </tr>
                        <tr id="errorTest404">
                            <td>Status Code: 404 Not Found</td>
                            <td style={colorizeBool(data.errorTest404)}>
                                {(data.errorTest404).toString().toUpperCase()}
                            </td>
                        </tr>
                        <tr id="errorTest400">
                            <td>Status Code: 400 Bad Request</td>
                            <td style={colorizeBool(data.errorTest400)}>
                                {(data.errorTest400).toString().toUpperCase()}
                            </td>
                        </tr>
                        <tr id="contentLengthTest">
                            <td>Content-Length</td>
                            <td style={colorizeBool(data.contentLengthTest)}>
                                {(data.contentLengthTest).toString().toUpperCase()}
                            </td>
                        </tr>
                        <tr id="contentHtmlTest">
                            <td>Content-Type: text/html</td>
                            <td style={colorizeBool(data.contentHtmlTest)}>
                                {(data.contentHtmlTest).toString().toUpperCase()}
                            </td>
                        </tr>
                        <tr id="contentImageTest">
                            <td>Content-Type: image/jpeg</td>
                            <td style={colorizeBool(data.contentImageTest)}>
                                {(data.contentImageTest).toString().toUpperCase()}
                            </td>
                        </tr>
                        <tr id="cookieTest">
                            <td>(Optional) Set-Cookie: </td>
                            <td style={colorizeBool(data.cookieTest)}>
                                {(data.cookieTest).toString().toUpperCase()}
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
                                </Button>
                            </div>
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
                                </Button>
                            </div>
                        </Form>
                    </div>
                </div>
                <div style={{ flex: 1, height: 300 }}>
                    <HistoryTable />
                </div>
            </div>
        )
    }
}

class HistoryTable extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: [],
            popupOpen: false,
            popupData: null,
        }
    }

    onLoadData() {
        const url = localStorage.getItem('serverURL') + '/web_server/history';
        const userInfo = JSON.parse(sessionStorage.getItem('accessInfo'));
        axios.post(url, userInfo)
        .then((res) => {
            if (res.data != null && res.data != undefined) {
                const jsonArr = [];
                for (let ob of res.data) jsonArr.push(JSON.parse(ob));
                this.setState({
                    data: jsonArr,
                });
            }
        }).catch(err => {
            console.log(err);
        });
    }

    renderPopup() {
        const data = this.state.popupData || null;
        if (data == null || data == undefined) return;

        return(
            <Modal
                centered
                show={this.state.popupOpen} 
                onHide={() => this.setState({
                    popupOpen: false,
                    popupData: null
                })} 
                animation={true}>
                <table style={tableStyle}>
                    <tr>
                        <td>Web Server Socket</td>
                        <td style={colorizeBool(data.connCorrect)}>
                            {(data.connCorrect).toString().toUpperCase()}
                        </td>
                    </tr>
                    <tr id="multiThread">
                        <td>Handling Multi-thread</td>
                        <td style={colorizeBool(data.multiThreadCorrect)}>
                            {(data.multiThreadCorrect).toString().toUpperCase()}
                        </td>
                    </tr>
                    <tr id="errorTest200">
                        <td>Status Code: 200 OK</td>
                        <td style={colorizeBool(data.error400Correct)}>
                            {(data.error400Correct).toString().toUpperCase()}
                        </td>
                    </tr>
                    <tr id="errorTest404">
                        <td>Status Code: 404 Not Found</td>
                        <td style={colorizeBool(data.error404Correct)}>
                            {(data.error404Correct).toString().toUpperCase()}
                        </td>
                    </tr>
                    <tr id="errorTest400">
                        <td>Status Code: 400 Bad Request</td>
                        <td style={colorizeBool(data.error400Correct)}>
                            {(data.error400Correct).toString().toUpperCase()}
                        </td>
                    </tr>
                    <tr id="contentLengthTest">
                        <td>Content-Length</td>
                        <td style={colorizeBool(data.lengthCorrect)}>
                            {(data.lengthCorrect).toString().toUpperCase()}
                        </td>
                    </tr>
                    <tr id="contentHtmlTest">
                        <td>Content-Type: text/html</td>
                        <td style={colorizeBool(data.htmlCorrect)}>
                            {(data.htmlCorrect).toString().toUpperCase()}
                        </td>
                    </tr>
                    <tr id="contentImageTest">
                        <td>Content-Type: image/jpeg</td>
                        <td style={colorizeBool(data.imageCorrect)}>
                            {(data.imageCorrect).toString().toUpperCase()}
                        </td>
                    </tr>
                    <tr id="cookieTest">
                        <td>(Optional) Set-Cookie: </td>
                        <td style={colorizeBool(data.cookieCorrect)}>
                            {(data.cookieCorrect).toString().toUpperCase()}
                        </td>
                    </tr>
                    <tr style={{height: 30}}></tr>
                    <tr id="elapsedTime">
                        <td style={{columnSpan: 2, textAlign: "right", color: "grey", fontStyle: "italic"}}>
                            Total elapsed time: {data.elapsedTime} ms
                        </td>
                    </tr>
                </table>
                <div style={{ display: 'flex', justifyContent: 'center', margin: 20 }}>
                    <Button 
                        variant="outline-secondary" 
                        onClick={() => 
                            this.setState({
                                popupOpen: !this.state.popupOpen
                            })
                        }
                    >
                        <span>Close</span>
                    </Button>
                </div>
            </Modal>
        )
    } 

    render() {

        const overflowTableStyle = { 
            ...tableStyle, 
            textAlign: 'right', 
        };
        const { data } = this.state;

        return (
            <div style={{ marginRight: 100 }}>
                {this.renderPopup()}
                <h2>History</h2>
                {this.state.data.length > 0 ?
                <div style={{ height: 300, overflowY: 'auto' }}>
                    <table id="history-table" style={overflowTableStyle}>
                        <thead>
                            <tr style={{ height: 30, fontStyle: 'bolder' }}>
                                <td>No.</td>
                                <td>Date</td>
                                <td>Score</td>
                                <td>Detail</td>
                            </tr>
                        </thead>
                        <tbody style={{ fontSize: 15 }}>
                            {data.sort((a, b) => (new Date(a.date) - new Date(b.date)))
                            .map((e, i) => {
                                const score = Object.values(e).filter(v => v == true).length;
                                return (
                                    <tr style={{ height: 20, borderBottom: '1px solid black' }}>
                                        <td>{i}</td>
                                        <td>{e.date}</td>
                                        <td>{score} /9</td>
                                        <td>
                                            <u 
                                                style={{ color: '#28a745' }}
                                                onClick={() => {
                                                    this.setState({
                                                        popupOpen: true,
                                                        popupData: e
                                                    });    
                                                }}>
                                                See detail
                                            </u>
                                        </td>
                                    </tr>  
                                )}
                            )}
                        </tbody> 
                    </table>
                </div> : 
                <h4 style={{ fontStyle: 'italic', marginTop: 50 }}>No history found.</h4>}
                <div style={{marginTop: 20, display: 'flex', justifyContent:'center'}}>
                    <Form inline>
                        <div style={{padding: 10}}>
                            <Button
                                variant="outline-success"
                                color="success"
                                size="small"
                                onClick={
                                    this.onLoadData.bind(this)
                                }>Load
                            </Button>
                        </div>
                    </Form>
                </div>
            </div>
        )
    }
}