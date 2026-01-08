import { View, Text, StyleSheet, FlatList } from "react-native";
import { Link } from "expo-router";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useState } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { SafeAreaView } from "react-native-safe-area-context";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { db } from "../../config/firebase";
import { getDocs, collection } from "firebase/firestore";

SplashScreen.preventAutoHideAsync();

export default function Discussion () {
    const [data,setData] = useState([]);

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

    // fetch discussion data from the database
    useEffect(() => {
        const fetchDbdata = async () => {
            const compiledData = [];
            const onSnap = await getDocs(collection(db,"discussions"));
            onSnap.docs.forEach(item => compiledData.push({
                id: item.id,
                data: item.data()
            }));

            setData(compiledData);
        }

        fetchDbdata();
    },[]);

    return (
        <SafeAreaProvider>
            <SafeAreaView style={styles.wrapper}>
                <View style={styles.header}>
                    <Text style={styles.brandText}>Unichat</Text>
                    <Link href="create-discussion">
                        <FontAwesome name="pencil-square-o" size={32} color="brown" />
                    </Link>
                </View>
                
                <View>
                    <FlatList
                    data={data}
                    renderItem={({item}) => {
                        return (
                            <View>
                                <Text style={{fontWeight: "bold"}}>{item.data.title}</Text>
                                <Text>{item.data.text}</Text>
                            </View>
                        )
                    }}
                    keyExtractor={(item) => item.id}
                    ItemSeparatorComponent={() => (
                        <View style={{height: 16}}></View>
                    )}/>
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