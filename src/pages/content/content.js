import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import './content.scss'

export default class Content extends Component {
  componentWillMount () { }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  render () {
    return (
      <View className='index'>
        <Text>Content</Text>
      </View>
    )
  }
}
