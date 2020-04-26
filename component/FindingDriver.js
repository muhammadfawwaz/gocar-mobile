import React from 'react';
import { View, Text, Dimensions } from 'react-native';

const findingDriver = (props) => {
    return(
        <View
            style={{
                width: Dimensions.get('window').width,
                height: 150,
                backgroundColor: '#ffffff',
                borderTopStartRadius: 20,
                borderTopEndRadius: 20,
                padding: 16,
                paddingBottom: 0,
                position: 'absolute',
                top: '80%',
                display: 'flex'
            }}>
                <Text
                    onPress={props.reset}
                    style={{
                        fontWeight: 'bold',
                        fontSize: 18,
                        textAlign: 'center',
                        flex: 1
                    }}>Finding Driver...</Text>
                <Text
                    style={{
                        fontWeight: 'bold',
                        color: 'red',
                        textAlign: 'center',
                        flex: 1
                    }}>Cancel Order</Text>
        </View>
    );  
};

export default findingDriver