import React from 'react';
import {TouchableOpacity,ActionSheetIOS,Text,ScrollView,SafeAreaView,StyleSheet, View,Button, Alert } from 'react-native';
import { useState,useEffect } from 'react';
import q from "./data/q.json";

export default function App() {

  
  const [currentQuestion, setCurrentQuestion] = useState(0);
  
  const [correctScore,setCorrectScore] = useState(0);
	
  const [showScore, setShowScore] = useState(false);
  const questions = q;
  const resetState = () => {
    setShowScore(false);
    setCurrentQuestion(0);
    setCorrectScore(0);
  };
  const handleAnswerButtonClick = (isCorrect) => {
    console.log(q);
    if (isCorrect) {
      Alert.alert("the answer is correct!");
      setCorrectScore(correctScore+1);
    }
    
    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      setShowScore(true);
    }
  };
  const styles = StyleSheet.create({
    questionTitleText:{
      color:"red"
    },
    container: {
      padding:10,
    },
    centeredContainer: {
      alignItems: "center",
      padding:10,
    },
    button: {
      alignItems: "center",
      backgroundColor: "#F3F3FB",
      padding: 10,
      marginVertical:3,
      marginHorizontal:10
    },
    resetButton: {
      alignItems: "center",
      backgroundColor: "#4370E7",
      padding: 10,
      marginVertical:3,
      marginHorizontal:15
    },
    resetButtonText: {
       color:"#F3F3FB"
    }
  
  })
	return (
		<SafeAreaView className='app'>
			{/* HINT: replace "false" with logic to display the 
      score when the user has answered all the questions */}
			{showScore ? (
        <View style={styles.container}>
          <View className='score-section' style={styles.centeredContainer}>
          <Text>You scored {correctScore} out of {questions.length}</Text>

          </View>
        
        <TouchableOpacity className="button-reset"
        onPress={()=>resetState()} style={styles.resetButton}>
          <Text style={styles.resetButtonText}>Reset</Text>
        </TouchableOpacity>
        </View>
				
			) : (
				<>
					<View className='question-section' style={styles.container}>
						<View  className='question-count' style={styles.centeredContainer}>
              <Text styles={styles.questionTitleText}><Text >Question {String(currentQuestion+1)}</Text>/{questions.length}</Text>
							
						</View>
						<Text className='question-text'>{questions[currentQuestion].questionText}</Text>
					</View>
					<View className='answer-section'>
						{questions[currentQuestion].answerOptions.map((answerOption, index) => (
		
    <TouchableOpacity style={styles.button} className="answer-select-button"
    onPress={() => handleAnswerButtonClick(answerOption.isCorrect)}>
      <Text>{answerOption.answerText} </Text>
    </TouchableOpacity>
	))}
					</View>
				</>
			)}
		</SafeAreaView>
	);
}

