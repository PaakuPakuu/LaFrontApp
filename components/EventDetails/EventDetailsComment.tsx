import {Alert, Button, FlatList, StyleSheet, Text, TextInput, View} from "react-native";
import {
    useAddCommentMutation,
    useFetchAllCommentariesPerEventQuery
} from "../../store/supabaseApi";
import React, {useState} from "react";
import {supabase} from "../../supabaseConfig";
import {EventComment, TablesInsert, UserEvent} from "../../models/customModels";

type Props = {
    comment: EventComment;
}

export function EventDetailsComment({comment}: Props) {
    const commentDate = new Date(comment.created_at).toLocaleDateString(undefined, {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });

    const commentHour = new Date(comment.created_at).toLocaleTimeString();

    return (
        <View style={styles.commentContainer}>
            <View style={styles.headerContainer}>
                <Text style={styles.userName}>{comment.profile.nickname}</Text>
                <Text> - </Text>
                <Text>{commentDate} {commentHour}</Text>
            </View>
            <Text>{comment.text}</Text>
        </View>
    )
}


const styles = StyleSheet.create({
    horizontallySpaced: {
        paddingTop: 4,
        paddingBottom: 4,
        flexDirection: "row"
    },
    input: {
        borderWidth: 1,
        borderColor: 'gray',
        backgroundColor: 'white',
        paddingHorizontal: 10,
        borderRadius: 55,
        height: 40,
        width: 250,
        alignSelf: 'center',
    },
    commentContainer: {
        backgroundColor: '#D9D9D9',
        borderRadius: 10,
        padding: 5,
        paddingLeft: 10,
        paddingRight: 10,
        marginTop: 5,
        marginBottom: 5
    },
    userName: {
        fontSize: 16,
        fontWeight: "bold"
    },
    headerContainer: {
        flexDirection: "row",
        marginBottom: 5
    }
})