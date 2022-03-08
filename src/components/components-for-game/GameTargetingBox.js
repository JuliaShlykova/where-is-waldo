import { ImCross } from 'react-icons/im';
import Choice from './CharacterChoice';

const Box = ({style, openBox, choices, checkChoice}) => {
  let btnSize = style.width/10;
  let btnStyle = {
    width: btnSize,
    height: btnSize,
    top: -btnSize-5,
    left: 0
  }
  return(
    <div id="targeting-box" style={{left: style.left, top: style.top}}>
      <div style={{width: style.width, height: style.height}}>
        {choices.map((el,i) => (
          <Choice key={i} text={el} checkChoice={checkChoice} />
        ))}
      </div>
      <ImCross id="close-targeting-box" style={btnStyle} onClick={()=>openBox(false)} />
    </div>
  )
}

export default Box;