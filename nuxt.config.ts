// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    devtools: { enabled: true },
    modules: ["@nuxtjs/google-fonts", "@nuxtjs/tailwindcss", "nuxt-headlessui"],
    googleFonts: {
        families: {
            Inter: [300, 400, 500, 600, 700, 800],
        },
        display: "swap",
    },
    css: ["@/assets/css/main.css"],
    headlessui: {
        prefix: "Headless",
    },
    plugins: [
        '@/plugins/view-ui',
        { src: '~/plugins/vue-datepicker', ssr: false },
    ],
    build: {
        transpile: ['@vuepic/vue-datepicker']
    },
});
