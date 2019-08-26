import React from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import Colors from '../constant/colors';
import TitleText from '../components/TitleText';

const Header = props => {
    return (
        <View style={{...styles.headerBase, ...Platform.select({ios: styles.HeaderIOS, android: styles.headerAndroid})}}>
            <TitleText style={styles.headerTitle}>{props.title}</TitleText>
        </View>
    );
};

const styles = StyleSheet.create({
    headerBase: {
        width: "100%",
        height: 90,
        paddingTop: 36,
        alignItems: 'center',
        justifyContent: 'center',

    },
    HeaderIOS: {
        backgroundColor: 'white',
        borderBottomColor:'#ccc',
        borderBottomWidth: 1
    },
    headerAndroid: {
        backgroundColor: Colors.primary,
    },
    headerTitle: {
        color: Platform.OS === 'android' ? 'black' : Colors.primary,
        fontSize: 18,
        fontFamily: 'open-sans-bold'
    }
});

export default Header;