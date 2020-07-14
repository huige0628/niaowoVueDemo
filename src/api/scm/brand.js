import httpRequest from '@/lib/api.request'

const apiHost = ''; //process.env.ApiHost;

//获取列表
export const getList = {
    url: `${apiHost}/api/Brand/GetList`, //接口地址
    request(data) {
        return httpRequest({
            url: this.url,
            method: 'post',
            data: data
        })
    }
}
