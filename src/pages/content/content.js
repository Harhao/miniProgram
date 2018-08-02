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
      showContent:false,
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
        for(let index in data.photos){
          let photo = data.photos[index];
          let arr = photo.split('w.h');
          data.photos[index] = arr[0]+'180.140'+arr[1];
        }
        this.setState({
          detailMovie:data
        });
      }
    }).catch(err=>{
      console.log(err.message);
    })
  }
  showContent(){
    let self = this;
    this.setState({
      showContent:!self.state.showContent
    })
  }
  render () {
    let itemData = this.state.detailMovie;
    let photos = itemData.photos;
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
            <View className="btn">特惠购票</View>
            <View className={this.state.showContent?'introduceContent showContent':'introduceContent'}>
              {itemData.dra}
            </View>
            <View className="arrow" onClick={this.showContent.bind(this)}>
              <View className={this.state.showContent?'icon change':'icon'}></View>
            </View>
        </View>
        <View className="line"></View>
        <View className="mediaContainer">
            <View className="title">媒体库</View>
            <ScrollView scrollX style='height:80Px' className='media' scrollTop='0' lowerThreshold='10' className="mediaPhoto"
            >
              <Image src={itemData.videoImg}></Image>
              {
                photos.map((item,index) =>{
                  return (
                    <Image src={item} key={index}></Image>
                  );
                })
              }
            </ScrollView>
          <View className="count">
            <View className="video"></View>
            <View className="cinemaPic"></View>
          </View>
        </View>
        <View className="line"></View>
      </ScrollView>
    )
  }
}
