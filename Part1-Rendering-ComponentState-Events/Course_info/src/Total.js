const Total = (props) => {
    return (
        <div>
            <p className='p'>Number of exercises {props.course.parts[0].exercises + props.course.parts[1].exercises + props.course.parts[2].exercises}</p>
        </div>
    )
}

export default Total