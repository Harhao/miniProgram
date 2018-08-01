### 基于京东凹凸实验室Taro框架的微信小程序--猫眼电影
> 猫眼电影是基于Taro框架开发的猫眼电影微信小程序

-  开发环境
    - 系统：Window 10
    - Taro版本：v0.0.69
    - Node版本：v8.11.1
- 现阶段运行效果

    - ![猫眼电影运行效果](https://github.com/Harhao/miniProgram/blob/master/demo1.gif?raw=true)
- 安装使用
    - 1.安装依赖:尽量使用cnpm安装项目依赖，npm安装比较慢，而且容易出现失败现象
    ```
    cnpm install
    ```
    - 2.在微信开发者工具导入dist的目录
    - 3.在运行过程之中出现
    ```
    module "npm/@tarojs/taro-weapp/index.js" is not defined 把dist/npm/@tarojs拷贝一次重新黏贴一下就可以避免这种情况
    ```
> 猫眼电影开发待续完善，持续更新中
