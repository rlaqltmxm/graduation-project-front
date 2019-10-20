import React, { Component } from "react";
import { Form, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

export default class ObserverTest extends Component {

    constructor(props){
        super(props);
        this.state = {
            active: false,
            url: sessionStorage.getItem("obsURL")
        }
    }

    nextPath = (path) => {
        window.location = path
    }

    handleChange = (event) => {
        this.setState({
          [event.target.name]: event.target.value,
        });
    };

    getQuiz = () => {
        this.setState({ active: !this.state.active })
    }

    render(){
        return(
            
            <div style={{marginTop: 150}}>
                <h2>Phase2. Send Observer to '{this.state.url}'</h2>
                <h4 style={{textAlign: "right", marginRight: 100, padding: 10}}>
                </h4>
                <Button
                    variant="outline-success"
                    color="success"
                    size="small"
                    onClick={
                        this.getQuiz
                    }>GO TEST
                </Button>
                {this.state.active && <Quiz2></Quiz2>}
            </div>

        )
    }

}

class Quiz2 extends Component {

    constructor(props){
        super(props)
        this.state = {
            try: -1,
            answer: sessionStorage.getItem('answer2')
        }
        console.log("")
    }

    handleChange = (event) => {
        this.setState({
          [event.target.name]: event.target.value,
        });
    };

    handleSubmit = () => {

        sessionStorage.setItem("submit2", this.state.try)
        axios.get(localStorage.getItem('serverURL')+'/result')
        .then( 
            res => { 
                console.log(res.data)

                var answer1 = res.data.message
                var answer2 = res.data.max

                if (answer1 == sessionStorage.getItem("submit1")) sessionStorage.setItem("score1", 50)
                else sessionStorage.setItem("score1", 0)

                if (answer2 == sessionStorage.getItem("submit2")) sessionStorage.setItem("score2", 50)
                else sessionStorage.setItem("score2", 0)
                this.nextPath('/coapClient/result')
            } 
            
        )
        .catch( response => { console.log(response) } );

    }

    nextPath = (path) => {
        window.location = path
    }

    render(){
        
        return(
            <div style={{padding:10, marginTop: 30, marginRight: 200, marginLeft: 200}}>
                <h3>Q2. What is the MAX temperature during 5 notification?</h3>
                <Form>
                    <Form.Group>
                        <div style={{paddingRight: 100, paddingLeft: 100, textAlign: 'left'}}>
                            <Form.Label for="try">Answer: </Form.Label>
                            <Form.Control 
                                type="try" 
                                name="try" 
                                id="exampleEmail" 
                                placeholder="your answer"
                                onChange={this.handleChange}></Form.Control></div>
                    </Form.Group>
                    <Button
                            variant="outline-success"
                            color="success"
                            size="small"
                            onClick={this.handleSubmit}>Submit</Button>
                </Form>
        </div>
        )
        
    }
}