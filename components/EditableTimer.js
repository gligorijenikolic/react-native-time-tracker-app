import React from 'react';
import TimerForm from './TimerForm';
import Timer from './Timer';

export default function EditableTimer({
    id,
    title,
    project,
    elapsed,
    isRunning,
    editFormOpen,
}) {
    if (editFormOpen) {
        return <TimerForm id={id} title={title} project={project} />;
    }
    return (
        <Timer
            id={id}
            title={title}
            project={project}
            elapsed={elapsed}
            isRunning={isRunning}
        />
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