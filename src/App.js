import React, { Component } from 'react';
import Overview from './components/Overview';
import uniqid from 'uniqid';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      task: {
        text: '',
        id: uniqid()
      },
      tasks: []
    }
  }

  handleChange = (e) => {
    this.setState((prevState) => {
      return {
        task: {
          text: e.target.value,
          id: prevState.task.id
        }
      };
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.setState((prevState) => {
      return {
        tasks: prevState.tasks.concat(prevState.task),
        task: {
          text:'',
          id: uniqid()
        },
      };
    });
  };

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input 
            type="text"
            value={this.state.task.text}
            onChange={this.handleChange}
          />
          <button type="submit">Submit</button>
        </form>
        <Overview tasks={this.state.tasks}/>
      </div>
    );
  }
}
export default App;
