# @rinoshiyo/vite-plugin-eta

Use [Eta](https://www.npmjs.com/package/eta) template language in your entrypoint i.e `index.html`

**Compatibility Note:** This plugin requires **Vite v5 or newer**.

## Menu

- [Installation](#installation)
- [Usage](#usage)
    - [Default Data](#default-data)
    - [Configure Eta](#configure-eta)

### Installation

```sh
npm i @rinoshiyo/vite-plugin-eta
# or
yarn add @rinoshiyo/vite-plugin-eta
```

### Usage

File: **vite.config.js**

```javascript
import {defineConfig} from "vite";
import {ViteEtaPlugin} from "@rinoshiyo/vite-plugin-eta";

export default defineConfig({
  plugins: [
    // Without Data
    ViteEtaPlugin(),

    // With Data
    ViteEtaPlugin({
      domain: "example.com",
      title: "My vue project!"
    }),

    // Or With Vite Config
    ViteEtaPlugin((viteConfig) => {
      // viteConfig is the current viteResolved config.
      return {
        root: viteConfig.root,
        domain: "example.com",
        title: "My vue project!"
      }
    }),
  ],
});
```

File: **index.html**

```ejs
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8"/>
    <link rel="icon" href="/favicon.ico"/>
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <title><%= domain %> | <%= title %></title>

    <!-- Run Conditions-->
    <% if(isDev){ %>
        <script src="/path/to/development-only-script.js"></script>
    <% } else { %>
        <script src="/path/to/production-only-script.js" crossorigin="anonymous"></script>
    <% } %>
</head>
<body>
<div id="app"></div>
<script type="module" src="/src/main.ts"></script>
</body>
</html>
```

Note: `isDev` is included in your data by default

### Default Data

The object below is the default data of the render function.

```javascript
return {
  NODE_ENV: config.mode,
  isDev: config.mode === "development"
}
```

### Configure Eta

You can configure Eta by passing an object to the plugin.

```js
export default defineConfig({
  plugins: [
    ViteEtaPlugin(
        {title: 'My vue project!'},
        {
          eta: {
            // Eta options goes here.
            cache: false
          },
        }
    ),
  ],
});
```

If you want to use `viteconfig` to configure Eta, you can pass a function to the plugin, the function will receive the current vite config as the first argument.

```js
export default defineConfig({
  plugins: [
    ViteEtaPlugin(
        {title: 'My vue project!'},
        {
          eta: (viteConfig) => ({
            // Eta options goes here.
            views: viteConfig.publicDir
          })
        }
    ),
  ],
});
```

---

## 🧡 Acknowledgements

This project is a fork of the original [`vite-plugin-eta`](https://www.npmjs.com/package/vite-plugin-eta) created by **moyui默羽**. **I extend my sincere thanks** to the original author for creating and maintaining the initial project.

Furthermore, the structure and documentation of this plugin were heavily inspired by the excellent work done on **[`vite-plugin-ejs`](https://www.npmjs.com/package/vite-plugin-ejs)** by **trapcodeio**.
