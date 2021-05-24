import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import CONSTANTS from '../constants';
import Loader from './loader';
import Popup from './popup';

export default class ChangeTaskStatus extends Component {
    constructor(props) {
        super(props);
        this.state = {
            status: 0,
            initalCall: this.putAPI()
        }
    }
    putAPI = async() => {
        const primaryCallObject = {
            method: 'PUT',
            url: `${CONSTANTS.END_POINT}updateTask`,
            data: {
                _id: this.props.match.params.id,
                done: true,
            },
            headers: {
                Authorisation: this.props.authentication
            }
        };
        const primaryResponse = await axios(primaryCallObject);
        this.setState(prevState => ({
                status: ((primaryResponse.data || { }).code || 0)
            })
        )
    }
    render() {

        console.log("HERE" + this.state.status)
       
        if(this.state.status === 0) {
            return (
                <Loader />
            )
        }
        else if(this.state.status === 204) {
            return(
                <Redirect to="/task" />
            )
        }
        else if(this.state.status === 403 || this.state.status === 401) {
            return(
                <Popup title="Authorisation Error" message="Please login to continue" buttonText="Log in"/>
            )
        }
    }
}