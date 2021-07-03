let baseURL = 'http://localhost:3000'
// let baseURL = "http://wave.cn.utools.club"
export function request(options){
  return new Promise((resolve,reject)=>{
    wx.request({
      url: baseURL+options.url,
      data:options.data || {},
      method:options.method || "GET",
      header:{
        cookie:wx.getStorageSync('cookies')?wx.getStorageSync('cookies').find(item=> item.indexOf("MUSIC_U") !==-1):""
      },
      timeout:60000,
      success:res=>{
      if(options.url === "/login/cellphone"){
        wx.setStorage({
          data: res.cookies,
          key: 'cookies',
        })
      }
        resolve(res.data)
      },
      fail:err=>{
        reject(err)
      }
    })
  })
}