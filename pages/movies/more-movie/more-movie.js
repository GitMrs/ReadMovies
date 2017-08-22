// more-movie.js
var app = getApp()
var utils= require("../../../utils/utils.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title:"",
    totalCount:0,
    requestUrl:"",
    flag:true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var list = options.list
    // console.log(list)
    this.setData({
      title:list
    })
    var dataUrl = "";
    switch(list){
      case "正在热映":
        dataUrl = app.globalData.doubanBase +
          "/v2/movie/in_theaters"
      break;
      case "即将上映":
        dataUrl = app.globalData.doubanBase +
          "/v2/movie/coming_soon"
      break;
      case "Top250":
        dataUrl = app.globalData.doubanBase +
          "/v2/movie/top250"
      break;
    }
    this.data.requestUrl = dataUrl
    utils.http(dataUrl,this.callBack)
  },
  onScrollLower(event){
    var nextUrl = this.data.requestUrl + 
    "?start=" + this.data.totalCount + "&count=20";
   utils.http(nextUrl, this.callBack)
   //加载更多开始
   wx.showNavigationBarLoading()
    // console.log(this.data.requestUrl)
  },
  callBack(res){
    // console.log(res)
    var movie = []
    for (var i in res.data.subjects) {
      var subject = res.data.subjects[i];
      var title = subject.title;
      if (title.length >= 6) {
        title = title.substring(0, 6) + "...";
      }
      var temp = {
        stars: utils.converToStarsArray(subject.rating.stars),
        title: title,
        average: subject.rating.average,
        coverageUrl: subject.images.large,
        movieId: subject.id
      }

      movie.push(temp)

    }
    var totleMovie = {}
    this.data.totalCount +=20
    //判断数据是否需要合并，通过一个boolear值
    if(!this.data.flag){
      totleMovie = this.data.movie.concat(movie)
    }else{
      totleMovie = movie
      this.setData({
        flag:false
      })
    }
    this.setData({
      movie: totleMovie
    })
    //隐藏加载更多
    wx.hideNavigationBarLoading()
    // console.log(this.data.movie)
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    wx.setNavigationBarTitle({
      title: this.data.title,
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})