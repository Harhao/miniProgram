import Taro from '@tarojs/taro-h5';
import { Component } from "@tarojs/taro-h5";
import Nerv from "nervjs";
import { View, Image } from '@tarojs/components';
import './detail.scss';

export default class Detail extends Component {
  constructor(props) {
    super(props);
    this.state.params = {};
    this.state.detailMovie = {};
  }
  componentWillMount() {
    let params = this.$router.params;
    let title = params.title;
    Taro.setNavigationBarTitle({
      title: title
    });
    this.setState({
      params: {
        title: params.title,
        id: params.id
      }
    });
  }

  componentDidMount() {
    this.getDetailData();
  }

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}
  getDetailData() {
    Taro.request({
      url: `http://m.maoyan.com/ajax/detailmovie?movieId=${this.state.params.id}`
    }).then(res => {
      if (res.statusCode == 200) {
        let data = res.data.detailMovie;
        let arr = data["img"].split("w.h");
        data["img"] = arr[0] + "128.180" + arr[1];
        this.setState({
          detailMovie: res.data.detailMovie
        });
      }
    }).catch(err => {
      console.log(err.message);
    });
  }
  render() {
    let itemData = this.state.detailMovie;
    return <View className="detailContainer">
        <View className="detailBox">
          <View className="bg">
            <Image src={itemData.img}></Image>
            <view className="blurBg"></view>
            <View className="detailContent">
              <Image className="poster" src={itemData.img}></Image>
              <View className="detailInfo">
                <View className="title">{itemData.nm}</View>
                <View className="star">{itemData.enm}</View>
                {itemData.globalReleased ? <View className="comment">观众评  {itemData.sc}</View> : <View className="comment">{itemData.wish}人想看</View>}
                <View className="type">{itemData.cat}</View>
                <View className="hours">{itemData.src}/{itemData.dur}分钟</View>
                <View className="time">{itemData.pubDesc}</View>
              </View>
              <View className="arrow">
                <View className="icon"></View>
              </View>
            </View>
          </View>
        </View>
      </View>;
  }
}