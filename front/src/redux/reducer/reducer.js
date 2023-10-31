let initialState={
    user:{
        id:'',
        password: '',
        name:'',
        Email: ''
    }
}


function reducer(state=initialState,action){
    if(action.type === 'register'){
        return { ...state, user: { ...state.user, ...action.payload } };
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