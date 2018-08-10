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
        order
      </View>
    )
  }
}
