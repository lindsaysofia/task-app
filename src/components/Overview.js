function Overview(props) {
  const { tasks, handleDelete, handleClick } = props;
  return (
    <ul>
      {tasks.map((task) => {
        return (
          <li key={task.id} style={{listStyle: 'none'}}>
            <button 
              id={`delete-${task.id}`}
              style={{display: 'inline', margin: '10px'}}
              onClick={handleDelete}
            >X</button>
            <p 
              id={`text-${task.id}`}
              style={{display: 'inline', margin: '10px'}} 
            >{task.text}</p>
            <button 
              id={`edit-${task.id}`}
              style={{display: 'inline', margin: '10px'}}
              onClick={handleClick}
            >{task.canEdit ? 'Resubmit' : 'Edit'}</button>
          </li>
        )
      })}
    </ul>
    
  );
}

export default Overview;