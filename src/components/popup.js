import { Modal, Button } from 'react-bootstrap';
import { Link, Redirect } from 'react-router-dom';
import { Component } from 'react';
export default class Popup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            redirect: false,
            redirectURL: this.props.customRedirect || "/login"
        }
    }

    closePopup = () => {
        this.setState(prevState => ({
            redirect: true
        }))
    }

    render() {
        if(!this.state.redirect) {
            return (
                <header className="App-header" style={{"paddingBottom": "8%", fontSize: "17px"}}>  
                    <Modal show onHide={this.closePopup} backdrop="static" keyboard={false}>
                        <Modal.Header closeButton>
                            <Modal.Title>
                                {this.props.title}
                            </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            {this.props.message}
                        </Modal.Body>
                        <Modal.Footer>
                            <Link to="/login">
                                <Button variant="dark" onClick={this.state.redirectURL == "/signup" ? this.closePopup : (this.props.redirect ? <Redirect to={this.state.redirectURL}/> : null)}>{this.props.buttonText}</Button>
                            </Link>
                        </Modal.Footer>
                    </Modal>
                </header>
            )
        }
        else {
            {this.state.redirectURL == "/signup" && this.props.revertStatus()}
            return (
                <Redirect to={this.state.redirectURL} />
            )
        }
    }
}