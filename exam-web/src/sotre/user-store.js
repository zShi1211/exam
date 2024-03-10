import { defineStore } from 'pinia'
import SocketService from '../utils/web-stocket-service.js'
import { getImageUrl } from '../utils/image'
import { IconApps } from "@arco-design/web-vue/es/icon";

const useUserStore = defineStore("user", {
    state: () => ({
        token: null,
        userInfo: null,
        baseUserInfo: null,
        theme: 'light'
    }),
    getters: {
        isLogin: (state) => state.userInfo !== null,
     
    },
    actions: {
     
        toggleTheme(dark) {
            if (dark) {
                this.theme = 'dark';
                document.body.setAttribute('arco-theme', 'dark');
            } else {
                this.theme = 'light';
                document.body.removeAttribute('arco-theme');
            }
        },
        logOut() {
            this.userInfo = null
            this.token = null
            this.baseUserInfo = null
        }
    },
    persist: {
        enabled: true,
    }
})

export default useUserStore