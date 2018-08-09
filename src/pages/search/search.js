import Taro, { Component } from '@tarojs/taro'
import { View, Text,Input} from '@tarojs/components'
import './search.scss'
export default class Search extends Component {
  config = {
    navigationBarTitleText: '猫眼电影',
    enablePullDownRefresh:false
  }
  constructor(props){
    super(props);
    this.state={
      keyWord:'',
      cinemasList:[],
      movieList:[]

    }
  }
  componentDidMount () {
    this.searchList();
  }
  searchList(){
    let cityId = Taro.getStorageSync('cities').geoCity.id;
    let keyWord = this.state.keyWord;
    let self = this;
    Taro.request({
      url:`https://m.maoyan.com/ajax/search?kw=${keyWord}&cityId=${cityId}&stype=-1`,
      method:'GET'
    }).then(res=>{
      if(res.statusCode == 200){
          let data = res.data;
          let list = data.movies?data.movies.list:[];
          list.map(item=>{
            let arr = item["img"].split("w.h");
            item["img"] = arr[0]+'120.180'+arr[1];
          })
          self.setState({
              cinemasList:data.cinemas?data.cinemas.list:[],
              movieList:data.movies?data.movies.list:[]
          });
      }
    })
  }
  setKeyWord(e){
    let self = this;
    this.setState({
      keyWord:e.currentTarget.value
    },()=>{
      self.searchList();
    })
  }
  clear(){
    this.setState({
      keyWord:''
    });
    Taro.navigateBack({
      delta:1
    })
  }
  navigateToURL(url,item){
    let cityId = Taro.getStorageSync('cities').geoCity.id;
    url = url+`?title=${item.nm}&id=${item.id}&cityId=${cityId}`
    Taro.navigateTo({
      url:url
    });
  }
  navigateToCinema(url,item){
    console.log(item);
    const cinemaId = item.id;
    url = url+`?cinemaId=${cinemaId}`
    Taro.navigateTo({
      url:url
    });
  }
  render () {
    let movies = this.state.movieList;
    let cinemas = this.state.cinemasList;
    return (
      <ScrollView className='searchCon' scrollY
        scrollWithAnimation
        scrollTop='0'
        style='height: 100vh;'
        lowerThreshold='20'
      >
        <View className="navHeader">
          <Input className="search" type="text" placeholder="搜影院、搜影院" onInput={this.setKeyWord.bind(this,e)} value={this.state.keyWord}>
          </Input>
          <View className="cancel" onClick={this.clear.bind(this)}>
              取消
          </View>
        </View>
        <View className="history"></View>
        <View className="resultCon">
          <View className="resultItem" hidden={this.state.movieList.length == 0?true:false}>
            <View className="title">电影/电视剧/综艺</View>
            {movies.map((item,index)=>{
              return (
                <View className="dataItem" key={index} onClick={this.navigateToURL.bind(this,'../content/content',item)}>
                  <View className="leftItem">
                    <Image src={item.img}></Image>
                  </View>
                  <View className="rightItem">
                    <View className="itemContent">
                      <View className="title">
                        <Text>{item.nm}</Text>
                      </View>
                      {item.globalReleased?<View className="comment smallFont">观众评 <Text className="yellow">{item.sc}</Text></View>:<View className="comment smallFont"><Text className="yellow">{item.wish}</Text>人想看</View>}
                      <View className="person smallFont">主演: {item.star}</View>
                      <View className="showInfo smallFont">{item.showInfo}</View>
                    </View>
                    <View className="operate">
                      {item.showst === 4?<view className="preBuy">预售</view>:<view className="buyTicket">购票</view>}
                    </View>
                  </View>
                </View>
              )
            })}
          </View>
          <View className="resultItem" hidden={this.state.cinemasList.length == 0?true:false}>
            <View className="title">影院</View>
            {
              cinemas.map((item,index)=>{
                return (
                  <View className="cinemasItem" key={item.id} onClick={this.navigateToCinema.bind(this,'../cinemaDetail/cinemaDetail',item)}>
                    <View className="leftCinemas">
                      <View className="cinemaName">{item.nm}<Text className="price">{item.sellPrice}</Text><Text className="smallText">元起</Text></View>
                      <View className="cinemaAddr">{item.addr}</View>
                      <View className="cinemaTag">
                        <View className="tag">小吃</View>
                        {item.tag.vipTag?<View className="tag">{item.tag.vipTag}</View>:""}
                        {item.tag.hallType.map((type,index)=>{
                          return (
                            <View className="other" key={index}>{type}</View>
                          )
                        })}
                      </View>
                      {item.promotion.cardPromotionTag?<View className="cinemaDiscount"><Text className="card">卡</Text>{item.promotion.cardPromotionTag}</View>:""}
                    </View>
                    <View className="cinemasDis">{item.distance}</View>
                  </View>
                )
              })
            }
          </View>
        </View>
      </ScrollView>
    )
  }
}
