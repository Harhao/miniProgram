/**
 * Created by Administrator on 2018/8/10 0010.
 */
import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import './order.scss'
export default class Map extends Component {
  constructor(props){
    super(props);
    this.state = {}
  }
  config = {
    navigationBarTitleText: '确认订单'
  }

  componentDidMount () {
  }
  render () {
    return (
      <View className="order">
        <View className="timeDown">
          支付剩余时间:
          <View className="restTime">14:00</View>
        </View>
      </View>
    )
  }
}
