import React, { Component } from 'react';
import { 
    Container, 
    Navbar, 
    Button, 
    Form,
    Table,
    Col,
    Row,
    Alert } from 'react-bootstrap';

import './App.css';
import api from './Api';
import Auth from './Auth';

class App extends Component {
    state = {
        status_message: '',
        user_location: '',
        user_interests: '',
        all_user_data: [],
        current_user: Auth.currentUser().emails[0]
    };

    componentDidMount() {
        this.getUserData();
    }

    getUserData () {
        api({
            method: 'get',
            url: '/GetData?email=' + this.state.current_user,
            headers: { Authorization: Auth.getToken() }
        }).then((response) => {
            if(response.data[0])
            {
                this.setState({
                    user_location: response.data[0].location,
                    user_interests: response.data[0].interests,
                    status_message: 'Data about the logged in user recevied successfully .'
                });
            }
        })
        .catch((error) => {
            this.setState({status_message: 'Error getting data about logged in user.'});
        });
    };

    saveUserData() {
        api({
            method: 'put',
            url: '/SaveData?email=' + this.state.current_user,
            data: {
                location: this.state.user_location,
                interests: this.state.user_interests
            },
            headers: { Authorization: Auth.getToken() }
        }).then((response) => {
            this.setState({status_message: 'Data about the user saved successfully.'});
        })
        .catch((error) => {
            console.log(error);
            this.setState({status_message: 'Error saving data about the user.'});
        });
    }

    deleteUserData() {
        api({
            method: 'delete',
            url: '/DeleteData?email=' + this.state.current_user,
            headers: { Authorization: Auth.getToken() }
        }).then((response) => {
            this.setState({
                user_location: '',
                user_interests: '',
                status_message: 'Data about the user deleted successfully.'
            });
        })
        .catch((error) => {
            this.setState({status_message: 'Error deleting data about the user.'});
        });
    }

    getAllUserData () {
        api({
            method: 'get',
            url: '/GetAllData',
            headers: { Authorization: Auth.getToken() }
        }).then((response) => {
            this.setState({
                all_user_data: response.data,
                status_message: 'Data about all users received successfully.'
            })
        })
        .catch((error) => {
            this.setState({status_message: 'Error getting data about logged in user.'});
        });
    };

    render() {
        return (
            <Container>
                <Navbar bg="dark" variant="dark" className="justify-content-between">
                    <Navbar.Brand>
                        My Profile
                    </Navbar.Brand>
                    
                    <Navbar.Text>
                        Signed in as: {this.state.current_user}
                    </Navbar.Text>
                </Navbar>

                <Form className="box">
                    <Form.Group as={Row} controlId="formPlaintextEmail">
                        <Form.Label column sm="2">
                        Email
                        </Form.Label>
                        <Col sm="10">
                            <Form.Control plaintext readOnly defaultValue={this.state.current_user} />
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row}>
                        <Form.Label column sm="2">
                            Location
                        </Form.Label>
                        <Col sm="10">
                            <Form.Control placeholder="Enter your location" value={this.state.user_location || ''} onChange={(event) => { this.setState({ user_location: event.target.value,}); }}/> 
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row}>
                        <Form.Label column sm="2">
                            Interests
                        </Form.Label>
                        <Col sm="10">
                            <Form.Control placeholder="Enter your interests" value={this.state.user_interests || ''} onChange={(event) => { this.setState({ user_interests: event.target.value,}); }}/>
                        </Col>
                    </Form.Group>
                    <div className="buttonContainer">
                        <Button variant="primary" className="buttonGap" onClick={() => this.saveUserData()}>
                            Save Data
                        </Button>
                        <Button variant="danger" className="buttonGap" onClick={() => this.deleteUserData()} >
                            Delete My Data
                        </Button>
                        <Button variant="info" onClick={() => Auth.logout()}>
                            Sign Out
                        </Button>
                    </div>
                </Form>

                <Alert variant='info'>
                    Status: {this.state.status_message}
                </Alert>
                
                <div className="box boxGap">
                    <div className="buttonContainer">
                        <Button variant="success" onClick={() => this.getAllUserData()}>
                            Get All Data
                        </Button>
                    </div>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>User</th>
                                <th>Interests</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.all_user_data.map(( listValue, index ) => {
                                    return (
                                        <tr key={index}>
                                            <td>{listValue.email}</td>
                                            <td>{listValue.interests}</td>
                                        </tr>
                                    );
                                })
                            }
                        </tbody>
                    </Table>
                </div>
            </Container>
        )
    };
};

export default App;
