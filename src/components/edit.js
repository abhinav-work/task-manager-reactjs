import { Form, ToggleButtonGroup, ToggleButton, Button, Badge } from 'react-bootstrap'
import { Component } from 'react';
import { Redirect } from 'react-router-dom';
import DatePicker from './datePicker';
import axios from 'axios';
import CONSTANTS from '../constants'
import Loader from './loader';
import Popup from './popup';

export default class Edit extends Component{
    constructor(props){
        super(props)
        this.state = {
            status: 0,
            addTask: this.props.addTask || false,
            initalCall: this.callAPI(),
            users: [],
            data: { 
                title: "",
                description: "",
                expiryDate: this.props.addTask ? new Date() : "",
                assignedTo: "",
                assignedBack: false,
            },
        }
    }

    callAPI = async() => {
        let primaryResponse;
        if(!this.props.addTask) {
            const primaryCallObject = {
                method: 'GET',
                url: `${CONSTANTS.END_POINT}getTask?id=${this.props.match.params.id}`,
                headers: {
                    Authorisation: this.props.authentication
                }
            };
            primaryResponse = await axios(primaryCallObject);
        }
       
        const secondaryCallObject = {
            method: 'GET',
            url: `${CONSTANTS.END_POINT}user/getUsers`
        };
        const secondaryResponse = await axios(secondaryCallObject);
        this.setState(prevState => ({
                status: (((primaryResponse || secondaryResponse).data || { }).code || 0),
                data: primaryResponse ? ((primaryResponse.data || { }).data || prevState.data) : prevState.data,
                users: ((secondaryResponse.data || { }).data || [ ]),
            })
        )
    }

    putAPI = async(event) => {
        event.preventDefault();
        const primaryPostObject = {
            method: 'PUT',
            url: `${CONSTANTS.END_POINT}updateTask`,
            data: this.state.data,
            headers: {
                Authorisation: this.props.authentication
            }
        }
        const primaryResponse = await axios(primaryPostObject);
        this.setState(prevState => ({
                status: ((primaryResponse.data || { }).code || 0)
            })
        )
    }

    postAPI = async(event) => {
        event.preventDefault();
        const primaryPostObject = {
            method: 'POST',
            url: `${CONSTANTS.END_POINT}addTask`,
            data: this.state.data,
            headers: {
                Authorisation: this.props.authentication
            }
        }
        const primaryResponse = await axios(primaryPostObject);
        this.setState(prevState => ({
                status: ((primaryResponse.data || { }).code || 0),
                addTask: false,
            })
        )
    }


    changeState = (change, event) => {
        const currentDataState = this.state;
        if(change && event) {
            if(change === 'expiryDate') {
                currentDataState.data.expiryDate = event;
            }
            else {
                currentDataState.data[change] = (change === 'assignedTo') ? currentDataState.users.find(user=> user.name === event.target.value) : event.target.value;
            }
            this.setState(prevState => ({
                data: currentDataState.data
            }))
        }
    }

    render() {
        const customStyle = { backgroundColor: "transparent", color: "white", fontSize: "15px"}
        
        if(this.state.status === 403 || this.state.status === 401 || !this.props.authentication){
            return(
                <Popup title="You are currently signed out" message="Please login to add tasks" buttonText="Login"/>
            )
        }
        else if(this.state.status === 200 || this.state.addTask) {
            const usersDropList = this.state.users.map(user => <option>{user.name}</option>)
            return (
                <header className="App-header" style={{"paddingBottom": "8%", fontSize: "17px"}}>  
                    <Form noValidate style={{width: "30%"}} onSubmit={this.state.addTask ? this.postAPI : this.putAPI} >
                        {this.state.data.assignedBack && <Badge variant="warning">Assigned Back</Badge>}
                        <Form.Row className="form-row">
                            <Form.Group md="4" controlId="validationCustom01" style={{width: "100%"}}>
                                <Form.Label>Title</Form.Label>
                                <Form.Control required type="text" placeholder="Title" defaultValue={this.state.data.title || "Title"} style={customStyle} onChange={this.changeState.bind(this, 'title')}/>
                                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                            </Form.Group>
                        </Form.Row>
                        <Form.Row>
                            <Form.Group controlId="exampleForm.ControlTextarea1" style={{width: "100%"}}>
                                <Form.Label>Description</Form.Label>
                                <Form.Control as="textarea" rows={3} placeholder="Description"  defaultValue={this.state.data.description || "Description"} style={customStyle} onChange={this.changeState.bind(this, 'description')}/>
                            </Form.Group>
                        </Form.Row>
                        {/* <Form.Row>
                            <Form.Group controlId="exampleForm.ControlTextarea1" style={{width: "100%"}}>
                                <Form.Label>Priority</Form.Label> <br/>
                                <ToggleButtonGroup type='radio' name='genre' defaultValue={['low']}>
                                    <ToggleButton className="low-priority-button" value={'low'}>Low</ToggleButton>
                                    <ToggleButton className="mid-priority-button" value={'mid'}>Mid</ToggleButton>
                                    <ToggleButton className="high-priority-button" value={'high'}>High</ToggleButton>
                                </ToggleButtonGroup>
                            </Form.Group>
                        </Form.Row> */}
                        <Form.Row>
                            <Form.Group controlId="exampleForm.SelectCustom" style={{width: "100%"}}>
                                <Form.Label>Assign to</Form.Label>
                                <Form.Control as="select" value={(this.state.data.assignedTo || { }).name || ""} custom style={customStyle} onChange={this.changeState.bind(this, 'assignedTo')}>
                                    {usersDropList}
                                </Form.Control>
                            </Form.Group>
                        </Form.Row>
                        <Form.Row className="form-row">
                            <Form.Group md="4" controlId="validationCustom01" style={{width: "100%"}}>
                                <Form.Label>Due Date</Form.Label> <br/>
                                <DatePicker defaultValue={(this.state.data || { }).expiryDate || new Date()} changeState={this.changeState}/>
                            </Form.Group>
                        </Form.Row>
                        <Button type="submit">{this.state.addTask ? "Add Task" : "Save Changes"}</Button>
                    </Form>
                </header>
            );
        }
        else if(this.state.status == 0) {
            return(
                <Loader />
            )
        }
        else {
            return(
                <Redirect to="/task" />
            )
        }
    }
}