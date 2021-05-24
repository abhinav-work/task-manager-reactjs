import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import CONSTANTS from '../constants';
import Loader from './loader';
import Popup from './popup';

export default class Delete extends Component {
    constructor(props) {
        super(props);
        this.state = {
            status: 0,
            initalCall: this.deleteAPI()
        }
    }
    deleteAPI = async() => {
        const primaryCallObject = {
            method: 'DELETE',
            url: `${CONSTANTS.END_POINT}deleteTask`,
            data: {
                _id: this.props.match.params.id,
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