import { Navbar, Nav, Form, FormControl, Button, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom'

import { Component } from 'react';

export default class NavigationBar extends Component {
    constructor(props) {
        super(props)
        this.state = {
            
        }
    }

    render() {
        return (
            <div>
                <Navbar bg="dark" variant="dark" expand="lg">
                    <Navbar.Brand href="#">Task PRO</Navbar.Brand>
                    <Navbar.Toggle aria-controls="navbarScroll" />
                    <Navbar.Collapse id="navbarScroll">
                        <Nav className="mr-auto my-2 my-lg-0" style={{ maxHeight: '100px' }} navbarScroll>
                            <Nav.Link> <Link className="nav-link" to="/home"> Home </Link> </Nav.Link>
                            {(this.props.authentication || "").length ? null : <Nav.Link> <Link className="nav-link" to="/login"> Login </Link> </Nav.Link>}
                            {(this.props.authentication || "").length ? <Nav.Link> <Link className="nav-link" to="/addTask"> Add Task </Link> </Nav.Link> : null}
                            <Nav.Link> <Link className="nav-link" to="/task"> Task List </Link> </Nav.Link>
                           
                        </Nav>
                    
                        <Form>
                            <Nav className="mr-auto my-2 my-lg-0" style={{ maxHeight: '100px' }} navbarScroll>
                                {(this.props.authentication || "").length ? null : <Nav.Link> <Link className="nav-link" to="/signup"> Signup </Link> </Nav.Link>}
                                {(this.props.authentication || "").length ? <Nav.Link> <Link className="nav-link" to="/logout" style={{textDecoration: 'none'}}> Logout </Link> </Nav.Link> : null}
                                {(this.props.username || "").length ? <Nav.Link> <Link className="nav-link"> <Badge pill variant="light">{this.props.username}</Badge> </Link> </Nav.Link> : null}
                            </Nav>
                        </Form>
                    </Navbar.Collapse>
                </Navbar>
            </div>
        )
    }
}