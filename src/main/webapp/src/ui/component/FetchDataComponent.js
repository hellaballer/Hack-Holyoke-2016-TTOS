import React, {Component} from 'react';
import {Row, Col, Form, Button, FormGroup, ControlLabel, FormControl, HelpBlock} from 'react-bootstrap';

export default class FetchDataComponent extends Component {

    static propTypes = {
        makeRequest: React.PropTypes.func,
        onSuccess: React.PropTypes.func,
        data: React.PropTypes.object
    };

    constructor(props) {
        super(props);
        this.state = {
            value: ''
        };
    }

    handleChange = (e) => {
        this.setState({value: e.target.value});
    };

    render() {
        return (
            <div>
                <Col md={3}>
                    <p>.</p>
                </Col>
                <Col md={6}>
                    <Form>
                        <Row>
                            <Col md={12}>
                                <FormGroup controlId="textSubmit">
                                    <Row>
                                        <Col md={12}>
                                            <ControlLabel>
                                                Get Obama to say anything!
                                            </ControlLabel>
                                        </Col>
                                    </Row>
                                </FormGroup>
                                <FormControl
                                    style={{
                                        /*maxWidth: '400px',*/
                                        /*margin: 'auto'/*, backgroundColor:'gray', borderColor:'#777'*/
                                    }}
                                    type="text"
                                    value={this.state.value}
                                    placeholder="Type you text here"
                                    onChange={this.handleChange}
                                />
                                <FormControl.Feedback />
                            </Col>
                        </Row>
                        <Row style={{paddingTop: '20px'}}>
                            <Col md={12}>
                                <Button type="submit" onClick={(e) => {
                                    e.preventDefault();
                                    this.props.makeRequest(this.state.value, this.props.onSuccess);
                                }}
                                        style={{margin: 'auto'}}>
                                    Make Obama Speak!
                                </Button>
                            </Col>
                        </Row>
                    </Form>
                </Col>
                <Col md={3}>
                    <p>.</p>
                </Col>
            </div>
        );
    }
}