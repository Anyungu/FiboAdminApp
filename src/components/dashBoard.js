
import React, {Component} from 'react';
import {View, 
    StyleSheet, 
    Text, 
    Dimensions, 
    TouchableOpacity,
    Animated
    } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {Actions} from 'react-native-router-flux';
import {getClasses} from '../actions';
import {connect} from 'react-redux';


class dashBoard extends Component {

    constructor () {
        super()
        this.springValue = new Animated.Value(0.4);
    };

    onSmsPress() {
        Actions.smsPage();
    }

    onStudentPress() {
        Actions.studentPage();
    }

    onExamPress() {
        Actions.examPage();
    }

    componentDidMount() {
       
        Animated.spring(
            this.springValue,
            {
              toValue: 1,
              friction: 1
            }
          ).start();

          const {url, token} = this.props
          this.props.getClasses(url, token);
    }


    render() {

        const {
            mainContainer,
            headerContainer,
            headerContainerText,
            lowerSectionContainer,
            dashBoardCardView,
            dashBoardCard,
            dashBoardIconView,
            dashBoardTextView,
            dashBoardText
        } = styles;

        const {
            height,
        } = Dimensions.get('screen');


        return(
            <View style = {mainContainer}>
                <View style = {headerContainer}>
                    <Text style = {headerContainerText}>
                        Fibo Admin
                    </Text>
                </View>

                <Animated.View style = {lowerSectionContainer}>
                    <View style = {dashBoardCardView}>
                        <TouchableOpacity style = {{...dashBoardCard, ...{transform: [{scale: this.springValue}]}}}
                            onPress = {this.onSmsPress.bind(this)}
                            >
                            <View style = {dashBoardIconView}>
                                <FontAwesome5 name='sms' size={height * 0.045} color='#76355B' />
                            </View>

                            <View style = {dashBoardTextView}>
                                <Text style = {dashBoardText}>
                                    SMS
                                </Text>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity style = {{...dashBoardCard, ...{transform: [{scale: this.springValue}]}}}
                            onPress = {this.onStudentPress.bind(this)}
                            >
                            <View style = {dashBoardIconView}>
                                <FontAwesome5 name='user-graduate' size={height * 0.045} color='#76355B' />
                            </View>

                            <View style = {dashBoardTextView}>
                                <Text style = {dashBoardText}>
                                    Student
                                </Text>
                            </View>

                        </TouchableOpacity>
                    </View>

                     <View style = {dashBoardCardView}>
                        <TouchableOpacity style = {dashBoardCard}
                            onPress = {this.onExamPress.bind(this)}
                            >

                            <View style = {dashBoardIconView}>
                                <FontAwesome5 name='folder-open' size={height * 0.045} color='#76355B' />
                            </View>

                            <View style = {dashBoardTextView}>
                                <Text style = {dashBoardText}>
                                    Exam
                                </Text>
                            </View>

                        </TouchableOpacity>
                    </View>
                </Animated.View>

            </View>
        );
    }
}




const {
    height,
    width
} = Dimensions.get('screen');

const styles = StyleSheet.create({

    mainContainer: {
        flex: 1
    },
    headerContainer: {
        backgroundColor: '#76355B',
        borderTopRightRadius: width * 0.025,
        borderTopLeftRadius: width * 0.025,
        width: width,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    lowerSectionContainer: {
        flex: 7,
        alignItems: 'center',
        paddingTop: height * 0.08,
        paddingBottom: height * 0.08,
       
    },
    headerContainerText: {
        color: 'white',
        fontSize: height * 0.05
    },
    dashBoardCardView: {
        flexDirection: 'row',   
    },

    dashBoardCard: {
        alignItems: 'center',
        justifyContent: 'center', 
        borderRadius: width * 0.02,
        shadowColor: '#555264',
        backgroundColor : '#ffffff',
        shadowOffset: {
            width: 0,
            height: 10
          },
        shadowOpacity: 50,
        elevation: 7,
        position: 'relative',
        paddingTop: height * 0.04,
        paddingBottom: height * 0.04,
        flex: 1,
        marginLeft: width * 0.05,
        marginRight: width * 0.05,
        marginBottom: height * 0.03

    },
    dashBoardIconView: {
        padding: width * 0.005
    },
    dashBoardTextView: {
        padding: width * 0.005
    },
    dashBoardText: {
        color: '#76355B',
        fontSize: height * 0.03
    }
  

});



const mapStateToProps = ({loginReducer}) => {

    const {token, url} =  loginReducer;

   
    return  {token, 
        url, 
    };

};

export default connect (mapStateToProps, {getClasses})(dashBoard);
