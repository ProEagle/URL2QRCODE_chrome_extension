# URL2QRCODE_chrome_extension
> 开发H5页面时，经常想要用手机预览一下效果，Firefox有一个很好用的二维码插件。由于平常还是使用Chrome比较多，就动手撸了个简单的url转二维码插件。

Chrome插件，活动标签页url转二维码。

# 安装
1. 下载源码
```shell
$ git clone https://github.com/ProEagle/URL2QRCODE_chrome_extension.git
```
2. 打开Chrome浏览器，在地址栏输入`chrome://extensions/`，进入扩展程序页面。
3. 打开下载代码的目录可直接将`src`目录拖入浏览器中，即安装插件。或进入`dist`目录下，将`URL2QRCODE.crx`拖入浏览器，即安装插件。

# 使用
打开浏览器，点击插件图标，即可弹出指向当前标签网页的二维码。
# 引用
1. [QRCodeJs](https://github.com/davidshimjs/qrcodejs)
2. [Chrome插件开发指南](https://github.com/sxei/chrome-plugin-demo)