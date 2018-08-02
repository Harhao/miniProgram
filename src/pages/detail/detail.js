import Taro, { Component } from '@tarojs/taro'
import { View,Image} from '@tarojs/components'
import Selectbar from "../../components/Selectbar/Selectbar";
import Brandbar from "../../components/Brandbar/Brandbar";
import Specialbar from "../../components/Specialbar/Specialbar";
import './detail.scss'

export default class Detail extends Component {
  config={
    enablePullDownRefresh:false
  }
  constructor(props){
    super(props);
    this.state={
      active: 0,
      params:{},
      offset:0,
      hide:false,
      type:'',
      flag:true,
      showDate:"",
      detailMovie:{},
      dates:[],
      cinemas:[],
      allData:{},
      scrollLeft:'0',
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
  getfilterCinemas(){
    let cityId = this.state.params.cityId;
    Taro.request({
      url:`http://m.maoyan.com/ajax/filterCinemas?movieId=${this.state.params.id}&day=${this.state.showDate}`,
      header:{
        "Cookie":`_lxsdk_cuid=164b6cae2cac8-02b7b032f571b5-39614706-1fa400-164b6cae2cbc8; v=3; iuuid=1A6E888B4A4B29B16FBA1299108DBE9CA19FF6972813B39CA13A8D9705187374; revrev=76338a29; _lx_utm=utm_source%3DBaidu%26utm_medium%3Dorganic; webp=true; __mta=3463951.1532075108184.1533098338076.1533118040602.20; _lxsdk=1A6E888B4A4B29B16FBA1299108DBE9CA19FF6972813B39CA13A8D9705187374; from=canary; selectci=true; ci=${cityId}; _lxsdk_s=164f4f4c9e9-45e-d1b-46%7C%7C46; __mta=3463951.1532075108184.1533118040602.1533118355820.21`
      }
    }).then(res=>{
      if(res.statusCode == 200){
        let data = res.data;
        this.setState({
          allData:data
        });
      }
    })
  }
  getDetailData(){
    Taro.request({
      url:`http://m.maoyan.com/ajax/detailmovie?movieId=${this.state.params.id}`
    }).then(res=>{
      if(res.statusCode == 200){
        let data = res.data.detailMovie;
        let arr = data["img"].split("w.h");
        data["img"] = arr[0]+"128.180"+  arr[1];
        let showDate = data.rt;
        this.getHotDate(showDate);
        this.setState({
          detailMovie:data
        },()=>{
          this.getfilterCinemas()
        });
      }
    }).catch(err=>{
      console.log(err.message);
    })
  }
  getDate(){
    let date = new Date();
    let dateString = "";
    let year = date.getFullYear();
    let month = date.getMonth()+1;
    month = month >=10?month:'0'+month
    let day = date.getDate();
    day = day >=10 ?day:'0'+day;
    dateString = year+"-"+month+"-"+day;
    return dateString;
  }
  getHotDate(showDate){
    let now = new Date();
    if(new Date(showDate) < now){
        showDate = this.getDate();
        this.setState({
          showDate:showDate
        });
    }
    Taro.showLoading({
      title:"加载数据中"
    });
    Taro.request({
      url:`http://m.maoyan.com/ajax/movie?forceUpdate=${Date.now()}`,
      method:'POST',
      data:{
        movieId:this.state.params.id,
        day:showDate,
        offset: this.state.offset,
        limit: 20,
        districtId: -1,
        lineId: -1,
        hallType: -1,
        brandId: -1,
        serviceId: -1,
        areaId: -1,
        stationId: -1,
        item:"",
        updateShowDay: true,
        reqId: Date.now(),
        cityId: this.state.params.cityId,
      }
    }).then(res=>{
      if(res.statusCode == 200){
        let self = this
        Taro.hideLoading();
        let data = res.data;
        let cinemas = res.data.cinemas;
        data.showDays.dates.map((item)=>{
          let str = item["date"];
          item["date1"] = this.formatDateString(str);
        })
        this.setState({
          dates:data.showDays.dates,
          cinemas:self.state.cinemas.concat(cinemas)
        },()=>{
        });
      }
    })
  }
  formatDateString(date){
    let dates = new Date();
    let day = dates.getDate();
    let dateParam = date.split('-');
    if(dateParam[2] == day){
      return "今天"+dateParam[1]+"月"+dateParam[2]+"日";
    }else if(dateParam[2] == day+1){
      return "明天"+dateParam[1]+"月"+dateParam[2]+"日";
    }else if(dateParam[2] == day+2){
      return "后天"+dateParam[1]+"月"+dateParam[2]+"日";
    }else{
      let weekday = new Date(date).getDay();
      let arr =["周日","周一","周二","周三","周四","周五","周六"]
      return arr[weekday]+dateParam[1]+"月"+dateParam[2]+"日";
    }
  }
  selectDate(item,index,e){
    this.setState({
      active:index,
      offset:0,
      showDate:item.date,
      scrollLeft:e.target.offsetLeft
    },()=>{
      this.getAddrByDay(item)
    });
  }
  getAddrByDay(item){
    Taro.showLoading({
      title:"加载数据中"
    });
    Taro.request({
      url:`http://m.maoyan.com/ajax/movie?forceUpdate=${Date.now()}`,
      method:'POST',
      data:{
        movieId:this.state.params.id,
        day:item.date,
        offset: this.state.offset,
        limit: 20,
        districtId: -1,
        lineId: -1,
        hallType: -1,
        brandId: -1,
        serviceId: -1,
        areaId: -1,
        stationId: -1,
        item:"",
        updateShowDay: true,
        reqId: Date.now(),
        cityId: this.state.params.cityId,
      }
    }).then(res=>{
      if(res.statusCode == 200){
        Taro.hideLoading();
        let data = res.data;
        this.setState({
          cinemas:data.cinemas
        });
      }
    })
  }
  load(e){
    let offset = this.state.offset
    offset = offset + 20;
    let showDate = this.state.showDate;
    this.setState({
      offset:offset
    },()=>{
      this.getHotDate(showDate);
    })
  }
  scroll(e){
    if(e.detail.scrollTop >=185 && this.state.flag){
      let hide = true;
      this.setState({
        hide:hide,
        flag:false
      })
    }
    if(e.detail.scrollTop <185 && !this.state.flag){
      let hide = false;
      this.setState({
        hide:hide,
        flag:true
      })
    }
  }
  showArea(name,e){
    e.stopPropagation();
    e.preventDefault();
    if(this.state.hide){
      this.setState({
        hide:false,
        type:''
      });
    }else{
      this.setState({
        hide:true,
        type:name
      });
    }
  }
  navigateContent(url,item){
    let cityId = this.state.cityId;
    url = url+`?id=${item.id}&title=${item.nm}&cityId=${cityId}`
    Taro.navigateTo({ url: url })
  }
  render () {
    let itemData = this.state.detailMovie;
    let cinemas = this.state.cinemas;
    return (
      <ScrollView  className="detailContainer"
            scrollY
            scrollWithAnimation
            scrollTop='0'
            style='height: 100vh;'
            lowerThreshold='20'
            upperThreshold='20'
            onScrolltolower={this.load}
            onScroll={this.scroll}
        >
        <View className={this.state.hide?'hide detailBox':'detailBox'}>
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
              <View className="arrow" onClick={this.navigateContent.bind(this,'../content/content',itemData)}>
                <View className="icon"></View>
              </View>
            </View>
          </View>
        </View>
        <View className={this.state.hide?'fix':''}>
          <ScrollView className='dateSelect'
              scrollX
              scrollWithAnimation
              scrollTop='0'
              scrollLeft={this.state.scrollLeft}
          >
          {this.state.dates.map((item,index) =>{
              return (<View className = {this.state.active == index?'active scroll-item':'scroll-item'} key={index} onClick={this.selectDate.bind(this,item,index)}>{item.date1}</View>)
          })}
          </ScrollView>
          <View className="dateSelect">
            <View className={this.state.type == 'city'?'scroll-item itemActive':'scroll-item '} onClick={this.showArea.bind(this,'city')}>全城 <View className="arrow"></View></View>
            <View className="line">|</View>
            <View className={this.state.type == 'brand'?'scroll-item itemActive':'scroll-item'} onClick={this.showArea.bind(this,'brand')}>品牌 <View className="arrow"></View></View>
            <View className="line">|</View>
            <View className={this.state.type == 'special'?'scroll-item itemActive':'scroll-item'} onClick={this.showArea.bind(this,'special')}>特色 <View className="arrow"></View></View>
            <Selectbar data={this.state.allData} type={this.state.type}/>
            <Specialbar data={this.state.allData} type={this.state.type}/>
            <Brandbar data={this.state.allData} type={this.state.type}/>
          </View>
        </View>
        <View className="cinemas">
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
            )
          })}
        </View>
      </ScrollView>
    )
  }
}
