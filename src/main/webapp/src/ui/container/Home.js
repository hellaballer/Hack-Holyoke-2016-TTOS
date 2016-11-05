import React, {Component, PropTypes} from 'react';
import {Row} from 'react-bootstrap';
import {connect} from 'react-redux';
import {browserHistory} from 'react-router';
import {fetchStub} from 'actions/stub';
import HomeComponent from 'component/HomeComponent';
import FetchDataComponent from 'component/FetchDataComponent';

class Home extends Component {


    /**
     * Callback function to execute on success of fetchStub call.
     * Prints "Success!" to the console and redirects to the 'hello'
     * page.
     */
    onSuccess = () => {
        console.log("Success!");
        browserHistory.push("/video");
    };

    render() {
        return (
            <div id="application">
                <Row>
                    <HomeComponent/>
                </Row>
                <Row>
                    <FetchDataComponent
                        makeRequest={(paramValue, onSuccess) =>
                            this.props.fetchStub(paramValue, this.onSuccess.bind(this))}
                        data={this.props.data}
                        onSuccess={() => this.onSuccess()}/>
                </Row>
            </div>
        );
    }
}

const maStateToProps = (state) => {
    return {
        data: state.stub
    };
};
const mapDispatchToProps = {fetchStub};
export default connect(
    (state) => maStateToProps(state),
    mapDispatchToProps
)(Home);