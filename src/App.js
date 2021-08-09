import { useEffect, useState } from 'react';
import './App.css';
import { Patterns } from './Patterns';
import Box from'./Box';
import Scorecard from './Scorecard';
import Undoredo from './Undoredo';
function App() {
  const [move,setmove]=useState(0);
  const [arr,setArr]=useState([["","","","","","","","",""]]);
  const [player,setPlayer]=useState("O");
  const [result,setResult]=useState({winner:"none",state:"none"});
  const [xscore,setxscore]=useState(0);
  const [yscore,setyscore]=useState(0);
  
  const restartGame=()=>{
    setArr([["","","","","","","","",""]]);
    setPlayer("O");
    setResult({winner:"none",state:"none"});
    setxscore(0);
    setyscore(0);
    setmove(0);
  };

  useEffect(
    ()=>{
        checkWin();
        if(result.state==="none")checkIFTie();
        // if(player==="X")
        //   setPlayer("O");
        // else setPlayer("X");
        let xsc=0,ysc=0;
        arr[move].forEach((val)=>{
          if(val==="X")xsc++;
          else if(val==="O")ysc++;
        });
        setxscore(xsc);setyscore(ysc);
    }
  ,[arr]);

  useEffect(()=>{
    if(result.state!=="none"){
      alert(`Game Ends. Winning player is: ${result.winner}`);
      restartGame();
    }
  }
  ,[result]);

  useEffect(()=>{
    let xsc=0,ysc=0;
        arr[move].forEach((val)=>{
          if(val==="X")xsc++;
          else if(val==="O")ysc++;
        });
        if(player==="X")
          setPlayer("O");
        else setPlayer("X");
        setxscore(xsc);setyscore(ysc);
  }
  ,[move]);
 
  const chooseBox=(inx)=>{
    if(arr[move][inx]!=="")return;
    let temp=arr.slice(0,move+1),temp1=[...temp[move]];

    temp.push(temp1.map(
      (val,curinx)=>{
      if(inx===curinx && val==="")
        return player;
      return val;
      }
      )
    );
    setmove(move+1);
    setArr(temp);
  };

  const checkWin=()=>{
    Patterns.forEach(
      (curPattern)=>{
        let foundWinningPattern=true;
        const firstPlayer=arr[move][curPattern[0]];
        if(firstPlayer==="")return;
        curPattern.forEach(
          (inx)=>{
            if(arr[move][inx]!==firstPlayer)
              foundWinningPattern=false;
          }
          );
        if(foundWinningPattern)
          setResult({winner:player,state:"won"});
        
      }
    );
  };

const checkIFTie=()=>{
  let completeFilled=true;
  arr[move].forEach((val)=>{
    if(val==="")completeFilled=false;
  }
  );
  if(completeFilled===true)
    setResult({winner:"No One",state:"Tie"});
};

const undo=()=>{
  if(move-1<0)return;
  setmove(move-1);
}
const redo=()=>{
  if(move+1>=arr.length)return;
  setmove(move+1);
}

  return (
    <div className="App">
      <p className="intro">Hey! Welcome to Tic-Tac-Toe Game</p>
      <div className="board">
      
      <div className="row">
        <Box val={arr[move][0]} chooseBox={()=>chooseBox(0)}></Box>
        <Box val={arr[move][1]} chooseBox={()=>chooseBox(1)}></Box>
        <Box val={arr[move][2]} chooseBox={()=>chooseBox(2)}></Box>
      </div>
      <div className="row">
        <Box val={arr[move][3]} chooseBox={()=>chooseBox(3)}></Box>
        <Box val={arr[move][4]} chooseBox={()=>chooseBox(4)}></Box>
        <Box val={arr[move][5]} chooseBox={()=>chooseBox(5)}></Box>
      </div>
      <div className="row">
        <Box val={arr[move][6]} chooseBox={()=>chooseBox(6)}></Box>
        <Box val={arr[move][7]} chooseBox={()=>chooseBox(7)}></Box>
        <Box val={arr[move][8]} chooseBox={()=>chooseBox(8)}></Box>
      </div>
      </div>
      
      <Undoredo undo={undo} redo={redo}></Undoredo>
      <Scorecard xscore={xscore} yscore={yscore}></Scorecard>
      
    </div>
  );
}

export default App;
