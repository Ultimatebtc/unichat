import { StyleSheet, Text, View } from "react-native";
import Background from "<div styleName={} />
<components />
<bac></bac>kground";
import Photos from "../components/photos";
import Subscribe from "../components/subscribe";

export default function Index () {
    return (
        <View style={{ flex:1 }}>
            <Background>
                <Photos/>
                <Text style={{fontSize: 28,color: "white"}}>How To Render Photos on React Native</Text>

                <View style={styles.box}>
                    <Text style={styles.subHeading}>Connect With Us</Text>
                    <Text style={styles.paragraph}>Connect with us to share ideas and collaborate on amazing project. Reach out on @early_code_tech on Instagram</Text>
                </View>

                <Subscribe/>
            </Background>
        </View>
    )
}

const styles = StyleSheet.create({
    box: {
        height: 200,
        backgroundColor: "oldlace",
        opacity: 0.5,
        padding: 16,
        marginTop: 48
    },
    subHeading: {
        color: "brown",
        fontSize: 18
    },
    paragraph: {
        color: "black",
        fontSize: 14
    }
})
