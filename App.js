import * as React from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import { Appbar, DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import Constants from 'expo-constants';

// or any pure javascript modules available in npm
import { Card } from 'react-native-paper';

export default class App extends React.Component {
  theme = {
    ...DefaultTheme,
    roundness: 2,
    colors: {
      ...DefaultTheme.colors,
      primary: '#8a2be2',
      accent: '#f1c40f',
    },
  }

  state = {
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    centiSeconds: 0,
    startButtonDisabled: false,
    stopButtonDisabled: true,
    resetButtonDisbaled: true,
  }

  id = null;

  startTimer = () => {
    this.setState({
        startButtonDisabled: true,
        stopButtonDisabled: false,
        resetButtonDisbaled: false,
      }      
    )
    this.id = setInterval(this.renderNewTime, 10);
  }

  stopTimer = () => {
    this.setState({
        startButtonDisabled: false,
        stopButtonDisabled: true,
      }      
    )
    clearInterval(this.id);
  }

  resetTimer = () => {
    this.setState({
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      centiSeconds: 0,
      startButtonDisabled: false,
      stopButtonDisabled: true,
      resetButtonDisbaled: true,
    });
    clearInterval(this.id);
  }

  renderNewTime = () => {
    this.setState((prevState) => ({
                  days: this.renderDays(prevState),
                  hours: this.renderHours(prevState),
                  minutes: this.renderMinutes(prevState),
                  seconds: this.renderSeconds(prevState),
                  centiSeconds: this.renderCentiSeconds(prevState),     
                }
              )
            )
  }

  renderCentiSeconds = (prevstate) => {
    if(prevstate.centiSeconds === 99) {
       return 0;
    } else {
      return prevstate.centiSeconds + 1;
    }
  }

  renderSeconds = (prevState) => {
    if(prevState.centiSeconds === 99) {
      if(prevState.seconds === 59) {
        return 0;
      } else {
        return prevState.seconds + 1;
      }
    } else {
      return prevState.seconds;
    }
  }

  renderMinutes = (prevState) => {
    if(prevState.seconds === 59) {
      if(prevState.minutes === 59) {
        return 0;
      } else {
        return prevState.minutes + 1;
      }
    } else {
      return prevState.minutes;
    }
  }

  renderHours = (prevState) => {
    if(prevState.minutes === 59) {
      if(prevState.hours === 23) {
        return 0;
      } else {
        return prevState.hours + 1;
      }
    } else {
      return prevState.hours;
    }
  }

  renderDays = (prevState) => {
    if(prevState.hours === 23) {
        return prevState.days + 1;
    } else {
        return prevState.days;
    }
  } 

  render() {
    return (
      <PaperProvider theme={this.theme}>
        <View style={styles.container}>
          <Appbar.Header>
            <Appbar.Content
              title="Enjoy stopwatch :)"
            />
          </Appbar.Header>
          <View style={styles.containerTwo}>
            <Button color={this.theme.colors.primary} disabled={this.state.resetButtonDisbaled} onPress={this.resetTimer} title="Reset Timer" />
          </View>
          <View style={styles.containerOne}>        
            <Button color={this.theme.colors.primary} disabled={this.state.startButtonDisabled} onPress={this.startTimer} title="Start Timer" />
            <Card>
              <Text style={styles.paragraph}>
                {this.state.days}:{this.state.hours}:{this.state.minutes}:{this.state.seconds}:{this.state.centiSeconds}
              </Text>
            </Card>
            <Button color={this.theme.colors.primary} disabled={this.state.stopButtonDisabled} onPress={this.stopTimer} title="Stop Timer" />
          </View>
        </View>
      </PaperProvider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ecf0f1',
  },
  containerOne: {
    flex: 20,
    margin: 24,
    justifyContent: 'center',
  },
  containerTwo: {
    margin: 24,
    justifyContent: 'flex-start',
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
