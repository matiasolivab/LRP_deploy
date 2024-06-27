import { useEffect } from "react";

const useThrowDice = ({ setCanThrowDice, diceValues }) => {
    useEffect(() => {
        if (diceValues && !(diceValues.dice1 === diceValues.dice2)) {
          setCanThrowDice(false);
        } else {
          setCanThrowDice(true);
        }
    
      },[diceValues])
}

export default useThrowDice;