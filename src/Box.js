import './App.css';
const Box = (props) => {
    const val=props.val?props.val:'',chooseBox=props.chooseBox;
    
    return (
        <div className="box" onClick={()=>chooseBox(val)}>
        <p>{val}</p>
        </div>
    );
}
 
export default Box;
