import Mock from 'mockjs'

let dataList = [];
const count = 45

for (let i = 0; i < count; i++) {
    dataList.push(Mock.mock({
        supplierId: Mock.Random.id(),
        supplierName:Mock.mock('@cname'),
        supplierCode:Mock.mock('@word(3, 5)'),
        creditCode:Mock.mock('@natural(10000)'),
        categoryPath:Mock.mock('@title'),
        'supplierType|1': ['贸易型企业', '生产加工型企业'],
        location:Mock.mock('@city(true)'),
        productCount: Mock.mock('@integer(1, 20)'),
        'status|1': [0,1,2,3],
        createDate:Mock.mock('@datetime'),
        createUserName:Mock.mock('@cname')
    }))
}

export default {
    'post|/api/Supplier/GetList': (option) => {
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