// movies.js
var utils = require("../../utils/utils.js")
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    inTheater:{},
    commingSoon:{},
    top250:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var inTheatersurl = app.globalData.doubanBase+
    "/v2/movie/in_theaters"+"?start=0&count=3";
    var commingSoonUrl = app.globalData.doubanBase+
      "/v2/movie/coming_soon" + "?start=0&count=3";
    var top250Url = app.globalData.doubanBase+
      "/v2/movie/top250" + "?start=0&count=3";   
    this.getMovieListData(inTheatersurl,"inTheater","正在热映")
    this.getMovieListData(commingSoonUrl,"commingSoon","即将上映")
    this.getMovieListData(top250Url,"top250","Top250")
  },
  moreTop(event) {
    var list = event.currentTarget.dataset.list
    wx.navigateTo({
      url: 'more-movie/more-movie?list='+list,
    })
  },
  getMovieListData(url,setedKey,Mtitle){
    var that =this
    wx.request({
      url:url,
      data:{},
      method:"GET",
      header:{
        "Content-Type":"json"
      },
      success(res){
        that.process(res.data, setedKey, Mtitle)
      }
    })
  },
  process(res,key,Mtitle){
    var movie = []
    for(var i in res.subjects){
      var subject = res.subjects[i];
      var title = subject.title;
      if(title.length>=6){
        title = title.substring(0,6) + "...";
      }
      var temp = {
       stars: utils.converToStarsArray(subject.rating.stars),
        title:title,
        average:subject.rating.average,
        coverageUrl:subject.images.large,
        movieId:subject.id
      }
      movie.push(temp)

    }
    var readyData = {}
    readyData[key] = {
      Mtitle:Mtitle,
      movies:movie
    }
    this.setData(readyData)
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
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