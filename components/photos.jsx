import { Image, View } from "react-native";

export default function Photos () {
    return (
        <View>
            <Image
            width={200}
            height={200}
            source={require("../assets/images/react-logo.png")}
            alt="react logo"/>
        </View>
    )
}