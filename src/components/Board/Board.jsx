import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import useGame from '../../Hooks/useGame';
import usePlayerPositions from '../../Hooks/usePlayerPositions';
import BoardTile from './BoardTile';
import PlayerTable from './PlayerTable';
import movePawn from '../../utils/movePawn';
import './Board.css';
import { useSocket } from '../../Hooks/useSocket';
import getCard from '../../services/getCard';
import CardAlert from './CardAlert';
import { updateRoleGame } from '../../services/updateRoleGame';
import useBoardPositions from '../../Hooks/useBoardpositions';
import useLocalStorage from '../../Hooks/useLocalStorage';
import useThrowDice from '../../Hooks/useThrowDice';
import useAsalto from '../../Hooks/useAsalto';
import useCellAction from '../../Hooks/useCellAction';
import BuyPropertieAlert from './buypropertiealert';
import SeePropertiesAlert from './seePropertiesAlert';
import FinishTurn from '../../utils/gameUtils';
import buyPropertie from '../../utils/buyPropertie';
import splitPlayers from '../../utils/splitPlayers';
import useUpdateBoingsOnCornerPass from '../../Hooks/useUpdateBoingsOnCornerPass';
import buyDefense from '../../utils/buyDefense';
import { casino } from '../../utils/casino';
import CasinoAlert from './CasinoAlert';
import ConfirmationAlert from './ConfirmationAlert';
import NotificationPopup from '../Notification/Notification';
import { hospital } from '../../utils/hospital';
import HospitalAlert from './HospitalAlert';

export function Board() {
  const socket = useSocket();
  const { gameId } = useParams();
  const {
    players,
    currentPlayer,
    turnPlayer,
    turnOrder,
    token,
    firstRoll,
    updateGameState,
    propertiesInfo,
  } = useGame({ gameId, socket });

  const { playersPosition, setPlayersPosition } = usePlayerPositions(players);
  const { boardPositions, setboardPositions } = useBoardPositions(players);
  const [diceValues, setDiceValues] = useState(() => {
    const savedDiceValues = localStorage.getItem('diceValues');
    return savedDiceValues !== null ? JSON.parse(savedDiceValues) : null;
  });
  const [tirado, setTirado] = useState(() => {
    const savedTirado = localStorage.getItem('tirado');
    return savedTirado !== null ? JSON.parse(savedTirado) : false;
  });
  const [canThrowDice, setCanThrowDice] = useState(() => {
    const savedCanThrowDice = localStorage.getItem('canThrowDice');
    return savedCanThrowDice !== null ? JSON.parse(savedCanThrowDice) : true;
  });
  const [canGetCard, setCanGetCard] = useState(() => {
    const savedCanGetCard = localStorage.getItem('canGetCard');
    return savedCanGetCard !== null ? JSON.parse(savedCanGetCard) : true;
  });
  const [isCardAlertOpen, setIsCardAlertOpen] = useState(false);
  const [cardAlertMessage, setCardAlertMessage] = useState('');
  const [isCasinoAlertOpen, setIsCasinoAlertOpen] = useState(false);
  const [casinoAlertMessage, setCasinoAlertMessage] = useState('');
  const [isHospitalAlertOpen, setIsHospitalAlertOpen] = useState(false);
  const [hospitalAlertMessage, setHospitalAlertMessage] = useState('');
  const [isConfirmationAlertOpen, setIsConfirmationAlertOpen] = useState(false);
  const [isConfirmation2AlertOpen, setIsConfirmation2AlertOpen] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [count, setCount] = useState(0);
  const [cardType, setCardType] = useState({});
  const [hasLandedOn20, setHasLandedOn20] = useState(() => {
    const savedHasLandedOn20 = localStorage.getItem('hasLandedOn20');
    return savedHasLandedOn20 !== null ? JSON.parse(savedHasLandedOn20) : false;
  
  });
  const [isbuyPropertieAlert, setisBuyPropertieAlert] = useState(false);
  const [messagePropertie, setMessagePropertie] = useState('');
  const [isSeePropertiesAlert, setisSeePropertiesAlert] = useState(false);
  const [boughtProperties, setBoughtProperties] = useState([]);
  const casillasNocomprables = [5, 10, 15, 20 ,25, 30, 35, 40];
  const [showDefenseOptions, setShowDefenseOptions] = useState(false);
  const [selectedDefense, setSelectedDefense] = useState('');
  const [notificationMessage, setNotificationMessage] = useState('');
  const [isNotificationVisible, setIsNotificationVisible] = useState(false);

  const DEFENSE_OPTIONS = [
    { id: '1', name: 'Alambre de púas' },
    { id: '2', name: 'Pistola' },
    { id: '3', name: 'Tanque' },
    { id: '4', name: 'Misil' },
    { id: '5', name: 'Bomba' },
    { id: '6', name: 'Alien' }
];

const [winnerDeclared, setWinnerDeclared] = useState(false);

  useEffect(() => {
    if (turnOrder?.length === 1 && !winnerDeclared) {
      setWinnerDeclared(true);
    }
  }, [turnOrder, winnerDeclared]);

  const handleDefenseClick = () => {
      setShowDefenseOptions(true);
  };

  const handleDefenseChange = (event) => {
      setSelectedDefense(event.target.value);
  };

  const handleBuyDefense = () => {
      buyTheDefense(selectedDefense);
      setShowDefenseOptions(false);
  };

  useLocalStorage({canThrowDice, diceValues, tirado, canGetCard, hasLandedOn20})
  useThrowDice({ setCanThrowDice, diceValues });
  useAsalto({
    currentPlayer,
    hasLandedOn20,
    setHasLandedOn20,
    socket,
    setCardAlertMessage,
    setIsCardAlertOpen,
    gameId,
    token
    });
    useCellAction({gameId, currentPlayer, token, socket, setIsNotificationVisible, setNotificationMessage, setCanThrowDice});

  const closeBuyPropertieAlert = () => {
    setisBuyPropertieAlert(false);
  };
  const closeSeePropertiesAlert = () => {
    setisSeePropertiesAlert(false);
  };
  const handleDiceThrow = async () => {
    await movePawn({
      setDiceValues,
      playersPosition,
      setPlayersPosition,
      turnPlayer,
      currentPlayer,
      gameId,
      token,
      socket,
      boardPositions,
      setboardPositions,
    });
    setCanGetCard(true);
    setHasLandedOn20(false);
    updateGameState();
  };
  const { leftPlayers, rightPlayers } = splitPlayers(players);
  const finishTurn = () => {
    FinishTurn({ setCount, setDiceValues, gameId, currentPlayer, token, updateGameState, socket });
    setCardType('nada');
  }

  const buyTheDefense  = async (defense) => {
    console.log(selectedDefense)
    try {
      await buyDefense({
        currentPlayer,
        gameId,
        token,
        socket,
        boardPositions,
        defense,
    });
    await updateGameState();
  } catch (error) {
    console.error('Error al comprar la defensa:', error);
  }
  };
  const buyThePropertie = async () => {
    try {
      var propi = await buyPropertie({
        setDiceValues,
        playersPosition,
        setPlayersPosition,
        turnPlayer,
        currentPlayer,
        gameId,
        token,
        socket,
        boardPositions,
        setboardPositions,
    });
    const lastIndex = propi.data.playerState.newProperties.length - 1;
    const lastProperty = propi.data.playerState.newProperties[lastIndex].name
    setMessagePropertie(currentPlayer.name + ' ha comprado la propiedad: ' +  lastProperty);
    setisBuyPropertieAlert(true);
    updateGameState();
    socket.emit('gameAction', gameId);
    } catch (error) {
      setMessagePropertie('Error al comprar la propiedad: ' + error.message);
      setisBuyPropertieAlert(true);
    }
  };

  const seeTheProperties = async () => {
    try {
      setisSeePropertiesAlert(true);
      const newBoughtProperties = propertiesInfo
      .filter(property => property.propertie?.playerId && property.type === 'propertie')
      .map(property => ({
          playerId: property.propertie.playerId,
          position: property.position
      }));

      setBoughtProperties(prev => {
          // Crear un conjunto de posiciones existentes para verificar duplicados
          const existingPositions = new Set(prev.map(prop => prop.position));
          // Filtrar las nuevas propiedades para que no incluyan duplicados
          const filteredNewProperties = newBoughtProperties.filter(prop => !existingPositions.has(prop.position));
          return [...prev, ...filteredNewProperties];
      });
    } catch (error) {
      console.error('Error al ver las propiedades:', error);
    }
  };

  useUpdateBoingsOnCornerPass({currentPlayer, diceValues, gameId, token})

  const cardPrevTurn = () => {
    if ([5, 15, 25, 35].includes(currentPlayer?.boardPosition)) {
      return !canGetCard
    }
    return true
  }
  

  const handleGetCard = async () => {
    try {
      const cardData = await getCard({
        gameId,
        currentPlayer,
        token,
      });

      setCanGetCard(false);

      let otherDataString = '';
      if (typeof cardData.otherData === 'object') {
        for (const [key, value] of Object.entries(cardData.otherData)) {
          otherDataString += `${key}: ${value}\n`;
        }
      } else {
        otherDataString = cardData.otherData;
      }
      setCardType(cardData.card);
      
      const message = `
        Has sacado la carta:
        Nombre: ${cardData.card}
        Descripción: ${cardData.type}
        Resultado: \n${otherDataString}
      `;
      updateGameState();
      socket.emit('gameAction', gameId);
      setCardAlertMessage(message);
      setIsCardAlertOpen(true);
    } catch (error) {
      console.error("Error al obtener la carta:", error);
      setCardAlertMessage('Error al sacar una carta.');
      setIsCardAlertOpen(true);
    }
  };
  
  useEffect(() => {
    if (typeof casinoAlertMessage === 'undefined') {
      setCasinoAlertMessage("No tiene esa cantidad para apostar.");
      setIsConfirmationAlertOpen(true);
    }
  }, [casinoAlertMessage]);

  useEffect(() => {
    if (typeof hospitalAlertMessage === 'undefined') {
      setHospitalAlertMessage("No tiene esa cantidad para pagar.");
      setIsConfirmation2AlertOpen(true);
    }
  }, [hospitalAlertMessage]);

  return (
    <div className="bo-board-container">
      {winnerDeclared ? (
        <div className="bo-ganador">
          {console.log('Ganador:', players.find(player => player.playerId === turnOrder[0]).name)}
          <h2>¡Juego Terminado!</h2>
          <p>El jugador ganador es: {players.find(player => player.playerId === turnOrder[0]).name}</p>
          {/* Puedes agregar aquí cualquier otra información que quieras mostrar sobre el ganador */}
        </div>
      ) : (
        <>
          <div className='bo-left-players'>
            <PlayerTable players={leftPlayers} turnPlayer={turnPlayer} />
          </div>
          <div className='bo-board-center'>
            <div className="bo-board">
              {Array.from({ length: 11 }).map((index, i) =>
                <div key={i} className="bo-row">
                  {Array.from({ length: 11 }).map((_, j) =>
                    <BoardTile
                      key={`${i}-${j}`}
                      i={i}
                      j={j}
                      playersPosition={playersPosition}
                      properties={propertiesInfo}
                    />
                  )}
                </div>
              )}
            </div>
            <div className='bo-bottoms-container'>
              {currentPlayer?.playerId === turnPlayer && canThrowDice && cardPrevTurn() && (
                <button type='button' onClick={handleDiceThrow} className='bo-button'>Lanzar dados</button>
              )}
              {currentPlayer?.playerId === turnPlayer &&
                !canThrowDice &&
                !casillasNocomprables.includes(currentPlayer?.boardPosition) &&
                boughtProperties.some(prop => prop.position === currentPlayer?.boardPosition && prop.playerId === currentPlayer.playerId) && (
                  !showDefenseOptions ? (
                    <button onClick={handleDefenseClick} className='bo-button'>
                      Comprar defensa
                    </button>
                  ) : (
                    <div>
                      <select value={selectedDefense} onChange={handleDefenseChange}>
                        <option value="">Seleccionar defensa</option>
                        {DEFENSE_OPTIONS.map((defense) => (
                          <option key={defense.id} value={defense.id}>
                            {defense.name}
                          </option>
                        ))}
                      </select>
                      <button onClick={handleBuyDefense} className='bo-button'>
                        Confirmar compra
                      </button>
                    </div>
                  )
                )}
              {currentPlayer?.playerId === turnPlayer && !canThrowDice
                && !casillasNocomprables.includes(currentPlayer?.boardPosition) &&
                !boughtProperties.some(prop => prop.position === currentPlayer?.boardPosition) && (
                  <button onClick={buyThePropertie} className='bo-button'>
                    Comprar propiedad
                  </button>
                )}
              {isbuyPropertieAlert && (
                <BuyPropertieAlert message={messagePropertie} onClose={closeBuyPropertieAlert} />
              )}
              {turnOrder && !showDefenseOptions && (
                <button onClick={seeTheProperties} type='button' className='bo-button'>Ver propiedades</button>
              )}
              {isSeePropertiesAlert && (
                <SeePropertiesAlert message={propertiesInfo} onClose={closeSeePropertiesAlert} players={players} />
              )}
              {currentPlayer?.playerId === turnPlayer && !canThrowDice && cardPrevTurn() && !showDefenseOptions && (
                <button type='button' onClick={finishTurn} className='bo-button'>Terminar turno</button>
              )}
              {currentPlayer?.playerId === turnPlayer && [5, 15, 25, 35].includes(currentPlayer?.boardPosition) && canGetCard && (
                <button onClick={handleGetCard} className='bo-button'>Sacar Carta</button>
              )}
              <CardAlert isOpen={isCardAlertOpen} message={cardAlertMessage} onClose={() => setIsCardAlertOpen(false)} cardTypes={cardType} updateRole={updateRoleGame} token={token} currentPlayerId={currentPlayer?.playerId} gameId={gameId} />
          {currentPlayer?.playerId === turnPlayer && [10].includes(currentPlayer?.boardPosition) && (
            <button onClick={() => setIsCasinoAlertOpen(true)} className='bo-button'>Ir al casino</button>
          )}
          <CasinoAlert isOpen={isCasinoAlertOpen} onClose={() => {setIsCasinoAlertOpen(false); setIsConfirmationAlertOpen(true);}} casino={casino} token={token} currentPlayerId={currentPlayer?.playerId} gameId={gameId} setCasinoAlertMessage={setCasinoAlertMessage} socket={socket}/>
          <ConfirmationAlert isOpen={isConfirmationAlertOpen} message={casinoAlertMessage} onClose={() => setIsConfirmationAlertOpen(false)} />
          {currentPlayer?.playerId === turnPlayer && [30].includes(currentPlayer?.boardPosition) && (
            <button onClick={() => setIsHospitalAlertOpen(true)} className='bo-button'>Ir al hospital</button>
          )}
          <HospitalAlert isOpen={isHospitalAlertOpen} onClose={() => {setIsHospitalAlertOpen(false); setIsConfirmation2AlertOpen(true);}} hospital={hospital} token={token} currentPlayerId={currentPlayer?.playerId} gameId={gameId} setHospitalAlertMessage={setHospitalAlertMessage} socket={socket}/>
          <ConfirmationAlert isOpen={isConfirmation2AlertOpen} message={hospitalAlertMessage} onClose={() => setIsConfirmation2AlertOpen(false)} />
              {diceValues && (
                 <div className="bo-dice-images">
                 <img src={`/img/dice/dice${diceValues.dice1}.png`} alt={`Dice 1: ${diceValues.dice1}`} />
                 <img src={`/img/dice/dice${diceValues.dice2}.png`} alt={`Dice 2: ${diceValues.dice2}`} />
               </div>
              )}
              {!turnOrder && !tirado && (
                <button type='button' onClick={() => {
                  firstRoll();
                  setTirado(true);
                }} className='bo-button'>Lanzar dados para decidir turno</button>
              )}
            </div>
          </div>
          <div className='bo-right-players'>
            <PlayerTable players={rightPlayers} turnPlayer={turnPlayer} />
          </div>
        </>
      )}
      {isNotificationVisible && (
        <NotificationPopup
          message={notificationMessage}
          onClose={() => setIsNotificationVisible(false)}
        />
      )}
    </div>
  );
}