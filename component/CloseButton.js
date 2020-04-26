import React from 'react'
import { View, TouchableNativeFeedback, Image, Keyboard } from 'react-native'
import closeIcon from '../asset/image/close.png';

const closeButton = (props) => {
    return(
        <TouchableNativeFeedback onPress={() => {
            Keyboard.dismiss()
            props.clicked()
        }}>
          <View style={{
                width: 15,
                height: 15,
              }}>
            <Image 
              style={{
                width: 15,
                height: 15,
                alignSelf: 'center'
              }}
              source={closeIcon} />
          </View>
            {/* "Icon made by Freepik perfect from www.flaticon.com" */}
        </TouchableNativeFeedback>
    );
};

export default closeButton;