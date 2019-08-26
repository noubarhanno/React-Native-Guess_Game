import React from 'react';
import { View, StyleSheet } from 'react-native';

const Cart = props => {
    return <View style={{...styles.card, ...props.style}}>{props.children}</View>
};

const styles = StyleSheet.create({
    card: {
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 2},
        shadowRadius: 6,
        shadowOpacity: 0.26,
        elevation: 5,
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 8
    }
});

export default Cart;