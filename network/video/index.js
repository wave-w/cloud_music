import {request} from "../request";
export function getnavmenus(){
  return request({
    url:"/video/group/list",
    method:"GET"
  })
}

export function getvideolist(id){
  return request({
    url:"/video/group",
    method:"GET",
    data:{
      id
    }
  })
}

export function getsearchdefault(){
  return request({
    url:"/search/default",
    method:"GET"
  })
}