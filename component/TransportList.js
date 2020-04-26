import React from 'react';
import { View, TextInput, Dimensions, Text, FlatList, TouchableNativeFeedback } from 'react-native'

const transportList = (props) => {
    let title = null;
    if(props.showRide) {
        title = <Text
        onPress={props.changed}
        style={{
            paddingLeft: 16,
            fontWeight: 'bold',
            fontSize: 20,
            paddingBottom: 10
        }}>Change your ride?</Text>
    }
    // console.log(props.price)
    return(
        <View>
            {title}
            <FlatList 
                data={[
                    { key: '0', name: 'Gocar', pass: '1-4 people', price: 'Rp' + (props.price + props.standardPrice.price_gocar), time: parseInt(props.duration) + 'mins'},
                    { key: '1', name: 'Gocar(L)', pass: '1-6 people', price: 'Rp' + (props.price + props.standardPrice.price_gocar_L), time: parseInt(props.duration) + 'mins'},
                    { key: '2', name: 'Goride', pass: '1 person', price: 'Rp' + (props.price + props.standardPrice.price_gride), time: parseInt(props.duration) + 'mins'},
                    { key: '3', name: 'GoBlueBird', pass: '1-4 people', price: 'Rp' + (props.price + props.standardPrice.price_blue_bird), time: parseInt(props.duration) + 'mins'},
                ]}
                renderItem={({item}) => <TouchableNativeFeedback 
                    key={item.key} 
                    onPress={() => props.rideChanged(item)}>
                    <View
                        style={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            padding: 15
                        }}>
                            <View>
                                <Text style={{ fontWeight: 'bold', fontSize: 18 }}>{item.name}</Text>
                                <Text>{item.pass}</Text>
                            </View>
                            <View>
                                <Text style={{ fontWeight: 'bold', fontSize: 18 }}>{item.price}</Text>
                                <Text>{item.time}</Text>
                            </View>
                    </View>
                </TouchableNativeFeedback>}/>
        </View>
    );
};

export default transportList;