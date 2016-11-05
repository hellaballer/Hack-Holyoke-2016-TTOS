import React, {Component} from 'react';
import { default as Video, Controls, Play, Mute, Seek, Fullscreen, Time, Overlay } from 'react-html5video';
import 'react-html5video/dist/ReactHtml5Video.css';

export default class VideoPlayerComponent extends Component {

    static propTypes = {
        data: React.PropTypes.object
    };


    render() {
        console.log(this.props.data.videoURL);
        return (
            <Video controls autoPlay loop muted>
                <source src={'http://media.w3.org/2010/05/sintel/trailer.mp4'}
                        type="video/mp4" />
                <Overlay />
                <Controls>
                    <Play />
                    <Seek />
                    <Time />
                    <Mute />
                    <Fullscreen />
                </Controls>
            </Video>
        );
    }
}