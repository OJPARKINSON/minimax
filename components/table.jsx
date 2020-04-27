export const Table = ({values, setValues, player, setPlayer, winner}) => {
    const gameClick = (index) => {
      var nv = values[1]; 
      nv[index] = player ? "X" : "O"; 
      setPlayer(!player) 
      return setValues({1: nv})
    }
    return (
        <ul>
          {values[1].map((line, index) => {
            return (
                <li>
                    <button type="button" disabled={winner || line} onClick={() => gameClick(index)}>
                    {line || "___"}
                    </button>
                </li>
            )
          })}
        </ul>
    )
  }