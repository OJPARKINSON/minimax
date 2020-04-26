import Head from 'next/head'
import React, { useState, useEffect } from 'react'

export default function Home() {
  const [values, setValues] = useState({ 1: [ ["", "", ""], ["", "", ""], ["", "", ""] ]});
  const [player, setPlayer] = useState(true);
  const [winner, setWinner] = useState(null)

  useEffect(()=>{
    const nvalues = values[1]
    if (nvalues[0][0] + nvalues[0][1] + nvalues[0][2] === 'XXX' ||
        nvalues[1][0] + nvalues[1][1] + nvalues[1][2] === 'XXX' ||
        nvalues[2][0] + nvalues[2][1] + nvalues[2][2] === 'XXX' ||
        nvalues[0][0] + nvalues[1][0] + nvalues[2][0] === 'XXX' ||
        nvalues[0][1] + nvalues[1][1] + nvalues[2][1] === 'XXX' ||
        nvalues[0][2] + nvalues[1][2] + nvalues[2][2] === 'XXX' ||
        nvalues[0][0] + nvalues[1][1] + nvalues[2][2] === 'XXX' ||
        nvalues[0][2] + nvalues[1][1] + nvalues[2][0] === 'XXX') {
          setWinner('X is winner')
    } else if (nvalues[0][0] + nvalues[0][1] + nvalues[0][2] === 'OOO' ||
        nvalues[1][0] + nvalues[1][1] + nvalues[1][2] === 'OOO' ||
        nvalues[2][0] + nvalues[2][1] + nvalues[2][2] === 'OOO' ||
        nvalues[0][0] + nvalues[1][0] + nvalues[2][0] === 'OOO' ||
        nvalues[0][1] + nvalues[1][1] + nvalues[2][1] === 'OOO' ||
        nvalues[0][2] + nvalues[1][2] + nvalues[2][2] === 'OOO' ||
        nvalues[0][0] + nvalues[1][1] + nvalues[2][2] === 'OOO' ||
        nvalues[0][2] + nvalues[1][1] + nvalues[2][0] === 'OOO') {
          setWinner('O is winner')
    }
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
        table {
          width: 75vw;
          margin: 10vw auto;
          text-align: center;
          border-collapse: collapse;
        }
        tr {

        }
        td {
          padding: 1vw;
          border: .2vw solid black;
        }

        table tr:first-child td {
          border-top: 0;
        }
        table tr:last-child td {
          border-bottom: 0;
        }
        table tr td:first-child  {
          border-left: 0;
        }
        table tr td:last-child {
          border-right: 0;
        }
      `}</style>
    </div>
  )
}

const Table = ({values, setValues, player, setPlayer, winner}) => {
  
  const gameClick = (indexx, index) => {
    var nv = values[1]; 
    nv[indexx][index] = player ? "X" : "O"; 
    setPlayer(!player) 
    return setValues({1: nv})
  }
  return (
      <table>
      <tbody>
        {values[1].map((row, indexx) => {
          return (
            <tr>
              {row.map((line, index) => {
                return (<td><button type="button" disabled={winner} onClick={() => gameClick(indexx, index)}>{line || "___"}</button></td>)
              })}
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}

