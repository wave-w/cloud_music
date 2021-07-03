import {request} from '../request'
export function gethotsong(idx){
return request({
  url:'/top/list',
  method:"GET",
  data:{
    idx
  }
})
}