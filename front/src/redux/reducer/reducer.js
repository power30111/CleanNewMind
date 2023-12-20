let initialState={
    user:{
        userId:'',
        password: '',
        name:'',
        email: '',
    },
    edit : {
        userId:'',
        password: '',
        name:'',
        email: '',
        exPassword:'',
        newPassword: '',
    },
    myInfo :{
        userId:'',
        name:'',
        email: '',
    },
    testpassword:'',
    login:{
        userId:'',
        password: '',
    },
    token:'null',

    isLogin : false,

    text : {
        id : '',
        title : '',
        writer : '',
        content : [],
    },
    isimage : false,
    inputtext : '',
    data:[],

    searchValue : '',

    paging : {
        totalElements: 0,
        totalPages : 0,
        number : 0,
    },

    urlid : '',

    getStatus : '',

    takeboard : {
        title:'',
        content : [{
            order:'',
            text:'',
            image:'',
        }],
    },
    comment:{
        content:''
    },
    commentList : [],
    editField : '',
    modalIsOpen:false,

    comparetext:''
}


function reducer(state=initialState,action){

    switch (action.type) {
        /* 홈 */
        case 'boardlist':
            return {...state, data:action.payload}

        case 'paging' :
            return {
                ...state,
                paging: {
                    totalElements: parseInt(action.payload.totalElements, 10) || 0,
                    totalPages: action.payload.totalPages || 0,
                    number: action.payload.number || 0,
                }
            };
        /* 검색어 */
        case 'searchValue' :
            return {...state, searchValue: action.payload}

        /* 로그인 */
        case 'Login':
            const { name: loginName, value: loginValue } = action.payload;
            return { ...state, login: { ...state.login, [loginName]: loginValue } };
        
        case 'login':
            return{...state, isLogin: action.payload}

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
            return {...state, isLogin: action.payload, token:"null"}

        /* 글쓰기 */
        case 'title' : 
            return {...state, text : {title : action.payload}}

        case 'write' :
            const { name: textName, value: textValue } = action.payload;
            return { ...state, text:{...state.text, [textName]: textValue } ,inputtext:textValue};

        case 'reset' :
            return { ...state, text:{ title : '', content: ''} };

        case 'comment':
            const { name: commentName, value: commentValue } = action.payload;
            return {...state, comment : { ...state.comment, [commentName]: commentValue }}

        case 'comment-reset':
            return {...state, comment : {...state.comment, content : '' }}
        case 'comparetext':
            return {...state, comparetext : action.payload}

        case 'isimage' :
            return {...state, isimage: action.payload}

        /* 리스트 */
        case 'takecontent':
            return {...state, takeboard:action.payload}
        
        case 'urlid':
            return {...state, urlid:action.payload}

        case 'getcommentList':
            console.log('댓글조회 성공')
            return {...state, commentList:action.payload}

        case 'getStatus':
            return {...state, getStatus:action.payload}

        /* 회원정보수정 */

        case 'testPassword':
            return {...state, testpassword:action.payload}

        case 'getMyInfo':
            return { ...state, myInfo : action.payload}
        

        case 'edit':
            const { name: editName, value: editValue } = action.payload;
            return { ...state, edit: { ...state.edit, [editName]: editValue } };

        case 'delete-edit' :
            return { ...state, edit:{ userId:'', password: '', name:'', Email: '', exPassword:'', newPassword: '',} };

        /*팝업창 설정*/

        case 'openModal':
            return { ...state, modalIsOpen : action.payload}

        case 'closeModal':
            return { ...state, modalIsOpen : action.payload}
        case 'getEditField':
            return {...state, editField : action.payload}


        default:
            return state;
    }
};

export default reducer
