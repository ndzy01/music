import React from 'react'
import circulation from './icons/circulation.svg'

export default function Previous(props) {
  return (
    <img
      src={circulation}
      className="icon span10"
      alt="circulation"
      onClick={props.onClick}
    />
  )
}
