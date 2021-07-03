import { getbanner } from '../../network/index/index';
import { getrecommend } from '../../network/recommend/index';
import { gethotsong } from '../../network/hotsong/index';
// pages/index/index.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    banners:[],
    getrecommends:[],
    hotsong:[],
    // playlist:{
    //   name:"",
    //   tracks:[]
    // }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 获取轮播图数据
    getbanner(2).then(res=>{
      this.setData({banners:res.banners})
    })

    // 获取每日推荐
    getrecommend(30).then(res=>{
      this.setData({
        getrecommends:res.result
      })
    })

    // 获取排行榜
   for(let i =0; i< 5;i++){
    gethotsong(i).then(res=>{
      // console.log(res.playlist);
      let playlist = {}
      playlist.name = res.playlist.name
      playlist.tracks = res.playlist.tracks.splice(0,5)
      this.setData({
        hotsong:[...this.data.hotsong,playlist]
      })
    })
   }
  },
  // 跳转至每日推荐页面
  torecommend(){
    wx.navigateTo({
      url: "/pages/recommentsong/recommentsong",
    })
  }
  
})