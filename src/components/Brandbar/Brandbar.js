import Taro, { Component } from '@tarojs/taro'
import { View, ScrollView, Text } from '@tarojs/components'
import "./Brandbar.scss"
export default class Brandbar extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  render() {
    let data = this.props.data;
    let cinemaData = data.brand?data.brand.subItems:[];
    return (
      <ScrollView
      scrollY
      style='height: 250Px;'
      scrollWithAnimation
      className={this.props.type =='brand'?'brandBar':'brandBar hide'}
      >
        {
          cinemaData.map(item=>{
            return (
              <View className="brandItem" key={item.id}>{item.name}<Text className="count">{item.count}</Text></View>
            )
          })
        }
      </ScrollView>
    )
  }
}
