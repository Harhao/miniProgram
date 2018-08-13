/**
 * Created by Administrator on 2018/8/10 0010.
 */
import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import './order.scss'
export default class Map extends Component {
  constructor(props){
    super(props);
    this.state = {
    }
  }
  config = {
    navigationBarTitleText: '确认订单'
  }
  navigateToUser(url){
    Taro.navigateTo({
      url:url
    })
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
        <View className="movieInfo">
          <View className="movieName">西红柿首富</View>
          <View className="movieTime">今天8月13日 11:10 (英语3D)</View>
          <View className="cinemas">中影凤凰影城(同和店) </View>
          <View className="station">Dmax 全景声2厅</View>
        </View>
        <View className="discountInfo">
          <View className="card">
            <View className="name">活动与抵用券</View>
            <View className="orNot">
              <Text className="useful">无可用</Text>
              <Text className="arrow"></Text>
            </View>
          </View>
          <View className="phone">
            <View className="name">手机号码</View>
            <View className="number">
              13415334317
            </View>
          </View>
          <View className="totalMoney">
            <View className="name">小计</View>
            <View className="total">
              ￥41.9
            </View>
          </View>
        </View>
        <View className="line"></View>
        <View className="afford">
          <View className="tickerInfo">
            <View className="info">不支持退票、改签</View>
            <View className="moneyAll">￥41.9</View>
          </View>
          <View className="affordBtn" onClick={this.navigateToUser.bind(this,'../user/user')}>确认支付</View>
        </View>
      </View>
    )
  }
}
