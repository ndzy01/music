import React from 'react'
import random from './icons/random.svg'

export default function Previous(props) {
  return (
    <img src={random} className="icon" alt="random" onClick={props.onClick} />
  )
}
