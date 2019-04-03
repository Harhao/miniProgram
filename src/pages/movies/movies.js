import Taro, { Component } from "@tarojs/taro";
import { View } from "@tarojs/components";
import Toptab from "../../components/Toptab/Toptab.js";
import "./movies.scss";
export default class Movies extends Component {
  config = {
    navigationBarTitleText: "猫眼电影"
  };
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    this.getCities();
  }
  getCities() {
    Taro.request({
      url:
        "https://www.easy-mock.com/mock/5ba0a7f92e49497b37162e32/example_copy/cities_copy_1541385673090",
      method: "GET",
      header: {
        Accept: "application/json, */*",
        "Content-Type": "application/json"
      }
    }).then(res => {
      if (res.statusCode == 200) {
        let data = res.data.data.data.data;
        Taro.setStorageSync("cities", data);
      }
    });
  }
  render() {
    return (
      <View className="movies">
        <Toptab />
      </View>
    );
  }
}
