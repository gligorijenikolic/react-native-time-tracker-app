import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { millisecondsToHuman } from '../utils/TimerUtils';
import TimerButton from './TimerButton';

export default class Timer extends React.Component {
    state = {
        editFormOpen: false
    };

    handleEditPress = () => {
        this.openForm();
    };

    handleFormClose = () => {
        this.closeForm();
    };

    handleSubmit = timer => {
        const { onFormSubmit } = this.props;
        onFormSubmit(timer);
        this.closeForm();
    };

    handleRemovePress  = () => {
        const { id, onRemovePress } = this.props;
        onRemovePress(id);
    };

    closeForm = () => {
        this.setState({ editFormOpen: false });
    };

    openForm = () => {
        this.setState({ editFormOpen: true });
    };

    render() {
        const { elapsed, title, project, onEditPress } = this.props;
        const elapsedString = millisecondsToHuman(elapsed);

        return (
            <View style={styles.timerContainer}>
                <Text style={styles.title}>{title}</Text>
                <Text>{project}</Text>
                <Text style={styles.elapsedTime}>{elapsedString}</Text>
                <View style={styles.buttonGroup}>
                    <TimerButton color="blue" small title="Edit" onPress={onEditPress} />
                    <TimerButton color="blue" small title="Remove" onPress={this.handleRemovePress} />
                </View>
                <TimerButton color="#21BA45" title="Start" />
            </View>
        );
    }
}        

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
