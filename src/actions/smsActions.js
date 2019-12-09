

import {SMSBALANCE, 
    SMSBALANCEFAIL, 
    CLASSES,
    CLASSESFAIL,
    CLASSESSUCCESS,
    PUSHSTK,
    ENDPUSHSTK,
    PUSHSTKFAIL,
    PUSHSTKSUCCESS,
    SMSBALANCESUCCESS,
    CLEANSMSMESSAGE,
    PARENTEXAM,
    PARENTEXAMSUCCESS,
    CLEANPUSHMESSAGE,
    SENDRESULTSSMS,
    SENDRESULTSSMSSUCCESS,
    CLEANSENDRESULTSMESSAGE,
    SENDRESULTSSMSFAIL,
    SENDCUSTOMSMS,
    SENDCUSTOMSMSFAIL,
    SENDCUSTOMSMSSUCCESS,
    CLEANSENDCUSTOMMESSAGE
} from './types';
import axios from 'axios';

import AsyncStorage from '@react-native-community/async-storage';


export const gettingSmsBalance = (path, token) => {

    return (dispatch) => {
        
        dispatch({
            type: SMSBALANCE
        });

        let config = {
            headers: {'Content-Type': 'application/json', 
                        'Authorization': `Bearer ${token}`
                    }
          
          };

        let url = `${path}/balance`;


        axios.get(url, config)
          .then(response => {
              if (response.data.code === 200) {
                    smsBalanceSuccess(response.data.data, dispatch, 'Balance refreshed', 'success');
                    storeData('smsBalance' , response.data.data);
              }else {
                    getData('smsBalance', dispatch);
              }
          })
          .catch(error => {
            getData('smsBalance', dispatch);
          })
    };

}

const smsBalanceSuccess = (balance, dispatch, message, color) => {
    dispatch({
        type: SMSBALANCESUCCESS,
        payload: balance,
        payloadSmsBalanceMessage: message,
        payloadSmsBalanceColor: color
    })
}

export const cleanSmsMessage = () => {
    return(
       { type: CLEANSMSMESSAGE}
    );
}


export const pushSTK = (path, token, amount, phone) => {

    return (dispatch) => {
        
        dispatch({
            type: PUSHSTK
        });

        let config = {
            headers: {
                        'Content-Type': 'application/json', 
                        Authorization: `Bearer ${token}`
                    }, 
            params: {
                'amount': amount, 
                'phoneStartingWith7': phone
            }
          
          };


        let url = `${path}/payForSms`;


        axios.post(url,null, config)
          .then(response => {

            console.log(response.data)
              if (response.data.code === 200) {
                   pushStkSuccess(response.data.message, dispatch);
              }else {
                    pushStkFail(response.data.message, dispatch)
              }
          })
          .catch(error => {
              console.log(error.message)
              pushStkFail(error.message, dispatch)
          })
    };

}

export const endPushStk = () => {
    return(
       { type: ENDPUSHSTK}
    );
}

export const cleanPushMessage = () => {
    return(
       { type: CLEANPUSHMESSAGE}
    );
}

const pushStkSuccess = (message, dispatch) => {
    dispatch({
        type: PUSHSTKSUCCESS,
        payload: message
    })
}

const pushStkFail = (message, dispatch) => {
    dispatch({
        type: PUSHSTKFAIL,
        payload: message
    })
}


storeData = async (key ,value) => {

    try {

        if (key === 'smsBalance') {
            await AsyncStorage.setItem(key, value.toString());
        }else {
            await AsyncStorage.setItem(key, JSON.stringify(value));
        }
    } 
    catch (e) {
    console.log(e);
    }
  }


getData = async (key, dispatch) => {
    try {
      const value = await AsyncStorage.getItem(key)
      
      if(value !== null) {
 
        smsBalanceSuccess(value, dispatch, 'Latest Available Balance. Connect to the internet to refresh balance', 'success');
      }else {
      
        smsBalanceSuccess(0, dispatch, 'No Balance yet. Connect to the internet and refresh', 'danger');
      }
    } catch(e) {
        console.log(e);
    }
}

getCustomData = async (key, dispatch) => {
    try {
      const value = await AsyncStorage.getItem(key)
      
      if(value !== null) {

     
        if (key === 'classes') {
            classSuccess(JSON.parse(value), dispatch);
        }

        if (key === 'exams') {
            examSuccess( JSON.parse(value), dispatch)
        }
       
      }else {
      
        if (key === 'classes') {
            classSuccess([{'label' : 'Connect Internet', 'value' : null}], dispatch);
        }

        if (key === 'exams') {
            examSuccess([{'label' : 'Connect Internet', 'value' : null}], dispatch);
        }
     
      }
    } catch(e) {
        console.log(e);
    }
}


export const getClasses = (path, token) => {

    return (dispatch) => {
        
        dispatch({
            type: CLASSES
        });

        let config = {
            headers: {'Content-Type': 'application/json', 
                        'Authorization': `Bearer ${token}`
                    }
          
          };

        let url = `${path}/class`;


        axios.get(url, config)
          .then(response => {

              if (response.data.code === 200) {

                let initialClas = response.data.data;

                const finalClass = initialClas.map(oneClass => {
                    return {'label' : oneClass.className, 'value' : oneClass.classNo}
                });

                finalClass.unshift({'label': 'All', 'value': 0});
                  classSuccess(finalClass, dispatch);
                  storeData('classes', finalClass);
              }else {
                    console.log(response.data);
                    getCustomData('classes', dispatch);
              }
          })
          .catch(error => {
            console.log(error.message);
            getCustomData('classes', dispatch);
          })
    };

}


const classSuccess = (classes, dispatch) => {
    dispatch({
        type: CLASSESSUCCESS,
        payload: classes
    })
}


export const getParentExam = (path, token) => {

    return (dispatch) => {
        
        dispatch({
            type: PARENTEXAM
        });

        let config = {
            headers: {'Content-Type': 'application/json', 
                        'Authorization': `Bearer ${token}`
                    }
          
          };

        let url = `${path}/parentAvailableExam`;


        axios.get(url, config)
          .then(response => {

              if (response.data.code === 200) {

                let initialExam = response.data.data;

                const finalExam = initialExam.map(oneExam => {
                    return {'label' : `${oneExam.examName}, Term ${oneExam.examTerm}, ${oneExam.examYear}`, 'value' : oneExam.examID}
                });
                  examSuccess(finalExam, dispatch);
                  storeData('exams', finalExam);
              }else {
                    console.log(response.data);
                    getCustomData('exams', dispatch);
              }
          })
          .catch(error => {
            console.log(error.message);
            getCustomData('exams', dispatch);
          })
    };

}


const examSuccess = (exams, dispatch) => {
    dispatch({
        type: PARENTEXAMSUCCESS,
        payload: exams
    })
}


export const sendResultsSms = (path, token, classNo, examID) => {

    return (dispatch) => {
        
        dispatch({
            type: SENDRESULTSSMS
        });

        let config = {
            headers: {'Content-Type': 'application/json', 
                        'Authorization': `Bearer ${token}`
                    }
          
          };

        let data = {
            "classNo": classNo,
            "examID": examID
          }

        let url = `${path}/resultsSms`;


        axios.post(url, data, config)
          .then(response => {

            console.log(response.data);

              if (response.data.code === 200) {

                resultsSmsSuccess(response.data.message, dispatch, path, token);
                
              }else {
                 resultsSmsFail(response.data.message, dispatch)
              }
          })
          .catch(error => {
            resultsSmsFail(error.message, dispatch)
          })
    };

}


const resultsSmsSuccess = (message, dispatch, path, token) => {
    dispatch({
        type: SENDRESULTSSMSSUCCESS,
        payload: message
    });
    // gettingSmsBalance(path, token);
}


const resultsSmsFail = (message, dispatch) => {
    dispatch({
        type: SENDRESULTSSMSFAIL,
        payload: message
    })
}


export const cleanResultsSmsMessage = () => {
    return(
       { type: CLEANSENDRESULTSMESSAGE}
    );
}


export const sendCustomSms = (path, token, audience, classNo, message) => {

    return (dispatch) => {
        
        dispatch({
            type: SENDCUSTOMSMS
        });

        let config = {
            headers: {'Content-Type': 'application/json', 
                        'Authorization': `Bearer ${token}`
                    }
          
          };

        let data = {
            "audience": audience,
            "classNo": classNo,
            "content": message
          }

        let url = `${path}/customSms`;


        axios.post(url, data, config)
          .then(response => {

            console.log(response.data);

              if (response.data.code === 200) {

                customSmsSuccess(response.data.message, dispatch, path, token);
                
              }else {
                 customSmsFail(response.data.message, dispatch)
              }
          })
          .catch(error => {
            customSmsFail(error.message, dispatch)
          })
    };

}


const customSmsSuccess = (message, dispatch) => {
    dispatch({
        type: SENDCUSTOMSMSSUCCESS,
        payload: message
    });
  
}


const customSmsFail = (message, dispatch) => {
    dispatch({
        type: SENDCUSTOMSMSFAIL,
        payload: message
    })
}


export const cleanCustomSmsMessage = () => {
    return(
       { type: CLEANSENDCUSTOMMESSAGE}
    );
}



