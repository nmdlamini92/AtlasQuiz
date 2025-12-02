import { Link } from "expo-router";
import { StyleSheet, View } from "react-native";

export default function index() {

    return (
        <View style={styles.homescreen}>
            <Link href="/quizRules" style={styles.rulesLink}>Read quiz rules</Link>
            <Link href="/quiz" style={styles.startQuizLink}>▶ Start Quiz</Link>
            <Link href="/badgesOfHonor" style={styles.badgesOfHonorLink}>🥇🥈🥉 Badges of honour</Link> 
        </View>
    );
}

const styles = StyleSheet.create({
        homescreen: {flex: 1,justifyContent: "center",alignItems: "center",},
        rulesLink: { marginVertical: 8, textDecorationLine: 'underline', paddingVertical: 8, paddingHorizontal: 12, borderRadius: 10 },
        startQuizLink: { marginVertical: 8, backgroundColor: '#6e8ae8ff', paddingVertical: 12, paddingHorizontal: 18, borderRadius: 10, borderColor: '#0b4aa8ff', borderWidth: 1 },
        badgesOfHonorLink: { marginVertical: 12, backgroundColor: '#e7dca2ff', paddingVertical: 6, paddingHorizontal: 6, borderRadius: 8, borderColor: '#d8bb64ff', borderWidth: 1 },
    });
