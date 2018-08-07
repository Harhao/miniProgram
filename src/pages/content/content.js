import Taro, { Component } from '@tarojs/taro'
import { View,Image} from '@tarojs/components'
import playPng from "../../assets/images/play.png";
import musicPng from "../../assets/images/music.png";
import './content.scss'

export default class Content extends Component {
  config={
    enablePullDownRefresh:false
  }
  constructor(props){
    super(props);
    this.state={
      showContent:false,
      playHide:true,
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
    Taro.showLoading({
      title:"加载中"
    });
    Taro.request({
      url:`https://m.maoyan.com/ajax/detailmovie?movieId=${this.state.params.id}`
    }).then(res=>{
      if(res.statusCode == 200){
        Taro.hideLoading();
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
  playVideo(e){
    let self = this;
    e.stopPropagation();
    this.setState({
      playHide:!self.state.playHide
    });
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
              <View className="videoCon" onClick={this.playVideo.bind(this,e)}>
                <Image src={itemData.videoImg}></Image>
                <Image className="playIcon" src={playPng}></Image>
              </View>
              {
                photos.map((item,index) =>{
                  return (
                    <Image src={item} key={index}></Image>
                  );
                })
              }
            </ScrollView>
          <View className="count">
            <View className="video">
              <View className="desc">视频</View>
              <View>{itemData.vnum}</View>
              <View className="icon"></View>
            </View>
            <View className="cinemaPic">
              <View className="desc">剧照</View>
              <View>{itemData.pn}</View>
              <View className="icon"></View>
            </View>
          </View>
        </View>
        <View className="line"></View>
        <View className="musicCon">
          <Image src={musicPng}></Image>
          <View className="content">
            <View className="text">
              <View className="movieText bold">电影原声</View>
              <View className="movieText name">{itemData.musicName}</View>
            </View>
          </View>
          <View className="icon"></View>
        </View>
        <View className="line"></View>
        <Video
            src={itemData.videourl}
            hidden={this.state.playHide}
            controls={true}
            autoplay={false}
            poster={itemData.videoImg}
            initialTime='0'
            id="video"
            loop={false}
            muted={false}
            direction="-90"
            onlongpress={this.playVideo.bind(this,e)}
          />
      </ScrollView>
    )
  }
}
