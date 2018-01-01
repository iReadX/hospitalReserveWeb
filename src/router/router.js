import Main from '@/views/Main.vue';

// 不作为Main组件的子页面展示的页面单独写，如下
export const loginRouter = {
    path: '/login',
    name: 'login',
    meta: {
        title: 'Login - 登录'
    },
    component: resolve => {
        require(['@/views/login.vue'], resolve);
    }
};

export const page404 = {
    path: '/*',
    name: 'error-404',
    meta: {
        title: '404-页面不存在'
    },
    component: resolve => {
        require(['@/views/error-page/404.vue'], resolve);
    }
};

export const page403 = {
    path: '/403',
    meta: {
        title: '403-权限不足'
    },
    name: 'error-403',
    component: resolve => {
        require(['@/views/error-page/403.vue'], resolve);
    }
};

export const page500 = {
    path: '/500',
    meta: {
        title: '500-服务端错误'
    },
    name: 'error-500',
    component: resolve => {
        require(['@/views/error-page/500.vue'], resolve);
    }
};

export const locking = {
    path: '/locking',
    name: 'locking',
    component: resolve => {
        require(['@/views/main-components/lockscreen/components/locking-page.vue'], resolve);
    }
};

// 作为Main组件的子页面展示但是不在左侧菜单显示的路由写在otherRouter里
export const otherRouter = {
    path: '/',
    name: 'otherRouter',
    redirect: '/home',
    component: Main,
    children: [
        {
            path: 'home',
            title: {i18n: 'home'},
            name: 'home_index',
            component: resolve => {
                require(['@/views/home/home.vue'], resolve);
            }
        },
        {
            path: 'ownspace',
            title: '个人中心',
            name: 'ownspace_index',
            component: resolve => {
                require(['@/views/own-space/own-space.vue'], resolve);
            }
        },
        {
            path: 'account/:userId',
            title: '修改管理员帐号',
            name: 'account-edit',
            component: resolve => {
                require(['@/views/accounts/edit.vue'], resolve);
            }
        }
    ]
};

// 作为Main组件的子页面展示并且在左侧菜单显示的路由写在appRouter里
export const appRouter = [
    {
        path: '/accounts',
        icon: 'person',
        name: 'accounts',
        title: '管理员',
        component: Main,
        children: [
            {
                path: 'list',
                icon: 'person-stalker',
                name: 'accounts-list',
                title: '列表',
                component: resolve => {
                    require(['@/views/accounts/list.vue'], resolve);
                }
            },
            {
                path: 'add',
                icon: 'person-add',
                name: 'accounts-add',
                title: '注册',
                access: 0,
                component: resolve => {
                    require(['@/views/accounts/add.vue'], resolve);
                }
            }
        ]
    },
    {
        path: '/number',
        icon: 'ios-list',
        name: 'number',
        title: '手机号管理',
        component: Main,
        children: [
            {
                path: 'list',
                title: '手机号管理',
                name: 'number_list',
                component: resolve => {
                    require(['@/views/number/list.vue'], resolve);
                }
            }
        ]
    },
    {
        path: '/task',
        icon: 'cloud',
        name: 'task',
        title: '任务管理',
        component: Main,
        children: [
            {
                path: 'list',
                title: '任务管理',
                name: 'task_list',
                component: resolve => {
                    require(['@/views/task/list.vue'], resolve);
                }
            }
        ]
    },
    {
        path: '/system',
        icon: 'ios-information',
        name: 'system',
        title: '系统信息',
        component: Main,
        children: [
            {
                path: 'list',
                title: '系统信息',
                name: 'system_info',
                component: resolve => {
                    require(['@/views/system/info.vue'], resolve);
                }
            }
        ]
    }
];

// 所有上面定义的路由都要写在下面的routers里
export const routers = [
    loginRouter,
    otherRouter,
    locking,
    ...appRouter,
    page500,
    page403,
    page404
];
