import { View, Text, KeyboardAvoidingView, Platform, StatusBar, StyleSheet, ScrollView, TextInput, Pressable, TouchableOpacity } from "react-native"
import { useFormik } from "formik";
import * as yup from "yup";
import RNPickerSelect from "react-native-picker-select";
import { useState } from "react";
import { discussionCategories } from "../assets/data/discussion-categories";

const validationRules = yup.object().shape({
    subject: yup.string().required().min(3),
    body: yup.string().required().min(1)
});

export default function CreateDiscussion() {
    const [selectedCategory, setSelectedCategory] = useState("");

    const { handleChange, handleBlur, errors, values, touched, handleSubmit } = useFormik({
        initialValues: { subject: "", body: "" },
        onSubmit: () => { },
        validationSchema: validationRules
    });

    return (
        <KeyboardAvoidingView
            style={styles.wrapper}
            behavior="padding"
            keyboardVerticalOffset={Platform.select({
                ios: 0,
                android: -StatusBar.currentHeight,
            })}>

            <ScrollView
                contentContainerStyle={styles.ScrollViewContainer}
                showsVerticalScrollIndicator={false}>
                <View style={styles.body}>
                    {/* <StatusBar translucent={false} barStyle="light-content"/> */}

                    <View style={styles.form}>
                        <View style={styles.inputBlock}>
                            <Text>Choose a category for this discussion</Text>
                            <View style={styles.selectArea}>
                                <RNPickerSelect
                                items={discussionCategories}
                                onValueChange={(item) => setSelectedCategory(item)}
                                value={selectedCategory} />
                            </View>
                        </View>
                        <View style={styles.inputBlock}>
                            <TextInput
                                keyboardType="default"
                                placeholder="discussion subject"
                                style={styles.input}
                                value={values.subject}
                                onChangeText={handleChange("subject")}
                                onBlur={handleBlur("subject")} />
                            {errors.subject && touched.subject && <Text style={styles.errorText}>{errors.subject}</Text>}
                        </View>
                        <View style={styles.inputBlock}>
                            <TextInput
                                keyboardType="default"
                                placeholder="what do you have in mind?"
                                multiline={true}
                                style={styles.input}
                                value={values.body}
                                onChangeText={handleChange("body")}
                                onBlur={handleBlur("body")} />
                            {errors.body && touched.body && <Text style={styles.errorText}>{errors.body}</Text>}
                        </View>

                        <Pressable
                            onPress={handleSubmit}
                            style={styles.submit}>
                            <Text style={{ fontWeight: "bold", color: "oldlace" }}>POST DISCUSSION</Text>
                        </Pressable>
                    </View>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        paddingTop: StatusBar.currentHeight,
    },
    ScrollViewContainer: {
        flexGrow: 1,
        justifyContent: "space-between",
        marginBottom: 40,
    },
    body: {
        flex: 1,
        paddingBottom: 40,
        paddingHorizontal: 12
    },
    form: {
        display: "flex",
        gap: 12
    },
    inputBlock: {
        display: "flex",
        gap: 4
    },
    input: {
        borderWidth: 1,
        borderColor: "brown",
        borderRadius: 4,
        fontSize: 16,
        paddingHorizontal: 6,
    },
    errorText: {
        color: "red",
        fontSize: 10
    },
    selectArea: {
        borderWidth: 1,
        borderColor: "brown",
        borderRadius: 4
    },
    submit: {
        height: 56,
        backgroundColor: "brown",
        borderRadius: 6,
        justifyContent: "center",
        alignItems: "center",
    }
});