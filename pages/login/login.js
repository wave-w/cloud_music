// pages/login/login.js
import {login} from "../../network/login/index"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    username: "15797985410",
    password: "wubo2000"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  tologin() {
    let { username,password } = this.data
    let phonereg = /^1[3|4|5|7|8][0-9]{9}$/ //定义验证手机号的正则表达式
    //  1.内容为空/内容不正确
    if (!username.trim() || !password.trim() ) {
      let title = ""
      if(!password.trim()){title="密码不能为空"}
      if(!username.trim()){title="手机号不能为空"}
      wx.showToast({
        title: title,
        icon: "error"
      })
      return;
    } else if (!phonereg.test(username)) { //  2.手机号码格式不正确
      wx.showToast({
        title: "号码格式错误",
        icon: "error"
      })
      return;
    }else{
      login(username,password).then(res=>{
        if(res.code === 200){
          wx.showToast({
            title: "登陆成功",
            icon: "success"
          })
          let profile = JSON.stringify(res.profile)
          wx.setStorage({
            key:"profile",
            data:profile
          })
          wx.reLaunch({
            url:"/pages/personal/personal"
          })
        }else{
          wx.showToast({
            title: res.message || "登陆失败",
            icon: "error"
          })
          return;
        }
      })
    }
  },
  // 解决model:value不定义bindinput方法出现警告
  isinput() {},
})