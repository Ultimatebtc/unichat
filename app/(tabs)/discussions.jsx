import { View, Text, StyleSheet } from "react-native";
import { Link } from "expo-router";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { SafeAreaView } from "react-native-safe-area-context";
import FontAwesome from "@expo/vector-icons/FontAwesome";

SplashScreen.preventAutoHideAsync();

export default function Discussion () {
    const [loaded,error] = useFonts({
        "monradok": require("../../assets/fonts/MonradokTrial-Regular.otf")
    });

    useEffect(() => {
        if (loaded || error) {
            SplashScreen.hideAsync();
        }
    },[loaded,error])

    if (!loaded && !error) {
        return null;
    }

    return (
        <SafeAreaProvider>
            <SafeAreaView style={styles.wrapper}>
                <View style={styles.header}>
                    <Text style={styles.brandText}>Unichat</Text>
                    <Link href="create-discussion">
                        <FontAwesome name="pencil-square-o" size={32} color="brown" />
                    </Link>
                </View>
                

            </SafeAreaView>
        </SafeAreaProvider>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        paddingHorizontal: 12
    },
    header: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-end"
    },
    brandText: {
        fontFamily: "monradok",
        fontSize: 36,
        color: "black",
        fontWeight: "semibold"
        
    }
})