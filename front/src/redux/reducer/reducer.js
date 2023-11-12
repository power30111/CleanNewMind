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
    },
    token:'null',

    islogin : false,

    text : {
        title : '',
        content : '',
    },
    data:[],

    urlid : '',

    taketext : {
        id : '',
        title : '',
        writer : '',
        content : '',
    }
}


function reducer(state=initialState,action){

    switch (action.type) {
        case 'boardlist':
            return {...state, data:action.payload}
        case 'Login':
            const { name: loginName, value: loginValue } = action.payload;
            return { ...state, login: { ...state.login, [loginName]: loginValue } };
        
        case 'userInfo':
            const { name: userInfoName, value: userInfoValue } = action.payload;
            return { ...state, user: { ...state.user, [userInfoName]: userInfoValue } };
    
        case 'setToken':
            const token = action.payload;
            console.log('리듀서 : ', token);
            return { ...state, token: action.payload };
    
        case 'login':
            return{...state, islogin: action.payload}
        
        case 'logout':
            return {...state, islogin: action.payload}

        case 'write' :
            const { name: textName, value: textValue } = action.payload;
            return { ...state, text:{...state.text, [textName]: textValue } };

        case 'selectid':
            return {...state, urlid:action.payload}
        case 'takecontent':
            return {...state, taketext:action.payload}


        default:
            return state;
    }
};

export default reducer
