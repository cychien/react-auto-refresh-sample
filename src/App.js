import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor() {
    super()
    this.state = {
      miners: '',
      workers: '',
      hashrate: ''
    }
  }

  componentDidMount() {
    this.loadData();
    setInterval((this.loadData), 5000);
  }

  loadData = () => {
    fetch('https://eth-tw.gpumine.org/api/stats', {
      method: 'GET'
    })
      .then(jsonResponse => {
        if (!jsonResponse.ok)
          throw new Error('response is not OK.');
        return jsonResponse.json();
      })
      .then(({miners, workers, hashrate}) => {
        this.setState({
          miners,
          workers,
          hashrate
        });
      });
  }

  render() {
    return (
      <div>
        <div>Miners: {this.state.miners}</div>
        <div>Workers: {this.state.workers}</div>
        <div>Hashrate: {this.state.hashrate}</div>
      </div>
    );
  }
}

export default App;
