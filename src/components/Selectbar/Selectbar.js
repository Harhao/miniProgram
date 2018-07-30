import Taro, { Component } from '@tarojs/taro'
import {View,Image,ScrollView,Text} from '@tarojs/components'
import "./Selectbar.scss"
export default class Selectbar extends Component{
  constructor(props){
    super(props);
    this.state = {
      activeIndex:0,
      subIndex:0,
      kind:'district'
    }
  }
  componentDidMount(){
  }
  selectIndex(index){
    this.setState({
      activeIndex:index
    });
  }
  selectOther(index){
    this.setState({
      subIndex:index
    });
  }
  selectKind(name){
    this.setState({
      kind:name
    })
  }
  render(){
    let data = this.props.data;
    let index = this.state.activeIndex;
    let subIndex = this.state.subIndex;
    let district = data.district?data.district.subItems:[];
    let subway = data.subway?data.subway.subItems:[];
    let renderList = district[index]?district[index]['subItems']:[{name:"空"}];
    let station = subway[subIndex]?subway[subIndex]['subItems']:[{name:"空"}];
    return (
      <View className={this.props.type == 'city'?'selectBar':'selectBar hide'}>
        <View className="toolBar">
          <View className={this.state.kind == 'district'?'district active':'district'} onClick={this.selectKind.bind(this,'district')}>商区</View>
          <View className={this.state.kind == 'subway'?'subway active':'subway'} onClick={this.selectKind.bind(this,'subway')}>地铁站</View>
        </View>
        <View className="kindContianer">
          <ScrollView
            scrollY
            style='height: 250Px;'
            scrollWithAnimation
            className={this.state.kind == 'district'?'kind':'kind hide'}
          >
            {district.map((item,index)=>{
              return (
                <View className={this.state.activeIndex == index?'kindItem selected':'kindItem'} key={item.id} onClick={this.selectIndex.bind(this,index)}>{item.name} ({item.count})</View>
              )
            })}
          </ScrollView>
          <ScrollView
            scrollY
            style='height: 250Px;'
            scrollWithAnimation
            className={this.state.kind == 'subway'?'kind':'kind hide'}
          >
            {subway.map((item,index)=>{
              return (
                <View className={this.state.subIndex == index?'kindItem selected':'kindItem'} key={item.id} onClick={this.selectOther.bind(this,index)}>{item.name} ({item.count})</View>
              )
            })}
          </ScrollView>
          <View className= {this.state.kind == 'district'?'listDetail':'listDetail hide'}>
            {renderList.map(item=>{
              return (
                <View className="addrItem" key={item.id}>{item.name}<Text className="count">{item.count}</Text></View>
              )
            })}
          </View>
          <View className= {this.state.kind == 'subway'?'listDetail':'listDetail hide'}>
            {station.map(item=>{
              return (
                <View className="addrItem" key={item.id}>{item.name}<Text className="count">{item.count}</Text></View>
              )
            })}
          </View>

        </View>
      </View>
    )
  }
}
