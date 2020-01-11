import React, {Component} from 'react'
import {StyleSheet, View, TouchableOpacity,Text} from 'react-native'

export default class Game extends Component{
  constructor(){
    super(),
    this.state = {
      initState: [
        [0,0,0],
        [0,0,0],
        [0,0,0]
      ],
      currentPlayer: 1
    }
  }

  componentDidMount(){
    this.initGame();
  }
  
  initGame = () => {
    this.setState({
      initState: [
        [0,0,0],
        [0,0,0],
        [0,0,0]
      ]
    })
  }

  finalWinner = () => {
    const num_row_col = 3;
    var arr = this.state.initState;
    var sum;

    for (var i = 0; i < num_row_col; i++){
      sum = arr[i][0]+arr[i][1]+arr[i][2];
      if(sum == 3)
        return 1;
      else if(sum == -3)
        return -1;
    }

    for (var i = 0; i < num_row_col; i++){
      sum = arr[0][i]+arr[1][i]+arr[2][i];
        if(sum == 3)
          return 1;
        else if(sum == -3)
          return -1;
    }

    sum = arr[0][0] + arr[1][1] + arr[2][2];
      if(sum == 3)
        return 1;
      else if(sum == -3)
        return -1;

    sum = arr[2][0] + arr[1][1] + arr[0][2];
      if(sum == 3)
        return 1;
      else if(sum == -3)
        return -1;

    return 0;
  }
  gameHandler = (r,c) => {
    console.log(r,c)
    var value = this.state.initState[r][c];
    switch(value)
    {
      case 1: return <Text style={styles.tileStyleX}>X</Text>;
      case -1: return <Text style={styles.tileStyleO}>O</Text>
      default: return <View/>
    }
  }

  onPressTiles = (r,c) => {
      var ifSelected = this.state.initState[r][c];
      if(ifSelected !== 0)
        return ;

      var currentPlayer = this.state.currentPlayer;
      var arr = this.state.initState.slice();
      arr[r][c]= currentPlayer;
      this.setState({ initState: arr})

      var nextPlayer = ( currentPlayer === 1) ? -1 : 1;
      this.setState({currentPlayer: nextPlayer})

      var winner = this.finalWinner()
      if(winner == 1){
        alert("player 1 winner")
        this.initGame();
      }
      else if(winner == -1){
        alert("player 2 winner")
        this.initGame();
      }
  }

  render(){
    return(
      <View style={styles.constainer}>
        <View style={styles.directionRow}> 
          <TouchableOpacity onPress={() =>this.onPressTiles(0,0)} style={styles.box}>
           {this.gameHandler(0,0)}
          </TouchableOpacity>
          
          <TouchableOpacity onPress={() =>this.onPressTiles(0,1)} style={styles.box}>
            {this.gameHandler(0,1)}
          </TouchableOpacity>
          
          <TouchableOpacity onPress={() =>this.onPressTiles(0,2)} style={styles.box}>
            {this.gameHandler(0,2)}
          </TouchableOpacity>
        </View>
        <View style={styles.directionRow}>
          <TouchableOpacity onPress={() =>this.onPressTiles(1,0)} style={styles.box}>
            {this.gameHandler(1,0)}
          </TouchableOpacity>
          <TouchableOpacity onPress={() =>this.onPressTiles(1,1)} style={styles.box}>
            {this.gameHandler(1,1)}
          </TouchableOpacity>
          <TouchableOpacity onPress={() =>this.onPressTiles(1,2)} style={styles.box}>
            {this.gameHandler(1,2)}
          </TouchableOpacity>
        </View>
        <View style={styles.directionRow}>
          <TouchableOpacity onPress={() =>this.onPressTiles(2,0)} style={styles.box}>
            {this.gameHandler(2,0)}
          </TouchableOpacity>
          <TouchableOpacity onPress={() =>this.onPressTiles(2,1)} style={styles.box}>
            {this.gameHandler(2,1)}
          </TouchableOpacity>
          <TouchableOpacity onPress={() =>this.onPressTiles(2,2)} style={styles.box}>
            {this.gameHandler(2,2)}
          </TouchableOpacity>
        </View>
      </View>
    )

  }
}
const styles = StyleSheet.create({
  constainer: {
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 100
  },
  box: {
    borderWidth: 1,
    width: 100,
    height: 100
  },
  directionRow: {
    flexDirection: 'row'
  },
  tileStyleX: {
    fontSize: 70,
    fontWeight: 'bold',
    color: 'red',
    alignContent: 'center',
    justifyContent: 'center',
  },
  tileStyleO: {
    fontSize: 70,
    fontWeight: 'bold',
    color: 'blue',
    alignContent: 'center',
    justifyContent: 'center',
  }
})