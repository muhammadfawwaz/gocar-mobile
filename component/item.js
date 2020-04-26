import React from 'react';
import { TouchableNativeFeedback, View, Text } from 'react-native'

const item = (props) => {
    return(
        <TouchableNativeFeedback
            key={props.item.id}
            onPress={() => props.selected(props.item)} >
                <View
                style={{
                    paddingTop: 15,
                    paddingBottom: 15}}>
                    <Text 
                    style={{
                        fontWeight: 'bold', 
                        fontSize: 15,
                        paddingStart: 16,
                        paddingEnd: 16}}>{props.item.name}</Text>
                    <Text 
                    style={{
                        color: '#c7c7c7',
                        paddingStart: 16,
                        paddingEnd: 16}}>{props.item.formatted_address}</Text>
                </View>
        </TouchableNativeFeedback>
    );
};

export default item;