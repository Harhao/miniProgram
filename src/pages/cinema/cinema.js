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
      selectItems:[{nm:'全城',type:'city'},{nm:'品牌',type:'brand'},{nm:'特色',type:'special'}]
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
      self.getCinemasList();
    });
  }
  getCinemasList(){
    Taro.request({
      url:`http://m.maoyan.com/ajax/filterCinemas?ci=${this.state.cityData.id}`
    }).then(res=>{
      console.log("&&&&",res);
      if(res.statusCode == 200){
        this.setState({
          allData:res.data
        });
      }
    })
  }
  componentDidMount () {
    this.getStorageData();
  }
  navigate(url){
    Taro.navigateTo({url:url});
  }
  render () {
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
      </View>
    )
  }
}
