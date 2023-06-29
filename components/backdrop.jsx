import React from 'react'

export default function Backdrop(props) {
  const {className, children, ...otherProps} = props;
  return (
    <div {...otherProps} className={`z-10 fixed top-0 left-0 right-0 w-full h-screen overflow-hidden bg-gray-700 opacity-60 m-0 ${className}`}>
        {props.children}
    </div>
  )
}
