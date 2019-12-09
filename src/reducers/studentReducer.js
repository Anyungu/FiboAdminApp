

import { STREAMSUCCESS, 
    STUDENT,
    STUDENTFAIL,
    STUDENTSUCCESS,
    CLEANSTUDENTMESSAGE,
    DORMSUCCESS } from '../actions/types';

const INITIAL = {streams:[], dorms:[], studentLoading: false, studentMessage:'', studentColor:''};


export default (state=INITIAL, action) => {

     
    switch (action.type) {

        case STREAMSUCCESS:
            return {...state, streams: action.payload }   
            
        case DORMSUCCESS:
            return {...state, dorms: action.payload}

        case STUDENT:
            return {...state, studentLoading: true}

        case STUDENTSUCCESS:
            return {...state, studentLoading: false, studentMessage: action.payload, studentColor: 'success'}

        case STUDENTFAIL:
            return {...state, studentLoading: false, studentMessage: action.payload, studentColor: 'danger'}

        default:
            return state;
    }


};