import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import './search.scss'
export default class Search extends Component {
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
      <View>
        search
      </View>
    )
  }
}
