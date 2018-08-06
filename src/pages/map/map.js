import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import './map.scss'
export default class Map extends Component {
  config = {
    navigationBarTitleText: '猫眼电影'
  }
  constructor(props){
    super(props);
    this.state = {
      mapData:{
        lng:'',
        lat
      }
    }
  }
  onTap(){
  }
  getParams(){
    let params = this.$route.params;
    const lng = params.lng;
    const lat = params.lat;
    this.setState({
      mapData:{
        lng:lng,
        lat:lat
      }
    });
  }
  componentDidMount () {
    this.getParams()
  }
  render () {
    const mapData = this.state.mapData;
    return (
     <Map onCLick={this.onTap.bind(this)} longitude={mapData.lng} latitude={mapData.lat} />
    )
  }
}
