const Filter = ({ query, handleChange}) =>{
    return (
        <div>
            filter shown with
            <input value={query} onChange={handleChange} />
        </div>
    );
};
export default Filter;