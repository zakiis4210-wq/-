/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",

  // GitHub Pages 用（← あなたのリポジトリ名）
  basePath: "/zakiis4210-wq",
  assetPrefix: "/zakiis4210-wq/",

  images: {
    unoptimized: true,
  },
};

module.exports = nextConfig;
