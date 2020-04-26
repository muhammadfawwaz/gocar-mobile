import React from 'react';
import { View, TextInput, Dimensions, Text, TouchableNativeFeedback, Image } from 'react-native'
import star1 from '../asset/image/star.png';
import star2 from '../asset/image/star2.png';
import myFace from '../asset/image/maface.png';

const rating = (props) => {
    const star = []
    let j = 0
    for (let i = 0; i < 5 - props.star; i++) {
        star.push(<TouchableNativeFeedback key={'black' + i} onPress={() => props.changeStar(i)}>
            <Image
                style={{
                    width: 60,
                    height: 60,
                    marginStart: 5,
                    marginEnd: 5
                }}
                source={star2}/>
        </TouchableNativeFeedback>
        )
        j++
    }
    for (let i = 0; i < props.star; i++) {
        star.push(<TouchableNativeFeedback key={'yellow' + i} onPress={() => props.changeStar(j+i)}>
            <Image
                style={{
                    width: 60,
                    height: 60,
                    marginStart: 5,
                    marginEnd: 5
                }}
                source={star1}/>
        </TouchableNativeFeedback>
        )
    }
    const advice1Component = []
    const advice2Component = []
    const advice1 = [
        'Pickup', 'Timing', 'Politness'
    ]

    const advice2 = [
        'Driving', 'Payment', 'Others'
    ]

    advice1.map((adv, idx) => {
        advice1Component.push(
            <TouchableNativeFeedback key={'adv1' + idx} onPress={() => props.adviceSelected('adv1' + idx)}>
                <View
                    style={{
                        borderRadius: 4,
                        borderColor: props.advice['adv1' + idx] ? '#dc9a3c' : '#fff',
                        backgroundColor: props.advice['adv1' + idx] ? '#dc9a3c' : null,
                        borderWidth: 1,
                        width: 120,
                        height: 50
                    }}>
                    <Text
                        style={{
                            textAlign: 'center',
                            textAlignVertical: 'center',
                            fontSize: 18,
                            height: '100%',
                            color: props.advice['adv1' + idx] ? '#fff' : null
                        }}>{adv}</Text>
                </View>
            </TouchableNativeFeedback>
        )

        advice2Component.push(
            <TouchableNativeFeedback key={'adv2' + idx} onPress={() => props.adviceSelected('adv2' + idx)}>
                <View
                    style={{
                        borderRadius: 4,
                        borderColor: props.advice['adv2' + idx] ? '#dc9a3c' : '#fff',
                        backgroundColor: props.advice['adv2' + idx] ? '#dc9a3c' : null,
                        borderWidth: 1,
                        width: 120,
                        height: 50
                    }}>
                    <Text
                        style={{
                            textAlign: 'center',
                            textAlignVertical: 'center',
                            fontSize: 18,
                            height: '100%',
                            color: props.advice['adv2' + idx] ? '#fff' : null
                        }}>{advice2[idx]}</Text>
                </View>
            </TouchableNativeFeedback>
        )
    })

    return(
        <View 
            style={{
                width: Dimensions.get('window').width,
                height: Dimensions.get('window').height,
                backgroundColor: '#ffffff',
                position: 'absolute',
            }}>
            <View>
                    <View style={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: "space-between",
                        height: 120,
                        paddingLeft: 20
                    }}>
                        <View style={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: 'flex-start',
                            alignSelf: 'center'
                        }}>
                            <Image
                                style={{
                                    width: 60,
                                    height: 60,
                                    borderRadius: 50,
                                    marginRight: 10
                                }}
                                source={myFace} />
                            
                            <View style={{
                                display: 'flex',
                                justifyContent: 'center'
                            }}>
                                <Text style={{
                                    textAlignVertical: 'center',
                                    fontWeight: 'bold',
                                    fontSize: 20
                                }}>{props.dataDriver.name}</Text>
                                <Text style={{
                                    textAlignVertical: 'center',
                                    color: '#CBC5C4',

                                }}>{props.rideSelected.name}</Text>
                            </View>
                        </View>

                        <View style={{
                            alignSelf: 'center',
                            paddingRight: 20
                        }}>
                            <Text style={{
                                fontWeight: 'bold',
                                fontSize: 20
                            }}>{props.cost}</Text>
                            <View style={{
                                backgroundColor: '#5599cb',
                                borderRadius: 2
                            }}>
                                <Text style={{
                                    color: '#fff',
                                    textAlign: 'center'
                                }}>{props.paymentMethod}</Text>
                            </View>
                        </View>
                    </View>
            </View>
            <View
                style={{
                    borderBottomColor: '#efefef',
                    borderBottomWidth: 1,
                    width: Dimensions.get('window').width / 1.2,
                    alignSelf: 'center',
                    marginBottom: 20
                }} 
            />
            <View
                style={{
                    flexDirection: 'row',
                    alignSelf: 'center',
                    marginBottom: 74,
                    marginTop: 30
                }}>
                    {star}
            </View>
            <View
                style={{
                    width: '100%',
                    backgroundColor: '#e1e7e9',
                }}>
                    <Text
                        style={{
                            fontWeight: 'bold',
                            textAlign: 'center',
                            paddingTop: 30,
                            paddingBottom: 30,
                            fontSize: 20
                        }}>What we can do better?</Text>
                    <View
                        style={{
                            paddingStart: 10,
                            paddingEnd: 10,
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            marginBottom: 20
                        }}>
                            {advice1Component}
                    </View>

                    <View
                        style={{
                            paddingStart: 10,
                            paddingEnd: 10,
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            paddingBottom: 30
                        }}>
                            {advice2Component}
                    </View>
            </View>

            <TextInput
                style={{
                    width: '100%',
                    height: 100,
                    position: 'absolute',
                    bottom: '13%'
                }} 
                placeholder='Add Comment' />
            
            <TouchableNativeFeedback onPress={props.submit}>
                <View
                    style={{
                        width: '100%',
                        height: 80,
                        backgroundColor: '#3fa656',
                        position: 'absolute',
                        bottom: '3%'
                    }}>
                    <Text
                        style={{
                            height: '100%',
                            textAlign: 'center',
                            textAlignVertical: 'center',
                            fontWeight: 'bold',
                            color: "#fff",
                            fontSize: 20
                        }}>Submit</Text>
                </View>
            </TouchableNativeFeedback>
        </View>
    );
};

export default rating;