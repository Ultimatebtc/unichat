import { Tabs } from "expo-router";
import Octicons from '@expo/vector-icons/Octicons';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import Feather from '@expo/vector-icons/Feather';
import AntDesign from '@expo/vector-icons/AntDesign';

export default function Layout () {
    return (
        <Tabs screenOptions={{ tabBarActiveTintColor: "brown"}}>
            <Tabs.Screen
            name="discussions"
            options={{
                title: "Discussions",
                headerShown: false,
                tabBarIcon: ({ color }) => (<Octicons name="comment-discussion" size={24} color={color} />)
            }}
            />
            <Tabs.Screen
            name="chats"
            options={{
                title: "Chats",
                headerShown: false,
                tabBarIcon: ({ color }) => (<FontAwesome5 name="comment-alt" size={24} color={color} />)
            }}
            />
            <Tabs.Screen
            name="groups"
            options={{
                title: "Groups",
                headerShown: false,
                tabBarIcon: ({ color }) => (<Feather name="users" size={24} color={color} />)
            }}
            />
            <Tabs.Screen
            name="me"
            options={{
                title: "Me",
                headerShown: false,
                tabBarIcon: ({ color }) => (<AntDesign name="user" size={24} color={color} />)
            }}
            />
        </Tabs>
    )
}