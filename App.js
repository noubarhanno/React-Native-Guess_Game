import React, {useState} from 'react';
import { StyleSheet, View, SafeAreaView } from 'react-native';
import * as Font from 'expo-font';
import { AppLoading } from 'expo';
import Header from './components/Header';
import StartGameScreen from './screens/StartGameScreen';
import GameScreen from './screens/GameScreen';
import GameOverScreen from './screens/GameOverScreen';

// const {logicDescription} = logic to load assets needed on the application before starting the app

//logicDescription
const fetchFonts = () => {
  return Font.loadAsync({
    'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf')
  });
};

export default function App(props) {
  const [userNumber, setUserNumber] = useState();
  const [guessRound, setGuessRound] = useState(0);
  // logicDescription
  const [dataLoaded, setDataLoaded] = useState(false);

  // logicDescription
  if (!dataLoaded){
    return <AppLoading startAsync={fetchFonts} onFinish={() => setDataLoaded(true)} onError={(err) => console.log(err)} />; // this will render the apploading of expo which is showing build javascript bundle in the start
  }
 
  const configureNewGameHandler = () => {
    setGuessRound(0);
    setUserNumber(null);
  }

  const startGameHandler = (selectedNumber) => {
    setUserNumber(selectedNumber);
    setGuessRound(0);
  };

  const gameOverHandler = numOfRounds => {
    setGuessRound(numOfRounds);
  }

  let content = <StartGameScreen onStartGame={startGameHandler} />;

  if (userNumber && guessRound <= 0){
    content = <GameScreen userChoice={userNumber} onGameOver={gameOverHandler}/>
  } else if(guessRound >0 ) {
    content = <GameOverScreen roundsNumber={guessRound} userNumber={userNumber} onRestart={configureNewGameHandler}/>
  }
  // the safeAreaView is something like the View and can take the same styling but it will respect the nutch on Iphone or other phones 
  // and it should wrap the entire application
  return (
    <SafeAreaView style={styles.screen}>
      <Header title="Guess a Number"/>
      {content}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1
  }
});
