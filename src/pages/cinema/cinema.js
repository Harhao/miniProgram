import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import './cinema.scss'

export default class Cinema extends Component {
  config = {
    navigationBarTitleText: '影院',
    enablePullDownRefresh:false,
  }

  componentWillMount () { }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  render () {
    return (
      <View className='cinemas'>
        <Text>cinemas</Text>
      </View>
    )
  }
}
