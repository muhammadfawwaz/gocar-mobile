import React from 'react';
import { View, Dimensions, Text, TouchableNativeFeedback, FlatList, TextInput, Image } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

const select = (props) => {
    let txt = null;
    let obj = <View style={{
        paddingTop: 25,
        paddingLeft: 48}}>
        <Text style={{fontWeight: 'bold', fontSize: 15}}>{props.title}</Text>
        <Text style={{color: '#c7c7c7'}}>{props.description}</Text>
    </View>;

    if(props.which == 'pickup') {
        txt = <Text style={{
            marginTop: 10,
            marginLeft: 16
        }}>See nearby spots for an easier pickup</Text>

        obj = <View>
            <FlatList 
                style={{
                    marginTop: 15,
                    height: 150
                }}
                data={props.data}
                renderItem={({item, index}) => <TouchableNativeFeedback onPress={() => props.clicked(index)}>
                    <View 
                    key={item.id} 
                    style={{
                        width: 250,
                        height: 120,
                        borderRadius: 8,
                        padding: 10,
                        paddingLeft: 20, 
                        marginLeft: 10,
                        marginRight: 10,
                        elevation: 3,
                    }}>
                        
                        <Text style={{
                            fontWeight: 'bold'
                        }}>{item.name}</Text>
                        <Text>{item.vicinity}</Text>
                </View>
                </TouchableNativeFeedback>}
                horizontal={true}/>

                <View style={{
                    borderWidth: 1,
                    borderColor: '#efefef',
                    borderRadius: 20,
                    marginLeft: 16
                }}>
                    <TextInput
                        style={{
                            color: props.notesFilled ? '#000' : '#efefef',
                            marginLeft: 8
                        }} 
                        placeholder='Add notes for your driver...'
                        value={props.notes}
                        onChangeText={text => props.notesChanged(text)}/>
                </View>
        </View>
    }
    return(
        <View
            style={{
                width: Dimensions.get('window').width,
                height: Dimensions.get('window').height / 2,
                backgroundColor: '#ffffff',
                borderTopStartRadius: 20,
                borderTopEndRadius: 20,
                padding: 16,
                paddingLeft: 0,
                paddingBottom: 0,
                position: 'absolute',
                top: props.which == 'dest' ? '70%' : props.notesTyping ? '30%' : '50%'
            }}>
            
            <View style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                paddingLeft: 16,
            }}>
                <Text style={{
                    fontSize: 23,
                    fontWeight: 'bold',
                    }}>{props.which == 'dest' ? "Set destination location" : "Set pickup location"}</Text>
                
                <TouchableNativeFeedback onPress={props.edit}>
                    <View style={{
                        width: 65,
                        borderWidth: 1,
                        borderRadius: 20,
                        borderColor: '#3e965b',
                        paddingTop: 5,
                    }}>
                        <Text style={{
                            textAlign: 'center',
                            color: '#4cb02e',
                            fontWeight: 'bold'
                        }}>Edit</Text>
                    </View>
                </TouchableNativeFeedback>
            </View>

            {txt}

            {obj}

            <TouchableNativeFeedback onPress={props.setLocation}>
                <View style={{
                    marginTop: 15,
                    backgroundColor: '#46aa1a',
                    borderRadius: 20,
                    paddingTop: 10,
                    paddingBottom: 10,
                    marginLeft: 16,
                }}>
                    <Text style={{
                        textAlign: 'center',
                        fontWeight: 'bold',
                        color: '#fff',
                        fontSize: 15
                    }}>{props.which == 'dest' ? 'Set destination location' : 'Next'}</Text>
                </View>
            </TouchableNativeFeedback>
        </View>
    );
};

export default select;