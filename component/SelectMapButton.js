import React from 'react';
import { View, TouchableNativeFeedback, Text } from 'react-native';

const selectMapButton = (props) => {
    return(
        <TouchableNativeFeedback onPress={props.clicked}>
          <View style={{
            borderWidth: 1,
            borderColor: '#efefef',
            borderRadius: 15,
            width: 140,
            paddingTop: 7,
            paddingBottom: 7,
            marginTop: 20,
            marginStart: 16
          }}>
            <Text style={{
              textAlign: 'center'
            }}>Select via Map</Text>
          </View>
        </TouchableNativeFeedback>
    );
};

export default selectMapButton;