import React, {useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, Alert, ScrollView, FlatList, Dimensions } from 'react-native';

import NumberContainer from '../components/Number';
import Card from '../components/Card';
import DefaultStyles from '../constant/default-styles';
import MainButton from '../components/MainButton';
import { Ionicons } from '@expo/vector-icons';
import BodyText from '../components/BodyText';
import { ScreenOrientation } from 'expo';

const generateRandomBetween = (min, max, exclude) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    
    const rndNum = Math.floor(Math.random() * (max - min)) + min;
    if (rndNum === exclude){
        return generateRandomBetween(min, max, exclude);
    } else {
        return rndNum;
    }
};

const renderListItem = (listLength, itemData) => {
    return (
        <View style={styles.listItem}>
            <BodyText>#{listLength - itemData.index}</BodyText>
            <BodyText>{itemData.item}</BodyText>
        </View>
    );
}

const GameScreen = props => {
    // ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);
    const InitialGuess = generateRandomBetween(1, 100, props.userChoice)
    const [currentGuess, setCurrentGuess] = useState(
      InitialGuess
    );
    const [pastGuesses, setPastGuesses] = useState([InitialGuess.toString()]);
    const [ availableDeviceWidth, setAvailableDeviceWidth] = useState(Dimensions.get('window').width);
    const [ availableDeviceHeight, setAvailableDeviceHeight] = useState(Dimensions.get('window').height);

    const currentLow = useRef(1);
    const currentHigh = useRef(100);
    const { userChoice, onGameOver } = props;

    
    //====================================================================//
    useEffect(() => {
        const updateLayout = () => {
            setAvailableDeviceWidth(Dimensions.get('window').width);
            setAvailableDeviceHeight(Dimensions.get('window').height);
        }

        Dimensions.addEventListener('change', updateLayout);

        return () => {
            Dimensions.removeEventListener('change', updateLayout);
        }
    })
    // what we are doing here is registering an eventlistener that will listen to the Dimensions Change (orientation) 
    // and once we got the changed width and heigh we remove this event listener and this is ofcourse because the dimenssions will be calculated
    // one time means Dimenssions.get('window') has event of change and we can use it to get the dimensions width and height but if you get the dimenssions 
    // the values will not be changed because it will be calculated one time when the app is loaded
    // Note the code will not be updated if the dimensions has been changed
    //====================================================================//
    useEffect(() => {
        if(currentGuess === userChoice){
            onGameOver(pastGuesses.length);
        }
    }, [currentGuess, userChoice, onGameOver]);
    const nextGuessHandler = direction => {
        if ((direction === 'lower' && currentGuess < props.userChoice) || ( direction === 'greater' && currentGuess > props.userChoice)){
            Alert.alert('Don\'t lie!', 'you know that this is wrong...', [{text: 'Sorry!', style: 'cancel'}]);
            return ;
        }
        if (direction === 'lower'){
            currentHigh.current = currentGuess;
        } else {
            currentLow.current = currentGuess + 1;
        }
        const nextNumber = generateRandomBetween(currentLow.current, currentHigh.current, currentGuess);
        setCurrentGuess(nextNumber);
        setPastGuesses(curPastGuesses => [nextNumber.toString() , ...curPastGuesses]);
    }

    if (availableDeviceHeight < 400) {
        return (
          <View style={styles.screen}>
            <Text style={DefaultStyles.title}>Opponent's Guess</Text>
            <View style={styles.control}>
            <MainButton onPress={() => nextGuessHandler("lower")}>
              <Ionicons name="md-remove" size={24} color="white" />
            </MainButton>
            <NumberContainer>{currentGuess}</NumberContainer>
            <MainButton onPress={() => nextGuessHandler("greater")}>
              <Ionicons name="md-add" size={24} color="white" />
            </MainButton>
            </View>
            <View style={styles.listContainer}>
              <FlatList
                keyExtractor={item => item}
                data={pastGuesses}
                renderItem={renderListItem.bind(this, pastGuesses.length)}
                contentContainerStyle={styles.list}
              />
            </View>
          </View>
        );
    }

    return (
        <View style={styles.screen}>
            <Text style={DefaultStyles.title}>Opponent's Guess</Text>
            <NumberContainer>{currentGuess}</NumberContainer>
            <Card style={styles.buttonContainer}>
                <MainButton onPress={() => nextGuessHandler('lower')}>
                    <Ionicons name="md-remove" size={24} color="white" />
                </MainButton>
                <MainButton onPress={() => nextGuessHandler('greater')}>
                    <Ionicons name="md-add" size={24} color="white" />
                </MainButton>
            </Card>
            <View style={styles.listContainer}>
                <FlatList keyExtractor={(item) => item} data={pastGuesses} renderItem={renderListItem.bind(this, pastGuesses.length)} contentContainerStyle={styles.list} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex:1,
        padding: 10,
        alignItems: 'center'
    },
    buttonContainer:{
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: Dimensions.get('window').height > 600 ? 30 : 5,
        width: 400,
        maxWidth: '90%'
    },
    listItem:{
        borderColor: 'black',
        borderWidth: 1,
        padding: 15,
        marginVertical: 10,
        backgroundColor: 'white',
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%'
    },
    listContainer:{
        flex: 1,
        width: Dimensions.get('window').width > 350 ? '60%' : '80%'
    },
    list: {
        flexGrow: 1,
        justifyContent: 'flex-end'
    },
    control:{
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        width: '80%'
    }
});

export default GameScreen;