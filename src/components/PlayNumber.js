import React from 'react';

const Number = props => (
    <button 
    key={props.number} 
    className="number"
    onClick={() => console.log('Num', props.number)}>
        {props.number}
    </button> 
)

export default Number;