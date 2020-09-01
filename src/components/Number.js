import React from 'react';

const Number = props => (
    <button key={props.number} className="number">{props.number}</button> 
)

export default Number;