import '../../App.css';
import React, { Component } from 'react';
import axios from 'axios';
import { Table } from 'react-bootstrap';
import Loader from '../loader';
import Row from './row';
import moment from 'moment';
import Popup from '../popup';

import CONSTANTS from '../../constants';

export default class table extends Component {
    constructor(props){
        super(props)
        this.state = {
            status: 0,
            data:  this.callAPI(),
        }
    }

    callAPI = async() => {
        const primaryCallObject = {
            method: 'GET',
            url: `${CONSTANTS.END_POINT}getTasks`,
            headers: {
                Authorisation: this.props.authentication
            }
        };
        const primaryResponse = await axios(primaryCallObject);
        this.setState(prevState => ({
            status: ((primaryResponse.data || { }).code || 0),
            data: ((primaryResponse.data || { }).data || []).map((task, taskIndex) => {
                if(Object.values(task || { }).length) {
                    return <Row key={task._id} id={task._id} row={[taskIndex+1, task.title, `${moment(task.expiryDate).format('DD-MM-YYYY')} @ ${moment(task.expiryDate).format('HH:mm')}`, task.assignedTo ]} tableBody={true} done={task.done} />
                }
            })
        }))
    }

    
    render() {
        if(this.state.status === 0) {
            return(
                <Loader />
            )
        }
        else if(this.state.status === 403 || this.state.status === 401) {
            return(
                <Popup title="You are currently signed out" message="Please login to view your tasks" buttonText="Login"/>
            )
        }
        else if(this.state.status === 200) {
            return( 
                <header className="App-header" style={{paddingBottom: "10%"}}>  
                    <div className="table-list">
                        <Table striped bordered hover variant="dark" size="sm">
                            <thead>
                                <Row row={[ "#", "Title", "Expiry Date & Time", "AssignedTo", "Modify"]}/>
                            </thead>
                            <tbody>
                                {this.state.data}
                            </tbody>
                        </Table>
                    </div>
                </header>   
            )
        }
        else {
            return (
                <header className="App-header" style={{paddingBottom: "15%"}}>  
                    <h2>No tasks are pending</h2>
                </header>
            )
        }
    }
}