import tailwindcss from "@tailwindcss/vite";

const process = await import("node:process");

const developmentMode = process.env.NODE_ENV !== "production";

export default defineNuxtConfig({
	compatibilityDate: "2024-11-01",
	devtools: { enabled: developmentMode },
	ssr: false,
	sourcemap: {
		server: developmentMode,
		client: developmentMode,
	},

	css: ["~/assets/css/main.css"],

	components: [
		{
			path: "~/components",
			pathPrefix: false,
		},
		{
			path: "~/components/pages",
			pathPrefix: true,
			global: true,
		},
		{
			path: "~/components/modals",
			pathPrefix: true,
			global: true,
		},
		{
			path: "~/components/pages/how-it-works",
			prefix: "HowItWorks",
		},
	],

	vite: {
		plugins: [tailwindcss()],
	},

	runtimeConfig: {
		public: {
			API_URL: process.env.API_URL || "http://localhost:1337",
		},
	},

	modules: [
		"@pinia/nuxt",
		["@hypernym/nuxt-gsap", { composables: true }],
		"@nuxtjs/i18n",
		"@nuxt/icon",
	],

	icon: {
		mode: 'svg',
		serverBundle: {
			collections: ['mdi', 'heroicons', 'lucide']
		},
		clientBundle: {
			scan: true
		}
	},

	i18n: {
		locales: [
			{
				code: "kk",
				language: "kk-KZ",
				name: "Қазақша",
				file: "kk.json",
			},
			{
				code: "ru",
				language: "ru-RU",
				name: "Русский",
				file: "ru.json",
			},
		],
		defaultLocale: "ru",
		strategy: "prefix_except_default",
		vueI18n: "./i18n.config.js",
		bundle: {
			optimizeTranslationDirective: false,
		},
		detectBrowserLanguage: {
			useCookie: true,
			cookieKey: "i18n_redirected",
			redirectOn: "root",
		},
		compilation: {
			strictMessage: false,
		},
		precompile: {
			strictMessage: false,
		},
	},
});
