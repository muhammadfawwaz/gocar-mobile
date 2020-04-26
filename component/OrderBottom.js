import React from 'react';
import { View, TextInput, Dimensions, Text, TouchableNativeFeedback } from 'react-native'
import TransportList from './TransportList';
import PaymentList from './PaymentList';
import item from './item';

const orderBottom = (props) => {
    let paymentList = null;
    let highlight = <View
        style={{
            flex: 1,
            flexDirection: 'row',
            width: Dimensions.get('window').width / 1.1,
            height: 70,
            backgroundColor: '#ffffff',
            borderRadius: 20,
            elevation: 2,
            alignSelf: 'center',
            position: 'absolute',
            top: '2%'
        }}>
        <View
            style={{
                flex: 1,
                alignSelf: 'center',
                flexDirection: 'column',
                paddingLeft: 28,
                marginRight: 15
            }}>
            <Text
                style={{
                    fontWeight: 'bold'
                }}>{props.pick}</Text>
            <View
                style={{
                    borderBottomColor: '#efefef',
                    borderBottomWidth: 1,
                    marginTop: 5,
                    marginBottom: 5
                }}
            />
            <Text
                style={{
                    fontWeight: 'bold'
                }}>{props.dest}</Text>
        </View>
        <TouchableNativeFeedback onPress={props.clicked}>
            <View style={{
                width: 65,
                height: 35,
                borderWidth: 1,
                borderRadius: 20,
                borderColor: '#3e965b',
                paddingTop: 5,
                alignSelf: 'center',
                marginRight: 15
            }}>
                <Text style={{
                    textAlign: 'center',
                    color: '#4cb02e',
                    fontWeight: 'bold'
                }}>Edit</Text>
            </View>
        </TouchableNativeFeedback>
    </View>;

    if(props.showPayment) {
        paymentList = <PaymentList 
            changePaymentMethod={props.changePaymentMethod}/>
        highlight = null
    }

    return(
        <View 
            style={{
                flex: 1,
            }}>
            {highlight}
            <View
                style={{
                    width: Dimensions.get('window').width,
                    height: Dimensions.get('window').height / 2,
                    backgroundColor: '#ffffff',
                    borderTopStartRadius: 20,
                    borderTopEndRadius: 20,
                    paddingRight: 16,
                    paddingTop: 5,
                    position: 'absolute',
                    top: props.showRide ? '30%' : '50%'
                }}>
                    <TouchableNativeFeedback
                        onPress={props.changed}
                        background={TouchableNativeFeedback.Ripple('white')}>
                        <View style={{
                            width: Dimensions.get('window').width,
                            height: 8
                        }}>
                            <View
                                style={{
                                    width: 50,
                                    height: 5,
                                    backgroundColor: '#cbccce',
                                    borderRadius: 20,
                                    alignSelf: 'center',
                                }}/>
                        </View>
                    </TouchableNativeFeedback>
                    <TransportList 
                        changed={props.changed}
                        showRide={props.showRide}
                        price={props.price} 
                        duration={props.duration}
                        rideChanged={props.rideChanged}
                        standardPrice={props.standardPrice}/>
            </View>
            <View
                style={{
                    width: Dimensions.get('window').width,
                    height: Dimensions.get('window').height / 4,
                    backgroundColor: '#f3f3f3',
                    paddingRight: 16,
                    paddingLeft: 16,
                    paddingTop: 5,
                    position: 'absolute',
                    top: '74%'
                }}>
                    <View style={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        paddingTop: 10
                    }}>
                        <Text
                            style={{
                                fontSize: 15,
                                fontWeight: 'bold'
                            }}>{props.paymentMethod}</Text>
                        
                        <TouchableNativeFeedback onPress={props.paymentChanged}>
                            <View 
                                style={{
                                    width: 10,
                                    height: 10,
                                    borderRadius: 10,
                                    backgroundColor: 'black',
                                    alignSelf: 'center'
                                }} />
                        </TouchableNativeFeedback>
                    </View>
                    <TouchableNativeFeedback>
                        <View
                            style={{
                                backgroundColor: '#226bc7',
                                borderRadius: 15,
                                paddingTop: 10,
                                paddingBottom: 10,
                                paddingLeft: 32,
                                marginTop: 15
                            }}>
                            <Text
                                style={{
                                    color: '#fff'
                                }}>Lets tip the driver heroes at the end of trip</Text>
                        </View>
                    </TouchableNativeFeedback>
                    <TouchableNativeFeedback onPress={props.nextProcess}>
                        <View
                            style={{
                                backgroundColor: '#46aa1a',
                                borderRadius: 30,
                                paddingTop: 20,
                                paddingBottom: 20,
                                paddingLeft: 32,
                                marginTop: 15,
                                display: 'flex',
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                            }}>
                            <Text
                                style={{
                                    color: '#fff',
                                    fontWeight: 'bold',
                                    fontSize: 18
                                }}>Order {props.rideSelected.name}</Text>
                            <Text
                                style={{
                                    color: '#fff',
                                    fontWeight: 'bold',
                                    marginRight: 16,
                                    fontSize: 18
                                }}>{props.rideSelected.price}</Text>
                        </View>
                    </TouchableNativeFeedback>
            </View>
            {paymentList}
        </View>
    );
};

export default orderBottom;