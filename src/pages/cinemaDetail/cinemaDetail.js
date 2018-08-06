import Taro, { Component } from '@tarojs/taro'
import { View,Image} from '@tarojs/components'
import './CinemaDetail.scss'

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
      cinemaData:{}
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
      Taro.request({
        url:`http://m.maoyan.com/ajax/cinemaDetail?cinemaId=${cinemaId}&movieId=${movieId}`,
        method:'GET'
      }).then(res=>{
        if(res.statusCode == 200){
          self.setState({
            cinemaData:res.data,
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
  componentDidMount () {
    this.getCinemaDetail();

  }
  render () {
    return(
      <View className="cinemaDetail">
        <View className="header"></View>
      </View>
    )
  }
}
