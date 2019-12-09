
import {
    ADMINCONTACT,
    ADMINCONTACTFAIL,
    ADMINCONTACTSUCCESS,
    CLEANADMINCONTACTMESSAGE,
    GETADMINCONTACTSUCCESS,
    CHANGEADMINPHONETEXT,
    CLOSEDEXAMSUCCESS,
    SCHEDULENORMALSUCCESS,
    SCHEDULENORMALFAIL,
    SCHEDULENORMAL,
    CLEANSCHEDULENORMALMESSAGE,
    SCHEDULEAVERAGE,
    SCHEDULEAVERAGEFAIL,
    SCHEDULEAVERAGESUCCESS,
    CLEANSCHEDULEAVERAGEMESSAGE
} from './types';

import axios from 'axios';

import AsyncStorage from '@react-native-community/async-storage';




export const getAdminContact = (path, token) => {

    return (dispatch) => {

        let config = {
            headers: {'Content-Type': 'application/json', 
                        'Authorization': `Bearer ${token}`
                    }
          
          };

        let url = `${path}/adminPhoneNumber`;


        axios.get(url, config)
          .then(response => {

              if (response.data.code === 200) {

                    adminPhoneGetSuccess(response.data.data, dispatch);
                    storeData('adminPhone', response.data.data);
              }else {
                    console.log(response.data);
                    getCustomData('adminPhone', dispatch);
              }
          })
          .catch(error => {
            console.log(error.message);
            getCustomData('adminPhone', dispatch);
          })
    };

}


const adminPhoneGetSuccess = (phone, dispatch) => {
    dispatch({
        type: GETADMINCONTACTSUCCESS,
        payloadMessage: phone
    })
}

export const tempPhoneNumberChangeText = (value) => {
    return ({
        type: CHANGEADMINPHONETEXT,
        payload: value 
    });
}



export const updateAdminContact = (path, token, phone) => {

    return (dispatch) => {

        dispatch({
            type: ADMINCONTACT,
          
        })

        console.log(token);

        let config = {
            headers: {'Content-Type': 'application/json', 
                       Authorization: `Bearer ${token}`
                    },
            params: {
                'phone': phone
            }
          
          };

        let url = `${path}/adminPhoneNumber`;


        axios.put(url, null, config)
          .then(response => {
                console.log(response.data);
              if (response.data.code === 200) {

                    adminPhoneUpdateSuccess(response.data.message, dispatch);
                    storeData('adminPhone', phone);
              }else {
                   
                   adminPhoneUpdateFail(response.data.message, dispatch);
              }
          })
          .catch(error => {
            
            adminPhoneUpdateFail(error.message, dispatch);
          })
    };

}



const adminPhoneUpdateSuccess = (message, dispatch) => {
    dispatch({
        type: ADMINCONTACTSUCCESS,
        payloadMessage: message
    })
}


const adminPhoneUpdateFail = (message, dispatch) => {
    dispatch({
        type: ADMINCONTACTFAIL,
        payloadMessage: message
    })
}


export const cleanUpdateContactMessage = () => {
    return({
        type: CLEANADMINCONTACTMESSAGE
    });
}






storeData = async (key ,value) => {

    try {

        if (key === 'adminPhone') {
            await AsyncStorage.setItem(key, value);
        }else {
            await AsyncStorage.setItem(key, JSON.stringify(value));
        }
    } 
    catch (e) {
    console.log(e);
    }
  }



getCustomData = async (key, dispatch) => {
    try {
      const value = await AsyncStorage.getItem(key)
      
      if(value !== null) {

     
        if (key === 'adminPhone') {
            adminPhoneGetSuccess(value, dispatch);
        }

        if (key === 'examsClosed') {
            closedxamSuccess(JSON.parse(value), dispatch);
        }

       
       
      }else {
      
        if (key === 'adminPhone') {
            adminPhoneGetSuccess('NULL', dispatch);
        }
        if (key ==='examsClosed') {
            closedxamSuccess([{'label' : 'Connect Internet', 'value' : null}], dispatch);
        }

     
      }
    } catch(e) {
        console.log(e);
    }
}


export const getClosedExam = (path, token) => {

    return (dispatch) => {

        let config = {
            headers: {'Content-Type': 'application/json', 
                        'Authorization': `Bearer ${token}`
                    }
          
          };

        let url = `${path}/closedExam`;


        axios.get(url, config)
          .then(response => {

        

              if (response.data.code === 200) {

                let initialExam = response.data.data;

                const finalExam = initialExam.map(oneExam => {
                    return {'label' : `${oneExam.examName}, Term ${oneExam.examTerm}, ${oneExam.examYear}`, 'value' : oneExam.examID}
                });
                  closedExamSuccess(finalExam, dispatch);
                  storeData('examsClosed', finalExam);
              }else {
                    getCustomData('examsClosed', dispatch);
              }
          })
          .catch(error => {
            console.log(error.message);
            getCustomData('examsClosed', dispatch);
          })
    };

}


const closedExamSuccess = (exams, dispatch) => {
    dispatch({
        type: CLOSEDEXAMSUCCESS,
        payload: exams
    })
}


export const scheduleNormal = (path, token, exam, prevExam) => {

    return (dispatch) => {
        
        dispatch({
            type: SCHEDULENORMAL
        });

        let config = {
            headers: {
                        'Content-Type': 'application/json', 
                        Authorization: `Bearer ${token}`
                    }, 
            params: {
                'examID': exam, 
                'prevexamID': prevExam
            }
          
          };


        let url = `${path}/analyze`;


        axios.post(url,null, config)
          .then(response => {

        
              if (response.data.code === 200) {
                   scheduleNormalSuccess(response.data.message, dispatch);
              }else {
                    scheduleNormalFail(response.data.message, dispatch)
              }
          })
          .catch(error => {
         
              scheduleNormalFail(error.message, dispatch)
          })
    };

}



export const cleanScheduleNormalMessage = () => {
    return(
       { type: CLEANSCHEDULENORMALMESSAGE}
    );
}

const scheduleNormalSuccess = (message, dispatch) => {
    dispatch({
        type: SCHEDULENORMALSUCCESS,
        payload: message
    })
}

const scheduleNormalFail = (message, dispatch) => {
    dispatch({
        type: SCHEDULENORMALFAIL,
        payload: message
    })
}




export const scheduleAverage = (path, token, exams, prevExams) => {

    return (dispatch) => {
        
        dispatch({
            type: SCHEDULEAVERAGE
        });

        let config = {
            headers: {
                        'Content-Type': 'application/json', 
                        Authorization: `Bearer ${token}`
                    }
          };

          console.log(exams);
          console.log(prevExams);

          let data = {
            "examsToBeAnalysed": exams,
            "prevExams": prevExams
          }


        let url = `${path}/createTermAverage`;


        axios.post(url,data, config)
          .then(response => {

            console.log(response.data)
              if (response.data.code === 200) {
                   scheduleAverageSuccess(response.data.message, dispatch);
              }else {
                    scheduleAverageFail(response.data.message, dispatch)
              }
          })
          .catch(error => {
              console.log(error.message)
              scheduleAverageFail(error.message, dispatch)
          })
    };

}



export const cleanScheduleAverageMessage = () => {
    return(
       { type: CLEANSCHEDULEAVERAGEMESSAGE}
    );
}

const scheduleAverageSuccess = (message, dispatch) => {
    dispatch({
        type: SCHEDULEAVERAGESUCCESS,
        payload: message
    })
}

const scheduleAverageFail = (message, dispatch) => {
    dispatch({
        type: SCHEDULEAVERAGEFAIL,
        payload: message
    })
}