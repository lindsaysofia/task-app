import React, { Component } from 'react';
import Overview from './components/Overview';
import uniqid from 'uniqid';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      task: {
        text: '',
        id: uniqid(),
        canEdit: false
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

  handleDelete = (e) => {
    const id = e.target.id.split('-')[1];
    this.setState((prevState) => {
      let taskIndex = prevState.tasks.findIndex(task => task.id === id);
      return {
        tasks: (prevState.tasks.slice(0, taskIndex)).concat(prevState.tasks.slice(taskIndex + 1))
      };

    });
  };

  handleTaskChange = (e) => {
    const { textContent } = e.target;
    const id = e.target.id.split('-')[1];
    this.setState((prevState) => {
      const newTasks = prevState.tasks.map((task) => {
        if (task.id === id) {
          return {
            ...task,
            text: textContent,
          }
        } else {
          return task;
        }
      });
      return {
        tasks: newTasks,
      }
    });
  };

  handleTaskChangeEnd = (e) =>  {
    const id = e.target.id.split('-')[1];
    const text = document.getElementById(`text-${id}`);
    text.contentEditable = false;
    text.removeEventListener('input', this.handleTaskChange);
    text.removeEventListener('blur', this.handleTaskChangeEnd);
    this.setState((prevState) => {
      const newTasks = prevState.tasks.map((task) => {
        if (task.id === id) {
          return {
            ...task,
            canEdit: false,
          }
        } else {
          return task;
        }
      });
      return {
        tasks: newTasks,
      }
    });
  };

  handleClick = (e) => {
    const id = e.target.id.split('-')[1];
    const text = document.getElementById(`text-${id}`);
    text.contentEditable = true;
    text.addEventListener('input', this.handleTaskChange);
    text.addEventListener('blur', this.handleTaskChangeEnd);
    this.setState((prevState) => {
      const newTasks = prevState.tasks.map((task) => {
        if (task.id === id) {
          return {
            ...task,
            canEdit: true,
          }
        } else {
          return task;
        }
      });
      return {
        tasks: newTasks,
      }
    });
  }

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
        <Overview 
          tasks={this.state.tasks} 
          handleDelete={this.handleDelete}
          handleClick={this.handleClick}
        />
      </div>
    );
  }
}
export default App;
