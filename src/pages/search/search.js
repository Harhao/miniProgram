import Taro, { Component } from '@tarojs/taro'
import { View, Text,Input} from '@tarojs/components'
import './search.scss'
export default class Search extends Component {
  config = {
    navigationBarTitleText: '猫眼电影'
  }
  componentDidMount () {}
  render () {
    return (
      <ScrollView className='searchCon' scrollY
        scrollWithAnimation
        scrollTop='0'
        style='height: 100vh;'
        lowerThreshold='20'
      >
        <View className="navHeader">
          <Input className="search" type="text" placeholder="搜影院、搜影院">
          </Input>
          <View className="cancel">
              取消
          </View>
        </View>
      </ScrollView>
    )
  }
}
