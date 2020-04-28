import React from 'react'
import next from './icons/next.svg'

export default function Next(props) {
  return <img src={next} className="icon" alt="next" onClick={props.onClick} />
}
