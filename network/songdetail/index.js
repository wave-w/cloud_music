import {request} from '../request';
export function getsongdetail(ids){
  return request({
    url:"/song/detail",
    method:"GET",
    data:{
      ids
    }
  })
}

export function getplaysong(id){
  return request({
    url:"/song/url",
    method:"GET",
    data:{
      id
    }
  })
}