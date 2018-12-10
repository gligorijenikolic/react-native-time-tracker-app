import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { millisecondsToHuman } from '../utils/TimerUtils';
import TimerButton from './TimerButton';

export default function Timer({ title, project, elapsed }) {
    const elapsedString = millisecondsToHuman(elapsed);

    return (
        <View style={styles.timerContainer}>
            <Text style={styles.title}>{title}</Text>
            <Text>{project}</Text>
            <Text style={styles.elapsedTime}>{elapsedString}</Text>
            <View style={styles.buttonGroup}>
                <TimerButton color="blue" small title="Edit" />
                <TimerButton color="blue" small title="Remove" />
            </View>
            <TimerButton color="#21BA45" title="Start" />
        </View>
    );
}
// In React, we call components written this way stateless
// functional components or functional components for short. While we can write EditableTimer
// using either component style, it’s a perfect candidate to be written as a function.
// Think of functional components as components that only need to implement the render() method.
// They don’t manage state and don’t need any of React’s special lifecycle hooks.
        
// First, using functional components where possible encourages developers to manage state in fewer
// locations. This makes our programs easier to reason about.
// Second, using functional components are a great way to create reusable components. Because
// functional components need to have all their configuration passed from the outside, they are easy
// to reuse across apps or projects.

const styles = StyleSheet.create({
    timerContainer: {
        backgroundColor: 'white',
        borderColor: '#d6d7da',
        borderWidth: 2,
        borderRadius: 10,
        padding: 15,
        margin: 15,
        marginBottom: 0
    },
    title: {
        fontSize: 14,
        fontWeight: 'bold'
    },
    elapsedTime: {
        fontSize: 26,
        fontWeight: 'bold',
        textAlign: 'center',
        paddingVertical: 15
    },
    buttonGroup: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    }
});
