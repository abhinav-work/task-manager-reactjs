import React, {Component} from 'react'
import { Form, Button, InputGroup, FormControl } from 'react-bootstrap';
import axios from 'axios';
import CONSTANTS from '../constants';
import Popup from './popup';
import { Redirect } from 'react-router-dom';

export default class Register extends Component {
    constructor(props){
        super(props);
        this.state = {
            status: 0,
            errorMessage: "",
            data: {
                name: "",
                email: "",
                password: "",
                confirmPassword: ""
            },
        }
    }

    revertStatus = () => {
        this.setState(prevState => ({
            status: 0
        }))
    }

    postAPI = async(event) => {
        event.preventDefault();
        const { name, email, password, confirmPassword } =  this.state.data;
        if(String(password) !== String(confirmPassword)) {
            this.setState(prevState => ({
                status: 400,
            }))
        }
        else {
            const primaryPostObject = {
                method: 'POST',
                url: `${CONSTANTS.END_POINT}user/register`,
                data: {
                    name,
                    email,
                    password,
                }
            };
            const primaryResponse = await axios(primaryPostObject)
           
            this.setState(prevState => ({
                status: ((primaryResponse.data || { }).code || 0),
                errorMessage: ((primaryResponse.data || { }).message || ""),
            }))
        } 
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

        if(this.state.status == 400 || this.state.status == 409 || this.state.status == 422) {
            return(
                <Popup title="SignUp Error" message={this.state.errorMessage || "Confirm password should match with password"} buttonText="Try Again" customRedirect="/signup" redirect={true} revertStatus={this.revertStatus}/>
            )
        }
        else if(this.state.status == 200) {
            return(
                <Redirect to="/login" />
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
                        <InputGroup className="mb-2 mr-sm-2">
                            <InputGroup.Prepend>
                            <InputGroup.Text>@</InputGroup.Text>
                            </InputGroup.Prepend>
                            <FormControl id="inlineFormInputGroupUsername2" placeholder="Username" onChange={this.changeState.bind(this, 'name')} />
                        </InputGroup>

                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" onChange={this.changeState.bind(this, 'password')}/>
                        </Form.Group>
                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Confirm Password" onChange={this.changeState.bind(this, 'confirmPassword')}/>
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