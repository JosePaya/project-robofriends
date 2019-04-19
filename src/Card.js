import React from 'react';

const Card = (props) => {

    // Destructured properties
    const { id, name, email} = props;
    
    return (
        <div className="tc bg-light-green dib pa3 ma2 grow bw2 shadow-5">
            <img src={`https://robohash.org/${id}?size=200x200`} alt="Test"></img>
            <div>
                <h2>{name}</h2>
                <p>{email}</p>
            </div>
        </div>
    );
}

export default Card;