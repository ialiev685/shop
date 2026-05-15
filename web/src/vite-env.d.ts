/// <reference types="vite/client" />
/// <reference types="vite-plugin-svgr/client" />

declare module "*.module.css" {
  const classes: { [key: string]: string };
  export default classes;
}

interface ImportMetaEnv {
  readonly VITE_APP_API_URL: string;
  readonly VITE_APP_NODE_ENV: string;
  readonly VITE_APP_HOST: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
