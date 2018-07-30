import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import Toptab from "../../components/Toptab/Toptab.js"
import './movies.scss'

export default class Movies extends Component {
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
      <View className='movies'>
        <Toptab/>
      </View>
    )
  }
}
