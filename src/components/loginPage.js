
import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    Image,
    TextInput,
    ScrollView,
    Text,
    ImageBackground,
    TouchableOpacity,
    Keyboard,
    ActivityIndicator,
    Dimensions
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { loggingInUser, resetLoginErrorMessage } from '../actions';
import { connect } from 'react-redux';


class loginPage extends Component {


    constructor() {
        super();

    }

    componentDidMount() {
        this.keyboardDidShowListener = Keyboard.addListener(
            'keyboardDidShow',
            this._keyboardDidShow,
        );
        this.keyboardDidHideListener = Keyboard.addListener(
            'keyboardDidHide',
            this._keyboardDidHide,
        );
        this.props.resetLoginErrorMessage();
    }

    componentWillUnmount() {
        this.keyboardDidShowListener.remove();
        this.keyboardDidHideListener.remove();
        this.props.resetLoginErrorMessage();
    }

    _keyboardDidShow = () => {

        const { password, passwordIsFocused, code, codeIsFocused } = this.state;

        if (passwordIsFocused) {
            this.passwordValid(password, 'show');

        }

        if (codeIsFocused) {
            this.schoolCodeValid(code, 'show')
        }

        this.props.resetLoginErrorMessage();

    }

    _keyboardDidHide = () => {
        this.schoolCodeValid(this.state.code, 'hide');
        this.passwordValid(this.state.password, 'hide');
    }

    state = {
        code: '100100100',
        staff: '1',
        password: 'fibo1234',
        codeText: '',
        codeIsFocused: false,
        passwordText: '',
        passwordIsFocused: false,
        secureText: true
    }


    onLoginPress() {

        this.props.resetLoginErrorMessage();


        if (this.schoolCodeValid() && this.passwordValid()) {
            const { code, password } = this.state;
            this.props.loggingInUser(code, password);
        }



    }

    schoolCodeValid(codeV, action) {


        if (action === 'hide') {

            this.setState({
                codeText: '',

            })

        }
        else if (action === 'check') {

            this.setState({
                code: codeV
            })


            if (codeV === '' || codeV === null) {
                this.setState({
                    codeText: 'Cannot Be Empty'
                })
            }

            else if (isNaN(codeV)) {
                this.setState({
                    codeText: 'Must be a number'
                })
            }

            else {
                this.setState({
                    codeText: ''
                })
            }
        } else {


            const { code } = this.state;

            if (code === null || code === '') {
                this.setState({
                    codeText: 'Cannot Be Empty',
                    codeIsFocused: true,
                    passwordIsFocused: false,
                    staffIsFocused: false
                })
                return false;
            }

            else if (isNaN(code)) {
                this.setState({
                    codeText: 'Must be a number',
                    codeIsFocused: true,
                    passwordIsFocused: false,
                    staffIsFocused: false
                })
                return false;
            }

            else {
                this.setState({
                    codeText: '',
                    codeIsFocused: true,
                    passwordIsFocused: false,
                    staffIsFocused: false
                })
                return true;
            }

        }
    }

    passwordValid(passwordV, action) {


        if (action === 'hide') {
            this.setState({
                passwordText: '',

            })
        }
        else if (action === 'check') {

            this.setState({
                password: passwordV
            })

            if (passwordV === '') {
                this.setState({
                    passwordText: 'Cannot be empty'
                })
            } else {
                this.setState({
                    passwordText: ''
                })
            }

        } else {

            const { password } = this.state;

            if (password === '') {
                this.setState({
                    passwordText: 'Cannot be empty',
                    codeIsFocused: false,
                    passwordIsFocused: true,
                    staffIsFocused: false
                })
                return false;
            } else {
                this.setState({
                    passwordText: '',
                    codeIsFocused: false,
                    passwordIsFocused: true,
                    staffIsFocused: false
                })
                return true;
            }

        }

    }



    belowSchoolCode() {
        const { codeText } = this.state;
        const {
            belowInput,
        } = styles

        if (codeText !== '') {
            return (
                <View style={belowInput}>
                    <Text style={{ color: 'red' }}>
                        {codeText}
                    </Text>
                </View>
            );
        }
    }


    belowPassword() {
        const { passwordText } = this.state;
        const {
            belowInput,
        } = styles

        if (passwordText !== '') {
            return (
                <View style={belowInput}>
                    <Text style={{ color: 'red' }}>
                        {passwordText}
                    </Text>
                </View>
            );
        }
    }



    toggleEye() {
        this.setState({
            secureText: !this.state.secureText
        })
        this.props.resetLoginErrorMessage();
    }

    eyeOrSlash() {
        const { secureText } = this.state;
        const { iconSideView } = styles;

        if (secureText == false) {
            return (
                <TouchableOpacity style={iconSideView}
                    onPress={this.toggleEye.bind(this)}
                >
                    <Ionicons name='md-eye' size={height * 0.05} color='white' />
                </TouchableOpacity>
            );

        } else {
            return (
                <TouchableOpacity style={iconSideView}
                    onPress={this.toggleEye.bind(this)}
                >
                    <Ionicons name='md-eye-off' size={height * 0.05} color='white' />
                </TouchableOpacity>
            );
        }
    }

    buttonOrSpinner() {
        const { loading } = this.props;
        const { topUpButtonView, topUpbutton, topUpButtonFontSize } = styles;

        if (loading) {

            return (
                <View style={topUpButtonView}>

                    <ActivityIndicator
                        size={height * 0.08}
                        color='#E68100'
                    />

                </View>

            );

        } else {
            return (
                <View style={topUpButtonView}>
                    <TouchableOpacity style={topUpbutton}
                        onPress={this.onLoginPress.bind(this)}
                    >
                        <Text style={topUpButtonFontSize}>
                            LOGIN
                        </Text>
                    </TouchableOpacity>
                </View>

            );

        }
    }

    errorMessageOrNot() {
        const { error } = this.props;
        const { errorMessageText, errorMessageView } = styles;

        if (error !== '') {
            return (
                <View style={errorMessageView}>
                    <Text style={errorMessageText}>
                        {error}
                    </Text>
                </View>
            );
        }
    }



    render() {

        const {
            mainContainer,
            scrollViewContainer,
            twinInputView,

            textInputSideView,

            logoImageView,
            textInputStyle
        } = styles;
        const { height, width } = Dimensions.get('screen');

        let heightD = width * 0.45;

        return (
            <ImageBackground source={require('../images/firstimage.jpg')}
                style={{ ...mainContainer, ...{ height: height, width: width } }}
                blurRadius={5}
            >
                <ScrollView contentContainerStyle={scrollViewContainer}
                    showsHorizontalScrollIndicator={false}
                >


                    <View style={logoImageView}>

                        <Image source={require('../images/logo.jpg')}
                            style={{ height: heightD, width: heightD, resizeMode: 'center', borderRadius: heightD * 2 }}
                        />

                    </View>

                    <View style={twinInputView}>
                        <View style={textInputSideView}>
                            <TextInput
                                placeholder="School Code"
                                keyboardType='numeric'
                                placeholderTextColor={'rgba(255, 255, 255, 0.38)'}
                                value={this.state.code}
                                onChangeText={value => this.schoolCodeValid(value, 'check')}
                                onFocus={value => this.schoolCodeValid(value, 'show')}
                                onBlur={value => this.schoolCodeValid(value, 'hide')}
                                style={textInputStyle}

                            />

                        </View>
                    </View>

                    {this.belowSchoolCode()}



                    <View style={twinInputView}>
                        <View style={textInputSideView}>
                            <TextInput
                                placeholder="*********"
                                placeholderTextColor={'rgba(255, 255, 255, 0.38)'}
                                value={this.state.password}
                                onChangeText={value => this.passwordValid(value, 'check')}
                                onFocus={value => this.passwordValid(value, 'show')}
                                onBlur={value => this.passwordValid(value, 'hide')}
                                secureTextEntry={this.state.secureText}
                                style={textInputStyle}
                            />

                        </View>
                        {this.eyeOrSlash()}
                    </View>


                    {this.errorMessageOrNot()}

                    {this.buttonOrSpinner()}

                </ScrollView>


            </ImageBackground>
        );
    }
}
const mapStateToProps = ({ loginReducer }) => {

    const { code, password, loading, error } = loginReducer;

    return { code, password, loading, error };

};

export default connect(mapStateToProps, { loggingInUser, resetLoginErrorMessage })(loginPage);

const { width, height } = Dimensions.get('screen');

const styles = StyleSheet.create({

    mainContainer: {
        flex: 1
    },
    scrollViewContainer: {
        paddingTop: height * 0.05
    },

    twinInputView: {
        marginVertical: height * 0.01,
        flexDirection: 'row',
        justifyContent: 'space-around',
        borderBottomWidth: height * 0.002,
        borderBottomColor: 'white',
        width: width * 0.8,
        alignSelf: 'center',
        borderRadius: width * 0.03
    },
    iconSideView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'flex-end'
    },
    textInputSideView: {
        flex: 4,
        justifyContent: 'flex-end'
    },
    topUpbutton: {
        backgroundColor: '#E68100',
        borderRadius: width * 0.03,
        paddingTop: height * 0.01,
        paddingBottom: height * 0.01,
        paddingLeft: width * 0.15,
        paddingRight: width * 0.15,
        elevation: 7,
        position: 'relative',
        shadowColor: '#555264',
        shadowOffset: {
            width: 0,
            height: 10
        },
        shadowOpacity: 50,
    },
    topUpButtonView: {
        alignItems: 'center',
        paddingLeft: width * 0.05,
        paddingRight: width * 0.05,
        paddingVertical: height * 0.05,
        marginVertical: height * 0.025

    },
    topUpButtonFontSize: {
        color: 'white',
        fontSize: height * 0.035,
        fontWeight: 'bold',
        fontFamily: 'Roboto'
    },
    logoImageView: {
        marginBottom: height * 0.08,
        alignItems: 'center',

    },
    belowInput: {
        paddingHorizontal: width * 0.1
    },
    textInputStyle: {
        color: 'white',
        fontSize: height * 0.03
    },
    errorMessageView: {
        alignItems: 'center'
    },
    errorMessageText: {
        color: 'red',
        fontSize: height * 0.03
    }


});