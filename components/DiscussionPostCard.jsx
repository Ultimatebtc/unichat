import Feather from '@expo/vector-icons/Feather';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { useState } from "react";
import { Dimensions, Image, Text, TouchableOpacity, View } from "react-native";

const screenWidth = Dimensions.get("window").width;

export default function DiscussionPostCard({ postData }) {
    const [currentUser, setCurrentUser] = useState("yyyewjw")
    return (
        <View>
            <Image
                style={{
                    width: screenWidth - 24,
                    height: 400,
                    resizeMode: "cover",
                    borderRadius:6
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
                <View style={{ flexDirection: "row", gap: 4 }}>
                    <Text style={{ fontSize: 11 }}>{7}</Text>
                    <TouchableOpacity>
                        <FontAwesome6 name="comment" size={24} color="black" />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}