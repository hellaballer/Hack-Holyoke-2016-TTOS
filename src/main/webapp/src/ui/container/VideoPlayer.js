import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import VideoPlayerComponent from 'component/VideoPlayerComponent';

class VideoPlayer extends Component {

    render() {
        return (
            <div>
                <VideoPlayerComponent data={this.props.data}/>
            </div>
        );
    }
}

const maStateToProps = (state) => {
    return {
        data: state.stub
    };
};
const mapDispatchToProps = {};
export default connect(
    (state) => maStateToProps(state),
    mapDispatchToProps
)(VideoPlayer);