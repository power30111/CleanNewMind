function getToken(accessToken) {
    return (dispatch,getstate) =>{
        sessionStorage.setItem('token',accessToken);
        dispatch({type:'setToken',payload:accessToken});
    };
}


export const LoginAction={getToken}