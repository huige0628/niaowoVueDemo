import Mock from 'mockjs'

let dataList = [];
const count = 45

for (let i = 0; i < count; i++) {
    dataList.push(Mock.mock({
        dicId: Mock.Random.id(),
        categoryId: Mock.mock('@integer(1, 2)'),
        'categoryName|1': ['产品状态', '物流状态'],
        'categoryCode|1': ['PRODUCT_STATUS', 'LOGISTICS_STATUS'],
        'valueName|1': ['美金', '欧元', '人民币', '港币', '新加坡币', '越南盾', '印尼盾', '马币', '英镑', '菲律宾币'],
        'valueId|1': ['USD', 'EUR', 'CNY', 'HKD', 'SDG', 'VND', 'IDR', 'MYR', 'GBP', 'PHP'],
        sortNo: Mock.mock('@integer(1, 10)'),
        status: Mock.Random.boolean(),
        createDate:Mock.mock('@datetime'),
        createUserName:Mock.mock('@cname')
    }))
}

export default {
    'post|/api/Dictionary/GetList': (option) => {
        console.log(JSON.parse(option.body));
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