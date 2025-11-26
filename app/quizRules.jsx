import { Text, View } from "react-native";


export default function quizRules() {

    return (
        <View
            style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                marginHorizontal: 20,
            }}
        >
            <Text>You have 15 seconds to select the name of the country map shown on each question. {'\n'}
                You are only allowed 5 wrong answers (strikes) before the quiz abruptly ends. 
                The quiz has a total of 40 questions and your goal must be to complete the quiz.{'\n'} 
                A question that is not answered within the 15 second time limit equals to a strike.{'\n'}
                Good luck and have fun! 😉
            </Text>
        </View>
    );
}