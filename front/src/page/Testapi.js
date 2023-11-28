import React from 'react'

const Testapi = () => {

    useEffect(() => {
        axios.get('http://localhost:8080/test/url')
        .then((response) => {

        })
        .catch(error => {

        });
    },[])



    return (
        <div>
            
        </div>
    )
}

export default Testapi