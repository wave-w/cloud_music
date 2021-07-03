import { request } from '../../network/request';
export function getrecommend(limit){
    return request({
        url:'/personalized',
        method:"GET",
        data:{
            limit
        }
    })
}

export function getrecommendsongs(){
    return request({
        url:"/recommend/songs",
        method:"GET"
    })
}