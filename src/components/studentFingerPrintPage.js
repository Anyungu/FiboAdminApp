

import React, { Component } from 'react';
import {

    StyleSheet,
    Text,
    ScrollView,
    TouchableOpacity,
    NativeModules,
    Dimensions,
    NativeEventEmitter
} from 'react-native';


import BleManager from 'react-native-ble-manager';
import { PermissionsAndroid } from 'react-native';



class studentFingerPrintPage extends Component {

    state = {
        isEnabled: false,
        devices: [],
        unpairedDevices: [],
        peripherals: new Map(),
        scanning: false
    }



    scan() {
        console.log('Scanning...');
        BleManager.scan([], 70).then(() => {
            console.log('Scanning...');
         
        }).catch(error => {
            console.log("hakuna")
        })
    }

    stopScan() {
        BleManager.stopScan()
            .then(() => {
                // Success code
                console.log('Scan stopped');
        
            });
    }

    check() {

        BleManager.getDiscoveredPeripherals([])
            .then(devices => {
                console.log('Discovered devices:', devices[0]);
              
                devices.forEach(one => {
                    console.log(one.id)
                    BleManager.connect(one.id)
                    .then(() => {
                        // Success code
                        console.log('Connected');
                    })
                    .catch((error) => {
                        // Failure code
                        console.log(error);
                    });
                })
               

            })
            .catch(error => {
                console.log('error fail: ', error);

            });
    }



    componentDidMount() {

        async function requestCameraPermission() {
            try {
                const granted = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
                    {
                        title: 'Cool Photo App Camera Permission',
                        message:
                            'Cool Photo App needs access to your camera ' +
                            'so you can take awesome pictures.',
                        buttonNeutral: 'Ask Me Later',
                        buttonNegative: 'Cancel',
                        buttonPositive: 'OK',
                    },
                );
                if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                    console.log('You can use the camera');

                } else {
                    console.log('Camera permission denied');
                }
            } catch (err) {
                console.warn(err);
            }
        }


        



        requestCameraPermission().then(() => {


            BleManager.start({ showAlert: true })
                .then(() => {
                    // Success code
                    console.log('Module initialized');
                    BleManager.enableBluetooth()
                        .then(() => {
                            // Success code
                            console.log('The bluetooth is already enabled or the user confirm');
                            this.scan();
                        })
                        .catch((error) => {
                            // Failure code
                            console.log('The user refuse to enable bluetooth');
                        });

                });
        })









    }

    render() {
        const {
            lowerSectionContainer,
            topUpbutton,
            topUpButtonFontSize
        } = styles;
        return (
            <ScrollView style={lowerSectionContainer}
                showsVerticalScrollIndicator={false}>

                <TouchableOpacity style={topUpbutton} onPress={this.check.bind(this)}>

                    <Text style={topUpButtonFontSize}>
                        ola
                    </Text>
                </TouchableOpacity>

            </ScrollView>
        );
    }
}

export default studentFingerPrintPage;

const { height, width } = Dimensions.get('screen');

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