import React from 'react';
import { View, Image, Text } from 'react-native';
import Screen from '../components/Screen';
import tailwind from 'tailwind-react-native-classnames';

const GroceryScreen = () => {
    return (
        <Screen style={tailwind`flex-1 bg-white`}>
            <View style={tailwind`flex-1 justify-center items-center`}>
                <Image source={require('../assets/images/store.gif')} style={tailwind`w-72 h-72`} />
                <View style={tailwind`w-3/4`}>
                    <Text style={tailwind`text-lg text-center`}>Lo sentimos, esta sección aún se encuentra en desarrollo</Text>
                    <Text style={tailwind`text-lg text-center text-xs text-gray-600 mt-3`}>Dirijase al menú Home, para comprar 🙃😉</Text>
                </View>
            </View>
        </Screen>
    );
}


export default GroceryScreen;
