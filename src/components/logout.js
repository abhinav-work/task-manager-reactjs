import { Component } from "react";
import { Redirect } from "react-router-dom";
export default class Logout extends Component {
    constructor(props) {
        super(props)
        this.state = {
            removeAuthentication: this.props.addAuthentication("", "")
        }
    }
    render() {
        return(
            <Redirect to="/home"/>
        )
    }
}