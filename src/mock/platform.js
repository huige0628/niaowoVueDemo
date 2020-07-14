import Mock from 'mockjs'

let dataList = [];
const count = 22

for (let i = 0; i < count; i++) {
    dataList.push(Mock.mock({
        platformId: Mock.mock('@integer(1, 20)'),
        'platformNameCn|1': ['eBay', 'AliExpress', 'Lazada', 'Shopee', 'Wish', 'Amazon', 'Shopify'],
        'platformNameEn|1': ['eBay', 'AliExpress', 'Lazada', 'Shopee', 'Wish', 'Amazon', 'Shopify'],
        status: Mock.Random.boolean(),
        remark: Mock.mock('@cparagraph(2)')
    }))
}

let siteDateList=[];
for (let i = 0; i < count; i++) {
    siteDateList.push(Mock.mock({
        platformId: Mock.mock('@integer(1, 6)'),
        siteId: Mock.mock('@integer(1, 100)'),
        'siteNameCn|1': ['eBay', 'AliExpress', 'Lazada', 'Shopee', 'Wish', 'Amazon', 'Shopify'],
        'siteNameEn|1': ['eBay', 'AliExpress', 'Lazada', 'Shopee', 'Wish', 'Amazon', 'Shopify'],
        'siteCode|1': ['MY', 'TH', 'SG', 'PH', 'ID', 'VN', 'US','AU','UK'],
        'currency|1': ['MYR', 'THB', 'SGD', 'PHP', 'IDR', 'VND', 'USD','AUD','GBP'],
        status: Mock.mock({
            "boolean|1-2": true
        }),
        remark: Mock.mock('@cparagraph(2)')
    }))
}

export default {
    'post|/api/Platform/GetList': (option) => {
        let params = JSON.parse(option.body)
        let limit = params.limit, page = params.page;
        const pageList = dataList.filter((item, index) => index < limit * page && index >= limit * (page - 1))
        return {
            count: dataList.length,
            data: pageList,
            success: true
        };
    },
    'post|/api/PlatformSite/GetList': (option) => {
        let params = JSON.parse(option.body)
        let limit = params.limit, page = params.page;
        const pageList = siteDateList.filter((item, index) => index < limit * page && index >= limit * (page - 1))
        return {
            count: dataList.length,
            data: pageList,
            success: true
        };
    }
}