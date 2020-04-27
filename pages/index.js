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
  winCombos.map(combo => {
    if (values[combo[0]] === player && values[combo[1]] === player && values[combo[2]] === player || 
        values[combo[0]] === player && values[combo[1]] === player && values[combo[2]] === player) {
          return true   
    }
  })
  return false
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

  return setValues({1: nvaluess})
}


function minimax(newBoard, player, setWinner,){
  //available spots
  const availSpots = newBoard.reduce((acc, current, index, array) => {
    
    if (array[index] === null) {
      acc.push(index);
    }
      return acc
    },[]
  )
  // checks for the terminal states such as win, lose, and tie and returning a value accordingly
  if (winning(newBoard, "X", setWinner)){
     return {score:-10};
  }
  else if (winning(newBoard, "O", setWinner)){
    return {score:10};
	}
  else if (availSpots.length === 0){
  	return {score:0};
  }

// an array to collect all the objects
  var moves = [];

  // loop through available spots
  for (var i = 0; i < availSpots.length; i++){
    //create an object for each and store the index of that spot that was stored as a number in the object's index key
    var move = {};

  	move.index = availSpots[i];
    
    // set the empty spot to the current player
    newBoard[availSpots[i]] = player;
    
    //if collect the score resulted from calling minimax on the opponent of the current player
    if (player == "O"){
      var result = minimax(newBoard, "X", setWinner);
      move.score = result.score;
    }
    else{
      var result = minimax(newBoard, "O", setWinner);
      move.score = result.score;
    }

    //reset the spot to empty
    
    newBoard[availSpots[i]] = null;
    // console.log(moves)
    // push the object to the array
    moves.push(move);
  }

// if it is the computer's turn loop over the moves and choose the move with the highest score
  var bestMove;
  if(player === "O"){
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
  // console.log({bestMove})
// return the chosen move (object) from the array to the higher depth
  return moves[bestMove];
}

