import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import './person.scss'

export default class Person extends Component {
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
        <Text>person</Text>
      </View>
    )
  }
}
