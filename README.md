# Fridge Recipe MVP

冷蔵庫の食材からレシピを提案する Next.js (App Router) + TypeScript + Tailwind + Zustand のサンプルです。

## 公開URL

GitHub Pages で公開する場合のURLは次の形式です。

```
https://<user>.github.io/recipe2/
```

> `recipe2` はリポジトリ名に合わせて変更してください。

## GitHub Pages デプロイ手順

1. GitHub リポジトリの **Settings → Pages** を開く
2. **Build and deployment** で **GitHub Actions** を選択する
3. `main` ブランチへ push すると `deploy-pages.yml` が実行され、`out/` が Pages に反映される

## ローカル開発

```bash
npm install
npm run dev
```

## ビルド (Pages向け)

```bash
npm run build
```

`next.config.js` が `output: "export"` で `out/` を生成するため、静的ホスティングに対応しています。
