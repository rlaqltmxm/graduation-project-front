import React, { Component } from 'react';
import { Form, Button } from 'react-bootstrap';
import { Card, Typography } from '@material-ui/core';

export default class CoapMain extends Component {

    constructor(props){
        super(props);
        this.state = {

        }
    }

    nextPath = (path) => {
        this.props.history.push(path)
    }

    render() {

        const details = {
            fontSize: 20,
            color: '#A9A9A9'
        }

        return(
            <div style={{width: 500, margin: 'auto'}}>
                <Typography 
                    variant="h4" 
                    component="h2" 
                    style={{textAlign: "left", marginTop: 100, marginBottom: 30, fontStyle: 'italic'}}>
                    CoAP <span style={details}>:Constrained Application Protocol</span>
                </Typography>
                <Card style={{display: 'flex', padding: 20, margin: 'auto'}}>
                    <div style={{textAlign: "left", paddingLeft: 15}}>
                        <Typography variant="h5" component="h2" style={{fontStyle: 'italic'}}>Scenario Test</Typography>
                        <Typography style={{width: 350, marginTop: 10}}>
                            Connect your device to server,<br/>
                            and send observer to notify.<br/>
                        </Typography>
                    </div>
                    <Button
                        variant="outline-info"
                        onClick={() => this.nextPath('/coap/coapClient')}
                        style={{margin: 'auto'}}>
                        GO TEST
                    </Button>
                </Card>
                <div style={{height: 30}}></div>
                <Card style={{display: 'flex', padding: 20, margin: 'auto'}}>
                    <div style={{textAlign: "left", paddingLeft: 15}}>
                        <Typography variant="h5" component="h2" style={{fontStyle: 'italic'}}>Unit Test</Typography>
                        <Typography style={{width: 350, marginTop: 10}}>
                            Test your CoAP client sequentially<br/>
                            following the manual given.<br/>
                        </Typography>
                    </div>
                    <Button
                        variant="outline-info"
                        onClick={() => this.nextPath('/coap/unitTest')}
                        style={{margin: 'auto'}}>
                        GO TEST
                    </Button>
                </Card>
            </div>
        )
    }

}