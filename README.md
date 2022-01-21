### 基于京东凹凸实验室(aotu.io)Taro框架的微信小程序--猫眼电影
### （已停止维护）
[![Build Status](https://travis-ci.com/Harhao/miniProgram.svg?branch=master)](https://travis-ci.com/Harhao/miniProgram)
[![](https://img.shields.io/badge/version-v1.0.0-brightgreen)](https://img.shields.io/badge/version-v1.0.0-brightgreen)
[![](https://img.shields.io/badge/License-MIT-brightgreen)](https://img.shields.io/badge/License-MIT-brightgreen)
[![](https://img.shields.io/badge/Taro-v0.0.69-brightgreen)](https://img.shields.io/badge/Taro-v0.0.69-brightgreen)
### 一、开发环境
  ```
    操作系统：Window 10
    Taro版本：v0.0.69
    Node版本：v8.11.1
  ```
### 二、现阶段运行效果
- ![猫眼电影运行效果](https://github.com/Harhao/miniProgram/blob/master/screenshot/demo1.gif)![猫眼电影运行效果](https://github.com/Harhao/miniProgram/blob/master/screenshot/demo2.gif)
### 三、安装依赖并运行小程序
  - 安装依赖:尽量使用cnpm安装项目依赖，npm安装比较慢，而且容易出现安装失败情况
    ```bash
     cnpm install
    ```
  - 项目的运行需要地理位置定位获取城市id，可以在项目目录下api.zip代码中运行，返回全国所有城市的数据信息，和获取到当前定位的城市信息。如果单纯想拿到静态信息，可以在[cities.json](https://github.com/Harhao/crawEyeCatCities/blob/master/getCity/cities.json)获取到数据
    ```bash
      {
        "letterMap": {
           "A": [
            { "id": 150, "nm": "阿拉善盟", "py": "alashanmeng" },
            { "id": 151, "nm": "鞍山", "py": "anshan" },
            { "id": 197, "nm": "安庆", "py": "anqing" },
            { "id": 238, "nm": "安阳", "py": "anyang" },
            { "id": 319, "nm": "阿坝", "py": "aba" },
            { "id": 324, "nm": "安顺", "py": "anshun" },
            { "id": 359, "nm": "安康", "py": "ankang" },
            { "id": 400, "nm": "阿勒泰", "py": "aletai" },
            { "id": 394, "nm": "阿克苏", "py": "akesu" },
            { "id": 490, "nm": "安吉", "py": "anji" },
            { "id": 588, "nm": "安丘", "py": "anqiu" },
            { "id": 699, "nm": "安岳", "py": "anyue" },
            { "id": 807, "nm": "安平", "py": "anping" },
            { "id": 873, "nm": "安宁", "py": "anning" },
            { "id": 844, "nm": "安溪", "py": "anxi" },
            { "id": 1008, "nm": "安化", "py": "anhua" },
            { "id": 1126, "nm": "阿勒泰市", "py": "aletaishi" },
            { "id": 1068, "nm": "安福", "py": "anfu" }
          ],
          "B":[{},{},...,{}],
          ...
          "Z":[{},{},...,{}]
        },
        "geoCity": { "id": 20, "nm": "广州", "py": "guangzhou" }
     }
    ```
  - 运行以下打包微信小程序命令，生成dist小程序源码目录,在微信开发者工具导入dist的目录
    ```bash
      npm run dev:weapp
    ```
  - 在运行dist目录源码可能出现错误信息，之前在Taro开源库中提issue，暂时没有详细错误的原因，可以持续关注Taro官方动态，下面是跳过错误信息进行开发解决方法
    ```bash
    module "npm/@tarojs/taro-weapp/index.js" is not defined  // 把dist/npm/@tarojs拷贝一次重新黏贴一下就可以避免这种情况
    ```

> taro版本现在已经是1.3，即将运用正式版本改写猫眼电影微信小程序
## License
[MIT](http://opensource.org/licenses/MIT)
