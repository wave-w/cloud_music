import {request} from '../request';
 export function getsearchlist(){
   return request({
     url:"/search/hot/detail",
     method:"GET"
   })
 }

 export function tosearch(keywords,limit=10){
   return request({
     url:"/search",
     method:"GET",
     data:{
      keywords,limit
     }
   })
 }