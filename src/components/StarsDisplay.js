import React from 'react';

const StarDisplay = props => (
    // <>
    //     {utils.range(1, props.count).map(starId => 
    //         <div key={starId} className="star" />    
    //     )}
    // </>
    <div key={props.starId} className="star" />
)

export default StarDisplay;