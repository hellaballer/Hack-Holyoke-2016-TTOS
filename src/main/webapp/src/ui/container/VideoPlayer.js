import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import VideoPlayerComponent from 'component/VideoPlayerComponent';

class VideoPlayer extends Component {

    render() {
        return (
            <div id="application">
                <VideoPlayerComponent/>
            </div>
        );
    }
}

let mapStateToProps = () => ({}),
    mapDispatchToProps = {};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(VideoPlayer);