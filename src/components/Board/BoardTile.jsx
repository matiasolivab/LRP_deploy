import PropTypes from 'prop-types';
import { numberToPosition } from '../../utils/position';

const BoardTile = ({ i, j, playersPosition, properties }) => {
  const contentMap = {
    '0-0': '/img/board/inicio.png',
    '0-1': '/img/board/1.png',
    '0-2': '/img/board/2.png',
    '0-3': '/img/board/3.png',
    '0-4': '/img/board/4.png',
    '0-5': '/img/board/card.png',
    '0-6': '/img/board/6.png',
    '0-7': '/img/board/7.png',
    '0-8': '/img/board/8.png',
    '0-9': '/img/board/9.png',
    '0-10': '/img/board/casino.png',
    '1-10': '/img/board/11.png',
    '2-10': '/img/board/12.png',
    '3-10': '/img/board/13.png',
    '4-10': '/img/board/14.png',
    '5-10': '/img/board/card.png',
    '6-10': '/img/board/16.png',
    '7-10': '/img/board/17.png',
    '8-10': '/img/board/18.png',
    '9-10': '/img/board/19.png',
    '10-10': '/img/board/asalto.png',
    '10-9': '/img/board/21.png',
    '10-8': '/img/board/22.png',
    '10-7': '/img/board/23.png',
    '10-6': '/img/board/24.png',
    '10-5': '/img/board/card.png',
    '10-4': '/img/board/26.png',
    '10-3': '/img/board/27.png',
    '10-2': '/img/board/28.png',
    '10-1': '/img/board/29.png',
    '10-0': '/img/board/hospital.png',
    '9-0': '/img/board/31.png',
    '8-0': '/img/board/32.png',
    '7-0': '/img/board/33.png',
    '6-0': '/img/board/34.png',
    '5-0': '/img/board/card.png',
    '4-0': '/img/board/36.png',
    '3-0': '/img/board/37.png',
    '2-0': '/img/board/38.png',
    '1-0': '/img/board/39.png',
    '5-5': '/img/logo.png',
  };
  const pawnMap = {
    1: '/img/fichas/ficha_1.png',
    2: '/img/fichas/ficha_2.png',
    3: '/img/fichas/ficha_3.png',
    4: '/img/fichas/ficha_4.png',
  };
  const playersInfo = [ ...playersPosition]
  playersInfo.sort((a, b) => a.playerId - b.playerId);
  const playersWithPawn = playersInfo.map((player, index) => ({
    ...player,
    pawn: pawnMap[index + 1]
  }));

  const isBorderCell = (i === 0 || j === 0 || i === 10 || j === 10 || (i === 5 && j === 5));
  const content = isBorderCell ? contentMap[`${i}-${j}`] : null;
  const cellClass = content ? 'bo-cell bo-center' : 'bo-empty-cell';

  const isPlayersHere = playersWithPawn.filter(player => player.position.x === i && player.position.y === j);

  let propertiesHere = [];
  let propHereWithDefense = [];
  if (properties.length > 0) {
    const propertiesWithPosition = properties.map(property => ({
      ...property,
      positionXY: numberToPosition(property.position)
    }));

    propertiesHere = propertiesWithPosition.filter(property => property.positionXY.x === i && property.positionXY.y === j);
    propHereWithDefense = propertiesHere.filter(property => property && property.propertie && property.propertie.defenseId !== null);
  }

  
  return (
    <div className="bo-cell">
      {content ? (
        <img src={content} alt='Tile' className={cellClass} />
      ) : (
        <div className='bo-empty-cell' />
      )}
      {isPlayersHere.length > 0 && (
        <div className="bo-pawn">
          {isPlayersHere.map(player => (
            <img
               key={player.playerId}
               src={player.pawn}
               alt={`Peón de ${player.name}`}
               className='bo-player-im'
            />
          ))}
        </div>
      )}
      {propHereWithDefense.length > 0 && (
        <div className="bo-properties">
          {propHereWithDefense.map(property => (
            <img
              key={property.squareId}
              src={`/img/defenses/${property.propertie.defenseId}.png`}
              alt={property.name}
              className='bo-property-im'
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default BoardTile;

BoardTile.propTypes = {
  i: PropTypes.number.isRequired,
  j: PropTypes.number.isRequired,
  playersPosition: PropTypes.arrayOf(
    PropTypes.shape({
      playerId: PropTypes.number.isRequired,
      position: PropTypes.shape({
        x: PropTypes.number.isRequired,
        y: PropTypes.number.isRequired
      }).isRequired,
      name: PropTypes.string.isRequired
    })
  ).isRequired
};