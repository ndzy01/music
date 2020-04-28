import React from 'react'
import previous from './icons/previous.svg'

export default function Previous(props) {
  return <img src={previous} className="icon span10" alt="previous" onClick={props.onClick} />
}
