export const Note = ({ content, date }) => {
  //console.log({props})

  return (
    <div>
      <li>
        <p>{content}</p>
        <small>
          <time>{date}</time>
        </small>
      </li>
    </div>
  );
};
