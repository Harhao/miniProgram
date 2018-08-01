import Taro, { Component } from '@tarojs/taro'
import { View, ScrollView, Text } from '@tarojs/components'
import "./Specialbar.scss"
export default class Specialbar extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  render() {
    let service = this.props.data.service;
    let hallType = this.props.data.hallType;
    let serviceList = service?service.subItems:[];
    let hallTypeList = hallType?hallType.subItems:[];
    return (
      <View className={this.props.type =='special'?'specialBar':'specialBar hide'}>
        <ScrollView
         scrollY
         style='height: 200Px;'
         scrollWithAnimation
        >
          <View className="serviceContainer">
            <View className="title">特色功能</View>
            <View className='container'>
              {serviceList.map((item,index) =>{
                return (
                  <View className={index == 0?'serviceItem choosen':'serviceItem'} key={index}>
                    {item.name}
                  </View>
                )
              })}
            </View>
          </View>
          <View className="hallTypeContainer">
            <View className="title">特殊厅</View>
            <View className='container'>
            {hallTypeList.map((item,index) =>{
              return (
                <View className={index == 0?'hallTypeItem choosen':'hallTypeItem'} key={index}>
                  {item.name}
                </View>
              )
            })}
            </View>
          </View>
        </ScrollView>
        <View className="selectCertian">
            <View className="reset">重置</View>
            <View className="certain">确定</View>
        </View>
      </View>
    )
  }
}
