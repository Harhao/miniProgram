import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import Toptab from "../../components/Toptab/Toptab.js"
import './movies.scss'

export default class Movies extends Component {
  config = {
    navigationBarTitleText: '猫眼电影'
  }

  componentWillMount () { }

  componentDidMount () {
    this.getCities();
  }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }
  getCities(){
    Taro.request({
      url:'http://localhost:3000/cities',
      method:"GET",
    }).then(res=>{
      if(res.statusCode == 200){
        console.log("res",res);
        let str = JSON.stringify(res.data);
        localStorage.setItem('cities',str);
      }
    }).catch(err=>{
      throw err;
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
