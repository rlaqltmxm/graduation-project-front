import React, {Component} from 'react';
import { Form, Button } from 'react-bootstrap'; 

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
    "connTest" : true, 
    "multiThread" : true, 
    "errorTest200" : true,
    "errorTest201" : false,
    "errorTest404" : false,
    "errorTest400" : true, 
    "contentLengthTest" : false, 
    "contentHtmlTest" : true, 
    "contentImageTest" : true,
}

export default class WebServerResult extends Component {

    constructor(props) {
        super(props);
        this.tableRef = React.createRef();
        this.state = {
            // should change
            data: tempData,
        }
        console.log(this.state.data);
    }

    colorizeBool(target) {
        const fontStyle = { fontWeight: "bolder" }
        if(target) fontStyle.color = "blue";
        else fontStyle.color = "red";
        return fontStyle;
    }

    render() {

        const {data} = this.state;

        return(
            <div style={{marginTop: 100}}>
                <h2>Scores</h2>
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
                    <tr id="errorTest200">
                        <td>Status Code: 200 OK</td>
                        <td style={this.colorizeBool(data.errorTest200)}>
                            {(data.errorTest200).toString().toUpperCase()}
                        </td>
                    </tr>
                    <tr id="errorTest201">
                        <td>Status Code: 201 Created</td>
                        <td style={this.colorizeBool(data.errorTest201)}>
                            {(data.errorTest201).toString().toUpperCase()}
                        </td>
                    </tr>
                    <tr id="errorTest404">
                        <td>Status Code: 404 Not Found</td>
                        <td style={this.colorizeBool(data.errorTest404)}>
                            {(data.errorTest404).toString().toUpperCase()}
                        </td>
                    </tr>
                    <tr id="errorTest400">
                        <td>Status Code: 400 Bad Request</td>
                        <td style={this.colorizeBool(data.errorTest400)}>
                            {(data.errorTest400).toString().toUpperCase()}
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
                </table>
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
                                    this.nextPath('/webClient/test_1')
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