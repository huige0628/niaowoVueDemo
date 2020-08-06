export default[
    {
        path: '/supplier',
        name: 'Supplier',
        component: ()=>import("@/view/scm/supplier/Index")
    },
    {
        path: '/brand',
        name: 'Brand',
        component: ()=>import("@/view/scm/brand/Index")
    },
    {
        path: '/producttort',
        name: 'ProductTort',
        component: ()=>import("@/view/scm/tort/producttort/Index")
    },
    {
        path: '/keywordtort',
        name: 'KeywordTort',
        component: ()=>import("@/view/scm/tort/keywordtort/Index")
    },
    {
        path: '/categoryMapping',
        name: 'CategoryMapping',
        component: ()=>import("@/view/scm/categorymapping/Index")
    }
]