// pages/video/viedo.js
import {getnavmenus,getvideolist,getsearchdefault} from "../../network/video/index";
Page({
  /**
   * 页面的初始数据
   */
  data: {
    navmenus:[], //导航栏标签名
    itemid:"", //导航栏标签id
    videolist:[], //视频列表
    videoid:"", //视频id
    videotime:[], //定位之前视频播放位置，子元素包含id，time(视频播放的秒数)
    refreshtriggered:false ,//scroll-view下拉状态
    searchdata:{} //搜索默认显示
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    getnavmenus().then(res=>{
      let newdata = res.data.splice(0,15)
      this.setData({
        navmenus:newdata,
        itemid : newdata[0].id
      })
      this.togetvideolist()
    })
    getsearchdefault().then(res=>{
     this.setData({
       searchdata:res.data
     })
    })
  },
  // 切换导航栏
  viewclick(event){
   this.setData({
     itemid : +(event.currentTarget.id.slice(2)),
     videolist:[]
   })
   wx.showLoading({
     title:"正在加载中...",
   })
   this.togetvideolist()
  },
  // 获取视频列表
  togetvideolist(){
    getvideolist(this.data.itemid).then(res=>{
      this.setData({
        videolist:res.datas
      })
      wx.hideLoading()
    this.setData({
      refreshtriggered:false
    })
    })
  },

  // 视频播放/暂停时触发
  playvideo(event){
    let vid = event.currentTarget.id
    this.setData({
      videoid: vid
    })
    let vitem = this.data.videotime.find(item => item.vid === vid)
    // 关闭上一个视频 , 因为性能优化一次只能显示一个视频，所以可以不用使用
    // this.vid !== vid && this.videocontext &&  this.videocontext.stop()
    // this.vid = vid
    // 创建实例
    this.videocontext = wx.createVideoContext(vid)
    this.videocontext.play()
    vitem && this.videocontext.seek(vitem.time)
  },
  // 视频播放中触发
  timeuoload(event){
    let videotobj = {
      vid:event.currentTarget.id,
      time:event.detail.currentTime
    }
    const {videotime}  = this.data
    let vitem = videotime.find(item => item.vid === videotobj.vid)
   if( !vitem){ 
    videotime.push(videotobj)
    } else{
      vitem.time = event.detail.currentTime
    }
    this.setData({
      videotime
    })
  },
  // 视频播放结束触发
  videoend(event){
    let vid = event.currentTarget.id
    let {videotime} = this.data
    videotime = videotime.filter(item=>item.vid !== vid)
    this.setData({
      videotime
    })
  },
  //下拉刷新
  downrefresh(){
    this.setData({
      videolist:[]
    })
    this.togetvideolist()
  },
  //滚动到底部/右边时触发,网易云音乐未开放分页
  scrolltolower(){
   this.setData({
     videolist:[...this.data.videolist,...this.data.videolist]
   }) 
  },
  //页面转发
  onShareAppMessage(from){
    return {
      title:"分享页面",
      page: "pages/video/viedo",
      imageUrl:"/static/image/1.jpg"
    }
  },

  //跳转至搜索页面
  tosearchpage() {
    const {searchdata}  = this.data
    let searchdefault = JSON.stringify(searchdata)
    wx.navigateTo({
      url: `/pages/search/search?searchdefault=${searchdefault}`,
    })
   }
})  