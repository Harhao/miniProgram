import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'

import './seat.scss'
export default class Seat extends Component {
  constructor(props){
    super(props);

  }
  initParams(){
    let params = this.$router.params;
    console.log(params);
  }
  componentDidMount () {
    this.initParams();
  }
  render () {
    return (
      <View className="selectSeat">Seat</View>
    );
  }
}
