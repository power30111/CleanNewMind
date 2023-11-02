let initialState={
    user:{
        userId:'',
        password: '',
        name:'',
        Email: ''
    },
    login:{
        userId:'',
        password: '',
    }
}


function reducer(state=initialState,action){
    if(action.type === 'Login'){
        const { name, value } = action.payload;
        return {...state,login: {...state.login, [name]: value,}}
    }
    if(action.type === 'userInfo'){
        const { name, value } = action.payload;
        return {...state,user: {...state.user, [name]: value,}}
    }
    else{
        return{...state}
    }
};

export default reducer