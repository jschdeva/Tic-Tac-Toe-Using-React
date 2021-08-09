const Undoredo = (props) => {
    const undo=props.undo,redo=props.redo;
    return (
        <div className="undoredobody">
            <button  className="undoredo" onClick={()=>undo()}>Undo</button>
            <button  className="undoredo" onClick={()=>redo()}>Redo</button>
        </div>
    );
}
 
export default Undoredo;