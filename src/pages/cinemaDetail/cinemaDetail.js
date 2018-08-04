import Taro, { Component } from '@tarojs/taro'
import { View,Image} from '@tarojs/components'
import './CinemaDetail.scss'

export default class CinemasDetail extends Component {
  config={
    enablePullDownRefresh:false
  }
  componentWillMount () {
  }

  componentDidMount () {
  }
  render () {
    return(
      <View>CinemaDetail</View>
    )
  }
}
