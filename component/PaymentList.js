import React from 'react';
import { View, TextInput, Dimensions, Text, FlatList, TouchableNativeFeedback } from 'react-native'

const paymentList = (props) => {
    const line = <View
        style={{
        borderBottomColor: '#efefef',
        borderBottomWidth: 1,
        }}
    />
    return(
        <View
            style={{
                backgroundColor: '#fff',
                height: Dimensions.get('window').height
            }}>
            <Text
                style={{
                    paddingLeft: 16,
                    fontWeight: 'bold',
                    fontSize: 20,
                    paddingBottom: 20,
                    paddingTop: 30
                }}>Select a payment method</Text>
            <TouchableNativeFeedback
                onPress={() => props.changePaymentMethod('Paylater')}>
                <View>
                    <View style={{
                        paddingLeft: 32,
                        paddingTop: 10
                    }}>
                        <Text style={{
                            fontWeight: 'bold',
                            marginBottom: 10
                        }}>PayLater</Text>
                        <Text
                            style={{
                                marginBottom: 20
                            }}>Order now, pay later!</Text>
                    </View>
                    {line}
                </View>
            </TouchableNativeFeedback>

            <TouchableNativeFeedback
                onPress={() => props.changePaymentMethod('Gopay')}>
                <View>
                    <View style={{
                        paddingLeft: 32,
                        paddingTop: 10
                    }}>
                        <Text style={{
                            fontWeight: 'bold',
                            marginBottom: 10
                        }}>Gopay</Text>
                        <Text
                            style={{
                                marginBottom: 20
                            }}>Balance: Rp45.664</Text>
                    </View>
                    {line}
                </View>
            </TouchableNativeFeedback>

            <TouchableNativeFeedback
                onPress={() => props.changePaymentMethod('cash')}>
                <View>
                    <View style={{
                        paddingLeft: 32,
                        paddingTop: 10
                    }}>
                        <Text style={{
                            fontWeight: 'bold',
                            marginBottom: 10
                        }}>Cash</Text>
                        <Text
                            style={{
                                marginBottom: 20
                            }}>Avoid hassle by keeping the exact amount ready.</Text>
                    </View>
                    {line}
                </View>
            </TouchableNativeFeedback>
        </View>
    );
};

export default paymentList;