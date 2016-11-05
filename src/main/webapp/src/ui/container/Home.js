import React, {Component, PropTypes} from 'react';
import {Row} from 'react-bootstrap';
import {connect} from 'react-redux';
import {fetchStub} from 'actions/stub';
import {browserHistory} from 'react-router';
import HomeComponent from 'component/HomeComponent';
import FetchDataComponent from 'component/FetchDataComponent';

class Home extends Component {


    /**
     * Callback function to execute on success of fetchStub call.
     * Prints "Success!" to the console and redirects to the 'hello'
     * page.
     */
    onSuccess = (props) => {
        console.log(props.data.videoURL);
        browserHistory.push("/video");
    };


    componentWillReceiveProps(nextProps){
        if(nextProps.data.videoURL &&
            this.props.data.videoURL != nextProps.data.videoURL){
            this.onSuccess(nextProps);
        }
    }

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