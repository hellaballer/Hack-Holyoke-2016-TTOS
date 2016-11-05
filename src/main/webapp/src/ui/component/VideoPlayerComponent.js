import React, {Component} from 'react';
import { default as Video, Controls, Play, Mute, Seek, Fullscreen, Time, Overlay } from 'react-html5video';

const videos = [
    // TODO: Don't hot link these. upload them somewhere.
    'http://download.blender.org/peach/bigbuckbunny_movies/big_buck_bunny_480p_h264.mov',
    'http://media.w3.org/2010/05/sintel/trailer.mp4',
    'http://media.w3.org/2010/05/video/movie_300.mp4',
    // Purposefully not a video to demonstrate source error state
    'https://github.com/mderrick/react-html5video'
];

export default class VideoPlayerComponent extends Component {


    render() {
        return (
            <Video controls autoPlay loop muted>
                <source src='http://media.w3.org/2010/05/sintel/trailer.mp4'
                        type="video/mp4" />
                <source src="http://sourcefile.webm" type="video/webm" />
                <h1>Optional HTML and components can be added also</h1>

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