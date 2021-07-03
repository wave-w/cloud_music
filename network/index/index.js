import { request } from '../request';
export function getbanner(type){
    return request({
        url:'/banner',
        method:"GET",
        data:{type}
    })
}