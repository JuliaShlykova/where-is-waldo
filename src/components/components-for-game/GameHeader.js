import * as images from './importsCharacters';

function GameHeader({names, header, foundChar}) {

  return(
    <div id="game-header">
      <h1>{ header }</h1>
      <div>
        {names.map((v,i) => {
          return(<div key={i}>
              <p>{v}</p>
              <img src={images[v.replace(/\s/gu,'')]}
                alt={v}
                className='character-img'
              />
              {(foundChar.includes(v)) ? <div className='found-sign'>Found</div> : null}
            </div>)
        })}
      </div>
    </div>
  )
};

export default GameHeader;