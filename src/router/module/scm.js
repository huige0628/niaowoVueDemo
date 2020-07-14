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
    }
]