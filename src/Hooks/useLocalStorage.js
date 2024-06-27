import { useEffect } from 'react';

const useLocalStorage = ({canThrowDice, diceValues, tirado, canGetCard, hasLandedOn20}) => {
    useEffect(() => {
        localStorage.setItem('canThrowDice', JSON.stringify(canThrowDice));
        localStorage.setItem('diceValues', JSON.stringify(diceValues));
        localStorage.setItem('tirado', JSON.stringify(tirado));
        localStorage.setItem('canGetCard', JSON.stringify(canGetCard));
        localStorage.setItem('hasLandedOn20', JSON.stringify(hasLandedOn20));
    
        return () => {
          localStorage.removeItem('diceValues');
          localStorage.removeItem('canThrowDice');
          localStorage.removeItem('tirado');
          localStorage.removeItem('canGetCard');
          localStorage.removeItem('hasLandedOn20');
        };
      }, [canThrowDice, diceValues, tirado, canGetCard, hasLandedOn20]);
}

export default useLocalStorage;