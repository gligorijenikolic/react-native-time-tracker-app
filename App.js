import React from 'react';
import { StyleSheet, Text, View, ScrollView, KeyboardAvoidingView } from 'react-native';
import uuidv4 from 'uuid/v4';

import EditableTimer from './components/EditableTimer';
import ToggleableTimerForm from './components/ToggleableTimerForm';
import { newTimer } from './utils/TimerUtils';

export default class App extends React.Component {

//   State is managed in some select parent components
// and then that data flows down through children as props.
// If state is updated, the component managing that state re-renders by calling render(). This, in turn,
// causes any of its children to re-render as well. And the children of those children. And on and on
// down the chain.

  state = {
    timers: [
      {
        title: 'Mow the lawn',
        project: 'House Chores',
        id: uuidv4(),
        elapsed: 5456099,
        isRunning: true
      },
      {
        title: 'Bake squash',
        project: 'Kitchen Chores',
        id: uuidv4(),
        elapsed: 1273998,
        isRunning: false
      }
    ]
  };

//   we use JavaScript’s spread syntax to add the rest of our
// existing timers to this new array. We do this to avoid mutating state.

  handleCreateFormSubmit = timer => {
    const { timers } = this.state;
    this.setState({
      timers: [newTimer(timer), ...timers],
    });
  };

  handleFormSubmit = attrs => {
    const { timers } = this.state;

    this.setState({
      timers: timers.map(timer => {
        if (timer.id === attrs.id) {
          const { title, project } = attrs;

          return {
            ...timer,
            title,
            project
          };
        }
        return timer;
      }),
    });
  };

  handleRemovePress = timerId => {
    this.setState({
      timers: this.state.timers.filter(t => t.id !== timerId),
    });
  };

  toggleTimer = timerId => {
    this.setState(prevState => {
      const { timers } = prevState;
      return {
        timers: timers.map(timer => {
          const { id, isRunning } = timer;
          if (id === timerId) {
            return {
              ...timer,
              isRunning: !isRunning
            };
          }
          return timer;
        }),
      };
    });
  };

  componentDidMount() {
    const TIME_INTERVAL = 1000;
    this.intervalId = setInterval(() => {
      const { timers } = this.state;
      this.setState({
        timers: timers.map(timer => {
          const { elapsed, isRunning } = timer;
          return {
            ...timer,
            elapsed: isRunning ? elapsed + TIME_INTERVAL : elapsed,
          };
        })
      });
    }, TIME_INTERVAL);
  }

  componentWillUnmount() {
    clearInterval(this.intervalId);
  }

  render() {
    const { timers } = this.state;

//     If you’re unfamiliar with the map method, it takes a function as an argument and calls it
// with each item inside of the array and builds a new array by using the return value from
// each function call.
// Since the timers array has two items, map will call this function twice, once for each timer.
// When map calls this function, it passes in as the first argument an item. The return value
// from this function call is inserted into the new array that map is constructing. After handling
// the last item, map returns this new array. Here, we’re rendering this new array within our
// render() method.

    return (
      <View style={styles.appContainer}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Timers</Text>
        </View>
        <KeyboardAvoidingView
          behavior="padding"
          style={styles.timerListContainer}>
          <ScrollView style={styles.timerList}>
            <ToggleableTimerForm isOpen={false} onFormSubmit={this.handleCreateFormSubmit} />
            {timers.map(({ title, project, id, elapsed, isRunning }) => (
              <EditableTimer
                key={id}
                id={id}
                title={title}
                project={project}
                elapsed={elapsed}
                isRunning={isRunning}
                onFormSubmit={this.handleFormSubmit}
                onRemovePress={this.handleRemovePress}
                onStartPress={this.toggleTimer}
                onStopPress={this.toggleTimer}
              />
            ))}
          </ScrollView>
        </KeyboardAvoidingView>
      </View>
    );

// The key prop is not used by our EditableTimer
// component but by the React Native framework. For the time being, it’s enough to note that
// this property needs to be unique per React Native component in a list.

  }
}

const styles = StyleSheet.create({
    appContainer: {
      flex: 1
    },
    titleContainer: {
      paddingTop: 35,
      paddingBottom: 15,
      borderBottomWidth: 1,
      borderBottomColor: '#D6D7DA'
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    timerListContainer: {
      flex: 1,
    },
    timerList: {
      paddingBottom: 15
    }
});