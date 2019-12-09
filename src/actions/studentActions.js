
import {STREAMSUCCESS, DORMSUCCESS, STUDENT, STUDENTFAIL, CLEANSTUDENTMESSAGE } from './types';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';



export const getStreams = (path, token) => {

    return (dispatch) => {

        let config = {
            headers: {'Content-Type': 'application/json', 
                        'Authorization': `Bearer ${token}`
                    }
          
          };

        let url = `${path}/stream`;


        axios.get(url, config)
          .then(response => {

              if (response.data.code === 200) {

                let initialStream = response.data.data;

                const finalStream = initialStream.map(oneStream => {
                    return {'label' : `${oneStream.streamName}`, 'value' : oneStream.streamID}
                });
                  streamSuccess(finalStream, dispatch);
                  storeData('streams', finalStream);
              }else {
                    getCustomData('streams', dispatch);
              }
          })
          .catch(error => {
            console.log(error.message);
            getCustomData('streams', dispatch);
          })
    };

}


const streamSuccess = (streams, dispatch) => {
    dispatch({
        type: STREAMSUCCESS,
        payload: streams
    })
}


export const getDorms = (path, token) => {

    return (dispatch) => {

        let config = {
            headers: {'Content-Type': 'application/json', 
                        'Authorization': `Bearer ${token}`
                    }
          
          };

        let url = `${path}/dormitories`;


        axios.get(url, config)
          .then(response => {

              if (response.data.code === 200) {

                let initialDorm = response.data.data;

                const finalDorm = initialDorm.map(oneDorm => {
                    return {'label' : `${oneDorm.dormName}`, 'value' : oneDorm.dormID}
                });
                  dormSuccess(finalDorm, dispatch);
                  storeData('dorms', finalDorm);
              }else {
                    getCustomData('dorms', dispatch);
              }
          })
          .catch(error => {
            console.log(error.message);
            getCustomData('dorms', dispatch);
          })
    };

}


const dormSuccess = (dorms, dispatch) => {
    dispatch({
        type: DORMSUCCESS,
        payload: dorms
    })
}




storeData = async (key ,value) => {

    try {

            await AsyncStorage.setItem(key, JSON.stringify(value));
        
    } 
    catch (e) {
    console.log(e);
    }
  }



getCustomData = async (key, dispatch) => {
    try {
      const value = await AsyncStorage.getItem(key)
      
      if(value !== null) {

        if (key === 'streams') {
            streamSuccess(JSON.parse(value), dispatch);
        }
       
      }else {
      
        if (key ==='streams') {
            streamSuccess([{'label' : 'Connect Internet', 'value' : null}], dispatch);
        }

     
      }
    } catch(e) {
        console.log(e);
    }
}



export const addStudent = (
            path, 
            token,
            admValue, 
            nemisValue,
            nameValue,
            kcpeValue,
            residenceValue,
            guardianNameValue,
            guardianContactValue,
            classValue,
            streamValue,
            dormValue,
            genderValue,
            statusValue,
            countyValue,   
            file,
     ) => {

    return (dispatch) => {
        
        dispatch({
            type: STUDENT
        });

        console.log(file);

        const data = new FormData();
        data.append('file', file);
        data.append('classNo', classValue);
        data.append('dormitoryID', dormValue);
        data.append('streamID', streamValue);
        data.append('studentAdminNo', admValue);
        data.append('studentCounty', countyValue);
        data.append('studentGender', genderValue);
        data.append('studentKcpeMarks', kcpeValue);
        data.append('studentName', nameValue);
        data.append('studentNemisUPI', nemisValue);
        data.append('studentParentName', guardianNameValue);
        data.append('studentParentPhone', guardianContactValue);
        data.append('studentResidence', residenceValue)
        data.append('studentStatus' , statusValue);

        let config = {
            headers: {
                        'Content-Type': 'multipart/form-data', 
                        Authorization: `Bearer ${token}`
                    }
          };


        let url = `${path}/student`;


        axios.post(url,data,config)
          .then(response => {

            console.log(response.data)
              if (response.data.code === 200) {
                //    pushStkSuccess(response.data.message, dispatch);
              }else {
                    // pushStkFail(response.data.message, dispatch)
              }
          })
          .catch(error => {
              console.log(error)
            //   pushStkFail(error.message, dispatch)
          })
    };

}

// export const endPushStk = () => {
//     return(
//        { type: ENDPUSHSTK}
//     );
// }

// export const cleanPushMessage = () => {
//     return(
//        { type: CLEANPUSHMESSAGE}
//     );
// }

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