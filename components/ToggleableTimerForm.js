import React from 'react';
import { StyleSheet, View } from 'react-native';
import TimerButton from './TimerButton';
import TimerForm from './TimerForm';

export default class ToggleableTimerForm extends React.Component {
    state = {
        isOpen: false,
    };

//     The handleFormOpen() function as a
// property initializer (i.e. using an arrow function) in order to ensure this inside the function
// is bound to the component. React will automatically bind class methods corresponding to
// the component API (like render and componentDidMount) to the component for us.

    handleFormOpen = () => {
        this.setState({ isOpen: true });
    };

    handleFormClose = () => {
        this.setState({ isOpen: false });
    };

    handleFormSubmit = timer => {
        const { onFormSubmit } = this.props;

        onFormSubmit(timer);
        this.setState({ isOpen: false });
    };

    render() {
        const { isOpen } = this.state;

        return (
            <View style={[styles.container, !isOpen && styles.buttonPadding]}>
                {isOpen ? (
                    <TimerForm
                        onFormSubmit={this.handleFormSubmit}
                        onFormClose={this.handleFormClose}
                    />
                ) : (
                    <TimerButton title="+" color="black" onPress={this.handleFormOpen} />
                )}
            </View>
        );
    }        
}

const styles = StyleSheet.create({
    container: {
        paddingVertical: 10
    },
        buttonPadding: {
        paddingHorizontal: 15
    }
});
