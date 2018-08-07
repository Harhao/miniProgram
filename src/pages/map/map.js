import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import './map.scss'
export default class Map extends Component {
  constructor(props){
    super(props);
    this.state = {
      mapData:{
        lng:'',
        lat:'',
      },
      markers:[],
      covers: [],
      coverShow:false
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
      coverShow:true,
      covers: [{
        latitude:lat,
        longitude:lng,
        title:title,
        iconPath: '../../assets/images/location.png'
      }]
    });
  }
  componentDidMount () {
    this.getParams()
  }
  render () {
    const mapData = this.state.mapData;
    const covers = this.state.covers;
    return (
     <Map onCLick={this.onTap.bind(this)} longitude={mapData.lng} latitude={mapData.lat} covers={covers} className="map" hidden={this.state.coverShow?false:true}/>
    )
  }
}
