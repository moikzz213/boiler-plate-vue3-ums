// import Dashboard from "../pages/admin/Dashboard.vue";
// import Users from "../admin//Users.vue";
// import Large from "../admin//Large.vue";
export const routes = [
    /**
     * Auth
     * https://medium.com/@ripoche.b/create-a-spa-with-role-based-authentication-with-laravel-and-vue-js-ac4b260b882f
     *
     * Auth with sanctum
     * https://techvblogs.com/blog/spa-authentication-laravel-9-sanctum-vue3-vite
     */

    /**
     * Auth Login
     */
    {
        path: "/login",
        component: () => import("../auth/SanctumLogin.vue"),
        name: "Login",
        meta: {
            requiresAuth: false,
            title: "Login",
        },
    },

    /**
     * Admin routes
     */

    {
        path: "/dashboard",
        component: () => import("../pages/admin/Dashboard.vue"),
        name: "Dashboard",
        meta: {
            requiresAuth: true,
            title: "dashboard",
        },
    },
    {
        path: "/pages",
        component: () => import("../pages/admin/slugs/Slugs.vue"),
        name: "Pages",
        meta: {
            requiresAuth: true,
            title: "pages",
        },
    },
    {
        path: "/asset-list",
        component: () => import("../pages/admin/users/Users.vue"),
        name: "asset-list",
        meta: {
            requiresAuth: true,
            title: "asset-list",
        },
    },
    {
        path: "/users",
        component: () => import("../pages/admin/users/Users.vue"),
        name: "Users",
        meta: {
            requiresAuth: true,
            title: "users",
        },
    },
    {
        path: "/users/page/:page",
        component: () => import("../pages/admin/users/Users.vue"),
        name: "PaginatedUsers",
        meta: {
            requiresAuth: true,
            title: "users",
        },
    },

    {
        path: "/users/:id",
        component: () => import("../pages/admin/users/EditUser.vue"),
        name: "EditUser",
        meta: {
            requiresAuth: true,
            title: "users",
        },
    },

    /**
     * Normal user routes
     */
    {
        path: "/account",
        component: () => import("../pages/account/Account.vue"),
        name: "Account",
        meta: {
            requiresAuth: true,
            title: "Account",
        },
    },

    /**
     * Normal user routes
     */
    {
        path: "/unauthorized",
        component: () => import("../pages/Unauthorized.vue"),
        name: "Unauthorized",
        meta: {
            requiresAuth: true,
            title: "Unauthorized",
        },
    },
];
