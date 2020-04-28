import React from 'react'
import circulationOne from './icons/circulationOne.svg'

export default function Previous(props) {
  return (
    <img
      src={circulationOne}
      className="icon"
      alt="circulationOne"
      onClick={props.onClick}
    />
  )
}
