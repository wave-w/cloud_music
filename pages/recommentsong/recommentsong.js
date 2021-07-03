// pages/recommentsong.js
import {getrecommendsongs} from "../../network/recommend/index"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    date:"",
    songslist:[],
    musicids:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //更新日期
    this.setData({
      date:this.getdate()
    })
    let cookies = wx.getStorageSync('cookies')
    if(cookies){
          // 获取推荐歌曲列表
        getrecommendsongs().then(res=>{
          let songsids = res.recommend.map(item=>{
            return item.id
          })
          this.setData({
            songslist:res.recommend,
            musicids:songsids
          })
        })
    }else{
      wx.showToast({
        title: '尚未登录请先登录',
        icon:"error",
        success(){
          wx.reLaunch({
            url: "/pages/login/login",
          })
        }
      })
    }
  },
  // 获取时间
  getdate(){
    let date = new Date()
    const month =(date.getMonth()+1).toString().padStart(2,0)
    const day = date.getDate().toString().padStart(2,0)
    return `${month}-${day}`
  },
  icontap(){
    console.log(1111);
  },
  todetail(event){
      let songid = event.currentTarget.dataset.song.id
      let musicids = JSON.stringify(this.data.musicids)
    wx.navigateTo({
      url: `/pages/songdetail/songdetail?songid=${songid}&musicids=${musicids}`
    })
  }
})