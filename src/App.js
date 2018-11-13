import React, { Component } from 'react';
import { Provider } from 'react-redux';

import configureStore from './stores';
import logo from './logo.svg';
import './App.css';
import 'mapbox-gl/dist/mapbox-gl.css';

import Header from './component/Header/Header';
import Map from './containers/Map/Map';


const store = configureStore();


class App extends Component {

  state = {
    viewport: {
      width: '90%',
      height: 500,
      latitude: 37.7577,
      longitude: -122.4376,
      zoom: 8
    }
  }
  render() {
    return (
      <Provider store={store}>
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
          <Header />
          <Map />
        </div>
      </Provider>
    );
  }
}

export default App;
