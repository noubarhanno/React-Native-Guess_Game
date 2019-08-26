import React from 'react';
import { View, Text, StyleSheet, Button, Image } from 'react-native';

import BodyText from '../components/BodyText';
import TitleText from '../components/TitleText';
import Colors from '../constant/colors';
import MainButton from '../components/MainButton';

const GameOverScreen = props => {
    return (
      // style applied to a component is not applied on the nested component but this rule is not applied for text
      // as text can inherit the style from the parent text component <Text style={styles.text}><Text>{this text will have the style of the parent Text component}</Text></Text>
      <View style={styles.screen}>
        <TitleText>The Game is Over!</TitleText>
        <View style={styles.imageContainer}>
          <Image
            fadeDuration={2000} // default is 300ms
            source={require("../assets/success.png")}
            // source={{uri: 'https://d2v9y0dukr6mq2.cloudfront.net/video/thumbnail/00h0tVu/4k-time-lapse-the-clouds-moving-over-the-snow-mountain-at-mthook-new-zealand_n1x6lqen__F0000.png'}} // react native cannot determine the width and the height of the image is being loaded
            style={styles.image}
            resizeMode="cover"
          />
        </View>
        <View style={styles.resultContainer}>
          <BodyText style={styles.resultText}>
            your phone needed{" "}
            <Text style={styles.highlight}>{props.roundsNumber}</Text> rounds to
            guess the number{" "}
            <Text style={styles.highlight}>{props.userNumber}</Text>
          </BodyText>
        </View>
        <MainButton onPress={props.onRestart}>NEW GAME</MainButton>
      </View>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex:1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    image: {
        width: '100%',
        height: '100%',
    },
    resultText:{
        textAlign: 'center',
        fontSize: 20
    },
    imageContainer:{
        borderRadius: 200,
        borderWidth: 3,
        borderColor: 'black',
        width: 300,
        height: 300,
        overflow: 'hidden',
        marginVertical: 15
    },
    highlight:{
        color: Colors.primary,
        fontFamily: 'open-sans-bold',
    },
    resultContainer: {
        marginHorizontal: 30,
        marginVertical: 15
    }
});

export default GameOverScreen;