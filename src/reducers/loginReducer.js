import {LOGGINGINUSER, LOGINFAIL, LOGINSUCCESS, RESETLOGINMESSAGE} from '../actions/types';

const INITIAL = {code: '', password: '', loading:false, error:'', token:'', url:'' };


export default (state=INITIAL, action) => {

     
    switch (action.type) {

        case LOGGINGINUSER:
            return {...state, loading:true, code: '', password: '', error:''};

        case LOGINSUCCESS:
            return {...state,  loading:false, code: '', password: '', error:'' , token:action.payloadToken, url: action.payloadUrl};

        case LOGINFAIL:
            return {...state, loading:false, code: '', password: '', error: action.payload, token:'', url:'' };

        case RESETLOGINMESSAGE:
            return {...state, error: '' }    
        default:
            return state;
    }


};