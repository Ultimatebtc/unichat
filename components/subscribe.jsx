import { Button, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

export default function Subscribe () {
    return (
        <View style={styles.wrapper}>
            <TouchableOpacity style={styles.touch}>
                <Text style={{ fontSize: 20, textAlign: "center",color:"white"}}>Get Started</Text>
                <Text style={{ fontSize: 12, textAlign: "center",color:"oldlace"}}>Join us for amazing benefits</Text>
            </TouchableOpacity>

            <Text style={styles.headingText}>Subscribe to our newsletter</Text>
            <TextInput
            keyboardType="email-address"
            placeholder="email address"
            style={styles.input}/>

            <Button
            title="SUBMIT"
            color="red"
            style={styles.input}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        backgroundColor: "#EIEIEI",
        marginTop: 24
    },
    touch: {
        backgroundColor: "brown",
        paddingVertical: 18,
        borderRadius:6,
        borderWidth: 2,
        borderStyle: "dashed",
        borderColor: "oldlace"
    },
    headingText: {
        fontSize: 28,
        fontWeight: "bold",
        marginBottom: 12,
        color: "oldlace"
    },
    input: {
        paddingVertical: 20,
        paddingHorizontal: 6,
        backgroundColor: "oldlace",
        marginBottom: 8,
        borderRadius: 6
    }
});