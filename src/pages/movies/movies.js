import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import Toptab from "../../components/Toptab/Toptab.js"
import './movies.scss'
export default class Movies extends Component {
  config = {
    navigationBarTitleText: '猫眼电影'
  }
  constructor(props){
    super(props);
  }
  componentDidMount () {
    this.getCities();
  }
  getCities(){
    Taro.request({
      url:"http://localhost:3000/cities",
      method:"GET",
      header:{
        "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8",
        "cookie": "uuid_n_v=v1; uuid=6DD93FD08BF611E890502F90485477184E7D90EA82604A6FA239277CFF8BE0E6; _lxsdk_cuid=164b6cae2cac8-02b7b032f571b5-39614706-1fa400-164b6cae2cbc8; _csrf=0e9cd76ec8398cda0c917d5add180bfb51d3cc4f3af08c0088ba192de4a02da8; __mta=3463951.1532075108184.1533346557702.1533348988389.24; _lxsdk=1A6E888B4A4B29B16FBA1299108DBE9CA19FF6972813B39CA13A8D9705187374"
      }
    }).then(res=>{
      if(res.statusCode == 200){
        let data = res.data;
        console.log("获取到地址>>>>>",data);
        Taro.setStorageSync(
          "cities",
          data
        )
      }
    })
  }
  render () {
    return (
      <View className='movies'>
        <Toptab/>
      </View>
    )
  }
}
