// pages/songdetail/songdetail.js
import {getsongdetail,getplaysong} from "../../network/songdetail/index";
// const appinterance = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isplay:false,  //标识音乐是否播放
    // songdetailid:"", 路由传过来的音乐id
    detail:{},  //音乐详情
    music:{}, //音乐播放详情
    musictime:"", //音频长度,
    musicids:[], //音乐id数组,
    musicalltime:"", //音乐总时间
    musicnowtime:"00:00",
    musicnowwidth: 0,
    width:0,//每秒走的距离
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // if(appinterance.globaldata.ismusicplay && appinterance.globaldata.musicid === options.songid){
    //   this.setData({
    //     isplay:true
    //   })
    // }
    let musicids = JSON.parse(options.musicids)
    // 获取路由传过来的歌曲详情参数
    this.setData({
      songdetailid:options.songid,
      musicids
    })
    this.getdetail()
    this.getmusicplay()
    this.playnusic()
  },
  // 音乐控制键方法
  playnusic(){
    this.setData({
      isplay:!this.data.isplay
    })
   setTimeout(() => {
    this.musiccontrol()
   }, 1000);
  },
  // 音乐控制
  musiccontrol(){
    let backgroundmusicplay = wx.getBackgroundAudioManager()
    if(this.data.isplay){
     backgroundmusicplay.src = this.data.music.url
     backgroundmusicplay.title =this.data.detail.name
    //  监听音乐暂停
     backgroundmusicplay.onPause(()=>{
       this.setData({
         isplay:false
       })
      //  appinterance.globaldata.ismusicplay = false
     })
    //  监听音乐播放
     backgroundmusicplay.onPlay(()=>{
      this.setData({
        isplay:true
      })
    })
    // 监听音乐停止
    backgroundmusicplay.onStop(()=>{
      this.setData({
        isplay:false
      })
      // appinterance.globaldata.ismusicplay = true
    })
    // 播放时间自然结束
    backgroundmusicplay.onEnded(()=>{
      this.setData({
        isplay:false
      })
      this.handsnext()
    })
// 监听音乐已播放播放时间更新
    backgroundmusicplay.onTimeUpdate(()=>{
      this.changetimestate(backgroundmusicplay.currentTime * 1000,"now")
    // console.log(backgroundmusicplay.currentTime)
    })
    }else{
      backgroundmusicplay.pause()
    }
  },
  // 获取歌曲详情
  getdetail(){
    getsongdetail(this.data.songdetailid).then(res=>{
      this.setData({
        detail:res.songs[0]
      })
      this.changetimestate(res.songs[0].dt,"all")
      wx.setNavigationBarTitle({
        title: this.data.detail.name,
      })
    })
  },
   //获取音乐播放地址
   getmusicplay(){
    getplaysong(this.data.songdetailid).then(res=>{
      this.setData({
        music:res.data[0]
      })
    })
  },
  // 点击上一首
  handprevious(){
    let {musicids,songdetailid} = this.data
    let index = musicids.indexOf(songdetailid-0)
    if(index<=0){
      index = musicids.length - 1
      this.setData({
        songdetailid:musicids[index],
        isplay:false
      })
    }else{
      index = index - 1
      this.setData({
        songdetailid:musicids[index],
        isplay:false
      })
    }
    this.getdetail()
    this.getmusicplay()
    setTimeout(()=>{
      this.playnusic()
    },1000)
  },
  // 点击下一首
  handsnext(){
    let {musicids,songdetailid} = this.data
    let index = musicids.indexOf(songdetailid-0)
    if(index >= musicids.length-1){
      index = 0
      this.setData({
        songdetailid:musicids[index],
        isplay:false
      })
    }else{
      index = index + 1
      this.setData({
        songdetailid:musicids[index],
        isplay:false
      })
    }
    this.getdetail()
    this.getmusicplay()
    setTimeout(()=>{
      this.playnusic()
    },1000)
  },
   // 将获取到的毫秒转化成 00:00 类型
   changetimestate(times,type){
    let minutes = Math.floor(times/60000).toString().padStart(2,0)
    let seconds = (Math.round(times/1000)%60).toString().padStart(2,0);
    let ttime = minutes + ":" + seconds
   if(type === "all"){
     this.setData({
       musicalltime:ttime,
       width: 500/(times/1000)
     })
   }else if(type === "now"){
    this.setData({
      musicnowtime:ttime,
      musicnowwidth: this.data.width *(times/1000)
    })
   }
  },

  // 点击进度条
  progresstap(event){
    console.log(event);
  }
})