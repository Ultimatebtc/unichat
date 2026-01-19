import { View, Text, StyleSheet, Image } from "react-native"
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context"
import { db } from "../../../config/firebase";
import { collection, getDocs, query, where, orderBy } from "firebase/firestore";
import { useEffect, useState } from "react";

export default function Me() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        async function fetchPostsByUser() {
            const receivedPosts = [];
            try {
                const q = query(collection(db, "discussions"), where("author", "==", ""));
                const onSnapShot = await getDocs(q)
                onSnapShot.docs.forEach(item => receivedPosts.push({
                    id: item.id,
                    data: item.data()
                }));

                setPosts(receivedPosts);
            } catch (error) {
                console.log("Unable to fetch user posts data", error);
            }
        }

        fetchPostsByUser();
    }, []);


    return (
        <SafeAreaProvider>
            <SafeAreaView style={styles.wrapper}>
                {/* profile info */}
                <View style={{ justifyContent: "center", alignItems: "center" }}>
                    <Image
                        style={{
                            width: 98,
                            height: 98,
                            resizeMode: "cover",
                            borderRadius: 150,
                        }}
                        source={{ uri: "https://pixabay.com/get/g425c25c9eb35f677229741cfd0b16ff93dbf30edcd5ba3e18bb929ef9c3c6c2dcc424681397d019a439c7c863a870c427823fe38d0b44da6fd1125263a1417d596dac03e9cb254233fefb40063dc5c7f_640.jpg" }}
                        alt="user photo"
                    />
                    <Text style={{ fontSize: 24, fontWeight: "500", }}>John Wick</Text>
                </View>

                {/* posts by the user */}
                <View style={{ flex: 1, flexDirection: "row", flexWrap: "wrap" }}>
                    {posts.length > 0 &&
                        posts.map(item => (
                            <View key={item.id} style={{ width: "33.3%",}}>
                                <Image
                                    style={{
                                        width: 140,
                                        height: 220,
                                        resizeMode: "cover",
                                    }}
                                    source={{ uri: item.data.imgUrl  }}
                                    alt="user photo"
                                />
                            </View>
                        ))}
                </View>
            </SafeAreaView>
        </SafeAreaProvider>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        // paddingHorizontal: 12,
        paddingBottom: 60,
        gap: 24
    },
});