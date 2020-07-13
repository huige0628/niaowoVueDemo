import Mock from 'mockjs'

let dataList = [];
const count = 22

for (let i = 0; i < count; i++) {
    dataList.push(Mock.mock({
        platformId: Mock.mock('@integer(1, 20)'),
        'platformNameCn|1': ['eBay', 'AliExpress', 'Lazada', 'Shopee', 'Wish', 'Amazon', 'Shopify'],
        'platformNameEn|1': ['eBay', 'AliExpress', 'Lazada', 'Shopee', 'Wish', 'Amazon', 'Shopify'],
        status: Mock.mock({
            "boolean|1-2": true
        }),
        remark: Mock.mock('@cparagraph(2)')
    }))
}

export default {
    'post|/api/Platform/GetList': (option) => {
        console.log(JSON.parse(option.body));
        let params = JSON.parse(option.body)
        let limit = params.limit, page = params.page;
        const pageList = dataList.filter((item, index) => index < limit * page && index >= limit * (page - 1))
        console.log(pageList)
        return {
            count: dataList.length,
            data: pageList,
            success: true
        };
    }
}