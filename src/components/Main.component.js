import React, { Component } from "react";
import { Card, CardContent, CardActions, Typography } from '@material-ui/core';
import { Dropdown, Button } from 'react-bootstrap';

const styles = theme => ({
    root: {
      flexGrow: 3,
    },
    paper: {
      height: 140,
      width: 100,
    },
    control: {
      padding: theme.spacing.unit * 2,
    },
  });

export default class Main extends Component{

    constructor(props){
        super(props)
        this.nextPath = this.nextPath.bind(this)
    }

    nextPath = (path) => {
        this.props.history.push(path)
    }

    render() {

        return(
            <div style={{display: 'flex', justifyContent: 'center', marginTop: 200}}>
                <Card style={{width: 250, padding: 10, display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
                    <CardContent>
                    <Typography className={styles.title} color="textSecondary" gutterBottom>
                        NETWORK PROTOCOL
                    </Typography>
                    <Typography variant="h5" component="h2">
                        HTTP
                    </Typography>
                    </CardContent>
                    <Button
                        style={{marginLeft: 'auto', marginRight: 'auto'}} 
                        variant="outline-info" 
                        onClick={() => this.nextPath('/webMain')}>
                        GO TEST</Button>
                </Card>
                <div style={{width: 50}}></div>
                <Card style={{width: 250, padding: 10, display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
                    <CardContent>
                    <Typography className={styles.title} color="textSecondary" gutterBottom>
                        NETWORK PROTOCOL
                    </Typography>
                    <Typography variant="h5" component="h2">
                        CoAP
                    </Typography>
                    </CardContent>
                    <Button variant="outline-info"
                    style={{marginLeft: 'auto', marginRight: 'auto'}}
                    onClick={() => this.nextPath('/coapMain')}>
                    GO TEST
                    </Button>
                </Card>
            </div>
        )
    }

}
