// pages/personal/personal.js
let startY = 0;  //手指启示的坐标
let moveY = 0;  //手指移动的坐标
let moveDistance = 0; //手指移动的距离
import {getrecords} from "../../network/personal/index"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    transformdistance : 0,
    covertranstion : "",
    profile:{},
    records:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.getStorage({
      key: 'profile',
      success: (res) =>{
       this.setData({
        profile:JSON.parse(res.data)
       })
       getrecords(this.data.profile.userId).then(res =>{
        this.setData({
          records:res.weekData.splice(0,20)
        })
       })
      }
    })
  },
  // 手指触摸开始
  handlestart(event){
    startY = event.touches[0].clientY
    this.setData({
     covertranstion:""
    })
  },
  // 手指触摸移动
  handlemove(event){
   moveY = event.touches[0].clientY
   moveDistance = moveY - startY
  if(moveDistance>0&&moveDistance<=80){
    this.setData({
      transformdistance:moveDistance
    })
  }
  },
  // 手指触摸结束
  handleend(){
    this.setData({
      transformdistance:0,
      covertranstion:"transform 1s linear"
    })
  },

  // 跳转至登陆界面
  gologin(){
    wx.navigateTo({
      url:"/pages/login/login"
    })
  }
})