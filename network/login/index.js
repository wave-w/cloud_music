import {request} from '../request';
export function login(phone,password){
 return request({
  url:"/login/cellphone",
  method:"GET",
  data:{
    phone,password
  }
 })
}