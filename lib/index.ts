import { Plugin, ResolvedConfig } from "vite";
import { Eta, EtaConfig } from "eta";

type EtaRenderOptions = EtaConfig;
type EtaRenderOptionsFn = (config: ResolvedConfig) => EtaRenderOptions;
type ViteEtaPluginDataType =
  | Record<string, any>
  | ((config: ResolvedConfig) => Record<string, any>);
type ViteEtaPluginOptions = { eta?: EtaRenderOptions | EtaRenderOptionsFn };

/**
 * Vite Eta Plugin Function
 * See https://github.com/moyui/vite-plugin-eta for more information
 * @example
 * export default defineConfig({
 *  plugins: [
 *    vue(),
 *    ViteEtaPlugin({foo: 'bar'})
 *  ],
 * });
 */
function ViteEtaPlugin(
  data: ViteEtaPluginDataType = {},
  options?: ViteEtaPluginOptions
): Plugin {
  let config: ResolvedConfig;
  return {
    name: "vite-plugin-eta",
    configResolved(resolvedConfig) {
      config = resolvedConfig;
    },
    transformIndexHtml: {
      order: "pre",
      handler(html) {
        if (typeof data === "function") data = data(config);
        let etaOptions = options && options.eta ? options.eta : {};
        if (typeof etaOptions === "function") etaOptions = etaOptions(config);

        const eta = new Eta({
          views: config.root,
          ...etaOptions
        });

        html = eta.renderString(
          html,
          {
            NODE_ENV: config.mode,
            isDev: config.mode === "development",
            ...data
          }
        );

        return html;
      },
    },
  };
}

export { ViteEtaPlugin, Eta };
