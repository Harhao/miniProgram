/**
 * Created by Administrator on 2018/8/9 0009.
 */
import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import avatarPng from "../../assets/images/avatar.png"
import moviePng from "../../assets/images/movie.png"
import minePng from "../../assets/images/mine.png"
import './user.scss'
export default class User extends Component {
  config = {
    navigationBarTitleText: '我的',
    enablePullDownRefresh:false
  }
  constructor(props){
    super(props);
  }
  componentDidMount () {
  }
  render () {
    return (
      <View className="userCenter">
        <View className="userInfo">
          <View className="avatar">
            <Image src={avatarPng}></Image>
          </View>
          <View className="name">长明灯与奇异果</View>
        </View>
        <View className="order">
          <View className="myOrder">
            <View className="line"></View>
            <View className="tip">我的订单</View>
          </View>
          <View className="list">
            <View className="movie">
              <Image src={moviePng}></Image>
              <Text className="item">电影</Text>
            </View>
            <View className="shop">
              <Image src={minePng}></Image>
              <Text className="item">商城</Text>
            </View>
          </View>
          <View className="discount">
            <View className="vipCard">
              <View className="desc">优惠券</View>
              <View className="arrow">></View>
            </View>
            <View className="cardpon">
              <View className="desc">折扣卡</View>
              <View className="arrow">></View>
            </View>
          </View>
        </View>
      </View>
    )
  }
}
