// src/screens/DetailsScreen.tsx
import React from 'react';
import { View, Text, Button } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';

const DetailsScreen = () => {
    const route = useRoute();
    const navigation = useNavigation();
    const { pizza } = route.params;

    return (
        <View>
            <Text style={{ fontSize: 24, fontWeight: 'bold', color: 'black',marginTop:10, paddingLeft:10 }}>Details</Text>
            <Text style={{ color: 'black', fontSize:20 , fontWeight:'700'}}>Name: {pizza.name}</Text>
            <Text style={{ color: 'black', fontSize:20 , fontWeight:'700'}}>Description: {pizza.description}</Text>
            <Text style={{ color: 'black', fontSize:20 , fontWeight:'700'}}>Price: {pizza.price}</Text>
            <Button title="Back" onPress={() => navigation.goBack()} />
        </View>
    );
};

export default DetailsScreen;
