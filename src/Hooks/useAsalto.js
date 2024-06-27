import { useEffect } from "react";
import checkAndPerformAsalto from '../utils/asalto';

const useAsalto = ({
    currentPlayer,
    hasLandedOn20,
    setHasLandedOn20,
    socket,
    setCardAlertMessage,
    setIsCardAlertOpen,
    gameId,
    token
    }) => {
    useEffect(() => {
        if (currentPlayer?.boardPosition === 20 && !hasLandedOn20) {
          checkAndPerformAsalto({
              socket,
              setCardAlertMessage,
              setIsCardAlertOpen,
              gameId,
              currentPlayer,
              token
          });
          setHasLandedOn20(true);
        }
    }, [currentPlayer]);
}

export default useAsalto;