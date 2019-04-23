import Vue from 'vue'
import Router from 'vue-router'
/* Layout */
import Layout from '../views/layout/Layout'

Vue.use(Router)

/**
 * hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
 *                                if not set alwaysShow, only more than one route under the children
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noredirect           if `redirect:noredirect` will no redirct in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
  }
 **/
export const constantRouterMap = [
  {path: '/login', component: () => import('@/views/login/index'), hidden: true},
  {path: '/404', component: () => import('@/views/404'), hidden: true},
  {
    path: '',
    component: Layout,
    redirect: '/home',
    children: [{
      path: 'home',
      name: 'home',
      component: () => import('@/views/home/index'),
      meta: {title: '首页', icon: 'home'}
    }]
  },
  {
    path: '/pms',
    component: Layout,
    redirect: '/pms/product',
    name: 'pms',
    meta: {title: '商品', icon: 'product'},
    children: [{
      path: 'product',
      name: 'product',
      component: () => import('@/views/pms/product/index'),
      meta: {title: '商品列表', icon: 'product-list'}
    },
      {
        path: 'addProduct',
        name: 'addProduct',
        component: () => import('@/views/pms/product/add'),
        meta: {title: '添加商品', icon: 'product-add'}
      },
      {
        path: 'updateProduct',
        name: 'updateProduct',
        component: () => import('@/views/pms/product/update'),
        meta: {title: '修改商品', icon: 'product-add'},
        hidden: true
      },
      {
        path: 'spec',
        name: 'spec',
        component: () => import('@/views/pms/specification'),
        meta: {title: '商品规格', icon: 'product-add'},
        hidden: true
      },
      {
        path: 'addSpec',
        name: 'addSpec',
        component: () => import('@/views/pms/specification/add'),
        meta: {title: '添加规格'},
        hidden: true
      },
      {
        path: 'updateSpec',
        name: 'updateSpec',
        component: () => import('@/views/pms/specification/update'),
        meta: {title: '编辑规格'},
        hidden: true
      },
      {
        path: 'category',
        name: 'category',
        component: () => import('@/views/pms/category/index'),
        meta: {title: '商品分类', icon: 'product-cate'}
      },
      {
        path: 'addCategory',
        name: 'addProductCate',
        component: () => import('@/views/pms/category/add'),
        meta: {title: '添加商品分类'},
        hidden: true
      },
      {
        path: 'updateCategory',
        name: 'updateCategory',
        component: () => import('@/views/pms/category/update'),
        meta: {title: '修改商品分类'},
        hidden: true
      },
      {
        path: 'supplier',
        name: 'supplier',
        component: () => import('@/views/pms/supplier/index'),
        meta: {title: '供应商管理', icon: 'product-list'}
      },
      {
        path: 'addSupplier',
        name: 'addSupplier',
        component: () => import('@/views/pms/supplier/add'),
        meta: {title: '添加供应商'},
        hidden: true
      },
      {
        path: 'updateSupplier',
        name: 'updateSupplier',
        component: () => import('@/views/pms/supplier/update'),
        meta: {title: '编辑供应商'},
        hidden: true
      },
      {
        path: 'measure-unit',
        name: 'measure-unit',
        component: () => import('@/views/pms/measure-unit/index'),
        meta: {title: '计价单位管理', icon: 'product-list'}
      },
      {
        path: 'addMeasureUnit',
        name: 'addMeasureUnit',
        component: () => import('@/views/pms/measure-unit/add'),
        meta: {title: '添加计价单位'},
        hidden: true
      },
      {
        path: 'updateMeasureUnit',
        name: 'updateMeasureUnit',
        component: () => import('@/views/pms/measure-unit/update'),
        meta: {title: '编辑计价单位'},
        hidden: true
      }
    ]
  },
  {
    path: '/wms',
    component: Layout,
    redirect: '/wms/warehouse-stock',
    name: 'wms',
    meta: {title: '仓储', icon: 'total-yesterday'},
    children: [
      {
        path: 'warehouse-stock',
        name: 'warehouse-stock',
        component: () => import('@/views/wms/warehouse-stock/index'),
        meta: {title: '库存管理', icon: 'product-list'}
      },
      {
        path: 'addWarehouseStock',
        name: 'addWarehouseStock',
        component: () => import('@/views/wms/warehouse-stock/add'),
        meta: {title: '添加'},
        hidden: true
      },
      {
        path: 'updateWarehouseStock',
        name: 'updateWarehouseStock',
        component: () => import('@/views/wms/warehouse-stock/update'),
        meta: {title: '编辑'},
        hidden: true
      },
      {
        path: 'warehouse',
        name: 'warehouse',
        component: () => import('@/views/wms/warehouse/index'),
        meta: {title: '大仓管理', icon: 'product-list'}
      },
      {
        path: 'addWarehouse',
        name: 'addWarehouse',
        component: () => import('@/views/wms/warehouse/add'),
        meta: {title: '添加大仓'},
        hidden: true
      },
      {
        path: 'updateWarehouse',
        name: 'updateWarehouse',
        component: () => import('@/views/wms/warehouse/update'),
        meta: {title: '编辑大仓'},
        hidden: true
      },
      {
        path: 'station',
        name: 'station',
        component: () => import('@/views/wms/station/index'),
        meta: {title: '站点管理', icon: 'product-list'}
      },
      {
        path: 'addStation',
        name: 'addStation',
        component: () => import('@/views/wms/station/add'),
        meta: {title: '添加站点'},
        hidden: true
      },
      {
        path: 'updateStation',
        name: 'updateStation',
        component: () => import('@/views/wms/station/update'),
        meta: {title: '编辑站点'},
        hidden: true
      }
    ]
  },
  {
    path: '/oms',
    component: Layout,
    redirect: '/oms/order',
    name: 'oms',
    meta: {title: '订单', icon: 'order'},
    children: [
      {
        path: 'order',
        name: 'order',
        component: () => import('@/views/oms/order/index'),
        meta: {title: '订单列表', icon: 'product-list'}
      },
      {
        path: 'orderDetail',
        name: 'orderDetail',
        component: () => import('@/views/oms/order/orderDetail'),
        meta: {title: '订单详情'},
        hidden:true
      },
      {
        path: 'deliverOrderList',
        name: 'deliverOrderList',
        component: () => import('@/views/oms/order/deliverOrderList'),
        meta: {title: '发货列表'},
        hidden:true
      },
      {
        path: 'orderSetting',
        name: 'orderSetting',
        component: () => import('@/views/oms/order/setting'),
        meta: {title: '订单设置', icon: 'order-setting'}
      },
      {
        path: 'returnApply',
        name: 'returnApply',
        component: () => import('@/views/oms/apply/index'),
        meta: {title: '退货申请处理', icon: 'order-return'}
      },
      {
        path: 'returnReason',
        name: 'returnReason',
        component: () => import('@/views/oms/apply/reason'),
        meta: {title: '退货原因设置', icon: 'order-return-reason'}
      },
      {
        path: 'returnApplyDetail',
        name: 'returnApplyDetail',
        component: () => import('@/views/oms/apply/applyDetail'),
        meta: {title: '退货原因详情'},
        hidden:true
      }
    ]
  },
  {
    path: '/ums',
    component: Layout,
    redirect: '/ums/admin',
    name: 'wms',
    meta: {title: '用户', icon: 'total-yesterday'},
    children: [
      {
        path: 'admin',
        name: 'admin',
        component: () => import('@/views/ums/admin/index'),
        meta: {title: '用户管理', icon: 'user'}
      },
      {
        path: 'addAdmin',
        name: 'addAdmin',
        component: () => import('@/views/ums/admin/add'),
        meta: {title: '添加'},
        hidden: true
      },
      {
        path: 'updateAdmin',
        name: 'updateAdmin',
        component: () => import('@/views/ums/admin/update'),
        meta: {title: '编辑'},
        hidden: true
      },
      {
        path: 'role',
        name: 'role',
        component: () => import('@/views/ums/role/index'),
        meta: {title: '角色管理', icon: 'product-list'}
      },
      {
        path: 'addRole',
        name: 'addRole',
        component: () => import('@/views/ums/role/add'),
        meta: {title: '添加'},
        hidden: true
      },
      {
        path: 'updateRole',
        name: 'updateRole',
        component: () => import('@/views/ums/role/update'),
        meta: {title: '编辑'},
        hidden: true
      },
      {
        path: 'admin-login-log',
        name: 'admin-login-log',
        component: () => import('@/views/ums/admin-login-log/index'),
        meta: {title: '登录日志管理', icon: 'product-list'}
      },
      {
        path: 'addAdminLoginLog',
        name: 'addAdminLoginLog',
        component: () => import('@/views/ums/admin-login-log/add'),
        meta: {title: '添加'},
        hidden: true
      },
      {
        path: 'updateAdminLoginLog',
        name: 'updateAdminLoginLog',
        component: () => import('@/views/ums/admin-login-log/update'),
        meta: {title: '编辑'},
        hidden: true
      }
    ]
  },
  {path: '*', redirect: '/404', hidden: true}
];

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({y: 0}),
  routes: constantRouterMap
})

