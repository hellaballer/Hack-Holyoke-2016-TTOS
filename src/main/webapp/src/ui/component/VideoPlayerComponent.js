import React, {Component} from 'react';
import {Row, Col, Button} from 'react-bootstrap';
import {default as Video, Controls, Play, Mute, Seek, Fullscreen, Time, Overlay} from 'react-html5video';
import 'react-html5video/dist/ReactHtml5Video.css';

export default class VideoPlayerComponent extends Component {

    static propTypes = {
        data: React.PropTypes.object
    };

    constructor(props) {
        super(props);
        this.state = {
            value: ''
        };
        this.video = null;
    }


    reloadVideo() {
        // When changing a HTML5 video, you have to reload it.
        this.video.load();
        this.video.play();
    }

    render() {
        return (
            <div>
                <Row>
                    <Col md={12}>
                        <Video controls
                               autoPlay
                               loop
                               ref={(video) => this.video = video}>
                            <source src={this.props.data.videoURL}/>
                            <Overlay />
                            <Controls>
                                <Play />
                                <Seek />
                                <Time />
                                <Mute />
                                <Fullscreen />
                            </Controls>
                        </Video>
                    </Col>
                </Row>
                <Row>
                    <Col md={1}>
                        <Button onClick={() => {
                            console.log(this);
                            this.reloadVideo();
                        }}>Reload</Button>
                    </Col>
                    <Col md={11}>
                        <a href={this.props.data.videoURL} target="_blank">Download Video</a>
                        {/*<a href={this.props.data.videoURL} download>Download Video</a>*/}
                    </Col>
                </Row>
            </div>
        );
    }
}