
import React, {Component} from 'react';
import {View, 
    StyleSheet, 
    Text, 
    ScrollView,
    TouchableOpacity,
    TextInput,
    Image,
    Dimensions} from 'react-native';

import RNPickerSelect from 'react-native-picker-select';
import AntDesign from 'react-native-vector-icons/AntDesign';
import ImagePicker from 'react-native-image-picker';
import {connect} from 'react-redux';
import { showMessage} from "react-native-flash-message";
import {getDorms, getStreams, addStudent} from '../actions';
import {decode as atob, encode as btoa} from 'base-64';




class studentPage extends Component {

    state = {
        buttonOrIcon: 'icon',
        camera: false,
        photo: false,
        avatarSource: '',
        baseSource:'',
        buttonText: 'Take Photo',
        admValue:'',
        nemisValue:'',
        firstnameValue:'',
        middleNameValue:'',
        lastNameValue:'',
        kcpeValue:'',
        residenceValue:'',
        guardianNameValue:'',
        guardianContactCode:'',
        guardianContactValue:'',
        guardianPhone:'',
        classValue:'',
        streamValue:'',
        genderValue:'',
        statusValue:'',
        countyValue:'',
        dormValue:'',
        currentScrollPostion:0,
        validateErrorMessage:''
    }


    componentWillMount() {
        const {url, token} = this.props;
        this.props.getDorms(url, token);
        this.props.getStreams(url, token)
    }

    formValidate() {
        const {admValue, 
            nemisValue,
            firstnameValue,
            lastNameValue,
            kcpeValue,
            residenceValue,
            guardianNameValue,
            guardianContactCode,
            guardianContactValue,
            classValue,
            streamValue,
            dormValue,
            genderValue,
            statusValue,
            countyValue,   
        } = this.state;

        if (admValue === null || admValue === '') {
            this.setState({
                validateErrorMessage:'Adm No Cannot be empty'
            })
            return false;
        }

        if (nemisValue === null || nemisValue === '') {
            this.setState({
                validateErrorMessage:'NEMIS Cannot be empty'
            })
            return false;
        }

        if (firstnameValue === null || firstnameValue=== '') {
            this.setState({
                validateErrorMessage:'First Name Cannot be empty'
            })
            return false;
        }

        if (lastNameValue === null || lastNameValue === '') {
            this.setState({
                validateErrorMessage:'Last Name Cannot be empty'
            })
            return false;
        }

        if (nemisValue === null || nemisValue === '') {
            this.setState({
                validateErrorMessage:'NEMIS Cannot be empty'
            })
            return false;
        }

        if (kcpeValue === null || kcpeValue === '') {
            this.setState({
                validateErrorMessage:'KCPE Marks Cannot be empty'
            })
            return false;
        }

        if (isNaN(kcpeValue) || Number.isInteger(Number(kcpeValue) === false) || kcpeValue > 480) {
            this.setState({
                validateErrorMessage:'KCPE Marks Must be a valid number'
            })
            return false;
        }

        if (residenceValue === null || residenceValue === '') {
            this.setState({
                validateErrorMessage:'Residence Cannot be empty'
            })
            return false;
        }

        if (guardianNameValue === null || guardianNameValue === '') {
            this.setState({
                validateErrorMessage:'Parent Name Cannot be empty'
            })
            return false;
        }

        if (guardianContactCode === null || guardianContactCode === '') {
            this.setState({
                validateErrorMessage:'guardian Country code cannot be empty'
            })
            return false;
        }

        if (isNaN(guardianContactCode) || Number.isInteger(Number(guardianContactCode) === false)) {
            this.setState({
                validateErrorMessage:'guardian County Code Must be a valid number'
            })
            return false;
        }

        if (guardianContactValue === null || guardianContactValue === '') {
            this.setState({
                validateErrorMessage:'guardian Contact cannot be empty'
            })
            return false;
        }

        if (isNaN(guardianContactValue) || Number.isInteger(Number(guardianContactValue) === false)) {
            this.setState({
                validateErrorMessage:'guardian County Code Must be a valid number'
            })
            return false;
        }

        if (classValue === null || classValue === '') {
            this.setState({
                validateErrorMessage:'Select a class'
            })
            return false;
        }

        if (streamValue === null || streamValue === '') {
            this.setState({
                validateErrorMessage:'Select a stream'
            })
            return false;
        }

        if (dormValue === null || dormValue === '') {
            this.setState({
                validateErrorMessage:'Select a dorm'
            })
            return false;
        }

        if (genderValue === null || genderValue === '') {
            this.setState({
                validateErrorMessage:'Select a gender'
            })
            return false;
        }

        if (statusValue === null || statusValue === '') {
            this.setState({
                validateErrorMessage:'Select Student Status'
            })
            return false;
        }

        if (countyValue === null || countyValue === '') {
            this.setState({
                validateErrorMessage:'Select a county'
            })
            return false;
        }

        this.setState({
            validateErrorMessage: ''
        })
        return true;

    }

    b64toBlob (b64Data, contentType, sliceSize) {
        contentType = contentType || '';
        sliceSize = sliceSize || 512;

        var byteCharacters = atob(b64Data);
        var byteArrays = [];

        for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
            var slice = byteCharacters.slice(offset, offset + sliceSize);

            var byteNumbers = new Array(slice.length);
            for (var i = 0; i < slice.length; i++) {
                byteNumbers[i] = slice.charCodeAt(i);
            }

            var byteArray = new Uint8Array(byteNumbers);

            byteArrays.push(byteArray);
        }

      var blob = new File(byteArrays, {type: contentType});
      return blob;

    }


    onTakePhotoPress() {

        const {buttonText} = this.state;

        if (buttonText === 'Take Photo') {
            this.setState({
                camera: true
            })
        }else {
            const {admValue, 
                nemisValue,
                firstnameValue,
                middleNameValue,
                lastNameValue,
                kcpeValue,
                residenceValue,
                guardianNameValue,
                guardianContactCode,
                guardianContactValue,
                classValue,
                streamValue,
                dormValue,
                genderValue,
                statusValue,
                countyValue,   
                baseSource
            } = this.state;

            const {url, token} = this.props;

            if (middleNameValue === '' || middleNameValue === null) {

                var block = baseSource.split(";");
                
                var contentType = block[0].split(":")[1];
                
                var realData = block[1].split(",")[1];
               
                var file = this.b64toBlob(realData, contentType);

                console.log(file);

                this.props.addStudent(
                    url, 
                    token,
                    admValue, 
                    nemisValue,
                    firstnameValue + ' ' + lastNameValue,
                    kcpeValue,
                    residenceValue,
                    guardianNameValue,
                    guardianContactCode + guardianContactValue,
                    classValue,
                    streamValue,
                    dormValue,
                    genderValue,
                    statusValue,
                    countyValue,   
                    file
                    );

            }else {
                var block = baseSource.split(";");
                
                var contentType = block[0].split(":")[1];
                
                var realData = block[1].split(",")[1];

               
                var file = this.b64toBlob(realData, contentType);

                console.log(file);

                this.props.addStudent(
                    url, 
                    token,
                    admValue, 
                    nemisValue,
                    firstnameValue + ' ' + middleNameValue + ' ' + lastNameValue,
                    kcpeValue,
                    residenceValue,
                    guardianNameValue,
                    guardianContactCode + guardianContactValue,
                    classValue,
                    streamValue,
                    dormValue,
                    genderValue,
                    statusValue,
                    countyValue,   
                    file
                    );
            }

            
        }
       
    }

    showOrHideCamera() {
        const {camera} = this.state;

        if (camera) {

            const options = {
                storageOptions: {
                  skipBackup: true,
                  path: 'images',
                },
              };

              
            ImagePicker.launchCamera(options, (response) => {
  
                    if (response.didCancel) {

                        this.setState({
                            camera: false,
                            avatarSource: '',
                            photo: false,
                            buttonOrIcon: 'button',
                            buttonText: 'Take photo'
                        });
                    
                    } else if (response.error) {
                        this.setState({
                            camera: false,
                            avatarSource: '',
                            photo: false,
                            buttonOrIcon: 'button',
                            buttonText: 'Take photo'
                        });
                    } else {

                        console.log(response);

                    const source = { uri: response.uri };
                    const base = 'data:image/jpeg;base64,' + response.data


                    this.setState({
                        camera: false,
                        avatarSource: source,
                        photo: true,
                        buttonText: 'Add Student',
                        baseSource: base
                    })
                    }
                  });
   
            
        }
    }

    showOrHidePhoto() {
        const {photo, avatarSource} = this.state;
        const {width, height} = Dimensions.get('screen');
        const {imageContainer} = styles;

        console.log(avatarSource);

        if (photo) {
           
            return (
             <View style = {imageContainer}>

                <Image source={avatarSource}
                        style={{height: height * 0.4, width: width * 0.7, resizeMode: 'center', borderRadius: height * 0.05}}
                    />

             </View>
            );
        }
    }

    onScrollToBottom({layoutMeasurement, contentOffset, contentSize}) {
 
          const{height} = Dimensions.get('screen');
          if (layoutMeasurement.height + contentOffset.y >=
            contentSize.height -  height * 0.02) {
                this.setState({
                    buttonOrIcon: 'button',
                    currentScrollPostion: layoutMeasurement.height + contentOffset.y
                });
            }
            else {
                this.setState({
                    buttonOrIcon: 'icon',
                    currentScrollPostion: layoutMeasurement.height + contentOffset.y
                });
            }
    }

    onIconPress() {
        const {height, width} = Dimensions.get('screen');
        const {currentScrollPostion} = this.state;

        this.scrollView.scrollTo({x: currentScrollPostion, y: currentScrollPostion, animated: true, duration: 3000});
       
        this.setState({currentScrollPostion: currentScrollPostion + height/4});
    }

    showButtonOrIcon() {

        const {
            mainContainer,
            lowerSectionContainer,
            headerContainer,
            headerContainerText,
            topUpbutton,
            topUpButtonFontSize,
            topUpButtonView,
            textInputView,
            pickerView,
            codeTextInputView,
            numberTextInputView,
            twinInputView
        } = styles;

        const {height, width} = Dimensions.get('screen');
        const {buttonOrIcon} = this.state;
        if (buttonOrIcon === 'icon') {
            return (
                <View style = {topUpButtonView}>
                    <TouchableOpacity
                        onPress= {this.onIconPress.bind(this)}
                        >
                        <AntDesign name = 'downcircle' color = '#76355B' size = {height * 0.07}/>
                    </TouchableOpacity>

                </View>
            );


        } else {
            
            return (
                <View style = {topUpButtonView}>
                    <TouchableOpacity style = {topUpbutton}
                        onPress = {this.onTakePhotoPress.bind(this)}
                        >
                        <Text style = {topUpButtonFontSize}>
                            {this.state.buttonText}
                        </Text>
                    </TouchableOpacity>
                </View>
            );
        }

    }

    setScrollView = (scrollView) => {
        this.scrollView = scrollView;
      };
    

    render() {

        const streamPlaceholder = {
            label: 'Select a Stream...',
            value: null,
            color: 'purple',
          };

        const classPlaceholder = {
            label: 'Select a class...',
            value: null,
            color: 'purple',
          };

        const genderPlaceHolder = {
            label: 'Select a Gender...',
            value: null,
            color: 'purple',
          };

        const statusPlaceholder = {
            label: 'Select Student Status...',
            value: null,
            color: 'purple',
          };

        const countyPlaceholder = {
            label: 'Select Student County...',
            value: null,
            color: 'purple',
          };

        const dormPlaceholder = {
            label: 'Select Student Dorm...',
            value: null,
            color: 'purple',
          };

        const {
            mainContainer,
            lowerSectionContainer,
            headerContainer,
            headerContainerText,
            topUpbutton,
            topUpButtonFontSize,
            topUpButtonView,
            textInputView,
            pickerView,
            codeTextInputView,
            numberTextInputView,
            twinInputView
        } = styles;
        
        return(
            <View style = {mainContainer}>
                <View style = {headerContainer}>
                    <Text style = {headerContainerText}>
                        NEW STUDENT
                    </Text>
                </View>

                <ScrollView style = {lowerSectionContainer}
                    showsVerticalScrollIndicator = {false}
                    onScroll={({nativeEvent}) => {
                        this.onScrollToBottom(nativeEvent)    
                      }}
                      ref={this.setScrollView}
                      onContentSizeChange={()=>{        
                        this.scrollView.scrollToEnd({animated: true, duration: 3000})}}
                        
                    >
                    <View style = {textInputView}>
                        <TextInput
                            placeholder = "Adm No."
                            onChangeText = {value => this.setState({admValue: value})}
                            value = {this.state.admValue}
                            />
                    </View>

                    <View style = {textInputView}>
                        <TextInput
                            placeholder = "NEMIS (optional)"
                            onChangeText = {value => this.setState({nemisValue: value})}
                            value = {this.state.admValue}
                            />
                    </View>

                    <View style = {textInputView}>
                        <TextInput
                            placeholder = "First Name"
                            onChangeText = {value => this.setState({firstnameValue: value})}
                            value = {this.state.firstnameValue}
                            />
                    </View>

                    <View style = {textInputView}>
                        <TextInput
                            placeholder = "Middle Name (optional)"
                            onChangeText = {value => this.setState({ middleNameValue: value})}
                            value = {this.state.middleNameValue}
                            />
                    </View>

                    <View style = {textInputView}>
                        <TextInput
                            placeholder = "Last Name (optional)"
                            onChangeText = {value => this.setState({lastNameValue: value})}
                            value = {this.state.lastNameValue}
                            />
                    </View>

                    <View style = {textInputView}>
                        <TextInput
                            placeholder = "KCPE Marks(optional)"
                            keyboardType = 'number-pad'
                            onChangeText = {value => this.setState({kcpeValue: value})}
                            value = {this.state.kcpeValue}
                            />
                    </View>

                    <View style = {textInputView}>
                        <TextInput
                            placeholder = "Residence(optional)"
                            onChangeText = {value => this.setState({residenceValue: value})}
                            value = {this.state.residenceValue}
                            />
                    </View>

                    <View style = {textInputView}>
                        <TextInput
                            placeholder = "Guardian Name(optional)"
                            onChangeText = {value => this.setState({guardianNameValue: value})}
                            value = {this.state.guardianNameValue}
                            />
                    </View>

                    <View style = {twinInputView}>
                        <View style = {codeTextInputView}>
                            <TextInput
                                placeholder = "254"
                                keyboardType = 'number-pad'
                                onChangeText = {value => this.setState({guardianContactCode: value})}
                                value = {this.state.guardianContactCode}
                                />
                        </View>

                        <View style = {numberTextInputView}>
                            <TextInput
                                placeholder = "7..."
                                keyboardType = 'numeric'
                                onChangeText = {value => this.setState({guardianContactValue: value})}
                                value = {this.state.guardianContactValue}
                                />

                        </View>

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
                                onValueChange={(value) => this.setState({classValue: value})}
                                items={this.props.classes}
                                value = {this.state.classValue}
                            
                            />

                    </View>

                    <View style = {pickerView}>
                        <RNPickerSelect
                                placeholder = {streamPlaceholder}
                                style={{
                                    ...pickerSelectStyles,

                                    placeholder: {
                                        color: 'purple',
                                        fontSize: height * 0.025,
                                        fontWeight: 'bold',
                                    },
                                }}
                                useNativeAndroidPickerStyle={false}
                                onValueChange={(value) => this.setState({streamValue: value})}
                                items={this.props.streams}
                                value = {this.state.streamValue}
                            
                            />

                    </View>

                    <View style = {pickerView}>
                        <RNPickerSelect
                                placeholder = {dormPlaceholder}
                                style={{
                                    ...pickerSelectStyles,

                                    placeholder: {
                                        color: 'purple',
                                        fontSize: height * 0.025,
                                        fontWeight: 'bold',
                                    },
                                }}
                                useNativeAndroidPickerStyle={false}
                                onValueChange={(value) => this.setState({dormValue: value})}
                                items={this.props.dorms}
                                value = {this.state.dormValue}
                            
                            />

                    </View>

                    <View style = {pickerView}>
                        <RNPickerSelect
                                placeholder = {genderPlaceHolder}
                                style={{
                                    ...pickerSelectStyles,

                                    placeholder: {
                                        color: 'purple',
                                        fontSize: height * 0.025,
                                        fontWeight: 'bold',
                                    },
                                }}
                                useNativeAndroidPickerStyle={false}
                                onValueChange={(value) => this.setState({genderValue: value})}
                                items={[
                                    { label: 'Male', value: 'male' },
                                    { label: 'Female', value: 'female' },
                                    { label: 'Other', value: 'other' },
                                ]}
                                value = {this.state.genderValue}
                            
                            />

                    </View>

                    <View style = {pickerView}>
                        <RNPickerSelect
                                placeholder = {statusPlaceholder}
                                style={{
                                    ...pickerSelectStyles,

                                    placeholder: {
                                        color: 'purple',
                                        fontSize: height * 0.025,
                                        fontWeight: 'bold',
                                    },
                                }}
                                useNativeAndroidPickerStyle={false}
                                onValueChange={(value) => this.setState({statusValue: value})}
                                items={[
                                    { label: 'Day Scholar', value: 'Day' },
                                    { label: 'Boarder', value: 'Border' },
                                ]}
                                value = {this.state.statusValue}
                            
                            />

                    </View>

                    <View style = {pickerView}>
                        <RNPickerSelect
                                placeholder = {countyPlaceholder}
                                style={{
                                    ...pickerSelectStyles,

                                    placeholder: {
                                        color: 'purple',
                                        fontSize: height * 0.025,
                                        fontWeight: 'bold',
                                    },
                                }}
                                useNativeAndroidPickerStyle={false}
                                onValueChange={(value) => this.setState({countyValue: value})}
                                items={[
                                    { label: 'Football', value: 'football' },
                                    { label: 'Baseball', value: 'baseball' },
                                    { label: 'Hockey', value: 'hockey' },
                                ]}
                                value = {this.state.countyValue}
                            
                            />

                    </View>

                    {this.showOrHideCamera()}
                    {this.showOrHidePhoto()}



                </ScrollView>

                {this.showButtonOrIcon()}

        </View>
        );
    }
}

const mapStateToProps = ({loginReducer, smsReducer, studentReducer}) => {

    const {token, url} =  loginReducer;

    const {classes} = smsReducer;

    const {streams, dorms, studentLoading, studentMessage, studentColor} = studentReducer;


   

    return  {token, 
        url,
        classes,
        streams,
        dorms,
        studentColor,
        studentLoading,
        studentMessage
        };

};

export default connect (mapStateToProps, 
    {getStreams, getDorms,addStudent})(studentPage);


const {width, height} = Dimensions.get('screen');

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
    lowerSectionContainer: {
        paddingBottom: height * 0.02, 
        
    },
    headerContainerText: {
        color: 'white',
        fontSize: height * 0.04
    },
    textInputView: {
        borderBottomColor: '#76355B',
        borderBottomWidth: height * 0.002,
        width: width * 0.8,
        alignSelf: 'center',
        marginVertical: height * 0.015,
        borderRadius: width * 0.025,
    },
    codeTextInputView: {
        borderBottomColor: '#76355B',
        borderBottomWidth: height * 0.002,
        flex: 2,
        alignSelf: 'center',
        borderRadius: width * 0.025,
    },
    numberTextInputView: {
        borderBottomColor: '#76355B',
        borderBottomWidth: height * 0.002,
        flex: 4,
        alignSelf: 'center',
        borderRadius: width * 0.025,
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
    pickerView: {
        marginVertical: height * 0.03,
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    twinInputView: {
        marginVertical: height * 0.02,
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingHorizontal: width * 0.1
    },
    imageContainer: {
        marginVertical: height * 0.02,
        alignItems: 'center',
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
      alignSelf: 'center',
      width: width * 0.8
      
    },
  });