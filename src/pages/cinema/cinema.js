import Taro, { Component } from '@tarojs/taro'
import { View,Text} from '@tarojs/components'
import Selectbar from "../../components/Selectbar/Selectbar";
import Brandbar from "../../components/Brandbar/Brandbar";
import Specialbar from "../../components/Specialbar/Specialbar";
import searchPng from "../../assets/images/search2.png";
import './cinema.scss'

export default class Cinema extends Component {
  config = {
    navigationBarTitleText: "影院",
    enablePullDownRefresh:false,
  }
  constructor(props){
    super(props);
    this.state = {
      type:'',
      cityData:{},
      allData:[],
      selectItems:[{nm:'全城',type:'city'},{nm:'品牌',type:'brand'},{nm:'特色',type:'special'}],
      reqList:{
        offset:'0',
        day:this.getFormatTime(),
        districtId:'-1',
        lineId:'-1',
        hallType:'-1',
        brandId:'-1',
        serviceId:'-1',
        areaId:'-1',
        stationId:'-1',
        reqId:Date.now(),
      },
      cinemas:[]
    }
  }
  selectItem(item){
    if(this.state.type == item.type){
      this.setState({
        type:""
      });
    }else{
      this.setState({
        type:item.type
      });
    }

  }
  getStorageData(){
    let self = this;
    let cityData = Taro.getStorageSync('cities');
    this.setState({
      cityData:cityData.geoCity
    },()=>{
      self.filterCinemasList();
      self.getCinemasList();
    });
  }
  filterCinemasList(){
    let cityObj = Taro.getStorageSync('cities');
    Taro.request({
      url:`https://m.maoyan.com/ajax/filterCinemas?ci=${cityObj.geoCity.id}`
    }).then(res=>{
      if(res.statusCode == 200){
        this.setState({
          allData:res.data
        });
      }
    })
  }
  getFormatTime(){
    let date = new Date();
    let year = date.getFullYear();
    let month = date.getMonth()+1;
    month = month >=10?'-'+month:'-0'+month;
    let day = date.getDate() >=10?'-'+date.getDate():'-0'+date.getDate();
    return year+month+day;
  }
  getCinemasList(){
    let reqList = this.state.reqList;
    let cityObj = Taro.getStorageSync('cities');
    let self = this;
    Taro.showLoading({
      title:"加载中"
    });
    Taro.request({
      method:'GET',
      url:`https://m.maoyan.com/ajax/cinemaList?day=${reqList.day}&offset=${reqList.offset}&limit=20&districtId=${reqList.districtId}&lineId=${reqList.lineId}&hallType=${reqList.hallType}&brandId=${reqList.brandId}&serviceId=${reqList.serviceId}&areaId=${reqList.areaId}&stationId=${reqList.stationId}&item=&updateShowDay=true&reqId=${reqList.reqId}&cityId=${cityObj.geoCity.id}`,
    }).then(res=>{
      if(res.statusCode == 200){
        Taro.hideLoading();
        let data = res.data;
        self.setState({
          cinemas:self.state.cinemas.concat(data.cinemas)
        });
      }
    })
  }
  loadMore(){
    let self = this;
    this.setState({
      offset:self.state.offset+20
    },()=>{
      self.getCinemasList();
    })
  }
  componentDidMount () {
    this.getStorageData();
  }
  navigate(url){
    Taro.navigateTo({url:url});
  }
  navigateToCinema(url,item){
    let cinemaId = item.id;
    url = url+`?cinemaId=${cinemaId}`
    Taro.navigateTo({
      url:url
    });
  }
  render () {
    let cinemas = this.state.cinemas;
    return (
      <ScrollView className='cinemas' scrollY
        scrollWithAnimation
        scrollTop='0'
        style='height: 100vh;'
        onScrolltolower={this.loadMore.bind(this)}
        lowerThreshold='20'
      >
        <View className="navHeader">
          <View className="location" onClick={this.navigate.bind(this,'../position/position')}>
            {this.state.cityData.nm}
            <View className="tangle"></View>
          </View>
          <View className="search" onClick={this.navigate.bind(this,'../search/search')}>
            <Image src={searchPng}></Image>
            <Text>搜影院</Text>
          </View>
        </View>
        <View className="ToolBar">
          {this.state.selectItems.map((item,index)=>{
            return (
              <View className={this.state.type == item.type?'actived selectItem':'selectItem'} key={index} onClick={this.selectItem.bind(this,item)}>
                {item.nm}
                <View className="tangle"></View>
              </View>
            )
          })}
          <Selectbar data={this.state.allData} type={this.state.type}/>
          <Specialbar data={this.state.allData} type={this.state.type}/>
          <Brandbar data={this.state.allData} type={this.state.type}/>
        </View>
        <View className="cinemasContainer">
        {cinemas.map(item =>{
          return(
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
          )})
        }
        </View>
      </ScrollView>
    )
  }
}
