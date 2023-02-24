interface ImportMeta {
  env: {
    VITE_API_KEY: string;
  };
}

declare module "*.svg" {
  const content: React.FunctionComponent<React.SVGAttributes<SVGElement>>;
  export default content as string;
}
