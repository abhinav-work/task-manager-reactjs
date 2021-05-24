import React, { Component } from "react";
import DatePicker from "react-datepicker";
import moment from 'moment';
import "react-datepicker/dist/react-datepicker.css";

export default class Date extends Component {
   constructor(props) {
       super(props)
       this.state = {
           date: moment(props.defaultValue || "").toDate()
       }
   }
   setStartDate = (date) => {
        this.setState(prevState => ({
            date: moment(date).toDate()
        }))
   }
   render() {
        return (
            <DatePicker showTimeSelect dateFormat="dd/MM/yyyy" timeIntervals={1} selected={this.state.date} onChange={date => { this.props.changeState('expiryDate', date); this.setStartDate(date)} }/>
        );
   }
};