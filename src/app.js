import Taro, { Component } from '@tarojs/taro'
import Movies from './pages/movies/movies'
import './app.scss'
class App extends Component {
  config = {
    pages: [
      'pages/movies/movies',
      'pages/person/person',
      'pages/cinema/cinema',
      'pages/position/position',
      'pages/search/search',
      'pages/detail/detail',
      'pages/content/content'
    ],
    window: {
      backgroundTextStyle: '#fff',
      navigationBarBackgroundColor: '#e54847',
      navigationBarTitleText: '猫眼电影',
      navigationBarTextStyle: '#fff',
      enablePullDownRefresh:true,
    },
    tabBar:{
      color:"#333",
      selectedColor:"#f03d37",
      backgroundColor: '#fff',
      borderStyle: '#ddd',
      list:[{
        pagePath:"pages/movies/movies",
        text:"电影",
        iconPath: './assets/images/index.png',
        selectedIconPath: './assets/images/index_focus.png'
      },{
        pagePath:"pages/cinema/cinema",
        text:"影院",
        iconPath: './assets/images/themeOld.png',
        selectedIconPath: './assets/images/theme.png'
      },{
        pagePath:"pages/person/person",
        text:"我的",
        iconPath: './assets/images/person.png',
        selectedIconPath: './assets/images/personSelect.png'
      }]
    }
  }

  componentDidMount () {
  }

  componentDidShow () {}

  componentDidHide () {}

  componentCatchError () {}

  render () {
    return (
      <Movies />
    )
  }
}

Taro.render(<App />, document.getElementById('app'))
