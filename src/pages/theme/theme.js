import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import './theme.scss'

export default class Theme extends Component {
  config = {
    navigationBarTitleText: '猫眼电影'
  }

  componentWillMount () { }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  render () {
    return (
      <View className='index'>
        <Text>theme</Text>
      </View>
    )
  }
}
