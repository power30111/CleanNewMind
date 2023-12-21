import React, { useEffect } from 'react';

const ImageDecoding = ({ base64Data }) => {
    useEffect(()=>{
        console.log(base64Data)
    })
    return <img src={`data:image/png;base64,${base64Data}`} alt="base64" />;
};

export default ImageDecoding;