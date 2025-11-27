import { ImageBackground, StyleSheet, View } from "react-native";

export default function Background ({ children }) {
    return (
        <ImageBackground 
        source={require("../assets/images/bg.jpg")}
        style={{ flex: 1 }}
        >
            <View style={styles.wrapper}>
                {children}
            </View>
        </ImageBackground>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        padding: 16,
    }
})