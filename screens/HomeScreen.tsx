import React, { useState, useEffect } from 'react';
import { View, Text, Button, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import useCart from '../hooks/useCart';
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/slices/cartSlice';


interface Pizza {
    id: number;
    category: string,
    name: string;
    description?: string;
    topping?: string[];
    price: number;
    rank: number;
}

const HomeScreen = () => {
    const [pizzas, setPizzas] = useState<Pizza[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const { addToCart } = useCart();
    const navigation = useNavigation();
    const dispatch = useDispatch();

    useEffect(() => {
        setIsLoading(true);
        fetch('https://private-anon-b26f96742a-pizzaapp.apiary-mock.com/restaurants/1/menu?category=Pizza&orderBy=rank')
            .then((response) => response.json())
            .then((data) => {
                setPizzas(data);
                setIsLoading(false);
            })
            .catch((error) => console.error('Error fetching pizzas:', error));
    }, []);

    const handleAddToCart = (pizza: Pizza) => {
        dispatch(addToCart(pizza));
    };

    const handleViewDetails = (pizza: Pizza) => {
        navigation.navigate('Details', { pizza });
    };

    return (
        <View>
            <Text style={{ fontSize: 24, fontWeight: 'bold', color: 'black',marginTop:10, paddingLeft:10 }}>Pizza Listing</Text>
            {isLoading ? (
                <Text style={{ alignItems: 'center' }}>Loading pizzas...</Text>
            ) : (
                <FlatList
                    data={pizzas}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => (
                        <View key={item.id} style={{flexDirection:'column', alignContent:'space-between', flex:1, justifyContent:'space-between', backgroundColor:'lightblue', borderRadius:5,marginBottom:10, marginHorizontal:10}}>
                            <View style={{ flexDirection: 'row', alignContent:'space-between', justifyContent:'space-between', paddingVertical:10, marginHorizontal:10,}}>
                                <Text style={{ color: 'black', fontSize:20 , fontWeight:'700'}}>{item.name}</Text>
                                <Text style={{ color: 'black', fontWeight:'600' }}>{item.price}</Text>
                            </View>
                            <View style={{ flexDirection: 'row' , justifyContent:'space-between' ,paddingVertical:10, marginHorizontal:10,}}>
                                <Button title="View Details" onPress={() => handleViewDetails(item)} />
                                <Button title="Add to Cart" onPress={() => handleAddToCart(item)} />
                            </View>
                        </View>
                    )}
                />
            )}
        </View>
    );
};

export default HomeScreen;
