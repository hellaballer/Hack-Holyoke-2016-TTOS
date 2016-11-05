import React, {Component} from 'react';
import {Navbar, Nav, NavItem} from 'react-bootstrap';
import {LinkContainer, IndexLinkContainer} from 'react-router-bootstrap'

export default class TopNav extends Component {

    render() {
        return (
            <Navbar>
                <Navbar.Header>
                    <Navbar.Brand>
                        <LinkContainer to={{pathname: '/'}} active={false}>
                            <p>Home</p>
                        </LinkContainer>
                        <Navbar.Toggle />
                    </Navbar.Brand>
                </Navbar.Header>
                <Navbar.Collapse>
                    <Nav>
                        <IndexLinkContainer to={{pathname: '/'}}>
                            <NavItem eventKey={1} href="#">Hello</NavItem>
                        </IndexLinkContainer>
                        <LinkContainer to={{pathname: '/video'}}>
                            <NavItem eventKey={2} href="#">Video</NavItem>
                        </LinkContainer>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        );
    }
}