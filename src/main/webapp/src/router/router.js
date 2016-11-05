import React from 'react';
import { Route, Redirect, IndexRoute } from 'react-router';

import App from 'container/App';
import Home from 'container/Home';
import VideoPlayerComponent from 'container/VideoPlayer';


const Routes = (
  <Route path="/" name="app" component={App}>
    <IndexRoute component={Home}/>
    <Route path="video" component={VideoPlayerComponent}/>
  </Route>
);

export default Routes;
