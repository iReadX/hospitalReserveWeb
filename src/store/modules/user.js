import Cookies from 'js-cookie';
import avatorImg from '../../images/avator.jpg';

const user = {
    namespaced: true,
    state: {
        info: null,
        isLogin: false
    },
    mutations: {
        // 更新用户信息
        updateInfo (state, infoObj) {
            for (let key in infoObj) {
                state.info[key] = infoObj[key];
                if (key === 'avator') {
                    localStorage.avatorImgPath = infoObj[key] || avatorImg;
                }
            }
        },
        // 初始化用户信息
        initInfo (state, infoObj) {
            state.info = infoObj;
            Cookies.set('access', infoObj.access);
            state.isLogin = true;
            Cookies.set('isLogin', true);
            localStorage.avatorImgPath = infoObj.avator || avatorImg;
        },
        // 退出登录
        logout (state, vm) {
            state.info = null;
            state.isLogin = false;
            Cookies.remove('isLogin');
            Cookies.remove('access');
            // 恢复默认样式
            let themeLink = document.querySelector('link[name="theme"]');
            themeLink.setAttribute('href', '');
            // 清空打开的页面等数据，但是保存主题数据
            let theme = '';
            if (localStorage.theme) {
                theme = localStorage.theme;
            }
            localStorage.clear();
            if (theme) {
                localStorage.theme = theme;
            }
            vm.$util.ajax.post('/logout');
        }
    }
};

export default user;
