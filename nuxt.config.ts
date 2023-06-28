import path from "path";
import { readFileSync } from 'fs'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    "@nuxt/content",
    '@nuxtjs/tailwindcss',
    'nuxt-icon',
    "nuxt-lodash",
    '@nuxtjs/i18n'
  ],

  content: {
    markdown: {
      toc: {
        depth: 2,
        searchDepth: 3,
      },
    },
    highlight: {
      preload: [
        {
          id: 'dockerfile',
          scopeName: 'source.dockerfile',
          aliases: ['dockerfile', 'docker'], // Use to mark code blocks in Markdown
          grammar: JSON.parse(
            readFileSync(
              // Place the language grammar file somewhere in your project
              './shiki/languages/docker.tmLanguage.json'
            ).toString()
          ),
        },
        {
          id: 'nginx',
          scopeName: 'source.nginx',
          aliases: ['nginx'], // Use to mark code blocks in Markdown
          grammar: JSON.parse(
            readFileSync(
              // Place the language grammar file somewhere in your project
              './shiki/languages/nginx.tmLanguage.json'
            ).toString()
          ),
        },
      ],
      theme: {
        // Default theme (same as single string)
        default: 'github-light',
        // Theme used if `html.dark`
        dark: 'github-dark',
        // Theme used if `html.sepia`
        light: 'min-light'
      }
    },
    documentDriven: {
      navigation: true,
      page: true,
      surround: true,
    }

  },
  app: {
    head: {
      link: [
        {
          rel: "icon",
          type: 'image/x-icon',
          href: "/logo.ico"
        }
      ],
      meta: [
        {
          name: "description", content: "Hilary Liu's blog"
        },
        {
          name: "twitter:description", content: "Hilary Liu's blog"
        },
        {
          name: "twitter:title", content: "Hilary Liu's blog"
        },
        {
          name: "og:description", content: "Hilary Liu's blog"
        },
        {
          name: "og:title", content: "Hilary Liu's blog"
        },
        {
          name: "twitter:card", content: "summary_large_image"
        },
        {
          name: "twitter:image", content: ""
        },
        {
          name: "og:image", content: ""
        }
      ]
    }
  },
  pages: true,
  alias: {
    "@": path.resolve(__dirname, "/")
  },
  plugins: [{
    src: "~/plugins/router-nprogress.ts",
    mode: "client"
  }],
  css: ['~/assets/css/tailwind.css', "~/assets/css/var.css", "~/assets/css/scroll.css"],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {}
    }
  },
  i18n: {
    langDir: "locals",
    defaultLocale: "en-US",
    strategy: 'no_prefix',
    locales: [
      {
        code: "en-US",
        iso: "en-US",
        name: "English(US)",
        file: "en-US.json"
      },
      {
        code: "zh",
        iso: "zh",
        name: "简体中文",
        file: "zh.json"
      }
    ]
  }
})

