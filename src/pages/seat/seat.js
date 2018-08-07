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
      <View className="selectSeat">
        <View className="header">
          <View className="title"></View>
          <View className="desc">
            <Text className="time"></Text>
            <Text classname="lang"></Text>
          </View>
        </View>
        <View className="seatCon">
          <View className="hallCon">
            <View className="hallName"></View>
          </View>
          <View className="seatMore">
            
          </View>
        </View>
      </View>
    );
  }
}
