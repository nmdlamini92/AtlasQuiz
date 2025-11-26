import { Image, Text, View } from "react-native";


export default function leaderBoard() {

    return (
        <View
            style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <View style={{rowGap: 24}}>
            <View style={{flexDirection: "row", justifyContent: "space-between", alignItems: "center", columnGap: 18}}>
                <View>
                    <Image style={{width: 50, height: 50}} source={require("../assets/images/AtlasGodBadge.png")} resizeMode="contain" />
                </View>
                <View>
                    <Text style={{fontSize: 20}}>Atlas God Badge</Text>
                    <Text style={{fontSize: 11}}>Get atleast 40 quiz questions right to earn</Text>
                </View>
            </View>
            <View style={{flexDirection: "row", justifyContent: "space-between", alignItems: "center", columnGap: 18}}>
                <View>
                    <Image style={{width: 50, height: 50}} source={require("../assets/images/AtlasMasterBadge.png")} resizeMode="contain" />
                </View>
                <View>
                    <Text style={{fontSize: 20}}>Atlas Master Badge</Text>
                    <Text style={{fontSize: 11}}>Get atleast 30 quiz questions right to earn</Text>
                </View>
            </View>
            <View style={{flexDirection: "row", justifyContent: "space-between", alignItems: "center", columnGap: 18}}>
                <View>
                    <Image style={{width: 50, height: 50}} source={require("../assets/images/AtlasProBadge.png")} resizeMode="contain" />
                </View>
                <View>
                    <Text style={{fontSize: 20}}>Atlas Pro Badge</Text>
                    <Text style={{fontSize: 11}}>Get atleast 20 quiz questions right to earn</Text>
                </View>
            </View>
            <View style={{flexDirection: "row", justifyContent: "space-between", alignItems: "center", columnGap: 18}}>
                <View>
                    <Image style={{width: 50, height: 50}} source={require("../assets/images/AtlasScholarBadge.png")} resizeMode="contain" />
                </View>
                <View>
                    <Text style={{fontSize: 20}}>Atlas Scholar Badge</Text>
                    <Text style={{fontSize: 11}}>Get atleast 10 quiz questions right to earn</Text>
                </View>
            </View>
        </View>
        </View>
    );
}