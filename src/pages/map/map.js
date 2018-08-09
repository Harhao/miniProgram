import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import iconPath from '../../assets/images/location.png'
import './map.scss'
export default class Map extends Component {
  constructor(props){
    super(props);
    this.state = {
      mapData:{
        lng:'',
        lat:'',
      },
      markers:null,
    }
  }
  onTap(){
  }
  getParams(){
    console.log("params is",this.$router.params)
    let params = this.$router.params;
    const lng = params.lng;
    const lat = params.lat;
    const title = params.title;
    const self = this;
    Taro.setNavigationBarTitle({
      title:title
    })
    this.setState({
      mapData:{
        lng:lng,
        lat:lat
      },
       markers:[{
        latitude:lat,
        longitude:lng,
        iconPath: iconPath,
        callout:{
          content:title,
          color:'#333',
          fontSize:16,
          bgColor:'#fff',
          textAlign:'center'
        }
      }]
    });
  }
  componentDidMount () {
    this.getParams()
  }
  render () {
    const mapData = this.state.mapData;
    const markers = this.state.markers?this.state.markers:[];
    return (
     <Map onCLick={this.onTap.bind(this)} scale="14" longitude={mapData.lng} latitude={mapData.lat} markers={markers} className="map" />
    )
  }
}
