Page({
  onTap(){
    // wx.navigateTo({
    //   url: '../posts/post'
    // })
    // console.log(111)
    wx.redirectTo({
      url: '../posts/post'
    })
  }
})