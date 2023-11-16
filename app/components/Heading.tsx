import React from 'react'
interface HeadingProps{
    text:string,
    className:string
}
const Heading :React.FC<HeadingProps>= ({text,className}) => {
  return (
    <div className={className}>{text}</div>
  )
}

export default Heading