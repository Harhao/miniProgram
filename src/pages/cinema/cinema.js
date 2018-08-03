import Taro, { Component } from '@tarojs/taro'
import { View,Text} from '@tarojs/components'
import Selectbar from "../../components/Selectbar/Selectbar";
import Brandbar from "../../components/Brandbar/Brandbar";
import Specialbar from "../../components/Specialbar/Specialbar";
import searchPng from "../../assets/images/search2.png";
import './cinema.scss'

export default class Cinema extends Component {
  config = {
    navigationBarTitleText: '影院',
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
      }
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
    Taro.request({
      url:`http://m.maoyan.com/ajax/filterCinemas?ci=${this.state.cityData.id}`
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
    let month = date.getMonth() >=10?'-'+date.getMonth():'-0'+date.getMonth();
    let day = date.getDate() >=10?'-'+datae.getDate():'-0'+date.getDate();
    return year+month+day;
  }
  getCinemasList(){
    let reqList = this.state.reqList;
    let id = this.state.cityData.id;
    console.log("city id is ",this.state.cityData.id);
    Taro.request({
      method:'GET',
      url:` http://m.maoyan.com/ajax/cinemaList?day=${reqList.day}&offset=${reqList.offset}&limit=20&districtId=${reqList.districtId}&lineId=${reqList.lineId}&hallType=${reqList.hallType}&brandId=${reqList.brandId}&serviceId=${reqList.serviceId}&areaId=${reqList.areaId}&stationId=${reqList.stationId}&item=&updateShowDay=true&reqId=${reqList.reqId}&cityId=${id}`
    }).then(res=>{
      console.log("*****",res);
    })
  }
  componentDidMount () {
    this.getStorageData();
  }
  navigate(url){
    Taro.navigateTo({url:url});
  }
  render () {
    let cinemas = this.state.cinemas;
    return (
      <View className='cinemas'>
        <View className="navHeader">
          <View className="location">
            {this.state.cityData.nm}
            <View className="tangle"></View>
          </View>
          <View className="search" onClick={this.navigate.bind(this,'../search/search')}>
            <Image src={searchPng}></Image>
            <Text>搜影院</Text>
          </View>
        </View>
        <View className="toolBar">
          {this.state.selectItems.map((item,index)=>{
            return (
              <View className={this.state.type == item.type?'selected selectItem':'selectItem'} key={index} onClick={this.selectItem.bind(this,item)}>
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
            <View className="cinemasItem" key={item.id}>
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
                <View className="cinemaRecent">近期场次：{item.showTimes}</View>
              </View>
              <View className="cinemasDis">{item.distance}</View>
            </View>
          )})
        }
        </View>
      </View>
    )
  }
}
