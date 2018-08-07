import Taro, { Component } from '@tarojs/taro'
import { View} from '@tarojs/components'
import './position.scss'
export default class Position extends Component {
  config = {
    enablePullDownRefresh:false,
  }
  constructor(props){
    super(props);
    this.state = {
      viewId:"pos",
      cityData:{},
      list:[
        { name: "定位", id: "pos" },
        { name: "热门", id: "hot" },
        { name: "A", id: "A" },
        { name: "B", id: "B" },
        { name: "C", id: "C" },
        { name: "D", id: "D" },
        { name: "E", id: "E" },
        { name: "F", id: "F" },
        { name: "G", id: "G" },
        { name: "H", id: "H" },
        { name: "J", id: "J" },
        { name: "K", id: "K" },
        { name: "L", id: "L" },
        { name: "M", id: "M" },
        { name: "N", id: "N" },
        { name: "P", id: "P" },
        { name: "Q", id: "Q" },
        { name: "R", id: "R" },
        { name: "S", id: "S" },
        { name: "T", id: "T" },
        { name: "W", id: "W" },
        { name: "X", id: "X" },
        { name: "Y", id: "Y" },
        { name: "Z", id: "Z" }
      ]
    }
  }
  componentDidMount () {
    this.getData();
  }
  getData(){
    Taro.showLoading({
      title:'加载中'
    });
    let data = Taro.getStorageSync("cities");
    Taro.setNavigationBarTitle({
      title:"当前城市 -"+data.geoCity.nm
    })
    this.setState({
      cityData:{
        geoCity:data.geoCity,
        letterMap:data.letterMap
      }
    },()=>{
      Taro.hideLoading();
    });
  }
  selectItem(url,item){
    let data = Taro.getStorageSync("cities");
    data.geoCity = item;
    Taro.removeStorageSync('cities');
    console.log("data is",data);
    Taro.setStorage({ key: 'cities', data: data }).then(res=>{
      console.log("success",Taro.getStorageSync('cities'));
      Taro.reLaunch({url:url});
    })

  }
  setView(item){
    let id = item.id;
    this.setState({
      viewId:id
    });
  }
  render () {
    let letterMap = this.state.cityData.letterMap?this.state.cityData.letterMap:{};
    return (
      <View>
          <ScrollView className='cityList'
                scrollY
                scrollWithAnimation
                scrollTop='0'
                scrollIntoView ={this.state.viewId}
                style='height:1000vh;'>
                  <View className="locationContainer" id="pos">
                    <View className="locationCity">定位城市</View>
                    <View className="locationText">
                      <View className="city">{this.state.cityData.geoCity.nm}</View>
                    </View>
                  </View>
                  <View className="hotContainer" id="hot">
                    <View className="hotCity">热门城市</View>
                    <View className="hotList">
                      <View className="hotItem">上海</View>
                      <View className="hotItem">北京</View>
                      <View className="hotItem">广州</View>
                      <View className="hotItem">深圳</View>
                      <View className="hotItem">武汉</View>
                      <View className="hotItem">天津</View>
                      <View className="hotItem">西安</View>
                      <View className="hotItem">南京</View>
                      <View className="hotItem">杭州</View>
                      <View className="hotItem">成都</View>
                      <View className="hotItem">重庆</View>
                    </View>
                  </View>
                    {
                      Object.keys(letterMap).map(key=>{
                        return (
                          <View className="headContainer" id={key} key={key}>
                            <View className="head">
                              {key}
                            </View>
                            {
                              letterMap[key].map(item=>{
                                return (
                                  <View className="headItem" key={item.id} onClick={this.selectItem.bind(this,'../movies/movies',item)}>
                                    {item.nm}
                                  </View>
                                )
                              })
                            }
                          </View>
                        )
                      })
                    }

          </ScrollView>
          <View className="toolBar">
            {this.state.list.map(item =>{
              return (
                <View className="item" key={item.id} onTap={this.setView.bind(this,item)}>{item.name}</View>
              )
            })}
          </View>
      </View>
    )
  }
}
