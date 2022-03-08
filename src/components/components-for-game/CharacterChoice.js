

const Choice = ({checkChoice, text="text", img=null}) => {
  return(
    <div className="choice-character" onClick={() => {checkChoice(text)}}>
      {img?(<img alt={text} src={img}></img>):img}
      <span>{text}</span>
    </div>
  )
}

export default Choice;