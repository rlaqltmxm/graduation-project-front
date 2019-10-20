import React, {Component} from 'react';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';

const tableStyle = {
    margin: 'auto',
    textAlign: "left", 
    width: 300,
    fontSize: 17,
    fontStyle: 'bold',
    fontFamily: 'verdana',
    borderTop: '1px solid #E0E0E0',
    borderBottom: '1px solid #E0E0E0'
}

const tempData = {
    httpCheck: false,
    requestCheck: false,
    httpVersion: false,
    headerUserAgent: false
}

export default class PostTest extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            url: null,
        }
    }
    
    componentDidMount() {
        axios.post(localStorage.getItem('serverURL')+'/http_unit', JSON.parse(sessionStorage.getItem('accessInfo')))
        .then(res => {
            this.setState({ url: res.data.url });
        }).catch(err => console.log(err));
    }

    handleChange(event) {
        this.setState({
          [event.target.name]: event.target.value,
        });
    };

    handleResult() {
        axios.post(localStorage.getItem('serverURL')+'/post_result', JSON.parse(sessionStorage.getItem('accessInfo')))
        .then((response) => {
            sessionStorage.setItem('webClientResultPost', JSON.stringify(response.data));
            this.setState({
                visible: true
            })
        }).catch(err => console.log(err));
    }

    nextPath(path) {
        window.location = path
    }

    render(){
        return(
            <div className="wrapper" 
                style={{marginTop: 150, display: "flex", verticalAlign: "middle"}}>
                <div style={{flex: 1}}>
                    <div className="post-quiz" 
                        style={{padding:10, paddingRight: 150, paddingLeft: 150}}>
                        <h3>
                            Send Your POST message to url '{this.state.url}'
                        </h3>
                        <h4 className="protocol-spec" 
                            style={{flex: 1, fontStyle: "italic"}}>
                            *HTTP Version should be "1.1" <br/>
                            *User-Agent header should be "ComputerNetwork" <br/>
                            *The Message should include your student ID like below <br/>
                            {JSON.stringify({ "studentID" : 20150044466 })}
                        </h4>
                        <Button
                            style={{margin: 30}}
                            variant="outline-success"
                            color="success"
                            size="medium"
                            onClick={this.handleResult.bind(this)}>
                                Result
                        </Button>
                        {this.state.visible && <Result />}
                    </div>
                </div>
            </div>
        )
    }
}

class Result extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: tempData
        }
    }

    componentDidMount() {
        this.setState({
            data: JSON.parse(sessionStorage.getItem('webClientResultPost')) || tempData,
        })
    }

    
    nextPath(path) {
        window.location = path
    }

    colorize(target) {
        const style = { fontWeight: "bolder" };
        if(target) style.color = "blue";
        else style.color = "red";
        return style;
    }

    render() {
        const {data} = this.state;
        return(
            <div>
                <table style={tableStyle}>
                    <tr>
                        <td>HTTP Check</td>
                        <td style={this.colorize(data.httpCheck)}>{(data.httpCheck).toString()}</td>
                    </tr>
                    <tr>
                        <td>Request Method</td>
                        <td style={this.colorize(data.requestCheck)}>{(data.requestCheck).toString()}</td>
                    </tr>
                    <tr>
                        <td>HTTP Version</td>
                        <td style={this.colorize(data.httpVersion)}>{(data.httpVersion).toString()}</td>
                    </tr>
                    <tr>
                        <td>User Agent</td>
                        <td style={this.colorize(data.headerUserAgent)}>{(data.headerUserAgent).toString()}</td>
                    </tr>
                </table>
                <div style={{padding: 30, display: 'flex', justifyContent: 'center'}}>
                    <Button
                        style={{marginRight: 30}}
                        variant="outline-success"
                        color="success"
                        size="small"
                        onClick={
                            () => {
                                sessionStorage.clear()
                                this.nextPath('/web/webClient')
                            }
                        }>RETRY
                    </Button>
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
            </div>
        )
    }
}