import Taro, { Component } from '@tarojs/taro'
import { View,Image} from '@tarojs/components'
import './content.scss'

export default class Content extends Component {
  config={
    enablePullDownRefresh:false
  }
  constructor(props){
    super(props);
    this.state={
      params:{},
      detailMovie:{},
    }
  }
  componentWillMount () {
    let params = this.$router.params;
    let title = params.title;
    Taro.setNavigationBarTitle({
      title:title
    })
    this.setState({
      params:{
        title:params.title,
        id:params.id,
        cityId:params.cityId
      }
    });
  }

  componentDidMount () {
    this.getDetailData();
  }
  getDetailData(){
    Taro.request({
      url:`http://m.maoyan.com/ajax/detailmovie?movieId=${this.state.params.id}`
    }).then(res=>{
      if(res.statusCode == 200){
        let data = res.data.detailMovie;
        console.log(data);
        let arr = data["img"].split("w.h");
        data["img"] = arr[0]+"128.180"+  arr[1];
        let showDate = data.rt;
        this.setState({
          detailMovie:data
        });
      }
    }).catch(err=>{
      console.log(err.message);
    })
  }
  render () {
    let itemData = this.state.detailMovie;
    return (
      <ScrollView  className="detailContainer"
            scrollY
            scrollWithAnimation
            scrollTop='0'
            style='height: 100vh;'
        >
        <View className='detailBox'>
          <View className ="bg">
            <Image src={itemData.img}></Image>
            <view className="blurBg"></view>
            <View className="detailContent">
              <Image className="poster" src={itemData.img}></Image>
              <View className="detailInfo">
                <View className="title">{itemData.nm}</View>
                <View className="star">{itemData.enm}</View>
                {itemData.globalReleased?<View className="comment">观众评  {itemData.sc}</View>:<View className="comment">{itemData.wish}人想看</View>}
                <View className ="type">{itemData.cat}</View>
                <View className="hours">{itemData.src}/{itemData.dur}分钟</View>
                <View className="time">{itemData.pubDesc}</View>
              </View>
            </View>
          </View>
        </View>
        <View className="introduce">

        </View>
      </ScrollView>
    )
  }
}
