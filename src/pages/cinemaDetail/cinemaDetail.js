import Taro, { Component } from '@tarojs/taro'
import { View,Image,Text} from '@tarojs/components'
import './CinemaDetail.scss'
import posPng from "../../assets/images/pos.png"
export default class CinemasDetail extends Component {
  config={
    enablePullDownRefresh:false
  }
  constructor(props){
    super(props);
    this.state = {
      reqList:{
        cinemaId:'',
        movieId:''
      },
      movieData:null,
      bg:"",
      left:0,
      viewId:'',
      activeIndex:0,
      tabIndex:0
    }
  }
  getCinemaDetail(){
    let params = this.$router.params;
    let movieId = params.movieId?params.movieId:'';
    let cinemaId = params.cinemaId?params.cinemaId:"";
    const self = this;
    this.setState({
      reqList:{
        cinemaId:cinemaId,
        movieId:movieId
      }
    },()=>{
      Taro.showLoading({
        title:"加载数据中"
      });
      Taro.request({
        url:`https://m.maoyan.com/ajax/cinemaDetail?cinemaId=${cinemaId}&movieId=${movieId}`,
        method:'GET'
      }).then(res=>{
        if(res.statusCode == 200){
          Taro.hideLoading();
          res.data.showData.movies.map((item)=>{
            const arr = item["img"].split("w.h");
            item["img"] = arr[0]+'140.180'+arr[1];
          });
          self.setState({
            movieData:res.data,
            bg:res.data.showData.movies[0].img
          },()=>{
            Taro.setNavigationBarTitle({
              title:res.data.cinemaData.nm
            })
          })
        }
      }).catch(err=>{
        console.log(err.message)
      })
    })

  }
  selected(item,index,e){
    const self = this;
    this.setState({
      reqList:{
        movieId:item.id,
      },
      bg:item.img,
      activeIndex:index,
      viewId:e.currentTarget.id
    });
  }
  chooseItem(index){
    this.setState({
      tabIndex:index
    });
  }
  navigateToMap(url,cinemaData){
    url = url+`?lng=${cinemaData.lng}&lat=${cinemaData.lat}&title=${cinemaData.nm}`;
    Taro.navigateTo({
      url:url
    })
  }
  navigateSeat(url,item){
    const seqNo = item.seqNo;
    const reqList = this.state.reqList;
    const cityId = Taro.getStorageSync('cities').geoCity.id;
    url = url+`?cityId=${cityId}&seqNo=${seqNo}&ci=${cityId}`;
    Taro.navigateTo({
      url:url
    })
  }
  componentDidMount () {
    this.getCinemaDetail();
  }
  render () {
    let cinemaData = this.state.movieData?this.state.movieData.cinemaData:{};
    let showData = this.state.movieData?this.state.movieData.showData.movies:{};
    let activeIndex = this.state.activeIndex;
    let dateLists = showData;
    let tabIndex = this.state.tabIndex;
    let dealList = this.state.movieData? this.state.movieData.dealList:{};
    let reqList = this.state.reqList;
    return(
      <View className="cinemaDetail">
        <View className="header">
          <View className="locationInfo">
            <View className="name">{cinemaData.nm}</View>
            <View className="addr">{cinemaData.addr}</View>
          </View>
          <View className="locateIcon" onClick={this.navigateToMap.bind(this,"../map/map",cinemaData)}>
            <Image src={posPng}></Image>
          </View>
        </View>
        <View className="showCon">
          <Image src={this.state.bg} className="bg"></Image>
          <View className="blur"></View>
          <ScrollView className='scrollview'
              scrollX
              scrollWithAnimation
              scrollTop='0'
              style="height:130Px;"
              id="swiper"
              scrollIntoView={this.state.viewId}
          >
                        {showData.map((item,index)=>{
                          return (
                              <Image  src={item.img} key={item.id}  id={'view'+item.id} onClick={this.selected.bind(this,item,index,e)} className={ item.id ==  this.state.reqList.movieId?'active img':'img'}></Image>
                          );
                        })}
            </ScrollView>
        </View>
        <View className="movieInfo">
          <View className="movieName">
            {showData[activeIndex].nm}<Text className="comment">{showData[activeIndex].sc}分</Text>
          </View>
          <View className="movieDesc">{showData[activeIndex].desc}</View>
        </View>
        <ScrollView className="dateSelect"
          scrollX
          scrollWithAnimation
          scrollTop='0'
          style="height:50Px;">
          {showData[activeIndex].shows.map((item,index)=>{
            return (
              <View key={index} className={this.state.tabIndex == index?'selected dateItem':'dateItem'} onClick={this.chooseItem.bind(this,index)}>{item.dateShow}</View>
            )
          })}
        </ScrollView>
        <View className="list">
          {
            showData[activeIndex].shows[tabIndex].plist.map((item,index)=>{
              return (
                <View className="ticketInfo" key={index}>
                  <View className="time">
                    <View className="startTime">
                      {item.tm}
                    </View>
                    <View className="endTime"></View>
                  </View>
                  <View className="station">
                    <View className="lang">{item.lang}{item.tp}</View>
                    <View className="hall">{item.th}</View>
                  </View>
                  <View className="sellPrice">
                      <View className="price"><Text className="mark">￥{item.vipPrice}</Text> {item.vipPriceName}</View>
                      <View className="discount">{item.extraDesc}</View>
                  </View>
                  <View className="button" onClick={this.navigateSeat.bind(this,'../seat/seat',item)}>
                    购票
                  </View>
                </View>
              )
            })
          }
        </View>
        <View className="line"></View>
        <View className="things">
          <View className="title">影院超值套餐</View>
          <View className="list">
            {
              dealList.dealList.map((item,index)=>{
                return (
                  <View className="item" key={index}>
                    <Image src="https://p1.meituan.net/440.0/movie/902a8e428171c190ee91a7d16ba912ca9499738.jpg@388w_388h_1e_1c"></Image>
                    <View className="con">
                      <View className="name">
                        <Text className="icon">单人</Text>
                        <Text className="desc">{item.title}</Text>
                      </View>
                      <View className="sellCount">{item.curNumberDesc}</View>
                      <View className="operate">
                        <View className="price">{item.price}元</View>
                        <View className="buy">去购买</View>
                      </View>
                    </View>
                  </View>
                )
              })
            }
          </View>
        </View>
      </View>
    )
  }
}
