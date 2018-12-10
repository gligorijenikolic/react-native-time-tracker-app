import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

export default function TimerButton({ color, title, small, onPress }) {
    return (
        <TouchableOpacity
            style={[styles.button, { borderColor: color }]}
            onPress={onPress}
            >
            <Text style={[
                    styles.buttonText,
                    small ? styles.small : styles.large,
                    { color },
                ]}>
                {title}
            </Text>
        </TouchableOpacity>
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
    button: {
        marginTop: 10,
        minWidth: 100,
        borderWidth: 2,
        borderRadius: 3
    },
    small: {
        fontSize: 14,
        padding: 5
    },
    large: {
        fontSize: 16,
        padding: 10
    },
    buttonText: {
        textAlign: 'center',
        fontWeight: 'bold'
    },
    title: {
        fontSize: 14,
        fontWeight: 'bold'
    },
        elapsedTime: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        paddingVertical: 10
    }
});