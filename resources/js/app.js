/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

import "./bootstrap";
import { createApp } from "vue";
const app = createApp({});

/**
 * Next, we will create a fresh Vue application instance. You may then begin
 * registering components with the application instance so they are ready
 * to use in your application's views. An example is included for you.
 */

/**
 * Pinia JS
 */
import { createPinia } from "pinia";
// import piniaPluginPersistedState from "pinia-plugin-persistedstate";
const pinia = createPinia();
// pinia.use(piniaPluginPersistedState);
app.use(pinia);

/**
 * User Store
 */
import { useAuthStore } from "@/stores/auth";
const authStore = useAuthStore();

/**
 * Vue Router
 */
import { createRouter, createWebHistory } from "vue-router";
import { routes } from "./router/routes";
const router = createRouter({
    history: createWebHistory(),
    routes,
}); 

function returnAccess(slug) {
    let hasAccess = false;

    authStore.access.map((o, i) => { 
        if (slug == o.slug) {
            hasAccess = true;
        }
    });
    return hasAccess;
}

function validateAccess(slug) {
    let hasAccess = false;
   
    if (
        authStore?.user?.status.toLowerCase() == "active" &&
        authStore?.authRole == "superadmin"
    ) {
        hasAccess = true;
    } else if (
        authStore?.user?.status.toLowerCase() == "active" && returnAccess(slug)
    ) {
        hasAccess = true; 
    }
  
    return hasAccess;
}

router.beforeEach((to, from, next) => {
    
    if(from.fullPath == '/' && !to.name) {
        next({ name: 'Login' });
    }else if ((!to.name || to.name == 'Login') && (authStore.authIsLoggedIn == false || authStore.authIsLoggedIn == null)) {
        next();
    } else if ((!to.name || to.name == 'Login') && (authStore.authIsLoggedIn || authStore.authIsLoggedIn == true)) {
        next({ name: 'Dashboard' });
    } else if (to.meta.requiresAuth && (authStore.authIsLoggedIn == null || authStore.authIsLoggedIn == false)) {
        next({ name: 'Login' });
    } else if (authStore.authIsLoggedIn && (to.name != 'Unauthorized' && to.name != 'Dashboard' && to.name != 'Account') && !validateAccess(to.meta.title)) {
        next({ name: 'Unauthorized' });
    }
    next();
});

router.afterEach((to, from) => {
    document.title =
        import.meta.env.VITE_APP_NAME + " - " + to.meta.title ||
        import.meta.env.VITE_APP_NAME;
 
    authStore.setCapabilities(to.meta.title.toLowerCase());

});
app.use(router);

/**
 * Vuetify
 */
import vuetify from "./vuetify/vuetify";
app.use(vuetify);

/**
 * App Component
 */
import App from "./App.vue";
app.component("App", App); 
 
authStore.checkUser().then(() => {  

    app.mount("#app");
});