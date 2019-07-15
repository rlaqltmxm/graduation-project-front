import React, { Component } from "react";
import { Form, Button, Card } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

export default class UnitPhase extends Component {

    constructor(props){
        super(props);
        this.state = {
            url: localStorage.getItem('unitURL'),
            active: false
        }
    }

    nextPath = (path) => {
        this.props.history.push(path)
    }

    handleChange = (event) => {
        this.setState({
          [event.target.name]: event.target.value,
        });
    };

    // getQuiz = () => {
    //     this.setState({ active: !this.state.active })
    // }

    onSubmit = () => {
        axios.get(localStorage.getItem('serverURL')+'/unit_score')
        .then( 
            response => { 
                console.log(response.data)
                localStorage.setItem("methodScore", response.data.MethodScore) //60
                localStorage.setItem("postScore", response.data.PostScore) //20
                localStorage.setItem("putScore", response.data.PutScore) //20
                this.nextPath('/unitTest/unitResult')
                //console.log(localStorage.getItem('obsURL'))
            }   
        )
        .catch( response => { console.log(response) } );
    }

    render(){
        return(
            
            <div style={{marginTop: 200}}>
                <h2>Send Your Coap GET to '{this.state.url}'</h2>
                <h4 style={{padding: 10}}>
                    **You Should Implement Coap Client <br/>
                    Followed the Manual below.
                </h4>
                <Button
                    variant="outline-success"
                    color="success"
                    size="small"
                    onClick={
                        () => this.onSubmit()
                    }>FINISH
                </Button>
            </div>

        )
    }

}

// class Quiz1 extends Component {

//     constructor(props){
//         super(props);
//         this.state = {
//             try: "",
//         }
//     }

//     handleChange = (event) => {
//         this.setState({
//           [event.target.name]: event.target.value,
//         });
//     };

//     handleSubmit = () => {

//         localStorage.setItem("submit1", this.state.try)
//         console.log(this.state.try)

//         axios.get(localStorage.getItem('serverURL')+'/unit_score')
//         .then( 
//             response => { 
//                 // console.log(response.data)
//                 localStorage.setItem("obsURL", response.data.url)
//                 this.nextPath('/unitTest/unitResult')
//                 //console.log(localStorage.getItem('obsURL'))
//             } 
            
//         )
//         .catch( response => { console.log(response) } );

//         // this.nextPath('/observer')
//     }

//     nextPath = (path) => {
//         window.location = path
//     }

//     render(){
//         return(
//             <div style={{padding:10, marginTop: 30, paddingRight: 150, paddingLeft: 150}}>
//                 <h3>Q1. What response did you get?</h3>
//                 <Form>
//                     <Form.Group>
//                     <div style={{paddingRight: 100, paddingLeft: 100, textAlign: 'left'}}>
//                         <Form.Label for="try">Answer: </Form.Label>
//                         <Form.Control 
//                             type="try" 
//                             name="try" 
//                             id="exampleEmail" 
//                             placeholder="your answer"
//                             onChange={this.handleChange}></Form.Control></div>
//                     </Form.Group>
//                     <Button
//                         variant="outline-success"
//                         color="success"
//                         size="small"
//                         onClick={this.handleSubmit}>Submit</Button>
//                 </Form>
//             </div>
//         )
//     }

// }