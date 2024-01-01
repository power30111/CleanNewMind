import React, { useEffect } from 'react';

const ImageDecoding = ({ base64Data }) => {
    useEffect(()=>{
        console.log(base64Data)
    })
    return <img className='imagesize' src={`data:image/png;base64,${base64Data}`} />;
};

export default ImageDecoding;