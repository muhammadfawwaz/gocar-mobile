import React from 'react';
import { View, Text, Dimensions, Image, TouchableNativeFeedback, StyleSheet } from 'react-native';
import myFace from '../asset/image/maface.png';
import { TextInput, FlatList } from 'react-native-gesture-handler';
import sendIcon from '../asset/image/maface.png';

const driverPickup = (props) => {
    console.log(props)
    let style = StyleSheet.create({
        driver: {
            width: Dimensions.get('window').width,
            height: 220,
            backgroundColor: '#ffffff',
            borderTopStartRadius: 20,
            borderTopEndRadius: 20,
            paddingBottom: 0,
            position: 'absolute',
            top: '70%',
            display: 'flex',
            flex: 1,
            alignContent: 'center'
        },
        chat: {
            width: Dimensions.get('window').width,
            height: Dimensions.get('window').height,
            backgroundColor: '#ffffff',
            paddingBottom: 0,
            position: 'absolute',
            top: '0%',
            display: 'flex',
            flex: 1,
            alignContent: 'center'
        }
    })
    let component = (
        <View>
            <View 
                    style={{
                        marginTop: 5,
                        width: 50,
                        height: 5,
                        borderRadius: 10,
                        backgroundColor: '#efefef',
                        alignSelf: 'center'
                    }} />
                <View
                    style={{
                        display: 'flex',
                        flexDirection: 'row'
                    }}>
                        <Image
                            style={{
                                width: 60,
                                height: 60,
                                borderRadius: 50,
                                margin: 20
                            }}
                            source={myFace} />
                        <View
                            style={{
                                marginTop: 20
                            }}>
                            <Text
                                style={{
                                    fontWeight: 'bold',
                                    fontSize: 15
                                }}>{props.dataDriver.number_plate}</Text>
                            <Text
                                style={{
                                    fontWeight: 'bold'
                                }}>{props.dataDriver.car}</Text>
                            <Text>{props.dataDriver.name}   <Text style={{
                                fontWeight: 'normal'
                            }}>{props.text}</Text></Text>
                        </View>
                </View>
                <View
                    style={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'center'
                    }}>
                        <View
                            style={{
                                borderWidth: 1,
                                borderColor: '#efefef',
                                borderRadius: 20,
                                marginRight: 10,
                                padding: 10
                            }}>
                            <Text>{props.dataDriver.rating_avg}</Text>
                        </View>
                        <View
                            style={{
                                borderWidth: 1,
                                borderColor: '#efefef',
                                borderRadius: 20,
                                padding: 10
                            }}>
                            <Text>{props.dataDriver.total_trip} trip in the last week</Text>
                        </View>
                </View>
                <View
                    style={{
                        borderBottomColor: '#efefef',
                        borderBottomWidth: 1,
                        marginTop: 10,
                    }}
                />
                <View
                    style={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-evenly'
                    }}>
                        <TouchableNativeFeedback>
                            <View 
                                style={{
                                    flex: 1,
                                    height: 55,
                                    justifyContent: 'center'
                                }}>
                                <Text 
                                    style={{
                                        textAlign: 'center'
                                    }}>Telepon</Text>
                            </View>
                        </TouchableNativeFeedback>
                        <TouchableNativeFeedback onPress={props.changed}>
                            <View 
                                style={{
                                    flex: 1,
                                    height: 55,
                                    justifyContent: 'center'
                                }}>
                                <Text 
                                    style={{
                                        textAlign: 'center'
                                    }}>Chat</Text>
                            </View>
                        </TouchableNativeFeedback>
                </View>
        </View>
    )
    if(props.showChat) {
        component = <View
            style={{
                flex: 1
            }}>
                <View
                    style={{
                        display: 'flex',
                        flexDirection: 'row'
                    }}>
                        <Image
                            style={{
                                width: 60,
                                height: 60,
                                borderRadius: 50,
                                margin: 20
                            }}
                            source={myFace} />
                        <View
                            style={{
                                marginTop: 20
                            }}>
                            <Text>Akhmad Ismail</Text>    
                            <Text
                                style={{
                                    fontWeight: 'bold',
                                    fontSize: 15
                                }}>DA1094BL</Text>
                        </View>
                </View>
                <View
                    style={{
                        borderBottomColor: '#efefef',
                        borderBottomWidth: 1,
                    }}
                />
                <View
                    style={{
                        flex: 1
                    }}>
                    <FlatList
                        style={{
                            margin: 15
                        }}
                        data={[
                            { key: '0', sender: 0, msg: 'Ok' },
                            { key: '1', sender: 1, msg: 'Di depan indomaret ya' },
                            { key: '2', sender: 0, msg: 'Siap kak' },
                        ]}
                        renderItem={({item}) => <View 
                            key={item.key}
                            style={{
                                maxWidth: 190,
                                borderRadius: 15,
                                backgroundColor: item.sender == 0 ? '#efefef' : '#46aa1a',
                                marginBottom: 20,
                                alignSelf: item.sender == 0 ? 'flex-start' : 'flex-end'
                            }}>
                            <Text style={{
                                padding: 10,
                                paddingStart: 20,
                                paddingEnd: 20
                            }}>{item.msg}</Text>
                        </View>} />
                </View>
                <View
                    style={{
                        width: Dimensions.get('window').width,
                        position: 'absolute',
                            top: props.chatTyping ? '53%' : '90%',
                    }}>
                    <View
                        style={{
                            borderBottomColor: '#efefef',
                            borderBottomWidth: 1,
                        }}
                    />
                    <View
                        style={{
                            flex: 1,
                            flexDirection: 'row',
                        }}>
                        <TextInput
                            style={{
                                flex: 1,
                                paddingLeft: 20
                            }}
                            placeholder='Type message' />
                        <Image 
                            style={{
                                width: 40,
                                height: 40,
                                borderRadius: 20,
                                alignSelf: 'center'
                            }}
                            source={sendIcon}/>
                    </View>
                    <View
                        style={{
                            borderBottomColor: '#efefef',
                            borderBottomWidth: 1,
                        }}
                    />
                </View>
        </View>
    }
    return(
        <View
            style={props.showChat ? style.chat : style.driver}>
            {component}    
        </View>
    );  
};

export default driverPickup