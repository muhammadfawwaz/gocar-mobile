import React from 'react';
import { TextInput } from 'react-native';

const customInput = (props) => {
    return(
        <TextInput
            style={{ 
                // color: props.pickStat ? '#000' : '#efefef',
            }}
            placeholder={props.placeholder}
            onChangeText={text => props.changed(text)}
            value={props.pickValue}
            onTouchStart={() => props.touch('pickup')}
            />
    );
};

export default customInput