// App.js
// React Native (Expo) quiz: guess the country from its map.
// Instructions:
// 1) Use Expo (recommended): `npx create-expo-app CountryMapQuiz` then replace App.js with this file.
// 2) Add country map images to ./assets and update the `questions` array image requires.
//    Example: ./assets/france.png, ./assets/japan.png, ./assets/kenya.png
// 3) Run with `npx expo start`.

import { useEffect, useRef, useState } from "react";
import { Alert, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

const POINTS_PER_CORRECT = 1;
const TIME_LIMIT_SECONDS = 15;
const MAX_STRIKES = 5;

const ALL_COUNTRIES = [
  "Afghanistan","Albania","Algeria","Andorra","Angola","Argentina","Armenia","Australia",
  "Austria","Azerbaijan","Bahamas","Bahrain","Bangladesh","Barbados","Belarus","Belgium",
  "Belize","Benin","Bhutan","Bolivia","Bosnia and Herzegovina","Botswana","Brazil","Brunei",
  "Bulgaria","Burkina Faso","Burundi","Cambodia","Cameroon","Canada","Cape Verde","Chad",
  "Chile","China","Colombia","Comoros","Congo","Costa Rica","Croatia","Cuba","Cyprus",
  "Czech Republic","Denmark","Djibouti","Dominica","Dominican Republic","Ecuador","Egypt",
  "El Salvador","Equatorial Guinea","Eritrea","Estonia","Eswatini","Ethiopia","Fiji",
  "Finland","France","Gabon","Gambia","Georgia","Germany","Ghana","Greece","Grenada",
  "Guatemala","Guinea","Guinea-Bissau","Guyana","Haiti","Honduras","Hungary","Iceland",
  "India","Indonesia","Iran","Iraq","Ireland","Israel","Italy","Jamaica","Japan","Jordan",
  "Kazakhstan","Kenya","Kiribati","Kuwait","Kyrgyzstan","Laos","Latvia","Lebanon","Lesotho",
  "Liberia","Libya","Liechtenstein","Lithuania","Luxembourg","Madagascar","Malawi",
  "Malaysia","Maldives","Mali","Malta","Mauritania","Mauritius","Mexico","Micronesia",
  "Moldova","Monaco","Mongolia","Montenegro","Morocco","Mozambique","Myanmar","Namibia",
  "Nauru","Nepal","Netherlands","New Zealand","Nicaragua","Niger","Nigeria","North Korea",
  "North Macedonia","Norway","Oman","Pakistan","Palau","Panama","Papua New Guinea",
  "Paraguay","Peru","Philippines","Poland","Portugal","Qatar","Romania","Russia","Rwanda",
  "Saint Kitts and Nevis","Saint Lucia","Saint Vincent and the Grenadines","Samoa",
  "San Marino","Sao Tome and Principe","Saudi Arabia","Senegal","Serbia","Seychelles",
  "Sierra Leone","Singapore","Slovakia","Slovenia","Solomon Islands","Somalia","South Africa",
  "South Korea","South Sudan","Spain","Sri Lanka","Sudan","Suriname","Sweden","Switzerland",
  "Syria","Taiwan","Tajikistan","Tanzania","Thailand","Togo","Tonga","Trinidad and Tobago",
  "Tunisia","Turkey","Turkmenistan","Tuvalu","Uganda","Ukraine","United Arab Emirates",
  "United Kingdom","United States","Uruguay","Uzbekistan","Vanuatu","Vatican City","Venezuela",
  "Vietnam","Yemen","Zambia","Zimbabwe"
];

const initialQuestions = [
  { id: "algeria", name: "Algeria", continent: "Africa", image: require("../assets/images/Algeria.png") },
  { id: "argentina", name: "Argentina", continent: "South America", image: require("../assets/images/Argentina.png") },
  { id: "brazil", name: "Brazil", continent: "South America", image: require("../assets/images/Brazil.png") },
  { id: "canada", name: "Canada", continent: "North America", image: require("../assets/images/Canada.png") },
  { id: "chile", name: "Chile", continent: "South America", image: require("../assets/images/Chile.png") },
  { id: "cuba", name: "Cuba", continent: "North America", image: require("../assets/images/Cuba.png") },
  { id: "democratic republic of the congo", name: "Democratic Republic of the Congo", continent: "Africa", image: require("../assets/images/DRC.png") },
  { id: "egypt", name: "Egypt", continent: "Africa", image: require("../assets/images/Egypt.png") },
  { id: "eswatini", name: "Eswatini", continent: "Africa", image: require("../assets/images/Eswatini.png") },
  { id: "ethiopia", name: "Ethiopia", continent: "Africa", image: require("../assets/images/Ethiopia.png") },
  { id: "finland", name: "Finland", continent: "Europe", image: require("../assets/images/Finland.png") },
  { id: "greece", name: "Greece", continent: "Europe", image: require("../assets/images/Greece.png") },
  { id: "greenland", name: "France", continent: "Europe", image: require("../assets/images/France.png") },
  { id: "iceland", name: "Iceland", continent: "Standalone", image: require("../assets/images/Iceland.png") },
  { id: "india", name: "India", continent: "Asia", image: require("../assets/images/India.png") },
  { id: "indonesia", name: "Indonesia", continent: "Asia", image: require("../assets/images/Indonesia.png") },
  { id: "iran", name: "Iran", continent: "Asia", image: require("../assets/images/Iran.png") },
  { id: "italy", name: "Italy", continent: "Europe", image: require("../assets/images/Italy.png") },
  { id: "japan", name: "Japan", continent: "Asia", image: require("../assets/images/Japan.png") },
  { id: "khazakhstan", name: "Kazakhstan", continent: "Asia", image: require("../assets/images/Kazakhstan.png") },
  { id: "kenya", name: "Kenya", continent: "Africa", image: require("../assets/images/Kenya.png") },
  { id: "libya", name: "Libya", continent: "Africa", image: require("../assets/images/Libya.png") },
  { id: "madagascar", name: "Madagascar", continent: "Africa", image: require("../assets/images/Madagascar.png") },
  { id: "mongolia", name: "Mongolia", continent: "Asia", image: require("../assets/images/Mongolia.png") },
  { id: "morocco", name: "Morocco", continent: "Africa", image: require("../assets/images/Morocco.png") },
  { id: "mozambique", name: "Mozambique", continent: "Africa", image: require("../assets/images/Mozambique.png") },
  { id: "namibia", name: "Namibia", continent: "Africa", image: require("../assets/images/Namibia.png") },
  { id: "peru", name: "Peru", continent: "South America", image: require("../assets/images/Peru.png") },
  { id: "philippines", name: "Philippines", continent: "Asia", image: require("../assets/images/Philippines.png") },
  { id: "russia", name: "Russia", continent: "Europe", image: require("../assets/images/Russia.png") },
  { id: "saudi arabia", name: "Saudi Arabia", continent: "Asia", image: require("../assets/images/SaudiArabia.png") },
  { id: "somalia", name: "Somalia", continent: "Africa", image: require("../assets/images/Somalia.png") },
  { id: "south africa", name: "South Africa", continent: "Africa", image: require("../assets/images/SouthAfrica.png") },
  { id: "sweden", name: "Sweden", continent: "Europe", image: require("../assets/images/Sweden.png") },
  { id: "switzerland", name: "Switzerland", continent: "Europe", image: require("../assets/images/Switzerland.png") },
  { id: "taiwan", name: "Taiwan", continent: "Asia", image: require("../assets/images/Taiwan.png") },
  { id: "turkey", name: "Turkey", continent: "Asia", image: require("../assets/images/Turkey.png") },
  { id: "ukraine", name: "Ukraine", continent: "Europe", image: require("../assets/images/Ukraine.png") },
  { id: "united kingdom", name: "United Kingdom", continent: "Europe", image: require("../assets/images/UnitedKingdom.png") },
  { id: "zimbabwe", name: "Zimbabwe", continent: "Africa", image: require("../assets/images/Zimbabwe.png") },
];

export default function Quiz() {
  const [questions, setQuestions] = useState([]);
  const [index, setIndex] = useState(0);
  const [questionNumber, setQuestionNumber] = useState(1);
  //const [attemptedQuestions, setAttemptedQuestions] = useState(1);
  const [score, setScore] = useState(0);
  const [strikes, setStrikes] = useState(0);
  const [feedback, setFeedback] = useState(null);
  const [timeLeft, setTimeLeft] = useState(TIME_LIMIT_SECONDS);
  const [answeredThisQuestion, setAnsweredThisQuestion] = useState(false);
  //const [answeredWrongly, setAnsweredWrongly] = useState(Boolean)
  const [options, setOptions] = useState([]);
  const timerRef = useRef(null);
  const correctAnswersCountRef = useRef(0);
  const totalQuestions = questions.length;

  // shuffle array function
  function shuffleArray(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }

  // initialize quiz with shuffled questions
  useEffect(() => {
    setQuestions(shuffleArray(initialQuestions));
  }, []);

  useEffect(() => {
    if (questions.length > 0) {
      generateOptions();
      startTimer();
      return () => stopTimer();
    }
  }, [index, questions]);

  useEffect(() => {
    if (strikes >= MAX_STRIKES && totalQuestions > 0) {
      const pct = Math.round((correctAnswersCountRef.current / totalQuestions) * 100);
      setTimeout(() => {
        Alert.alert(
          "Game Over",
          `You hit ${MAX_STRIKES} strikes.\nScore: ${score}\n Quiz Completion: ${pct}%`
        );
      }, 200);
    }
  }, [strikes]);

  function getRandomOptions(correct) {
    const pool = ALL_COUNTRIES.filter(c => c.toLowerCase() !== correct.toLowerCase());
    const shuffled = shuffleArray(pool);
    const wrongs = shuffled.slice(0, 3);
    const combined = shuffleArray([...wrongs, correct]);
    return combined;
  }

  function generateOptions() {
    if (!questions[index]) return;
    const correct = questions[index].name;
    setOptions(getRandomOptions(correct));
  }

  function startTimer() {
    stopTimer();
    setTimeLeft(TIME_LIMIT_SECONDS);
    timerRef.current = setInterval(() => {
      setTimeLeft(t => {
        if (t <= 1) {
          setStrikes(s => s + 1);
          stopTimer();
          if (!answeredThisQuestion) handleTimeout();
          return 0;
        }
        return t - 1;
      });
    }, 1000);
  }

  function stopTimer() {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }

  function handleAnswer(selected) {
    
    if (answeredThisQuestion || strikes >= MAX_STRIKES) return;

    const q = questions[index];
    const correct = selected === q.name;
    setAnsweredThisQuestion(true);
    stopTimer();

    if (correct) {
      setScore(p => p + POINTS_PER_CORRECT);
      correctAnswersCountRef.current += 1;
    } else {
      setStrikes(s => s + 1);
  
    }

    setFeedback({ type: correct ? "correct" : "wrong", selected });
  }

  function handleTimeout() {
    setFeedback({ type: "timeout", text: "⏰ Time's up!" });
  }

  function goToNextQuestion() {
    setFeedback(null);
    setAnsweredThisQuestion(false);
    setIndex(i => (i + 1) % totalQuestions);
    setQuestionNumber(qn => qn + 1);
    //setAttemptedQuestions(aq => aq + 1);
  }

  if ((strikes >= MAX_STRIKES && totalQuestions > 0) || (questionNumber > 40)) {

    const pct = Math.round((correctAnswersCountRef.current / totalQuestions) * 100);
    const qct = Math.round((correctAnswersCountRef.current / (questionNumber > totalQuestions ? 40 : questionNumber)) * 100);

    return (
      <View style={styles.container}>
        <Text style={styles.title}>Quiz Over</Text>
        <Text style={styles.stat}>❌Strikes: {(questionNumber > totalQuestions ? 40 : questionNumber) - score} </Text>
        <Text style={styles.stat}>✔️Correct: {score} </Text>
        <Text style={styles.stat}>
          Mark: {correctAnswersCountRef.current}/{(questionNumber > totalQuestions ? 40 : questionNumber)} = {qct}%
        </Text>
        <Text style={styles.stat}>
          Quiz Completion: {correctAnswersCountRef.current}/{totalQuestions} = {pct}%
        </Text>
        {((correctAnswersCountRef.current >= 10) && (correctAnswersCountRef.current < 20))  && (
          <View style={{alignItems: 'center', marginVertical: 10, rowGap: 6}}>
            <Text style={{fontSize: 16}}> Congratulations! you've earned an Atlas Scholar Badge </Text>
            <Image source={require("../assets/images/AtlasScholarBadge.png")} style={{width: 100, height: 100}} resizeMode="contain" />
          </View>
        )}
        {((correctAnswersCountRef.current >= 20) && (correctAnswersCountRef.current < 30))  && (
          <View style={{alignItems: 'center', marginVertical: 10, rowGap: 6}}>
            <Text style={{fontSize: 16}}> Congratulations! you've earned an Atlas Pro Badge </Text>
            <Image source={require("../assets/images/AtlasProBadge.png")} style={{width: 100, height: 100}} resizeMode="contain" />
          </View>
        )}
        {((correctAnswersCountRef.current >= 30) && (correctAnswersCountRef.current < 40))  && (
          <View style={{alignItems: 'center', marginVertical: 10, rowGap: 6}}>
            <Text style={{fontSize: 16}}> Congratulations! you've earned an Atlas Master Badge </Text>
            <Image source={require("../assets/images/AtlasMasterBadge.png")} style={{width: 100, height: 100}} resizeMode="contain" />
          </View>
        )}
        {correctAnswersCountRef.current === 40  && (
          <View style={{alignItems: 'center', marginVertical: 10, rowGap: 6}}>
            <Text style={{fontSize: 16}}> Congratulations! you've earned an Atlas God Badge </Text>
            <Image source={require("../assets/images/AtlasGodBadge.png")} style={{width: 100, height: 100}} resizeMode="contain" />
          </View>
        )}
        <TouchableOpacity
          style={styles.primaryButton}
          onPress={() => {
            setQuestions(shuffleArray(initialQuestions));
            setIndex(0);
            setScore(0);
            setStrikes(0);
            setFeedback(null);
            setQuestionNumber(1);
            setAnsweredThisQuestion(false);
            correctAnswersCountRef.current = 0;
          }}
        >
          <Text style={styles.primaryButtonText}>Play Again</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const q = questions[index];
  if (!q) return null;

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        <View style={styles.topRow}>
          <Text style={styles.points}>✔️ : {score}/{totalQuestions}</Text>
          <Text style={styles.strikes}>❌: {strikes}/{MAX_STRIKES}</Text>
        </View>
        {/*<View style={{justifyContent: 'center', alignItems: 'center', marginTop: 4}}>
          <Text style={{fontSize: 14}}>Question {questionNumber}</Text>
        </View>*/}
        <View style={styles.mapCard}>
          <Image source={q.image} style={styles.mapImage} resizeMode="contain" />
        </View>

        <View style={{ alignItems: 'center' }}>
          <Text style={{ fontSize: 15 }}>Select the Country map shown:</Text>
          <Text style={{ marginTop: 5 }}>⏰ {timeLeft < 1 ? `❌ time up` : `${timeLeft}`}</Text>
        </View>

        <View style={styles.optionsContainer}>
          {options.map((opt, i) => {
            let buttonStyle = [styles.optionButton];
            let label = opt;
            
            if (answeredThisQuestion) {
              if (opt === q.name) {                                            
                  buttonStyle.push(styles.correctOption);       // selected correct option turns green             
                  label = `${opt}     (is the right answer)`;
                if (feedback?.selected === opt) {                      
                  label = `${opt}     ✔️ correct`;
                }
              } else if (feedback?.selected === opt) {                  
                  buttonStyle.push(styles.wrongOption);         // selected wrong option turns red
                  label = `${opt}     ❌ wrong`;
              }
            }
            if (timeLeft < 1 && !answeredThisQuestion) {
              if (opt === q.name) {
                buttonStyle.push(styles.correctOption);        // correct option always turns green
                label = `${opt}      (is the right answer)`;
              }
          }

            return (
              <TouchableOpacity
                key={i} style={buttonStyle}
                onPress={() => handleAnswer(opt)}
                disabled={answeredThisQuestion || timeLeft < 1}
              >
                <Text style={styles.optionText}>{label}</Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {(answeredThisQuestion || timeLeft < 1) && (
          <TouchableOpacity style={styles.nextButton} onPress={goToNextQuestion}>
            <Text style={styles.buttonText}>Next</Text>
          </TouchableOpacity>
        )}

        <Text style={styles.footer}>Question {questionNumber} / {totalQuestions}</Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, alignItems: "center", backgroundColor: "#f6f7fb" },
  topRow: { width: "100%", flexDirection: "row", justifyContent: "space-between" },
  points: { fontSize: 16 },
  strikes: { fontSize: 16 },
  mapCard: { width: "100%", height: 250, borderRadius: 12, justifyContent: "center", alignItems: "center", marginVertical: 6 },
  mapImage: { width: "90%", height: "90%" },
  optionsContainer: { width: "100%", marginVertical: 12 },
  optionButton: { backgroundColor: "#fff", borderWidth: 1, borderColor: "#ddd", borderRadius: 10, padding: 10, marginVertical: 4 },
  correctOption: { backgroundColor: "#d5f1d8", borderColor: "#6ac46a" },
  wrongOption: { backgroundColor: "#ffdede", borderColor: "#ff6666" },
  optionText: { fontSize: 16 },
  nextButton: { backgroundColor: "#2f6bed", paddingVertical: 12, borderRadius: 10, marginVertical: 6 },
  buttonText: { color: "#fff", fontWeight: "600" },
  footer: { marginTop: 14, color: '#666' },
  title: { fontSize: 28, fontWeight: "800", marginBottom: 10 },
  stat: { fontSize: 18, marginVertical: 6 },
  primaryButton: { marginTop: 20, backgroundColor: "#2f6bed", paddingVertical: 12, paddingHorizontal: 18, borderRadius: 10 },
  primaryButtonText: { color: "#fff", fontWeight: "700" },
});
