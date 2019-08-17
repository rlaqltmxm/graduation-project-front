import React, {Component} from 'react';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';

export default class ClientUnit extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            getTry: '',
            postTry: '',
            getVisible: false,
            postVisible: false
        }
    }
    
    handleChange(event) {
        this.setState({
          [event.target.name]: event.target.value,
        });
    };

    handleGet() {
        sessionStorage.setItem('getSubmit', this.state.getTry);
        axios.get(localStorage.getItem('serverURL')+'/get_result')
        .then((response) => {
            sessionStorage.setItem('getAnswer', response.data.getAnswer);
            this.setState({
                getVisible: true
            })
        }).catch(err => console.log(err));
    }

    handlePost() {
        sessionStorage.setItem('postSubmit', this.state.postTry);
        axios.get(localStorage.getItem('serverURL')+'/post_result')
        .then((response) => {
            sessionStorage.setItem('postAnswer', response.data.postAnswer);
            this.setState({
                postVisible: true
            });
        }).catch(err => console.log(err));
    }

    nextPath(path) {
        window.location = path
    }

    render(){
        return(
            <div className="wrapper" 
                style={{marginTop: 50, display: "flex", flexDirection: "row", verticalAlign: "middle"}}>
                <h4 className="protocol-spec" 
                    style={{flex: 1, marginTop: 150, fontStyle: "italic"}}>
                    *HTTP Version should be "1.1" <br/>
                    *User-Agent header should be "ComputerNetwork"
                </h4>
                <div style={{flex: 1}}>
                    <div className="get-quiz" 
                        style={{padding:10, paddingRight: 150, paddingLeft: 150}}>
                        <h3>
                            Send Your GET message to url '{sessionStorage.getItem('getURL')}'<br/>
                        </h3>
                        <h5>What response did you get?</h5>
                        {this.state.getVisible ||
                        <Form>
                            <div style={{paddingTop: 30, width: 400, margin: 'auto', textAlign: 'left', display: "flex"}}>
                                <Form.Control
                                    type="try"
                                    name="getTry"
                                    id="exampleEmail"
                                    placeholder="your answer"
                                    onChange={this.handleChange.bind(this)}></Form.Control>
                                <Button
                                    style={{marginLeft: 30}}
                                    variant="outline-success"
                                    color="success"
                                    size="small"
                                    onClick={this.handleGet.bind(this)}>Submit</Button>
                            </div>
                        </Form>}
                        {this.state.getVisible && <Result type="get"/>}
                    </div>
                    <div className="post-quiz" 
                        style={{padding:10, marginTop: 30, paddingRight: 150, paddingLeft: 150}}>
                        <h3>
                            Send Your POST message to url '{sessionStorage.getItem('postURL')}'<br/>
                        </h3>
                        <h5>What response did you get?</h5>
                        <h5>
                            **Your payload should contain your Student ID like below.<br/>
                            {JSON.stringify({ "studentID": "2015004466" })}
                        </h5>
                        {this.state.postVisible ||
                        <Form>
                            <div style={{paddingTop: 30, width: 400, margin: 'auto', textAlign: 'left', display: "flex"}}>
                                <Form.Control
                                    type="try"
                                    name="postTry"
                                    id="exampleEmail"
                                    placeholder="your answer"
                                    onChange={this.handleChange.bind(this)}></Form.Control>
                            <Button
                                style={{marginLeft: 30}}
                                variant="outline-success"
                                color="success"
                                size="small"
                                onClick={this.handlePost.bind(this)}>Submit</Button>
                            </div>    
                        </Form>}
                        {this.state.postVisible && <Result type="post"/>}
                    </div>
                </div>
            </div>
        )
    }
}

class Result extends Component {
    constructor(props) {
        super(props);
    }

    getScore() {

        let score;
        if(this.props.type === 'get') 
            score = sessionStorage.getItem('getSubmit') === sessionStorage.getItem('getAnswer');
        else 
            score = sessionStorage.getItem('postSubmit') === sessionStorage.getItem('postAnswer');
        return score;
    }

    render() {
        const score = this.getScore();
        const color = score ? 'blue' : 'red';
        return(
            <div>
                <h4 style={{color: color}}>
                    {score ? "Correct" : "Wrong"}
                </h4>
            </div>
        )
    }
}