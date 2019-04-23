import request from '@/utils/request'

// CRUD
// 创建方法
export function create(data) {
    return request({
        url:'/wms/warehouse',
        method:'post',
        data:data
    })
}

// 查询列表方法
export function fetchList(params) {
    return request({
        url:'/wms/warehouse',
        method:'get',
        params:params
    })
}

//　查询单条记录方法
export function get(id) {
    return request({
        url:'/wms/warehouse/'+id,
        method:'get',
    })
}

//　更新单条记录方法
export function update(id,data) {
    return request({
        url:'/wms/warehouse/'+id,
        method:'put',
        data:data
    })
}

// 删除单条记录方法
export function deleteById(id) {
    return request({
        url:'/wms/warehouse/'+id,
        method:'delete',
    })
}
