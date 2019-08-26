import React, {useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, Alert, ScrollView, FlatList } from 'react-native';

import NumberContainer from '../components/Number';
import Card from '../components/Card';
import DefaultStyles from '../constant/default-styles';
import MainButton from '../components/MainButton';
import { Ionicons } from '@expo/vector-icons';
import BodyText from '../components/BodyText';

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

// const renderListItem = (value, numOfRound) => {
//     return (
//         <View style={styles.listItem} key={value}>
//             <BodyText>#{numOfRound}</BodyText>
//             <BodyText>{value}</BodyText>
//         </View>
//     );
// }

const renderListItem = (listLength, itemData) => {
    return (
        <View style={styles.listItem}>
            <BodyText>#{listLength - itemData.index}</BodyText>
            <BodyText>{itemData.item}</BodyText>
        </View>
    );
}

// in order to deal with the flat list it will take three argument 
// <FlatList data={} keyExtractor={} renderItem{} />
// data is the data which should be array of items 
// keyextractor={(data) => data} which means that each item will be passed will be also the key as the data here is comming from the array you passed in the data property which 
// is at the end extracting each item inside the array 
// renderItem is what you need to display inside this flatlist
// the function above which is renderListItem the first one is working with scrollView 
// the second one with the Flat List the first argument is passed when you bind the same function in the renderItem property with this then the array.length 
// the second argument will be passed automatically

const GameScreen = props => {
    const InitialGuess = generateRandomBetween(1, 100, props.userChoice)
    const [currentGuess, setCurrentGuess] = useState(
      InitialGuess
    );
    const [pastGuesses, setPastGuesses] = useState([InitialGuess.toString()]);
    const currentLow = useRef(1);
    const currentHigh = useRef(100); // useRef is setting a value which could be accessed by .current and this value if it's changed the component will not re render
    const { userChoice, onGameOver } = props;

    useEffect(() => {
        if(currentGuess === userChoice){
            onGameOver(pastGuesses.length);
        }
    }, [currentGuess, userChoice, onGameOver]); // the second argument is dependencies which means that whenever one of those values has been changed then the useeffect function will be executed 
    // and even if the component is reRendered the useEffect now will not be executed if none of the those dependencies has been changed (of course the depedencies might be values or functions)
    // which means if function was dependency then if the component was rerendered because of one of the dependencies function then useeffect will be executed

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
        // setRounds(currentRound => currentRound + 1);
        setPastGuesses(curPastGuesses => [nextNumber.toString() , ...curPastGuesses]);
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
                {/* <ScrollView contentContainerStyle={styles.list}>
                    {pastGuesses.map((guess, index) => renderListItem(guess, pastGuesses.length - index))}
                </ScrollView> */}
                <FlatList keyExtractor={(item) => item} data={pastGuesses} renderItem={renderListItem.bind(this, pastGuesses.length)} contentContainerStyle={styles.list} />
            </View>
        </View>
    );
}

// FlatList and scrollView if you want to style the content inside you have to use contentContainerStyle
// you can use style but you will be able to style the overall style list add margin or padding or border only but what is inside is not possible to be styled by the style property

// scrollView to style it use contentContainerStyle not style

const styles = StyleSheet.create({
    screen: {
        flex:1,
        padding: 10,
        alignItems: 'center'
    },
    buttonContainer:{
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 20,
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
        width: '60%'
    },
    list: {
        flexGrow: 1,
        justifyContent: 'flex-end'
    }
});

export default GameScreen;