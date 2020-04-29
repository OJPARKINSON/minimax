import Head from 'next/head'
import {Table} from '../components/table'
import React, { useState, useEffect } from 'react'

export default function Home() {
  const [values, setValues] = useState({ 1: Array(9).fill(null) });
  const [player, setPlayer] = useState(true);
  const [winner, setWinner] = useState(null)

  useEffect(()=>{ 
    if (!player && !winner) {
      aiGo(values, setValues, player, setPlayer, setWinner)
    }
    won(values[1], player, setWinner);
  },[values])
 
  return (
    <div className="container">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h2>{JSON.stringify(values[1])}</h2>
      <h2>congrats: {winner}</h2>
      <main>
        <h2>{player ? 'X' : 'O'}'s go</h2>
        <Table values={values} setValues={setValues} player={player} setPlayer={setPlayer} winner={winner}/>
      </main>

      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
            Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
            sans-serif;
        }

        * {
          box-sizing: border-box;
        }
        ul {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          width: 75vw;
          margin: 10vw auto;
          text-align: center;
          border-collapse: collapse;
        }
        li {
          padding: 1vw;
          border: .2vw solid black;
          list-style: none;
        }

        li:nth-child(1), li:nth-child(2), li:nth-child(3) {
          border-top: 0;
        }
        li:nth-child(7), li:nth-child(8), li:nth-child(9) {
          border-bottom: 0;
        }
        li:nth-child(1n)  {
          border-left: 0;
        }
        li:nth-child(3n) {
          border-right: 0;
        }
      `}</style>
    </div>
  )
}

const winning = (values, player) => {
  const winCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [6, 4, 2]
  ]
  return winCombos.reduce((acc, current) => {
    if (values[current[0]] === player && values[current[1]] === player && values[current[2]] === player) {
        acc.push(current)
    }
    return acc
  }, []).length >= 1
}

const won = (values, player, setWinner) => {
  const winCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [6, 4, 2]
  ]

  winCombos.map(combo => {
    if (values[combo[0]] === "X" && values[combo[1]] === "X" && values[combo[2]] === "X" || 
        values[combo[0]] === "O" && values[combo[1]] === "O" && values[combo[2]] === "O") {
          return setWinner(`${player ? "X" : "O"} is winner`)
    }
  })
}

const aiGo = (values, setValues, player, setPlayer, setWinner) => {
  let nvalues = values[1]
  if (values[1].filter(num => num !== null).length === 1) {
  
    const takenVal = values[1].indexOf("X")
    const randomVal = Math.floor((Math.random() * 9))
    if (takenVal !== randomVal) {
      nvalues[randomVal] = "O";
    } else if (takenVal > randomVal) {
      nvalues[randomVal - 1] = "O";
    } else if (takenVal < randomVal) {
      nvalues[randomVal + 1] = "O";
    }
    
    setPlayer(!player) 
    return setValues({1: nvalues})

  } else {
    bestSpot(values, setWinner, setPlayer, setValues, player)
  }
}

function bestSpot(values, setWinner, setPlayer, setValues, player) {
  setPlayer(!player) 
  let nvaluess = values[1]

  nvaluess[minimax(values[1], player ? "O" : "X", setWinner).index] = "O"
  console.log(nvaluess)
  return setValues({1: nvaluess})
}


function minimax(newBoard, player, setWinner,){

  const availSpots = newBoard.reduce((acc, current, index, array) => {
    
    if (array[index] === null) {
      acc.push(index);
    }
      return acc
    },[]
  )
  
  if (winning(newBoard, "X")){
     return {score:-10};
  }
  else if (winning(newBoard, "O")){
    return {score:10};
	}
  else if (availSpots.length === 0){
  	return {score:0};
  }

  var moves = [];
  
  for (var i = 0; i < availSpots.length; i++){
    var move = {};

  	move.index = availSpots[i];
    newBoard[availSpots[i]] = player;
    
    if (player === "X"){
      var result = minimax(newBoard, "O", setWinner);
      move.score = result.score;
    }
    else {
      var result = minimax(newBoard, "X", setWinner);
      move.score = result.score;
    }

    newBoard[availSpots[i]] = null;
    moves.push(move);
  }
  
  var bestMove;
  if(player === "X"){
    var bestScore = -10000;
    for(var i = 0; i < moves.length; i++){
      if(moves[i].score > bestScore){
        bestScore = moves[i].score;
        bestMove = i;
      }
    }
  }else{

// else loop over the moves and choose the move with the lowest score
    var bestScore = 10000;
    for(var i = 0; i < moves.length; i++){
      if(moves[i].score < bestScore){
        bestScore = moves[i].score;
        bestMove = i;
      }
    }
  }

// return the chosen move (object) from the array to the higher depth
  return moves[bestMove];
}

