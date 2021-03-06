export default[
    {
        path: '/country',
        name: 'Country',
        component: ()=>import("@/view/baseinfo/country/Index")
    },
    {
        path: '/currency',
        name: 'Currency',
        component: ()=>import("@/view/baseinfo/currency/Index")
    },
    {
        path: '/exchangerate',
        name: 'ExchangeRate',
        component: ()=>import("@/view/baseinfo/exchangerate/Index")
    },
    {
        path: '/shop',
        name: 'Shop',
        component: ()=>import("@/view/baseinfo/shop/Index")
    },
    {
        path: '/platform',
        name: 'Platform',
        component: ()=>import("@/view/baseinfo/platform/Index")
    },
    {
        path: '/platformsite',
        name: 'PlatformSite',
        component: ()=>import("@/view/baseinfo/platformsite/Index")
    },
    {
        path: '/dictionary',
        name: 'Dictionary',
        component: ()=>import("@/view/baseinfo/dictionary/Index")
    }
]