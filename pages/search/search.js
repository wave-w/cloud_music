// pages/search/search.js
import {
  getsearchlist,
  tosearch
} from "../../network/search/search"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    searchdefault: "", //搜索框默认显示内容
    searchlist: [], //热搜榜
    inputvalue: "", //绑定搜索框输入的内容
    searchresultlist: [],
    historylist: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let searchdefault = JSON.parse(options.searchdefault)
    this.setData({
      searchdefault
    })
    getsearchlist().then(res => {
      this.setData({
        searchlist: res.data
      })
    })
    this.deposit("")
  },
  // 点击取消跳转至视频页
  tovideopage() {
    wx.reLaunch({
      url: '/pages/video/viedo',
    })
  },

  // 搜索的方法
  search(inputvalue) {
    tosearch(inputvalue).then(res => {
      this.setData({
        searchresultlist: res.result.songs
      })
    })
  },
  //  inpu输入事件
  inputvalue() {
    let {
      inputvalue
    } = this.data
    setTimeout(() => {
      this.search(inputvalue)
    }, 500);
  },
  // 删除所有历史记录
  deleteallhistory() {
    let _this = this
    wx.showModal({
      content:"确认删除所有历史记录？",
      success(res){
        if(res.confirm){
          wx.removeStorage({
            key: 'historyliststorage',
          })
          _this.setData({
            historylist:[]
          })
        }
      }
    })
  },
  // 获取点击的搜索结果
  getsearchresult(event) {
    this.deposit(event.currentTarget.dataset.searchresult)
    this.setData({
      inputvalue:''
    })
  },
  // 将历史记录存入storage中
  deposit(historytext) {
    let _this = this
    wx.getStorage({
      key: 'historyliststorage',
      fail() {
          wx.setStorage({
            data: [],
            key: 'historyliststorage',
          })
          _this.setData({
            historylist:[]
          })
      },
      success(data) {
       let historylist = data.data
       let index = historylist.indexOf(historytext)
       if(historytext && index === -1){
        historylist.unshift(historytext)
       }else if(historytext){
         historylist.splice(index,1)
         historylist.unshift(historytext)
       }
       wx.setStorage({
        data: historylist,
        key: 'historyliststorage',
      })
      _this.setData({
        historylist
      })
      }
    })
  }
})