
import React  from 'react';
import {Scene, Router, Actions } from 'react-native-router-flux';
import dashBoard from './components/dashBoard';
import studentPage from './components/studentPage';
import smsPage from './components/smsPage';
import loginPage from './components/loginPage';
import examPage from './components/examPage';
import landingPage from './components/landingPage';
import studentFingerPrintPage from './components/studentFingerPrintPage';


const RouterComponent = () => {
    onBackPress = () => {    

        // const scene = Actions.currentScene;
        // if (scene === "landingPage" || scene === "finalHomePage" || scene === "registerSuccessPage" || scene === "adminHomePage" || scene === "spinnerPage") {
        //     BackHandler.exitApp();
        //     return true;
        // }
        // Actions.pop();
        // return true;
    }

    return(
        <Router backAndroidHandler={this.onBackPress}>
            <Scene key="root" hideNavBar>

                <Scene key="all">
                    
                    <Scene 
                    key = "landingPage" 
                    component= {landingPage}
                    hideNavBar
                    /> 

                    <Scene 
                    key = "dashBoard" 
                    component= {dashBoard}
                    hideNavBar
                  
                    /> 

                    <Scene
                    key = "studentPage"
                    component = {studentPage}
                    hideNavBar
                    />

                    <Scene
                    key = "smsPage"
                    component = {smsPage}
                    hideNavBar
                    />

                    <Scene
                    key = "loginPage"
                    component = {loginPage}
                    hideNavBar
                    />

                    <Scene
                    key = "studentFingerPrintPage"
                    component = {studentFingerPrintPage}
                    hideNavBar
                    initial
                    />

                    <Scene
                    key = "examPage"
                    component = {examPage}
                    hideNavBar 
                    />

                    <Scene 
                    key =  "landingPage"
                    component = {landingPage}
                    hideNavBar
                    // initial
                    />

                    
               </Scene>


                
                
            </Scene>
        </Router>
    );

};

export default RouterComponent;
