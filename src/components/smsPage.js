
import React, {Component} from 'react';
import {View, 
    StyleSheet,
    TouchableOpacity, 
    Text, 
    TextInput,
    ScrollView,
    ActivityIndicator,
    Dimensions} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import RNPickerSelect from 'react-native-picker-select';
import {gettingSmsBalance, 
    pushSTK, 
    endPushStk, 
    cleanPushMessage, 
    getParentExam,
    sendResultsSms,
    cleanResultsSmsMessage,
    cleanSmsMessage,
    sendCustomSms,
    cleanCustomSmsMessage
} from '../actions';
import {connect} from 'react-redux';
import { showMessage} from "react-native-flash-message";




class smsPage extends Component {

    state = {
        content: 'account',
        accountColor: '#76355B',
        resultsColor: 'white',
        customColor: 'white',
        accountTextColor: 'white',
        resultsTextColor: 'black',
        customTextColor: 'black',
        amount: '4',
        phoneNumber: '708731581',
        inputErrorMessage: '',
        selectClassValue:'',
        selectExamValue:'',
        sendResultsErrorMessage:'',
        selectAudienceValue: '',
        selectCustomClassValue:'',
        sendCustomErrorMessage:'',
        customSmsMessage:''
    }

    constructor() {
        super();
        this.contentToBeRendered = this.contentToBeRendered.bind(this);
        this.endPushStkIn = this.endPushStkIn.bind(this);
    }

    onAccountPress() {
        this.setState({
            content: 'account',
            accountColor: '#76355B',
            resultsColor: 'white',
            customColor: 'white',
            accountTextColor: 'white',
            resultsTextColor: 'black',
            customTextColor: 'black',
            sendResultsErrorMessage:'',
            sendCustomErrorMessage:''
        });
    }

    onResultsPress() {
        this.setState({
            content: 'results',
            accountColor: 'white',
            resultsColor: '#76355B',
            customColor: 'white',
            accountTextColor: 'black',
            resultsTextColor: 'white',
            customTextColor: 'black',
            sendCustomErrorMessage:''
        });
    }

    onCustomPress() {
        this.setState({
            content: 'custom',
            accountColor: 'white',
            resultsColor: 'white',
            customColor: '#76355B',
            accountTextColor: 'black',
            resultsTextColor: 'black',
            customTextColor: 'white',
            sendResultsErrorMessage:''
        });
    }

    onTopUpPress () {
        if(this.topUpFormValidate()) {

            const {amount, phoneNumber} = this.state;
            const {token, url} = this.props;
            this.props.pushSTK(url, token, amount, phoneNumber);
 
        }
    }

    resetInputErrorMessage() {
        this.setState({
            inputErrorMessage: ''
        });
    }

    resetSendResultsErrorMessage() {
        this.setState({
            sendResultsErrorMessage:''
        })
    }

    resetSendCustomErrorMessage() {
        this.setState({
            sendCustomErrorMessage:''
        })
    }

    onSendCustomPress() {
        if (this.sendCustomFormValidate()) {

            const {selectCustomClassValue, selectAudienceValue, customSmsMessage} = this.state;
            

            const {token, url} = this.props;
            this.props.sendCustomSms(url, token, selectAudienceValue, selectCustomClassValue, customSmsMessage);

        }
    }

    onSendResultsPress() {
        if (this.sendResultsFormValidate()) {

            const {selectClassValue, selectExamValue} = this.state;
            

            const {token, url} = this.props;
            this.props.sendResultsSms(url, token, selectClassValue, selectExamValue);

        }
    }

    sendCustomFormValidate() {
        const {selectAudienceValue, selectCustomClassValue, customSmsMessage} = this.state;
     
        if (selectAudienceValue === null || selectAudienceValue === '') {
            this.setState({
                sendCustomErrorMessage: 'Select your Audience'
            });
            return false;
        }

        if (selectCustomClassValue === null || selectCustomClassValue === '' ) {
            this.setState({
                sendCustomErrorMessage: 'Select a Class'
            });
            return false;
        }

        if (customSmsMessage === null || customSmsMessage === '') {
            this.setState({
                sendCustomErrorMessage: 'Message cannot be empty'
            });
            return false;
        }

        this.setState({
            sendCustomErrorMessage:''
        });

        return true;
    }

    sendResultsFormValidate() {
        const {selectExamValue, selectClassValue} = this.state;
    
        if (selectExamValue === null || selectExamValue === '') {
            this.setState({
                sendResultsErrorMessage: 'Select an Exam'
            });
            return false;
        }

        if (selectClassValue === null || selectClassValue === '' ) {
            this.setState({
                sendResultsErrorMessage: 'Select a Class'
            });
            return false;
        }

        this.setState({
            sendResultsErrorMessage:''
        });
        return true;
    }

    topUpFormValidate() {
        const {phoneNumber, amount} = this.state;

        if (amount === '') {
            this.setState({
                inputErrorMessage: 'Amount cannot be empty'
            });
            return false;
        }

   

        if (isNaN(amount) || isNaN(amount) === false && Number.isInteger(Number(amount)) === false) {
            this.setState({
                inputErrorMessage: 'Amount must be a valid number'
            });
            return false;
        }

        if (phoneNumber === '') {
            this.setState({
                inputErrorMessage: 'Number cannot be empty'
            });
            return false;
        }

        if (isNaN(phoneNumber) || isNaN(phoneNumber) === false && Number.isInteger(Number(phoneNumber)) == false) {
            this.setState({
                inputErrorMessage: 'Number must be a valid number'
            });
            return false;
        }

        this.setState({
            inputErrorMessage: ''
        });

        return true;

        
    }

    formValidateMessage() {

        const {inputErrorMessage} = this.state;
        const {errorMessageText} = styles;

        if (inputErrorMessage !== '') {
            return(
                <View>
                    <Text style = {errorMessageText}>
                        {inputErrorMessage}
                    </Text>
                </View>
            );
        }
  
    }

    sendResultsFormValidateMessage() {

        const {sendResultsErrorMessage} = this.state;
        const {errorMessageText} = styles;

        if (sendResultsErrorMessage !== '') {
            return(
                <View>
                    <Text style = {errorMessageText}>
                        {sendResultsErrorMessage}
                    </Text>
                </View>
            );
        }
  
    }


    sendCustomFormValidateMessage() {

        const {sendCustomErrorMessage} = this.state;
        const {errorMessageText} = styles;

        if (sendCustomErrorMessage !== '') {
            return(
                <View>
                    <Text style = {errorMessageText}>
                        {sendCustomErrorMessage}
                    </Text>
                </View>
            );
        }
  
    }

    contentToBeRendered() {

        const {content} = this.state;
        const {height} = Dimensions.get('screen');

        const {
            balanceCardView,
            balanceCard,
            balanceCardContentView,
            balanceCardRefreshIconView,
            topUpbutton,
            topUpButtonView,
            balanceTagFontSize,
            balanceFontSize,
            topUpButtonFontSize,
            topUpCard,
            topUpCardView,
            textInputView,
            lowerSectionContainer,
            pickerView,
            customContentPickerView,
            textInputStyle,
            textInputViewBox
        } = styles;

        if (content === 'account') {
            return(
                <ScrollView contentContainerStyle = {lowerSectionContainer}>
                    <View style = {balanceCardView}>
                        <View style = {balanceCard}>
                            <TouchableOpacity style = {balanceCardRefreshIconView}
                                onPress = {this.refreshBalance.bind(this)}
                                >
                                
                                <FontAwesome name = 'refresh' size ={height * 0.04} color = '#76355B'/>
                               
                            </TouchableOpacity>

                            <View style = {balanceCardContentView}>
                                <Text style = {balanceTagFontSize}>
                                    BALANCE    
                                </Text>
                                <Text style = {balanceFontSize}>
                                    {`Kes. ${this.props.balance}`}
                                </Text>

                            </View>

                        </View>

                    </View>


                     <View style = {topUpCardView}>
                        <View style = {topUpCard}>
                            {this.formValidateMessage()}
                            <View style = {textInputView}>
                                <TextInput
                                    placeholder = "Amount"
                                    keyboardType = 'number-pad'
                                    style = {textInputStyle}
                                    value = {this.state.amount}
                                    onChangeText = {value => this.setState({amount: value})}
                                    onFocus = {() => this.resetInputErrorMessage()}
                                />
                            </View>

                            <View style = {textInputView}>
                                <TextInput
                                    placeholder = "Number"
                                    keyboardType = 'number-pad'
                                    style = {textInputStyle}
                                    value = {this.state.phoneNumber}
                                    onChangeText = {value => this.setState({phoneNumber: value})}
                                    onFocus = {() => this.resetInputErrorMessage()}
                                />
                            </View>


                        </View>

                     </View>

                    {this.topUpButtonOrSpinner()}

                </ScrollView>
            );
        }

        if (content === 'results') {

            const examPlaceholder = {
                label: 'Select an Exam...',
                value: '',
                color: 'purple',
              };

            const classPlaceholder = {
                label: 'Select a class...',
                value: '',
                color: 'purple',
              };

            return(
                <ScrollView contentContainerStyle = {lowerSectionContainer}>

                    <View style = {topUpCardView}>
                        <View style = {topUpCard}>
                            {this.sendResultsFormValidateMessage()}
                            <View style = {pickerView}>
                                <RNPickerSelect
                                    placeholder = {examPlaceholder}
                                    style={{
                                        ...pickerSelectStyles,

                                        placeholder: {
                                            color: 'purple',
                                            fontSize: height * 0.025,
                                            fontWeight: 'bold',
                                        },
                                    }}
                                    useNativeAndroidPickerStyle={false}
                                    onValueChange={value => this.setState({selectExamValue: value})}
                                    items={this.props.parentExams}
                                    value = {this.state.selectExamValue}
                                
                                />
                            </View>

                            <View style = {pickerView}>

                                <RNPickerSelect
                                    placeholder = {classPlaceholder}
                                    style={{
                                        ...pickerSelectStyles,

                                        placeholder: {
                                            color: 'purple',
                                            fontSize: height * 0.025,
                                            fontWeight: 'bold',
                                        },
                                    }}
                                    useNativeAndroidPickerStyle={false}
                                    onValueChange={value => this.setState({selectClassValue: value})}
                                    items={this.props.classes}
                                    value = {this.state.selectClassValue}
                                
                                />
                            </View>
                        </View>
                    </View>

                     {this.sendResultsButtonOrSpinner()}

                </ScrollView>
            );
        }

        if (content === 'custom') {

            const audiencePlaceholder = {
                label: 'Select your Audience...',
                value: '',
                color: 'purple',
              };

            const classPlaceholder = {
                label: 'Select a class...',
                value: '',
                color: 'purple',
              };

            return(
                <ScrollView contentContainerStyle = {lowerSectionContainer}>

                    <View style = {topUpCardView}>
                        <View style = {topUpCard}>
                            {this.sendCustomFormValidateMessage()}
                            <View style = {customContentPickerView}>
                                <RNPickerSelect
                                    placeholder = {audiencePlaceholder}
                                    style={{
                                        ...pickerSelectStyles,

                                        placeholder: {
                                            color: 'purple',
                                            fontSize: height * 0.025,
                                            fontWeight: 'bold',
                                        },
                                    }}
                                    useNativeAndroidPickerStyle={false}
                                    onValueChange={(value) => this.setState({selectAudienceValue: value})}
                                    items={[
                                        { label: 'Teachers', value: 'teacher' },
                                        { label: 'Parents', value: 'parent' },
                                        { label: 'Both', value: 'both' },
                                    ]}
                                    value = {this.state.selectAudienceValue}
                                
                                />
                            </View>

                            <View style = {customContentPickerView}>

                                <RNPickerSelect
                                    placeholder = {classPlaceholder}
                                    style={{
                                        ...pickerSelectStyles,

                                        placeholder: {
                                            color: 'purple',
                                            fontSize: height * 0.025,
                                            fontWeight: 'bold',
                                        },
                                    }}
                                    useNativeAndroidPickerStyle={false}
                                    onValueChange={(value) => this.setState({selectCustomClassValue: value})}
                                    items={this.props.classes}
                                    value = {this.state.selectCustomClassValue}
                                
                                />
                            </View>

                            <View style = {customContentPickerView}>
                                <View style = {textInputViewBox}>
                                    <TextInput
                                        placeholder = "Type Message Here..."
                                        keyboardType = 'default'
                                        maxLength = {162}
                                        multiline
                                        value = {this.state.customSmsMessage}
                                        onChangeText = {value => this.setState({customSmsMessage: value})}
                                    />
                                </View>

                            </View>
                        </View>
                    </View>

                    {this.sendCustomButtonOrSpinner()}

                </ScrollView>
            );
        }
    }

    componentWillMount() {

        const {url, token} = this.props;
        this.props.gettingSmsBalance(url, token);
        this.props.getParentExam(url, token);
    }

    refreshBalance() {

        this.resetInputErrorMessage();
        const {url, token} = this.props;
        this.props.gettingSmsBalance(url, token);

    
       
    }

    renderFlashMessage() {
        const {pushCompleteMessage, 
            pushMessageColor, 
            pushLoading, 
            smsBalanceMessage,
            smsBalanceColor,
            resultsSmsColor,
            resultsSmsMessage,
            customSmsMessage,
            customSmsColor
        } = this.props;

        const {flashMessageTextStyle, flashMessageContainerStyle} = styles;

        if (pushCompleteMessage !== '') {
            showMessage({
                message: pushCompleteMessage,
                type: pushMessageColor,
                color: "white", 
                animationDuration: 950,
                duration: 3500,
                position: 'bottom',
                titleStyle: flashMessageTextStyle,
                style: flashMessageContainerStyle
              });

              this.props.cleanPushMessage();
              if (pushLoading) {
                setTimeout(this.endPushStkIn, 8000);
              }
             
        }

        if (smsBalanceMessage !== '') {
            showMessage({
                message: smsBalanceMessage,
                type: smsBalanceColor,
                color: "white", 
                animationDuration: 950,
                duration: 3500,
                position: 'bottom',
                titleStyle: flashMessageTextStyle,
                style: flashMessageContainerStyle
              });

              this.props.cleanSmsMessage();
        }

        if (resultsSmsMessage !== '') {
            showMessage({
                message: resultsSmsMessage,
                type: resultsSmsColor,
                color: "white", 
                animationDuration: 950,
                duration: 3500,
                position: 'bottom',
                titleStyle: flashMessageTextStyle,
                style: flashMessageContainerStyle
              });

              this.props.cleanResultsSmsMessage();
        }

        if (customSmsMessage !== '') {
            showMessage({
                message: customSmsMessage,
                type: customSmsColor,
                color: "white", 
                animationDuration: 950,
                duration: 3500,
                position: 'bottom',
                titleStyle: flashMessageTextStyle,
                style: flashMessageContainerStyle
              });

              this.props.cleanCustomSmsMessage();
        }
    }

    endPushStkIn() {
        this.props.endPushStk();
    }


    topUpButtonOrSpinner() {
        const {pushLoading} = this.props;
        const {topUpButtonView, topUpbutton, topUpButtonFontSize} = styles;

        if (pushLoading) {
            return(
                <View style = {topUpButtonView}>

                    <ActivityIndicator
                    size = {height * 0.07} 
                    color = '#76355B'
                        />
           
                </View>
            );
        }else {

            return(
                <View style = {topUpButtonView}>
                    <TouchableOpacity style = {topUpbutton}
                        onPress = {this.onTopUpPress.bind(this)}
                        >
                        <Text style = {topUpButtonFontSize}>
                            Top up
                        </Text>
                    </TouchableOpacity>

                </View>
            );

        }
    }

    sendResultsButtonOrSpinner() {
        const {resultsSmsLoading} = this.props;
        const {topUpButtonView, topUpbutton, topUpButtonFontSize} = styles;

        if (resultsSmsLoading) {
            return(
                <View style = {topUpButtonView}>

                    <ActivityIndicator
                    size = {height * 0.07} 
                    color = '#76355B'
                        />
           
                </View>
            );
        }else {

            return(
                <View style = {topUpButtonView}>
                    <TouchableOpacity style = {topUpbutton}
                        onPress = {this.onSendResultsPress.bind(this)}
                        >
                        <Text style = {topUpButtonFontSize}>
                            Send
                        </Text>
                    </TouchableOpacity>

                </View>
            );

        }
    }

    sendCustomButtonOrSpinner() {
        const {customSmsLoading} = this.props;
        console.log(customSmsLoading);
        const {topUpButtonView, topUpbutton, topUpButtonFontSize} = styles;

        if (customSmsLoading) {
            return(
                <View style = {topUpButtonView}>

                    <ActivityIndicator
                    size = {height * 0.07} 
                    color = '#76355B'
                        />
           
                </View>
            );
        }else {

            return(
                <View style = {topUpButtonView}>
                    <TouchableOpacity style = {topUpbutton}
                        onPress = {this.onSendCustomPress.bind(this)}
                        >
                        <Text style = {topUpButtonFontSize}>
                            Send
                        </Text>
                    </TouchableOpacity>

                </View>
            );

        }
    }



    render() {

        const {height} = Dimensions.get('screen');

        const {
            mainContainer,
            headerContainer,
            headerContainerText,
            lowerSectionContainer,
            balanceCardView,
            balanceCard,
            balanceCardContentView,
            balanceCardRefreshIconView,
            topUpbutton,
            topUpButtonView,
            balanceTagFontSize,
            balanceFontSize,
            topUpButtonFontSize,
            threeButtonsView,
            customButton,
            resultsButton,
            accountsButton,
            toggleButtonsText,
            topUpCard,
            topUpCardView,
            textInputView
        } = styles;

        return(
            <View style = {mainContainer}>
                <View style = {headerContainer}>
                    <Text style = {headerContainerText}>
                        SMS
                    </Text>
                </View>

                 <View style = {threeButtonsView}>
                        <TouchableOpacity style = {{...accountsButton, ...{backgroundColor: this.state.accountColor}}}
                            onPress = {this.onAccountPress.bind(this)}
                            >
                            <Text style = {{...toggleButtonsText, ...{color: this.state.accountTextColor}}}>
                                account
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity style = {{...resultsButton, ...{backgroundColor: this.state.resultsColor}}}
                            onPress = {this.onResultsPress.bind(this)}
                            >
                            <Text style = {{...toggleButtonsText, ...{color: this.state.resultsTextColor}}}>
                                results
                            </Text>
                        </TouchableOpacity>


                        <TouchableOpacity style = {{...customButton, ...{backgroundColor: this.state.customColor}}}
                            onPress = {this.onCustomPress.bind(this)}
                            >
                            <Text style = {{...toggleButtonsText, ...{color: this.state.customTextColor}}}>
                                custom
                            </Text>
                        </TouchableOpacity>     

                    </View>
                   
                    {this.contentToBeRendered()}
                    {this.renderFlashMessage()}

            </View>
        );
    }
}


const mapStateToProps = ({loginReducer, smsReducer}) => {

    const {token, url} =  loginReducer;

    const {balance, 
        pushLoading, 
        pushCompleteMessage, 
        pushMessageColor,  
        smsBalanceColor,
        smsBalanceMessage,
        classes,
        parentExams,
        resultsSmsLoading,
        resultsSmsMessage,
        resultsSmsColor,
        customSmsLoading,
        customSmsMessage,
        customSmsColor
    } = smsReducer;

    return  {token, 
        url, 
        balance, 
        pushLoading, 
        pushCompleteMessage, 
        pushMessageColor,  
        smsBalanceMessage,
        smsBalanceColor,
        classes,
        parentExams,
        resultsSmsColor,
        resultsSmsLoading,
        resultsSmsMessage,
        customSmsLoading,
        customSmsMessage,
        customSmsColor
    };

};

export default connect (mapStateToProps, 
    {gettingSmsBalance, 
        pushSTK, 
        endPushStk, 
        cleanPushMessage, 
        getParentExam,
        cleanResultsSmsMessage,
        sendResultsSms,
        cleanSmsMessage,
        sendCustomSms,
        cleanCustomSmsMessage
    })(smsPage);

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
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: height * 0.015
    },
    lowerSectionContainer: {
        paddingBottom: height * 0.02, 
        justifyContent: 'space-around'   
    },
    headerContainerText: {
        color: 'white',
        fontSize: height * 0.05
    },
    balanceCardView: {
      flexDirection: 'column',
      marginVertical: height * 0.03
    },
    balanceCard: {
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
        paddingTop: height * 0.01,
        paddingBottom: height * 0.04,
        width: width * 0.9,
        alignSelf: 'center',
        paddingLeft: width * 0.055,
        paddingRight: width * 0.055
      
    },
    balanceCardRefreshIconView: {
      
        alignItems: 'flex-end',
       
    },
    balanceCardContentView: {
        
        alignItems: 'center',
        justifyContent: 'center',
     
    },
    balanceTagFontSize: {
        fontSize: height * 0.02,
        fontWeight: 'bold'
    },
    balanceFontSize: {
        fontSize: height * 0.045
    },
    topUpbutton: {
        backgroundColor: '#76355B',
        borderRadius: width * 0.15,
        paddingTop: height * 0.01,
        paddingBottom: height * 0.01,
        paddingLeft: width * 0.1,
        paddingRight: width * 0.1,
        shadowColor: '#555264',
        shadowOffset: {
            width: 0,
            height: 10
        },
        shadowOpacity: 50,
        elevation: 7,
        position: 'relative',
    },
    topUpButtonView: {
        alignItems: 'flex-end',
        paddingLeft: width * 0.05,
        paddingRight: width * 0.05,
        marginVertical: height * 0.03,
      
    },
    topUpButtonFontSize: {
        color: 'white',
        fontSize: height * 0.03
    },

    threeButtonsView: {
        flexDirection: 'row',
        paddingLeft: width * 0.025,
        paddingRight: width * 0.025,
        paddingTop: height * 0.025,
        paddingBottom:height * 0.025, 
    },
    accountsButton: {
        paddingTop: height * 0.015,
        paddingBottom: height * 0.015,
        alignItems: 'center',
        justifyContent: 'center',
        borderTopLeftRadius: width * 0.10,
        borderBottomLeftRadius: width * 0.10,
        backgroundColor : '#ffffff',
        flex: 1,
        shadowColor: '#555264',
        shadowOffset: {
            width: 0,
            height: 10
        },
        shadowOpacity: 50,
        elevation: 7,
        position: 'relative',
    },
    resultsButton: {
        paddingTop: height * 0.015,
        paddingBottom: height * 0.015,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        borderLeftWidth: width * 0.0005,
        borderRightWidth: width * 0.0005,
        borderColor: '#76355B',
        backgroundColor : '#ffffff',
        shadowColor: '#555264',
        shadowOffset: {
            width: 0,
            height: 10
        },
        shadowOpacity: 50,
        elevation: 7,
        position: 'relative',

    },
    customButton: {
        paddingTop: height * 0.015,
        paddingBottom: height * 0.015,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        borderTopRightRadius: width * 0.10,
        borderBottomRightRadius: width * 0.10,
        backgroundColor : '#ffffff',
        shadowColor: '#555264',
        shadowOffset: {
            width: 0,
            height: 10
        },
        shadowOpacity: 50,
        elevation: 7,
        position: 'relative',
        
    },
    toggleButtonsText: {
        fontSize: height * 0.035
    },
    topUpCardView: {
        flexDirection: 'column',
        marginVertical: height * 0.03
    },
    topUpCard: {
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
        paddingTop: height * 0.02,
        paddingBottom: height * 0.08,
        width: width * 0.9,
        alignSelf: 'center',
        alignItems: 'center'
    
    },
    textInputView: {
        borderBottomColor: '#76355B',
        borderBottomWidth: height * 0.002,
        width: width * 0.7,
     
    },
    textInputViewBox: {
        borderColor: '#76355B',
        borderWidth: height * 0.002,
        width: width * 0.7,
     
    },
    pickerView: {
        marginVertical: height * 0.04
    },
    customContentPickerView: {
        marginVertical: height * 0.02
    },
    textInputStyle: {
        fontSize: height * 0.03
    },
    errorMessageText: {
        fontSize: height * 0.025,
        color: 'red',
        textAlign: 'center'
    },
    flashMessageTextStyle: {
        fontSize: height * 0.0225,
        textAlign: 'center'
    },
    flashMessageContainerStyle: {
        borderTopLeftRadius: width * 0.04,
        borderTopRightRadius: width * 0.04,
        alignItems: 'center',
        justifyContent: 'center'
    }

   
});

const pickerSelectStyles = StyleSheet.create({
    // inputIOS: {
    //   fontSize: 16,
    //   paddingVertical: 12,
    //   paddingHorizontal: 10,
    //   borderWidth: 1,
    //   borderColor: 'gray',
    //   borderRadius: 4,
    //   color: 'black',
    //   paddingRight: 30, // to ensure the text is never behind the icon
    // },
    inputAndroid: {
      fontSize: height * 0.03,
      paddingHorizontal: height * 0.02,
      paddingVertical: width * 0.02,
      borderWidth: width * 0.001,
      borderColor: 'purple',
      borderRadius: width * 0.025,
      color: 'purple',
      backgroundColor: 'transparent',
      width: width * 0.7,
      alignSelf: 'center'
      
    },
  });
  