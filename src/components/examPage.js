
import React, {Component} from 'react';
import {View, 
    StyleSheet, 
    Text, 
    Dimensions, 
    TouchableOpacity,
    ScrollView,
    ActivityIndicator,
    TextInput
} from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import {getAdminContact,
    updateAdminContact,
    tempPhoneNumberChangeText,
    cleanUpdateContactMessage,
    getClosedExam,
    scheduleNormal,
    cleanScheduleNormalMessage,
    scheduleAverage,
    cleanScheduleAverageMessage
    } from '../actions';
import {connect} from 'react-redux';
import { showMessage} from "react-native-flash-message";


class examPage extends Component {

    state = {
        content: 'normal',
        normalColor: '#76355B',
        averageColor: 'white',
        normalTextColor: 'white',
        averageTextColor: 'black',
        term: null,
        year: null,
        numberOfExams: null,
        examData:[],
        prevExamsData:[],
        queryPosition: -1,
        queryMaxPosition: null,
        queryButtonText: 'Start',
        queryPage: 'intro',
        previousQueryPage: '',
        examID: null,
        examWeight: 0,
        adminContactErrorMessage:'',
        examNormalSelectValue:'',
        examPreviousNormalSelectValue:'',
        scheduleNormalErrorMessage:'',
        scheduleAverageErrorMessage:''
       
    }


    componentWillMount() {

        const {url, token} = this.props;
        this.props.getAdminContact(url, token);
        this.props.getClosedExam(url, token);
    }

    renderFlashMessage() {
        const {
            phoneNumberColor,
            phoneNumberMessage,
            scheduleNormalMessage,
            scheduleNormalColor,
            scheduleAverageColor,
            scheduleAverageMessage
        } = this.props;

        const {flashMessageTextStyle, flashMessageContainerStyle} = styles;

        if (phoneNumberMessage !== '') {
            showMessage({
                message: phoneNumberMessage,
                type: phoneNumberColor,
                color: "white", 
                animationDuration: 950,
                duration: 3500,
                position: 'bottom',
                titleStyle: flashMessageTextStyle,
                style: flashMessageContainerStyle
              });

              this.props.cleanUpdateContactMessage();
        }

        if (scheduleNormalMessage !== '') {
            showMessage({
                message: scheduleNormalMessage,
                type: scheduleNormalColor,
                color: "white", 
                animationDuration: 950,
                duration: 3800,
                position: 'bottom',
                titleStyle: flashMessageTextStyle,
                style: flashMessageContainerStyle
              });

              this.props.cleanScheduleNormalMessage();
        }

        if (scheduleAverageMessage !== '') {
            showMessage({
                message: scheduleAverageMessage,
                type: scheduleAverageColor,
                color: "white", 
                animationDuration: 950,
                duration: 4200,
                position: 'bottom',
                titleStyle: flashMessageTextStyle,
                style: flashMessageContainerStyle
              });

              this.props.cleanScheduleAverageMessage();
              this.setState({
                term: null,
                year: null,
                numberOfExams: null,
                examData:[],
                prevExamsData:[],
                queryPosition: -1,
                queryMaxPosition: 1,
                queryButtonText: 'Start',
                queryPage: 'intro',
                previousQueryPage: '',
                examID: null,
                examWeight: 0,
            });
        }


      
  
    }


    onUpdateContactPress() {
       
        if (this.adminContactFormValidate()) {
            const {url, token, tempPhoneNumber} = this.props;
            this.props.updateAdminContact(url, token, tempPhoneNumber);
        }
    }

    onNormalSchedulePress() {
        if (this.scheduleNormalFormValidate()) {
            const {url, token} = this.props;
            const {examNormalSelectValue, examPreviousNormalSelectValue} = this.state;
            this.props.scheduleNormal(url, token, examNormalSelectValue, examPreviousNormalSelectValue);
        }
    }

    scheduleNormalFormValidate() {
        const {examNormalSelectValue, examPreviousNormalSelectValue} = this.state;

        if (examNormalSelectValue === null || examNormalSelectValue === '') {
            this.setState({
                scheduleNormalErrorMessage: 'Select an Exam'
            });
            return false;
        }

        if (examPreviousNormalSelectValue === null || examPreviousNormalSelectValue === '') {
            this.setState({
                scheduleNormalErrorMessage:'Select A previous Exam'
            })
            return false;
        }

        this.setState({
            scheduleNormalErrorMessage:''
        });
        return true;
    }

    adminContactFormValidate() {
        const {tempPhoneNumber} = this.props;

        if (tempPhoneNumber === null || tempPhoneNumber === '') {
            this.setState({
                adminContactErrorMessage:'Number Cannot Be empty'
            });
            return false;
        }


        if (isNaN(tempPhoneNumber) || isNaN(tempPhoneNumber) === false && Number.isInteger(Number(tempPhoneNumber)) === false) {
            this.setState({
                adminContactErrorMessage: 'Must be a valid Number'
            })
            return false;
        }

        this.setState({
            adminContactErrorMessage: ''
        })
        return true;
    }


   termYearFormValidate() {
        const {term, year} = this.state;

        if (term === null || term === '') {
            this.setState({
                scheduleAverageErrorMessage: 'Select a term'
            })
            return false;
        }
        if (year === null || year === '') {
            this.setState({
                scheduleAverageErrorMessage: 'Select year'
            })
            return false;
        }

        this.setState({
            scheduleAverageErrorMessage:''
        })
        return true;
    }

    numberOfExamsFormValidate() {
        const {numberOfExams} = this.state;

        if (numberOfExams === null || numberOfExams === '') {
            this.setState({
                scheduleAverageErrorMessage: 'Select a number'
            })
            return false;
        }

        this.setState({
            scheduleAverageErrorMessage:''
        })
        return true;
    }

    examFormValidate() {
        const {examID, examWeight} = this.state;

        if (examID === null || examID === '') {
            this.setState({
                scheduleAverageErrorMessage: 'Select an Exam'
            })
            return false;
        }

        if (examWeight === null || examWeight === '') {
            this.setState({
                scheduleAverageErrorMessage: 'Weight cannot be empty'
            })
            return false;
        }

        if (isNaN(examWeight)) {
            this.setState({
                scheduleAverageErrorMessage: 'Weight must be a valid number'
            })
            return false;
        }

        this.setState({
            scheduleAverageErrorMessage:''
        })
        return true;
    }

    prevFormValidate() {
        const {examID} = this.state;

        if (examID === null || examID === '') {
            this.setState({
                scheduleAverageErrorMessage: 'Select an Exam'
            })
            return false;
        }

        this.setState({
            scheduleAverageErrorMessage:''
        })
        return true;
    }

    lastFormValidate() {
        const {examID} = this.state;

        if (examID === null || examID === '') {
            this.setState({
                scheduleAverageErrorMessage: 'Select an Exam'
            })
            return false;
        }

        this.setState({
            scheduleAverageErrorMessage:''
        })
        return true;
    }

    adminContactFormValidateMessage() {

        const {adminContactErrorMessage} = this.state;
        const {errorMessageText} = styles;

        if (adminContactErrorMessage !== '') {
            return(
                <View>
                    <Text style = {errorMessageText}>
                        {adminContactErrorMessage}
                    </Text>
                </View>
            );
        }
  
    }

    scheduleNormalFormValidateMessage() {

        const {scheduleNormalErrorMessage} = this.state;
        const {errorMessageText} = styles;

        if (scheduleNormalErrorMessage !== '') {
            return(
                <View>
                    <Text style = {errorMessageText}>
                        {scheduleNormalErrorMessage}
                    </Text>
                </View>
            );
        }
  
    }

    scheduleAverageFormValidateMessage() {

        const {scheduleAverageErrorMessage} = this.state;
        const {errorMessageText} = styles;

        if (scheduleAverageErrorMessage !== '') {
            return(
                <View>
                    <Text style = {errorMessageText}>
                        {scheduleAverageErrorMessage}
                    </Text>
                </View>
            );
        }
  
    }


    adminContactUpdateButtonOrSpinner() {
        const {phoneNumberLoading} = this.props;

        const {contactCardButtonView,
            updateContactButtonFontSize,
            updateContactButton,
            updateContactButtonView
        } = styles;

        if (phoneNumberLoading) {

            return(
                <View style = {contactCardButtonView}>
                    <View style = {updateContactButtonView}>

                         <ActivityIndicator
                            size = {height * 0.07} 
                            color = '#76355B'
                            />
           
                    </View>
                </View>
            );

        }else {
            return(
                <View style = {contactCardButtonView}> 
                <View style = {updateContactButtonView}>
                <TouchableOpacity style = {updateContactButton}
                    onPress = {this.onUpdateContactPress.bind(this)}>
                    <Text style = {updateContactButtonFontSize}>
                        UPDATE
                    </Text>
                </TouchableOpacity>
                </View>
            </View>
            );
        }
    }


    scheduleNormalButtonOrSpinner() {
        const {scheduleNormalLoading} = this.props;

        const {topUpButtonView,
            topUpButtonFontSize,
            topUpbutton
        } = styles;

        if (scheduleNormalLoading) {

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
                        onPress ={this.onNormalSchedulePress.bind(this)}>
                        <Text style = {topUpButtonFontSize}>
                            Schedule
                        </Text>
                    </TouchableOpacity>

            </View>
            );
        }
    }


    scheduleAverageButtonOrSpinner() {
        const {scheduleAverageLoading} = this.props;

        const {topUpButtonView,
            topUpButtonFontSize,
            topUpbutton
        } = styles;

        if (scheduleAverageLoading) {

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
                            onPress = {this.onQueryNextButtonPress.bind(this)}
                            >
                            <Text style = {topUpButtonFontSize}>
                                {this.state.queryButtonText}
                            </Text>
                        </TouchableOpacity>

                </View>
            );
        }
    }

    clearNumberErrorMessage() {
        this.setState({
            adminContactErrorMessage: ''
        })
    }

    onNormalPress() {
        this.setState({
            content: 'normal',
            normalColor: '#76355B',
            averageColor: 'white',
            normalTextColor: 'white',
            averageTextColor: 'black'
        });
    }

    onAveragePress() {
        this.setState({
            content: 'average',
            averageColor: '#76355B',
            normalColor: 'white',
            averageTextColor: 'white',
            normalTextColor: 'black'
        })
    }

    onQueryNextButtonPress() {
        const { queryPage, 
            queryMaxPosition,
            examData,
            prevExamsData,
            term,
            year,
            examID,
            examWeight,
            queryPosition} = this.state;

        if (queryPage === 'intro') {
            this.setState({
                queryButtonText: 'Next',
                queryPage: 'termYear',
                previousQueryPage: queryPage
            });
        }

        if (queryPage === 'termYear') {

            if (this.termYearFormValidate()) {
                this.setState({
                    queryButtonText: 'Next',
                    queryPage: 'numberOfExams',
                    previousQueryPage: queryPage,
                
                });
            }
          

        }

        if (queryPage === 'numberOfExams') {

            if (this.numberOfExamsFormValidate()) {

            var newQueryPosition = queryPosition + 1;
            var maxPosition = this.state.numberOfExams - 1;

            this.setState({
                queryButtonText: 'Next',
                queryPage: 'exam',
                previousQueryPage: queryPage,
                queryPosition: newQueryPosition,
                queryMaxPosition: maxPosition
            });

            }
            
        }

        if (queryPage === 'exam') {

            if (this.examFormValidate()) {

                var newQueryPosition = queryPosition + 1;

                if (newQueryPosition > queryMaxPosition) {

                    let newExamObject = {  
                        "examID": examID,
                        "examWeight": examWeight,
                        "term": term,
                        "year": year
                    };
                
                    examData.push(newExamObject);

                    this.setState({
                        queryButtonText: 'Next',
                        queryPage: 'prev',
                        previousQueryPage: queryPage,
                        examData,
                        examID: null,
                        examWeight:null
                    });
                }else {

                    let newExamObject = {  
                        "examID": examID,
                        "examWeight": examWeight,
                        "term": term,
                        "year": year
                    };
                
                    examData.push(newExamObject);

                    this.setState({
                    queryPosition: newQueryPosition,
                    examData,
                    examID: null,
                    examWeight:null
                    });
                }
            }
            

        }

        if (queryPage === 'prev') {

            if (this.prevFormValidate()) {
                let prevExamObject = {  
                    "examID": examID,
                    "examPosition": "prev"
                };
            
                prevExamsData.push(prevExamObject);


                this.setState({
                    queryButtonText: 'Next',
                    queryPage: 'last',
                    previousQueryPage: queryPage,
                    prevExamsData,
                    examID:null
                });
            }

        }

        if (queryPage === 'last') {

            if (this.lastFormValidate()) {
                let prevExamObject = {  
                    "examID": examID,
                    "examPosition": "last"
                };
            
                prevExamsData.push(prevExamObject);

                this.setState({
                    queryButtonText: 'Schedule',
                    queryPage: 'end',
                    previousQueryPage: queryPage
                });
            }

        }

        if (queryPage === 'end') {

            const {url, token, scheduleAverageLoading} = this.props;
            const {examData, prevExamsData} = this.state;

            this.props.scheduleAverage(url, token, examData, prevExamsData);

           
        }
    }

    termAverageQuery() {

        const {
            mainContainer,
            headerContainer,
            headerContainerText,
            lowerSectionContainer,
            contactCard,
            textInputViewWeight,
            updateContactButtonView,
            updateContactButton,
            updateContactButtonFontSize,
            twoButtonsView,
            normalButton,
            averageButton,
            toggleButtonsText,
            contactContainer,
            contactCardButtonView,
            contactCardContentView,
            topUpCard,
            pickerView,
            topUpbutton,
            topUpButtonFontSize,
            topUpButtonView,
            topUpCardView,
            wizardWelcomeText
        } = styles;

        const{queryPage} = this.state;
         if (queryPage === 'intro') {

            return(
                <View>
                    <View style = {topUpCardView}>
                    <View style = {topUpCard}>

                        <View style = {pickerView}>

                        <Text style = {wizardWelcomeText}>
                            A special type of analysis that will combine several exams and analyse them as one
                        </Text>
                        </View>
                    </View>
                    </View>
                    <View style = {topUpButtonView}>
                            <TouchableOpacity style = {topUpbutton}
                                onPress = {this.onQueryNextButtonPress.bind(this)}
                                >
                                <Text style = {topUpButtonFontSize}>
                                    {this.state.queryButtonText}
                                </Text>
                            </TouchableOpacity>

                    </View>
                </View>
            );

         }

         if (queryPage === 'termYear') {


            const examPlaceholder = {
                label: 'Select Term...',
                value: null,
                color: 'purple',
              };

            const classPlaceholder = {
                label: 'Select Year...',
                value: null,
                color: 'purple',
              };

              var year = new Date().getFullYear();
              var year1 = year;
              var year2 = year - 1;
              var year3 = year2 - 1;


            return(
                <View>
                    <View style = {topUpCardView}>
                    <View style = {topUpCard}>
                        {this.scheduleAverageFormValidateMessage()}
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
                                onValueChange={(value) => this.setState({term: value})}
                                items={[
                                    { 'label': 'Term 1', 'value': 1 },
                                    { 'label': 'Term 2', 'value': 2 },
                                    { 'label': 'Term 3', 'value': 3 },
                                ]}
                                value = {this.state.term}
                            
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
                                onValueChange={(value) => this.setState({year: value})}
                                items={[
                                    { 'label': year1.toString(), 'value': year1.toString() },
                                    { 'label': year2.toString(), 'value': year2.toString() },
                                    { 'label': year3.toString(), 'value': year3.toString() },
                                ]}
                                value = {this.state.year}
                            
                            />
                        </View>
                    </View>
                    </View>
                    <View style = {topUpButtonView}>
                            <TouchableOpacity style = {topUpbutton}
                                onPress = {this.onQueryNextButtonPress.bind(this)}
                                >
                                <Text style = {topUpButtonFontSize}>
                                    {this.state.queryButtonText}
                                </Text>
                            </TouchableOpacity>

                    </View>

                </View>
            );

         }

         if (queryPage === 'numberOfExams') {


            const examPlaceholder = {
                label: 'How Many Exams...?',
                value: null,
                color: 'purple',
              };


            return(
                <View>
                    <View style = {topUpCardView}>
                    <View style = {topUpCard}>
                        {this.scheduleAverageFormValidateMessage()}
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
                                onValueChange={(value) => this.setState({numberOfExams: value})}
                                items={[
                                    { label: '2', value: 2 },
                                    { label: '3', value: 3 },
                                    { label: '4', value: 4 },
                                    { label: '5', value: 5 },
                                    { label: '6', value: 6 },
                                    { label: '7', value: 7 },
                                    { label: '8', value: 8 },
                                    { label: '9', value: 9 },
                                    { label: '10', value: 10 },
                                ]}
                                value = {this.state.numberOfExams}
                            
                            />
                        </View>

                    </View>
                    </View>
                    <View style = {topUpButtonView}>
                            <TouchableOpacity style = {topUpbutton}
                                onPress = {this.onQueryNextButtonPress.bind(this)}
                                >
                                <Text style = {topUpButtonFontSize}>
                                    {this.state.queryButtonText}
                                </Text>
                            </TouchableOpacity>

                    </View>

                </View>
            );

         }

         if (queryPage === 'exam') {


            const examPlaceholder = {
                label: `Select Exam ${this.state.queryPosition+1}...`,
                value: null,
                color: 'purple',
              };


            return(
                <View>
                    <View style = {topUpCardView}>
                    <View style = {topUpCard}>
                        {this.scheduleAverageFormValidateMessage()}
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
                                onValueChange={(value) => this.setState({examID: value})}
                                items={this.props.closedExams}
                                value= {this.state.examID}
                            
                            />
                        </View>

                        <View style = {textInputViewWeight}>
                                <TextInput
                                    placeholder = "Enter exam weight here"
                                    keyboardType = 'numeric'
                                    onChangeText = {value => this.setState({examWeight: value})}
                                    value = {this.state.examWeight}
                                    />
                        </View>

                    </View>
                    </View>
                    <View style = {topUpButtonView}>
                            <TouchableOpacity style = {topUpbutton}
                                onPress = {this.onQueryNextButtonPress.bind(this)}
                                >
                                <Text style = {topUpButtonFontSize}>
                                    {this.state.queryButtonText}
                                </Text>
                            </TouchableOpacity>

                    </View>

                </View>
            );

         }

         if (queryPage === 'prev') {


            const examPlaceholder = {
                label: 'Select Previous Exam...',
                value: null,
                color: 'purple',
              };


            return(
                <View>
                    <View style = {topUpCardView}>
                    <View style = {topUpCard}>
                        {this.scheduleAverageFormValidateMessage()}
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
                                onValueChange={(value) => this.setState({examID: value})}
                                items={this.props.closedExams}
                                value = {this.state.examID}
                            
                            />
                        </View>

                    </View>
                    </View>
                    <View style = {topUpButtonView}>
                            <TouchableOpacity style = {topUpbutton}
                                onPress = {this.onQueryNextButtonPress.bind(this)}
                                >
                                <Text style = {topUpButtonFontSize}>
                                    {this.state.queryButtonText}
                                </Text>
                            </TouchableOpacity>

                    </View>

                </View>
            );

         }

         if (queryPage === 'last') {


            const examPlaceholder = {
                label: `Select Last Exam ...`,
                value: null,
                color: 'purple',
              };


            return(
                <View>
                    <View style = {topUpCardView}>
                    <View style = {topUpCard}>
                    {this.scheduleAverageFormValidateMessage()}
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
                                onValueChange={(value) => this.setState({examID: value})}
                                items={this.props.closedExams}
                                value = {this.state.examID}
                            
                            />
                        </View>

                    </View>
                    </View>
                    <View style = {topUpButtonView}>
                            <TouchableOpacity style = {topUpbutton}
                                onPress = {this.onQueryNextButtonPress.bind(this)}
                                >
                                <Text style = {topUpButtonFontSize}>
                                    {this.state.queryButtonText}
                                </Text>
                            </TouchableOpacity>

                    </View>

                </View>
            );

         }

         if (queryPage === 'end') {

            return(
                <View>
                    <View style = {topUpCardView}>
                    <View style = {topUpCard}>

                        <View style = {pickerView}>

                        <Text style = {wizardWelcomeText}>
                            Process Complete
                            Press Schedule button to Schedule the analysis
                        </Text>
                        </View>
                    </View>
                    </View>
                   {this.scheduleAverageButtonOrSpinner()}
                </View>
            );

         }

    }


    contentToBeRendered() {
        const {content} = this.state;
        const {
            mainContainer,
            headerContainer,
            headerContainerText,
            lowerSectionContainer,
            contactCard,
            textInputView,
            updateContactButtonView,
            updateContactButton,
            updateContactButtonFontSize,
            twoButtonsView,
            normalButton,
            averageButton,
            toggleButtonsText,
            contactContainer,
            contactCardButtonView,
            contactCardContentView,
            topUpCard,
            pickerView,
            topUpbutton,
            topUpButtonFontSize,
            topUpButtonView,
            topUpCardView
        } = styles;

        if (content === 'normal') {

            const examNormalPlaceholder = {
                label: 'Select an Exam...',
                value: null,
                color: 'purple',
              };

            const prevExamNormalPlaceholder = {
                label: 'Select a Previous Exam...',
                value: null,
                color: 'purple',
              };
              
            return (

                    <ScrollView contentContainerStyle = {lowerSectionContainer}>
                   

                     <View style = {twoButtonsView}>
                        <TouchableOpacity style = {{...normalButton, ...{backgroundColor: this.state.normalColor}}}
                            onPress = {this.onNormalPress.bind(this)}
                            >
                            <Text style = {{...toggleButtonsText, ...{color: this.state.normalTextColor}}}>
                                Normal
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity style = {{...averageButton, ...{backgroundColor: this.state.averageColor}}}
                            onPress = {this.onAveragePress.bind(this)}
                            >
                            <Text style = {{...toggleButtonsText, ...{color: this.state.averageTextColor}}}>
                                Term Av.
                            </Text>
                        </TouchableOpacity>     

                    </View>

                    <View style = {topUpCardView}>
                    <View style = {topUpCard}>
                        {this.scheduleNormalFormValidateMessage()}
                        <View style = {pickerView}>
                            <RNPickerSelect
                                placeholder = {examNormalPlaceholder}
                                style={{
                                    ...pickerSelectStyles,

                                    placeholder: {
                                        color: 'purple',
                                        fontSize: height * 0.025,
                                        fontWeight: 'bold',
                                    },
                                }}
                                useNativeAndroidPickerStyle={false}
                                onValueChange={(value) => this.setState({examNormalSelectValue: value})}
                                items={this.props.closedExams}
                                value = {this.state.examNormalSelectValue}
                            
                            />
                        </View>

                        <View style = {pickerView}>

                            <RNPickerSelect
                                placeholder = {prevExamNormalPlaceholder}
                                style={{
                                    ...pickerSelectStyles,

                                    placeholder: {
                                        color: 'purple',
                                        fontSize: height * 0.025,
                                        fontWeight: 'bold',
                                    },
                                }}
                                useNativeAndroidPickerStyle={false}
                                onValueChange={(value) => this.setState({examPreviousNormalSelectValue: value})}
                                items={this.props.closedExams}
                                value = {this.state.examPreviousNormalSelectValue}
                            
                            />
                        </View>
                    </View>
                    </View>

                 {this.scheduleNormalButtonOrSpinner()}
                </ScrollView>
                // </View>
            );

        }

        if (content === 'average') {

            return (
                // <View style = {lowerSectionContainer}>
                    <ScrollView contentContainerStyle = {lowerSectionContainer}>
                   

                     <View style = {twoButtonsView}>
                        <TouchableOpacity style = {{...normalButton, ...{backgroundColor: this.state.normalColor}}}
                            onPress = {this.onNormalPress.bind(this)}
                            >
                            <Text style = {{...toggleButtonsText, ...{color: this.state.normalTextColor}}}>
                                Normal
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity style = {{...averageButton, ...{backgroundColor: this.state.averageColor}}}
                            onPress = {this.onAveragePress.bind(this)}
                            >
                            <Text style = {{...toggleButtonsText, ...{color: this.state.averageTextColor}}}>
                                Term Av.
                            </Text>
                        </TouchableOpacity>     

                    </View>

                    {this.termAverageQuery()}

                     
                </ScrollView>
                // </View>
            );

        }
    }
    
    render() {

        const {
            mainContainer,
            headerContainer,
            headerContainerText,
            contactContainer,
            contactCardButtonView,
            contactCardContentView,
            contactCard,
            textInputView,
            updateContactButton,
            updateContactButtonFontSize,
            adminPhoneTextStyle
        } = styles;
        
        return(
            <View style = {mainContainer}>
                <View style = {headerContainer}>
                    <Text style = {headerContainerText}>
                        EXAM
                    </Text>
                </View>

                 <View style = {contactContainer}>
                 {this.adminContactFormValidateMessage()}
                        <View style = {contactCard}> 
                            <View style = {contactCardContentView}>
                                <View style = {textInputView}>
                                    <TextInput
                                        placeholder = "Admin Contact"
                                        keyboardType = 'number-pad'
                                        value = {this.props.tempPhoneNumber}
                                        onChangeText = {value => this.props.tempPhoneNumberChangeText(value)}
                                        style = {adminPhoneTextStyle}
                                        />
                                </View>
                            </View>  
                            {this.adminContactUpdateButtonOrSpinner()}
   

                        </View>

                    </View>

               {this.contentToBeRendered()}
               {this.renderFlashMessage()}

            </View>
        );
    }
}

const mapStateToProps = ({loginReducer, examReducer}) => {

    const {token, url} =  loginReducer;

    const {phoneNumber, 
        tempPhoneNumber,  
        phoneNumberLoading,  
        phoneNumberMessage,  
        phoneNumberColor,
        closedExams,
        scheduleNormalLoading,
        scheduleNormalMessage,
        scheduleNormalColor,
        scheduleAverageLoading,
        scheduleAverageMessage,
        scheduleAverageColor,
    } = examReducer;

   

    return  {token, 
        url,
        phoneNumber,
        tempPhoneNumber,
        phoneNumberLoading,
        phoneNumberMessage,
        phoneNumberColor,
        closedExams,
        scheduleNormalLoading,
        scheduleNormalMessage,
        scheduleNormalColor,
        scheduleAverageLoading,
        scheduleAverageMessage,
        scheduleAverageColor
        };

};

export default connect (mapStateToProps, 
    {getAdminContact,
        tempPhoneNumberChangeText,
        updateAdminContact,
        cleanUpdateContactMessage,
        getClosedExam,
        scheduleNormal,
        cleanScheduleNormalMessage,
        scheduleAverage,
        cleanScheduleAverageMessage
    })(examPage);



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
        paddingVertical: height * 0.02
    },
    contactContainer: {
        paddingVertical: height * 0.02,
    },
    lowerSectionContainer: {
        paddingBottom: height * 0.02, 
        
    },
 
    headerContainerText: {
        color: 'white',
        fontSize: height * 0.05
    },
   
    contactCard: {
        borderRadius: width * 0.02,
      
        backgroundColor : '#ffffff',
        shadowColor: '#555264',
        shadowOffset: {
            width: 0,
            height: 10
        },
        shadowOpacity: 50,
        elevation: 7,
        position: 'relative',
        paddingTop: height * 0.01,
        paddingBottom: height * 0.03,
        width: width * 0.9,
        alignSelf: 'center',
        flexDirection: 'row',
        paddingRight: width * 0.01,
        paddingLeft: width * 0.01
    
    },
    contactCardButtonView: {
        alignItems: 'center',
        justifyContent: 'flex-end',
        flex: 1
     
    },
    contactCardContentView: {

        alignItems: 'center',
        justifyContent: 'center',
        flex: 2.5
    
    },
    textInputView: {
        borderBottomColor: '#76355B',
        borderBottomWidth: height * 0.002,
        width: width * 0.5,
    },
    updateContactButton: {
        backgroundColor: '#76355B',
        borderRadius: width * 0.15,
        paddingTop: height * 0.01,
        paddingBottom: height * 0.01,
        paddingLeft: width * 0.03,
        paddingRight: width * 0.03
    },
    updateContactButtonFontSize: {
        color: 'white',
        fontSize: height * 0.02
    },
    twoButtonsView: {
        flexDirection: 'row',
        paddingLeft: width * 0.025,
        paddingRight: width * 0.025,
        paddingVertical: height * 0.02
        
    },
    normalButton: {
        paddingTop: height * 0.015,
        paddingBottom: height * 0.015,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        borderTopLeftRadius: width * 0.10,
        borderBottomLeftRadius: width * 0.10,
        backgroundColor : '#ffffff',
        elevation: 7,
        position: 'relative',
        shadowColor: '#555264',
        shadowOffset: {
            width: 0,
            height: 10
        },
        shadowOpacity: 50,
    },

    averageButton: {
        paddingTop: height * 0.015,
        paddingBottom: height * 0.015,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        borderTopRightRadius: width * 0.10,
        borderBottomRightRadius: width * 0.10,
        backgroundColor : '#ffffff',
        elevation: 7,
        position: 'relative',
        shadowColor: '#555264',
        shadowOffset: {
            width: 0,
            height: 10
        },
        shadowOpacity: 50,
        
    },
    toggleButtonsText: {
        fontSize: height * 0.035
    },
    topUpbutton: {
        backgroundColor: '#76355B',
        borderRadius: width * 0.15,
        paddingTop: height * 0.01,
        paddingBottom: height * 0.01,
        paddingLeft: width * 0.1,
        paddingRight: width * 0.1,
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
        alignItems: 'flex-end',
        paddingLeft: width * 0.05,
        paddingRight: width * 0.05,
        paddingVertical: height * 0.02
       
    },
    topUpButtonFontSize: {
        color: 'white',
        fontSize: height * 0.03
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
        paddingBottom: height * 0.02,
        width: width * 0.9,
        alignSelf: 'center',
        alignItems: 'center'
    
    },
    topUpCardView: {
        paddingVertical: height * 0.02
    },
    pickerView: {
        marginVertical: height * 0.04
    },
    wizardWelcomeText: {
        fontSize: height * 0.03,
        textAlign: 'center',
        lineHeight: height * 0.06
    },
    textInputViewWeight: {
        borderBottomColor: '#76355B',
        borderBottomWidth: height * 0.002,
        width: width * 0.7,
     
    },
    adminPhoneTextStyle: {
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
  