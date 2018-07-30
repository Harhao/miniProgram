import Taro from '@tarojs/taro-h5';
import { Component } from "@tarojs/taro-h5";
import Nerv from "nervjs";
import { View, Image, ScrollView, Text } from '@tarojs/components';
import searchPng from "../../assets/images/search.png";
import ico1Png from "../../assets/images/2D.png";
import ico2Png from "../../assets/images/3D.png";
import "./Toptab.scss";
export default class Toptab extends Component {
  constructor(props) {
    super(...arguments);
    this.state = {
      currentNavtab: 0,
      location: "广州",
      navTab: ["正在热映", "即将上映"],
      onList: null,
      movieIds: null,
      startIndex: 0,
      lastIndex: 0
    };
  }
  switchTab(index, e) {
    this.setState({
      currentNavtab: index
    });
  }
  navigate(url) {
    Taro.navigateTo({ url: url });
  }
  navigateDetail(url, item) {
    url = url + `?id=${item.id}&title=${item.nm}`;
    Taro.navigateTo({ url: url });
  }
  getMoviesOnList() {
    Taro.showLoading({
      title: "加载中"
    });
    Taro.request({
      url: "http://m.maoyan.com/ajax/movieOnInfoList?token=",
      method: "GET"
    }).then(res => {
      console.log(res);
      if (res.statusCode == 200) {
        Taro.hideLoading();
        res.data.movieList.forEach(value => {
          let arr = value["img"].split("w.h");
          value["img"] = arr[0] + "128.180" + arr[1];
        });
        this.setState({
          onList: res.data.movieList,
          startIndex: res.data.movieList.length,
          lastIndex: res.data.total - 1,
          movieIds: res.data.movieIds
        });
      } else {
        this.setState({
          onList: null,
          movieIds: null
        });
      }
    });
  }
  appendToList() {
    Taro.showLoading({ title: '加载中' });
    let url = "http://m.maoyan.com/ajax/moreComingList?token=&movieIds=";
    let startIndex = this.state.startIndex;
    let lastIndex = this.state.lastIndex;
    if (startIndex >= lastIndex) {
      Taro.showToast({
        title: '没有更多数据了',
        icon: 'success',
        duration: 2000
      });
      return false;
    }
    for (let i = 0; i < 10; i++) {
      if (startIndex <= lastIndex && this.state.movieIds[startIndex]) {
        if (i == 9) {
          url = url + this.state.movieIds[startIndex];
        } else {
          if (this.state.movieIds[startIndex + 1]) {
            url = url + this.state.movieIds[startIndex] + ',';
          } else {
            url = url + this.state.movieIds[startIndex];
          }
        }
        startIndex++;
      }
    }
    Taro.request({
      url: url,
      method: 'GET'
    }).then(res => {
      let self = this;
      if (res.statusCode == 200) {
        Taro.hideLoading();
        res.data.coming.forEach(value => {
          let arr = value["img"].split("w.h");
          value["img"] = arr[0] + "128.180" + arr[1];
        });
        this.setState({
          onList: self.state.onList.concat(res.data.coming),
          startIndex: startIndex
        });
      }
    });
  }
  componentDidMount() {
    this.getMoviesOnList();
  }
  render() {
    return <View>
        <View className="top-tab flex-wrp flex-tab">
            <View className="location" onClick={this.navigate.bind(this, "../position/position")}>
              {this.state.location}
              <View className="cityArrow"></View>
            </View>
            {this.state.navTab.map((item, index) => {
          return <View className={this.state.currentNavtab === index ? 'toptab flex-item active' : 'toptab flex-item'} key={index} onClick={this.switchTab.bind(this, index)}>
                  {item}
                </View>;
        })}
            <View className="search" onClick={this.navigate.bind(this, '../search/search')}>
              <Image src={searchPng}></Image>
            </View>
        </View>
        <ScrollView scroll-y scroll-top="45" lowerThreshold="30" style="height:100vh" onScrolltolower={this.appendToList.bind(this)} scrollWithAnimation>
          <View className="tabItemContent" hidden={this.state.currentNavtab === 0 ? false : true}>
            {this.state.onList.map((item, index) => {
            return <View className="dataItem" key={index} onClick={this.navigateDetail.bind(this, '../detail/detail', item)}>
                  <View className="leftItem">
                    <Image src={item.img}></Image>
                  </View>
                  <View className="rightItem">
                    <View className="itemContent">
                      <View className="title">
                        <Text>{item.nm}</Text>
                        <View className="icon">
                          {item.version.split(' ')[0] === "v3d" ? <Image src={ico2Png}></Image> : <Image src={ico1Png}></Image>}
                        </View>
                      </View>
                      {item.globalReleased ? <View className="comment smallFont">观众评 <Text className="yellow">{item.sc}</Text></View> : <View className="comment smallFont"><Text className="yellow">{item.wish}</Text>人想看</View>}
                      <View className="person smallFont">主演: {item.star}</View>
                      <View className="showInfo smallFont">{item.showInfo}</View>
                    </View>
                    <View className="operate">
                      {item.showst === 4 ? <view className="preBuy">预售</view> : <view className="buyTicket">购票</view>}
                    </View>
                  </View>
                </View>;
          })}
          </View>
          <View className="tabItemContent" hidden={this.state.currentNavtab === 1 ? false : true}>
              即将上映
          </View>
        </ScrollView>
      </View>;
  }
}