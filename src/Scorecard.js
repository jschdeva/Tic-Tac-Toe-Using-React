import './App.css';

const Scorecard = (props) => {
    const xscore=props.xscore,yscore=props.yscore;
    return (
        <div className="score">
            <p className="scoreheading">Scorecard: </p>
            <p>Score of X is: {xscore}</p>
            <p>Score of O is: {yscore}</p>
        </div>
    );
}
 
export default Scorecard;