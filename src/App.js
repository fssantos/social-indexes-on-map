import React, { Component } from 'react';
import { Provider } from 'react-redux';

import configureStore from './stores';
import logo from './logo.svg';
import './App.css';
import 'mapbox-gl/dist/mapbox-gl.css';

import Header from './component/Header/Header';
import Map from './containers/Map/Map';
import ToolBar from './containers/ToolBar/ToolBar';


const store = configureStore();


class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
          <Header />
          <div style={{ display: 'flex', alignSelf: 'flex-start' }}>
            <ToolBar />
            <Map/>

          </div>
        </div>
      </Provider>
    );
  }
}

export default App;
