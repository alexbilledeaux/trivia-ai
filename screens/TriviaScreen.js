import React from "react";
import { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  SafeAreaView
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";

const TriflesImages = {
  TriflesCorrect: require('../assets/Trifles_Correct.png'),
  TriflesWrong: require('../assets/Trifles_Wrong.png'),
  TriflesQuestion0: require('../assets/Trifles_Question.png'),
  TriflesQuestion1: require('../assets/Trifles_Question2.png'),
  TriflesQuestion2: require('../assets/Trifles_Question3.png'),
 };

const TriviaScreen = ({ route, navigation }) => {

  const { questions, gameMode } = route.params;
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [showAnswer, setShowAnswer] = useState(false);
  const [questionCount, setQuestionCount] = useState(0);
  const [triflesImage, setTriflesImage] = useState(TriflesImages.TriflesQuestion0);
  const [triflesIndex, setTriflesIndex] = useState(0);

  const renderAnswers = (answers) => {
    return answers.map((answer, i) => (
      <TouchableOpacity
        key={i}
        style={styles.button}
        disabled={showAnswer}
        onPress={() => submitAnswer(answer)}
      >
        <Text style={styles.buttonText}>{answer}</Text>
      </TouchableOpacity>
    ))
  }


  const submitAnswer = (answer) => {
    // Instant loss if the player answers wrong in knockout
    if (answer != questions[questionCount].correctAnswer && gameMode == "knockout") {
      setGameOver(true);
    }

    if (answer == questions[questionCount].correctAnswer) {
      setScore(score +1);
      setShowAnswer(true);
      setTriflesImage(TriflesImages.TriflesCorrect);
      console.log(score);
    } else {
      setTriflesImage(TriflesImages.TriflesWrong);
    }

    // Infinite guesses if the player is in casual mode
    if (gameMode != "casual") {
      setShowAnswer(true);
    }
  }

  const getNextQuestion = () => {

    if (gameOver) {
      navigation.navigate("End", {
        victory: false,
        correctAnswers: score
      });
    }

    if (questionCount < questions.length - 1) {
      setTriflesImage(TriflesImages["TriflesQuestion" + triflesIndex]);
      if (triflesIndex < 2) {
        setTriflesIndex(triflesIndex + 1);
      } else {
        setTriflesIndex(0);
      }
      setQuestionCount(questionCount + 1);
      setShowAnswer(false);
    } else {
      // If the players get over half the questions right, they win.
      navigation.navigate("End", {
        victory: (score > questions.length / 2),
        correctAnswers: score
      });
    }
  }

  return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.container}>
          <Image
            source={triflesImage}
            style={styles.triflesImage}
          />
          <Text style={styles.headline}>Question {questionCount + 1}/ {questions.length}</Text>
          <Text style={styles.question}>{questions[questionCount].question}</Text>
          {renderAnswers(questions[questionCount].possibleAnswers)}
          {showAnswer ?
            <React.Fragment>
              <Text style={styles.bodyText}>The answer is <Text style={styles.answer}>{questions[questionCount].correctAnswer}</Text></Text>
              <TouchableOpacity onPress={getNextQuestion}><Text style={styles.hyperlink}>Next question?</Text></TouchableOpacity>
            </React.Fragment> :
            <React.Fragment></React.Fragment>
          }
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 40,
    textAlign: "center"
  },
  triflesImage: {
    width: 230,
    height: 325,
    marginBottom: 30,
    margin: "auto"
  },
  question: {
    fontSize: 22,
    color: "#fff",
    marginBottom: 20
  },
  headline: {
    fontSize: 32,
    color: "#fff",
    marginBottom: 10,
    fontWeight: "bold"
  },
  button: {
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 5,
    marginBottom: 10
  },
  buttonText: {
    color: "#05B7FD",
    textAlign: "center",
    fontSize: 18,
  },
  bodyText: {
    color: "#fff",
    fontSize: 20,
    paddingTop: 10
  },
  answer: {
    fontWeight: "bold",
  },
  hyperlink: {
    textDecorationLine: "underline",
    color: "#fff",
    paddingTop: 10,
    fontSize: 20
  }
});

export default TriviaScreen;
