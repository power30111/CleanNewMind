function getToken(accessToken) {
    return (dispatch,getstate) =>{
        localStorage.setItem('token',accessToken);
        dispatch({type:'setToken',payload:accessToken});
    };
}


export const LoginAction={getToken}