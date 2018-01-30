import React, {Component} from 'react';

import {
  Animation,
  About,
  Hero
} from '../components/components';


export class App extends Component {
  componentDidMount() {
    Animation.init();
  }
  render() {
    return (
      <div>
        <Hero/>
        <About />
      </div>
    );
  }
}