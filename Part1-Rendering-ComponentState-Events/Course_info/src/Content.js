const Content = (props) => {
return (
  <div>
    <table className="table table-bordered">
      <tr>
        <th>Part</th>
        <th>Exercises</th>
      </tr>
      {props.course.parts.map((part) => (
        <tr>
          <td>{part.name}</td>
          <td>{part.exercises}</td>
        </tr>
      ))}

    </table>
  </div>
  );
  }
export default Content