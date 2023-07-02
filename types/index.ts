import { ParsedContent } from "@nuxt/content/dist/runtime/types";

export interface Nav {
    icon: string,
    name?: string,
    description?: string,
    href: string,
}

export interface Navigation {
    name: string,
    navs?: Nav[],
}

export interface Aticle extends ParsedContent {
    date: Date | string
}


export interface ItemsGroup {
    [year: string]: Aticle[]
}


