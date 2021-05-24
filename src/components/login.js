import React, {Component} from 'react'
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';
import CONSTANTS from '../constants';
import Popup from './popup';
import { Redirect } from 'react-router-dom';

export default class Login extends Component {
    constructor(props){
        super(props);
        this.state = {
            status: 0,
            data: {
                email: "",
                password: ""
            },
            accessToken: "",
            username: ""
        }
    }
    postAPI = async(event) => {
        event.preventDefault();
        const primaryPostObject = {
            method: 'POST',
            url: `${CONSTANTS.END_POINT}user/login`,
            data: this.state.data
        };
        const primaryResponse = await axios(primaryPostObject)
        this.setState(prevState => ({
            status: ((primaryResponse.data || { }).code || 0),
            accessToken: (((primaryResponse.data || { }).data || { }).accessToken || ""),
            username: (((primaryResponse.data || { }).data || { }).user || "")
        }))
    }

    changeState = (change, event) => {
        const currentDataState = this.state;
        if(change && event) {
            currentDataState.data[change] = event.target.value;
            this.setState(prevState => ({
                data: currentDataState.data
            }))
        }
    }

    render() {
        if(this.state.status == 200) {
            this.props.addAuthentication(this.state.accessToken, this.state.username)
            return(
                <Redirect to="/task" />
            )
        }
        else if(this.state.status === 403 || this.state.status === 401) {
            return(
                <Popup title="Email/Password Mismatch" message="Email and passwords provided do not match." buttonText="Try Again" redirect={true}/>
            )
        }
        else {
            return(
                <header className="App-header">
                    <Form onSubmit={this.postAPI}>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" placeholder="Enter email" onChange={this.changeState.bind(this, 'email')}/>
                            <Form.Text className="text-muted">
                            We'll never share your email with anyone else.
                            </Form.Text>
                        </Form.Group>

                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" onChange={this.changeState.bind(this, 'password')}/>
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Submit
                        </Button>
                    </Form>
                </header>
            )
        }
    }
}