import React, { Component } from 'react';
import { Navbar } from 'react-bootstrap';
//import { Nav, NavItem} from 'react-bootstrap';
// To use routing functionalities
//import { Link } from 'react-router-dom';
import '../index.css';

class Header extends Component {
    render() {
        return (
            <div>
                <Navbar>
                    <Navbar.Header>
                        <Navbar.Brand>
                            {/* <a href="http://localhost:4000/employees">MERN Stack CRUD Operations</a> */}
                            MERN Stack CRUD Operations
                        </Navbar.Brand>
                    </Navbar.Header>
                    {/* <Nav> */}
                        {/* <NavItem href="sometext"> */}
                        {/* <NavItem> */}
                            {/* <Link to="/">Home</Link> */}
                        {/* </NavItem> */}
                        {/* <NavItem href="sometext"> */}
                        {/* <NavItem> */}
                            {/* <Link to="/addemployee">Add New Employee</Link> */}
                            {/* Add New Employee */}
                        {/* </NavItem> */}
                    {/* </Nav> */}
                </Navbar>
            </div>
        );
    }
}

export default Header;
