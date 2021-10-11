function Overview(props) {
  const { task, index } = props;
  return (
    <li key={index}>{task}</li>
  );
}

export default Overview;