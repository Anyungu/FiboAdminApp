
import {
    ADMINCONTACT,
    ADMINCONTACTFAIL,
    ADMINCONTACTSUCCESS,
    CLEANADMINCONTACTMESSAGE,
    GETADMINCONTACTSUCCESS,
    CHANGEADMINPHONETEXT,
    CLOSEDEXAMSUCCESS,
    SCHEDULENORMAL,
    SCHEDULENORMALSUCCESS,
    SCHEDULENORMALFAIL,
    CLEANSCHEDULENORMALMESSAGE,
    SCHEDULEAVERAGE,
    SCHEDULEAVERAGEFAIL,
    SCHEDULEAVERAGESUCCESS,
    CLEANSCHEDULEAVERAGEMESSAGE
} from '../actions/types';


const INITIAL = {phoneNumber: '', 
       tempPhoneNumber:'',
       phoneNumberLoading:false,
       phoneNumberMessage:'',
       phoneNumberColor:'',
       closedExams: [],
       scheduleNormalLoading: false,
       scheduleNormalMessage:'',
       scheduleNormalColor:'',
       scheduleAverageLoading: false,
       scheduleAverageMessage:'',
       scheduleAverageColor:''
    };



export default (state=INITIAL, action) => {

    
    switch (action.type) {

        case GETADMINCONTACTSUCCESS:
            return {...state, phoneNumber: action.payloadMessage, tempPhoneNumber:action.payloadMessage}

        case ADMINCONTACT:
            return {...state, phoneNumberLoading: true}

        case ADMINCONTACTFAIL:
            return {...state, phoneNumberLoading: false, phoneNumberMessage: action.payloadMessage, phoneNumberColor: 'danger'}
        
        case ADMINCONTACTSUCCESS:
            return {...state, phoneNumberLoading: false, phoneNumberMessage: action.payloadMessage, phoneNumberColor: 'success'}

        case CLEANADMINCONTACTMESSAGE:
            return {...state, phoneNumberMessage: '', phoneNumberColor: ''}

        case CHANGEADMINPHONETEXT:
            return {...state, tempPhoneNumber: action.payload}

        case CLOSEDEXAMSUCCESS:
            return {...state, closedExams: action.payload}

        case SCHEDULENORMAL:
            return {...state, scheduleNormalLoading: true}

        case SCHEDULENORMALSUCCESS:
            return {...state, scheduleNormalLoading: false, scheduleNormalMessage: action.payload, scheduleNormalColor:'success'}

        case SCHEDULENORMALFAIL:
            return {...state, scheduleNormalLoading: false, scheduleNormalMessage: action.payload, scheduleNormalColor:'danger'}

        case CLEANSCHEDULENORMALMESSAGE:
            return {...state, scheduleNormalMessage:'', scheduleNormalColor:''}
       
        case SCHEDULEAVERAGE:
            return {...state, scheduleAverageLoading: true}

        case SCHEDULEAVERAGESUCCESS:
            return {...state, scheduleAverageLoading: false, scheduleAverageMessage: action.payload, scheduleAverageColor:'success'}

        case SCHEDULEAVERAGEFAIL:
            return {...state, scheduleAverageLoading: false, scheduleAverageMessage: action.payload, scheduleAverageColor:'danger'}

        case CLEANSCHEDULEAVERAGEMESSAGE:
            return {...state, scheduleAverageMessage:'', scheduleAverageColor:''}

        default:
            return state;
    }


};