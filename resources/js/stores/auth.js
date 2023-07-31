import { defineStore } from "pinia";
import { useLocalStorage, useStorage } from "@vueuse/core";
// You can name the return value of `defineStore()` anything you want,
// but it's best to use the name of the store and surround it with `use`
// and `Store` (e.g. `useUserStore`, `useCartStore`, `useProductStore`)
// the first argument is a unique id of the store across your application
export const useAuthStore = defineStore("authUser", {
    state: () => ({
        userStorage: useLocalStorage("authUser", {}),
        user: null,
        role: [], // app_admin, normal
        token: null,
        is_logged_in: false,
    }),
    getters: {
        authUser: (state) => state.user,
        authToken: (state) => state.token,
        authRole: (state) => state.role,
        authIsLoggedIn: (state) => state.is_logged_in,
    },
    actions: {
        async setCredentials(res) {
            useStorage(
                "authUser",
                res.user,
                localStorage,
                { mergeDefaults: true } // <--
            );

            this.user = res.user;
            this.token = res.token;
            if (res.user && res.token) {
                this.is_logged_in = true;
            }
        },
        async logout() {
            this.user = null;
            this.token = null;
            this.is_logged_in = false;
        },
        async setUser(user) {
            this.user = user;
        },
        async setToken(token) {
            this.token = token;
        },
    },
});
