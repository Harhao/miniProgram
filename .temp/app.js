import { View, Tabbar, TabbarContainer, TabbarPanel } from '@tarojs/components';
import TaroRouter from '@tarojs/router';
import Taro from '@tarojs/taro-h5';
import { Component } from "@tarojs/taro-h5";
import Nerv from "nervjs";

import './app.scss';

class App extends Component {

  componentDidMount() {}

  componentDidShow() {}

  componentDidHide() {}

  componentCatchError() {}

  render() {
    const __tabs = {
      color: "#333",
      selectedColor: "#f03d37",
      backgroundColor: '#fff',
      borderStyle: '#ddd',
      list: [{
        pagePath: "pages/movies/movies",
        text: "电影",
        "iconPath": require("././assets/images/index.png"),
        "selectedIconPath": require("././assets/images/index_focus.png")
      }, {
        pagePath: "pages/theme/theme",
        text: "影院",
        "iconPath": require("././assets/images/themeOld.png"),
        "selectedIconPath": require("././assets/images/theme.png")
      }, {
        pagePath: "pages/person/person",
        text: "我的",
        "iconPath": require("././assets/images/person.png"),
        "selectedIconPath": require("././assets/images/personSelect.png")
      }]
    };
    return <TabbarContainer>
                    <TabbarPanel>
                      <TaroRouter.Router />
                    </TabbarPanel>
                    <Tabbar conf={__tabs} homePage="pages/movies/movies" router={Taro} />
                  </TabbarContainer>;
  }
}

Taro.initNativeApi(Taro);
TaroRouter.initRouter([['/pages/movies/movies', () => import('./pages/movies/movies')], ['/pages/person/person', () => import('./pages/person/person')], ['/pages/theme/theme', () => import('./pages/theme/theme')], ['/pages/position/position', () => import('./pages/position/position')], ['/pages/search/search', () => import('./pages/search/search')], ['/pages/detail/detail', () => import('./pages/detail/detail')]], Taro);
Nerv.render(<App />, document.getElementById('app'));