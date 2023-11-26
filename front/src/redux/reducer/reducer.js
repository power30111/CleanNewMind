let initialState={
    user:{
        userId:'',
        password: '',
        name:'',
        Email: '',
    },
    edit : {
        userId:'',
        password: '',
        name:'',
        Email: '',
        exPassword:'',
        newPassword: '',
    },
    testpassword:false,
    login:{
        userId:'',
        password: '',
    },
    token:'null',

    islogin : false,

    text : {
        id : '',
        title : '',
        writer : '',
        content : '',
    },
    data:[],

    urlid : '',

    taketext : {
        id : '',
    }
}


function reducer(state=initialState,action){

    switch (action.type) {
        /* 홈 */
        case 'boardlist':
            return {...state, data:action.payload}

        /* 로그인 */
        case 'Login':
            const { name: loginName, value: loginValue } = action.payload;
            return { ...state, login: { ...state.login, [loginName]: loginValue } };
        
        case 'login':
            return{...state, islogin: action.payload}

        case 'setToken':
            const token = action.payload;
            console.log('리듀서 : ', token);
            return { ...state, token: action.payload };
        
        /* 회원가입 */
        case 'userInfo':
            const { name: userInfoName, value: userInfoValue } = action.payload;
            return { ...state, user: { ...state.user, [userInfoName]: userInfoValue } };

        /* 네비바 */
        case 'logout':
            localStorage.removeItem("token");
            return {...state, islogin: action.payload, token:"null"}

        /* 글쓰기 */
        case 'write' :
            const { name: textName, value: textValue } = action.payload;
            return { ...state, text:{...state.text, [textName]: textValue } };

        case 'reset' :
            return { ...state, text:{ title : '', content: ''} };
    
        /* 글쓰기 수정 */


        /* 리스트 */
        case 'takecontent':
            return {...state, text:action.payload}
        
        case 'urlid':
            return {...state, urlid:action.payload}

        /* 회원정보수정 */

        case 'testPassword':
            return {...state, testpassword:action.payload}

        case 'edit':
            const { name: editName, value: editValue } = action.payload;
            return { ...state, edit: { ...state.edit, [editName]: editValue } };

        case 'delete-edit' :
            return { ...state, edit:{ userId:'', password: '', name:'', Email: '', exPassword:'', newPassword: '',} };

        default:
            return state;
    }
};

export default reducer
