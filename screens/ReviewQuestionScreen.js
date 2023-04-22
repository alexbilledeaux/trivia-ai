import React from "react";
import { useEffect, useState } from "react";
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  SafeAreaView
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import {
  initQuestionsDB,
  reportQuestion
} from "../helpers/fb-questions";
  
  const ReviewQuestionScreen = ({ route, navigation }) => {

    const { questionObj } = route.params;
    const [reported, setReported] = useState(questionObj.reported);
  
    useEffect(() => {
      try {
        initQuestionsDB();
      } catch (error) {
        console.log(error);
      }
    }, []);

    const report = (question) => {
        setReported(!reported);
        reportQuestion({...question, reported: !reported});
    }
  
    return (
      <SafeAreaView>
        <ScrollView>
          <View style={styles.container}>
            <Text style={styles.headline}>Question:</Text>
            <Text style={styles.subheadline}>{questionObj.question.question}</Text>
            {
                questionObj.question.possibleAnswers.map((answer, i) => (
                    <Text key={i} style={styles.bodyText}>{answer == questionObj.question.correctAnswer ? "Correct Answer: " : "Incorrect Answer: "}{answer}</Text>
                ))
            }
            <Text style={styles.bodyText}>Is this question incorrect or inappropriate?</Text>
            <TouchableOpacity
                style={styles.button}
                onPress={() => report(questionObj)}
            >
                <Text style={styles.buttonText}>{!reported ? "Report this question." : "Undo question report."}</Text>
            </TouchableOpacity>
            {reported ? <Text style={styles.reportedText}>Question is reported! It will be excluded from future games.</Text> : <React.Fragment></React.Fragment>}
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
    headline: {
      color: "#fff",
      fontSize: 30,
      fontWeight: "bold",
      marginBottom: 20
    },
    subheadline: {
      color: "#fff",
      fontSize: 20,
      fontWeight: "bold",
      marginBottom: 20,
      fontStyle: "italic"
    },
    bodyText: {
      color: "#fff",
      marginBottom: 15,
      fontSize: 16
    },
    button: {
      backgroundColor: "#fff",
      paddingLeft: 10,
      paddingRight: 10,
      paddingTop: 15,
      paddingBottom: 15,
      borderRadius: 5,
      marginBottom: 15
    },
    buttonText: {
      color: "black",
      fontSize: 16
    },
    reportedText: {
      color: "#750000",
      backgroundColor: "#FF8A8A",
      borderStyle: "solid",
      borderWidth: 2,
      fontWeight: "bold",
      borderColor: "#750000",
      padding: 5
    }
  });
  
  export default ReviewQuestionScreen;
  