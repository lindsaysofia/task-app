import React, { Component } from 'react';
import Overview from './components/Overview';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      input: '',
      tasks: []
    }
  }

  handleChange = (e) => {
    this.setState({
      input: e.target.value
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.setState((prevState) => {
      return {
        input: '',
        tasks: prevState.tasks.concat(prevState.input)
      };
    });
  };

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input 
            type="text"
            value={this.state.input}
            onChange={this.handleChange}
          />
          <button>Submit</button>
        </form>
        <ul>
          {this.state.tasks.map((task, index) => <Overview task={task} key={index} />)}
        </ul>
      </div>
    );
  }
}
export default App;
