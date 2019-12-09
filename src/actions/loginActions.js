

import {LOGGINGINUSER, LOGINSUCCESS, LOGINFAIL, RESETLOGINMESSAGE} from './types';
import axios from 'axios';
import {Actions} from 'react-native-router-flux';

export const loggingInUser = (code,staffID, password) => {
    return (dispatch) => {

        dispatch ({
            type: LOGGINGINUSER
        })

        let config = {
            headers: {'Content-Type': 'application/json'}
          };

        let url = `http://167.71.34.237:8080/openSchools/${code}`;
        
        let data = {
            "userEmail": code,
            "userPassword": password,
            "userType": "admin"
          }

        axios.get(url, config)
            .then(response => {

                console.log(response.data);
                if (response.data.code === 200) {
                    let path = response.data.data.schoolApiUrl;
                    url = path+'/auth/login';
                    axios.post(url, data, config)
                        .then(response => {
                            if (response.data.state === false) {
                                userFailedToLogIn('Invalid Credentials', dispatch);
                            }else {
                             
                                userLoggedInSuccessfully(code, path, password, staffID, response.data.accessToken, dispatch);
                            }
                        })
                        .catch(error => {
                          
                            userFailedToLogIn(error.message, dispatch);
                        })
                }else {
                    userFailedToLogIn(response.data.message, dispatch);
                }
            })
            .catch(error => {
             
                userFailedToLogIn(error.message, dispatch);
            })      
    };

};

const userLoggedInSuccessfully = (code, url, password, staffID, token, dispatch) => {
    
    dispatch ({
        type: LOGINSUCCESS,
        payloadToken: token,
        payloadUrl: url,
        payLoadStaff: staffID
    })

    Actions.dashBoard();
}

const userFailedToLogIn = (message, dispatch) => {

    dispatch ({
        type: LOGINFAIL,
        payload: message
    })

}

export const resetLoginErrorMessage = () => {
    return ({
        type: RESETLOGINMESSAGE,
    });
}