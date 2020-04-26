import React from 'react';
import { View, Text, TextInput, Dimensions, Image } from 'react-native';
import CustomInput from './CustomInput';
import SelectMapButton from './SelectMapButton';
import { FlatList, TouchableNativeFeedback } from 'react-native-gesture-handler';
import CloseButton from './CloseButton';
import Item from './item';

const destinationButton = (props) => {
    let pickup = null;
    let line = null;
    let mapButton = null;
    let closeButton = null;

    if(props.destinationTyping) {
      pickup = <CustomInput 
        pickStat={props.pickStat}
        placeholder="Search for a pick up"
        changed={props.pickChanged}
        pickValue={props.pickValue}
        touch={props.changeWhich}/>
      
        line = <View
          style={{
            borderBottomColor: '#efefef',
            borderBottomWidth: 1,
          }}
        />

        mapButton = <SelectMapButton clicked={props.changeProcess}/>
        closeButton = <CloseButton clicked={props.closed}/>
    }

    return(
        <View
            style={{
                width: Dimensions.get('window').width,
                height: props.destinationTyping ? Dimensions.get('window').height / 1.3 : Dimensions.get('window').height / 2,
                backgroundColor: '#ffffff',
                borderTopStartRadius: props.destinationTyping ? 0 : 20,
                borderTopEndRadius: props.destinationTyping ? 0 : 20,
                paddingTop: 16,
                position: 'absolute',
                top: props.destinationTyping ? '0%' : '50%'
            }}>
              <View style={{
                flexDirection: 'row',
                marginTop: 15,
                marginBottom: 25,
                paddingStart: 16
              }} >
                {closeButton}
                <Text style={{
                  fontSize: 18,
                  fontWeight: 'bold',
                  marginLeft: props.destinationTyping ? 20 : 0
                }}>Where would you like to go?</Text>
              </View>
            <View style={ props.destinationTyping ? {
              borderRadius: 10,
              borderColor: '#efefef',
              borderWidth: 1,
              marginStart: 16,
              marginEnd: 16
            } : null}>
              {pickup}
              {line}

              <TextInput
                autoFocus={true}
                style={ props.destinationTyping ? null : { 
                  height: 40, 
                  borderColor: '#efefef', 
                  borderWidth: 1 ,
                  borderRadius: 10,
                  marginStart: 16,
                  marginEnd: 16,
                  // color: props.destinationStat ? '#000' : '#efefef'
                }}
                placeholder="Search for a destination"
                onChangeText={text => props.destChanged(text)}
                onTouchStart={() => props.changeWhich('dest')}
                value={props.destinationValue}
                onTouchEnd={props.autoFill} />
                
            </View>

            {mapButton}

            <FlatList
              data={props.which === 'dest' ? props.destSuggest : props.pickSuggest}
              renderItem={({item}) => <Item 
                item={item}
                selected={props.selected}/>} />
          </View>
    );
};

export default destinationButton