import React from 'react';
import { View, Text, Button, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import useCart from '../hooks/useCart';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { clearCart, removeFromCart } from '../redux/slices/cartSlice';


const CartScreen = () => {
  const cart = useSelector((state: RootState) => state.cart.items);
  const dispatch = useDispatch();
  const navigation = useNavigation();


  const handleViewDetails = (pizza: any) => {
    navigation.navigate('Details', { pizza });
  };

  return (
    <View>
      <Text style={{ fontSize: 20, fontWeight: 'bold', color:'black' }}>Cart</Text>
      <Text style={{color:'black',fontSize:16 , fontWeight:'700', marginBottom:10}}>Total Items: {cart.length}</Text>
      <FlatList
        data={cart}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View key={item.id} style={{ flexDirection:'column', marginBottom:10}} >
            <Text style={{ color: 'black', fontSize:20 , fontWeight:'700', marginBottom:10}}>
              {item.name} - Quantity: {item.quantity}
            </Text>
            <Button title="View Details" onPress={() => handleViewDetails(item)} />
            <Button title="Remove" onPress={() => dispatch(removeFromCart(item.id))} />
          </View>
        )}
      />
      <Button title="Clear Cart" onPress={() => dispatch(clearCart())} />
    </View>
  );
};

export default CartScreen;
