import Feather from '@expo/vector-icons/Feather';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { useFormik } from 'formik';
import { useState, useEffect } from "react";
import { Alert, Dimensions, FlatList, Image, Pressable, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { db } from '../config/firebase';
import { addDoc, collection, getDocs, query, where } from 'firebase/firestore';
import { timeAgo } from '../utils/time-ago';

const screenWidth = Dimensions.get("window").width;

export default function DiscussionPostCard({ postData }) {
    const [currentUser, setCurrentUser] = useState("yyyewjw");
    const [showCommentArea, setShowCommentArea] = useState(false);
    const [showComments, setShowComments] = useState(false);
    const [comments, setComments] = useState([]);

    useEffect(() => {
        async function fetchPostComments() {
            const receivedComments = [];
            try {
                const q = query(collection(db, "comments"), where("post", "==", postData.id));
                const onSnapShot = await getDocs(q)
                onSnapShot.docs.forEach(item => receivedComments.push({
                    id: item.id,
                    data: item.data()
                }));

                setComments(receivedComments);
            } catch (error) {
                console.log("Unable to fetch comment data", error);
            }
        }

        fetchPostComments();
    }, [postData]);

    const { handleChange, handleBlur, values, resetForm, handleSubmit } = useFormik({
        initialValues: { text: "" },
        onSubmit: async () => {
            try {
                await addDoc(collection(db, "comments"), {
                    comment: values.text,
                    post: postData.id,
                    author: currentUser,
                    timecreated: new Date().getTime(),
                });

                //   clear form
                resetForm();
            } catch (error) {
                console.log("An error has occured", error);
                Alert.alert("Error!", error.message)
            }
        }
    });

    return (
        <View style={{ flexDirection: "column", gap: 4 }}>
            <Image
                style={{
                    width: screenWidth - 24,
                    height: 400,
                    resizeMode: "cover",
                    borderRadius: 6,
                }}
                source={{ uri: postData.data.imgUrl }}
                alt="event photo"
            />
            <Text style={{ fontWeight: "bold" }}>{postData.data.title}</Text>
            <Text>{postData.data.text}</Text>

            {/* reactions */}
            <View style={{ flexDirection: "row", gap: 16 }}>
                {/* likes */}
                <View style={{ flexDirection: "row", gap: 4 }}>
                    <Text style={{ fontSize: 11 }}>{1003}</Text>
                    <TouchableOpacity>
                        {currentUser == "me" ?
                            <Feather name="heart" size={18} color="black" />
                            :
                            <FontAwesome name="heart" size={18} color="black" />}
                    </TouchableOpacity>
                </View>

                {/* comments */}
                <View style={{ flexDirection: "row", gap: 8 }}>
                    <TouchableOpacity onPress={() => setShowComments(!showComments)}>
                        <Text style={{ fontSize: 13 }}>{comments.length}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setShowCommentArea(!showCommentArea)}>
                        <FontAwesome6 name="comment" size={18} color="black" />
                    </TouchableOpacity>
                </View>
            </View>

            {/* posted comments */}
            {showComments &&
                <View>
                    <FlatList
                        data={comments}
                        renderItem={({ item }) => {
                            return (
                                <View>
                                    <View style={{ flexDirection: "row", alignItems: "center", gap: 16}}>
                                        <Pressable style={{ flexDirection: "row", alignItems: "center", gap: 4}}>
                                            <Image
                                                style={{
                                                    width: 24,
                                                    height: 24,
                                                    resizeMode: "cover",
                                                    borderRadius: 50,
                                                }}
                                                source={{ uri: "https://pixabay.com/get/g425c25c9eb35f677229741cfd0b16ff93dbf30edcd5ba3e18bb929ef9c3c6c2dcc424681397d019a439c7c863a870c427823fe38d0b44da6fd1125263a1417d596dac03e9cb254233fefb40063dc5c7f_640.jpg" }}
                                                alt="user photo"
                                            />
                                            <Text style={{ fontSize: 11, color: "black",fontWeight: "600" }}>John Wick</Text>
                                        </Pressable>
                                        <Text style={{ fontSize: 11, color: "gray" }}>{timeAgo(item.data.timecreated)}</Text>
                                    </View>
                                    <Text style={{ fontSize: 11, color: "black" }}>{item.data.comment}</Text>
                                </View>
                            )
                        }}
                        keyExtractor={(item) => item.id}
                        ItemSeparatorComponent={() => (
                            <View style={{ height: 4 }}></View>
                        )} />
                </View>}

            {/* write a comment */}
            {showCommentArea &&
                <View style={{ flexDirection: "row", alignItems: "center", gap: 4 }}>
                    <TextInput
                        keyboardType="default"
                        placeholder="what do you think?"
                        multiline={true}
                        style={styles.input}
                        value={values.text}
                        onChangeText={handleChange("text")}
                        onBlur={handleBlur("text")} />

                    <TouchableOpacity onPress={handleSubmit}>
                        <Feather name="arrow-up-circle" size={36} color={values.text.length > 0 ? "brown" : "gray"} />
                    </TouchableOpacity>
                </View>}
        </View>
    )
}

const styles = StyleSheet.create({
    input: {
        flex: 1,
        borderWidth: 1,
        borderColor: "gray",
        borderRadius: 50,
        fontSize: 16,
        paddingHorizontal: 18,
    },
});