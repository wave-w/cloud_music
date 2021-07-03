import {request} from '../request';
export function getrecords(uid,type=1){
  return request({
    url:"/user/record",
    method:"GET",
    data:{
      uid,type
    }
  })
}