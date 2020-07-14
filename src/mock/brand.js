import Mock from 'mockjs'

let dataList = [];
const count = 45

for (let i = 0; i < count; i++) {
    dataList.push(Mock.mock({
        brandId: Mock.Random.id(),
        brandNameCn:Mock.mock('@cname'),
        brandNameEn:Mock.mock('@word(3, 5)'),
        brandType:Mock.mock('@word(3, 5)'),
        'platformName|1': ['Wish', 'Ebay','Amazon', 'Lazada'],
        platformUrl:Mock.mock('@url()'),
        sortNo: Mock.mock('@integer(1, 10)'),
        status: Mock.Random.boolean(),
        createDate:Mock.mock('@datetime'),
        createUserName:Mock.mock('@cname')
    }))
}

export default {
    'post|/api/Brand/GetList': (option) => {
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