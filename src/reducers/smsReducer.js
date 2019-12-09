import {SMSBALANCE, 
    SMSBALANCEFAIL, 
    SMSBALANCESUCCESS,
    PUSHSTK,
    PUSHSTKFAIL,
    PUSHSTKSUCCESS,
    CLEANPUSHMESSAGE,
    ENDPUSHSTK,
    CLASSES,
    CLASSESFAIL,
    CLASSESSUCCESS,
    CLEANSMSMESSAGE,
    PARENTEXAM,
    PARENTEXAMSUCCESS,
    SENDRESULTSSMS,
    SENDRESULTSSMSFAIL,
    SENDRESULTSSMSSUCCESS,
    CLEANSENDRESULTSMESSAGE,
    SENDCUSTOMSMS,
    SENDCUSTOMSMSFAIL,
    SENDCUSTOMSMSSUCCESS,
    CLEANSENDCUSTOMMESSAGE
} from '../actions/types';

const INITIAL = {balance: '',
            smsBalanceLoading: false,
            smsBalanceMessage:'',
            smsBalanceColor:'',
            pushLoading:false, 
            pushCompleteMessage:'',
            pushMessageColor: '' ,
            classes:[],
            parentExams:[],
            resultsSmsLoading: false,
            resultsSmsMessage:'',
            resultsSmsColor:'',
            customSmsLoading: false,
            customSmsMessage:'',
            customSmsColor:''
        };


export default (state=INITIAL, action) => {

     
    switch (action.type) {

        case SMSBALANCESUCCESS:
            return {...state, 
                balance: action.payload,
                smsBalanceLoading: false, 
                smsBalanceMessage: action.payloadSmsBalanceMessage,
                smsBalanceColor: action.payloadSmsBalanceColor
            };
        
        case PUSHSTK:
            return {...state, pushLoading: true};

        case PUSHSTKFAIL:
            return {...state, pushCompleteMessage:action.payload, pushLoading: false, pushMessageColor:'danger'};

        case PUSHSTKSUCCESS:
            return {...state, pushCompleteMessage: action.payload, pushMessageColor:'success'};

        case ENDPUSHSTK:
            return {...state, pushLoading:false, };

        case CLEANPUSHMESSAGE:
            return {...state, pushCompleteMessage: '', pushMessageColor: ''};

        case CLEANSMSMESSAGE:
            return {...state, smsBalanceMessage:'', smsBalanceColor:''};

        case CLASSESSUCCESS:
            return {...state, classes: action.payload};
        
        case PARENTEXAMSUCCESS:
            return {...state, parentExams: action.payload};
        
        case SENDRESULTSSMS:
            return {...state, resultsSmsLoading: true};

        case SENDRESULTSSMSSUCCESS:
            return {...state, resultsSmsColor:'success', resultsSmsLoading: false, resultsSmsMessage:action.payload};

        case SENDRESULTSSMSFAIL:
            return {...state, resultsSmsColor:'danger', resultsSmsLoading: false, resultsSmsMessage:action.payload};

        case CLEANSENDRESULTSMESSAGE:
            return {...state, resultsSmsColor:'', resultsSmsMessage:''};

        case SENDCUSTOMSMS:
            return {...state, customSmsLoading: true};

        case SENDCUSTOMSMSSUCCESS:
            return {...state, customSmsColor:'success', customSmsLoading: false, customSmsMessage:action.payload};

        case SENDCUSTOMSMSFAIL:
            return {...state, customSmsColor:'danger', customSmsLoading: false, customSmsMessage:action.payload};

        case CLEANSENDCUSTOMMESSAGE:
            return {...state, customSmsColor:'', customSmsMessage:''};


        default:
            return state;
    }


};