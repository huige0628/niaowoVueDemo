import Mock from 'mockjs'

//参考：http://www.webmasterhome.cn/huilv/huobidaima.asp

let dataList = [];
const count = 45

for (let i = 0; i < count; i++) {
    dataList.push(Mock.mock({
        currencyId: Mock.Random.id(),
        currencyName: Mock.Random.cname(),
        'currencyCode|1': ['USD', 'EUR', 'CNY', 'HKD', 'SDG', 'VND', 'IDR', 'MYR', 'GBP', 'PHP']
    }))
}

export default {
    'post|/api/Currency/GetList': (option) => {
        let params = JSON.parse(option.body)
        let limit=params.limit,page=params.page;
        const pageList = dataList.filter((item, index) => index < limit * page && index >= limit * (page - 1))
        return {
            count: dataList.length,
            data: pageList,
            success:true
        };
    }
}