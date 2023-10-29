/// <reference types="vite/client" /> import.meta.env.VITE_BACKEND_HOST
interface ImportMetaEnv {
    readonly VITE_BACKEND_HOST: string
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}