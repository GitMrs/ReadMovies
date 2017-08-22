// post-detail.js
var postData = require("../../../data/posts-data.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    postData: [

    ],
    id:0,
    collected:{},
    isPlay:false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var id = options.id
    this.data.id = id
      var detaiData=postData.postList[id]
      this.setData({
        postData: detaiData
      })
      var postsCollected = wx.getStorageSync("posts_collected")
      if (postsCollected){
        var postCollected = postsCollected[id]
        this.setData({
          collected:postCollected
        })
      }else{
        var postsCollected = {};
        postsCollected[id] = false;
        wx.setStorageSync("posts_collected", postsCollected)
      }
      wx.onBackgroundAudioPlay(()=>{
        this.setData({
          isPlay : true
        })
      })
      wx.onBackgroundAudioPause(()=>{
        this.setData({
          isPlay : false 
        })
      })
  },
  onCollected(event){
    var postsCollected = wx.getStorageSync("posts_collected");
    var postCollected = postsCollected[this.data.id]
    postCollected = !postCollected;
    postsCollected[this.data.id] = postCollected
    wx.setStorageSync("posts_collected", postsCollected)
    this.setData({
      collected: postsCollected[this.data.id]
    })
    // wx.showToast({
    //   title: postCollected? "收藏成功":"取消成功",
    // })
    // wx.showModal({
    //   title: '收藏',
    //   content: '是否确定收藏',
    //   showCancel:"true",
    //   cancelText:"不收藏",
    //   confirmText:"收藏"
    // })

  },
  onShar(event){
    wx.showActionSheet({
      itemList: [
        "分享到朋友圈",
        "分享到微信好友",
        "分享到QQ好友",
        "分享到微博"
      ],

    })
  },
  onMusicTap(event){
    var isPlay = this.data.isPlay
    if(isPlay){
      wx.pauseBackgroundAudio()
      this.setData({
        isPlay:false
      })
    }else{
      wx.playBackgroundAudio({
        dataUrl: postData.postList[this.data.id].music.url,
        title: postData.postList[this.data.id].music.title,
        coverImgUrl: postData.postList[this.data.id].music.coverImg
      })
      this.setData({
        isPlay:true
      })
    }
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