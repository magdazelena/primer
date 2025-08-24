import path from "node:path";

import { defineConfig } from "rollup";
import swc from "@rollup/plugin-swc";
import json from "@rollup/plugin-json";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import dynamicImportVars from "@rollup/plugin-dynamic-import-vars";
import commonjs from "@rollup/plugin-commonjs";
import dev from "rollup-plugin-dev";

const isExernal = (id) => !path.isAbsolute(id) && !id.startsWith(".");

const basePlugins = () => [
  json(),
  nodeResolve({
    extensions: [".ts", ".tsx", ".js", ".jsx", ".json"],
  }),
  commonjs({
    ignoreDynamicRequires: true,
  }),
  swc({
    swc: {
      jsc: {
        parser: {
          syntax: "typescript",
          tsx: true,
        },
        target: "es2020",
        transform: {
          react: {
            runtime: "automatic",
          },
        },
      },
      sourceMaps: true,
    },
  }),
  dynamicImportVars({}),
  dev('dist', {
    open: true,
    watch: {
      usePolling: true,
    },
  }),
];

const isInput = (id, input) => {
  if (typeof input === "string") {
    return id.includes(path.resolve(input));
  }

  return Object.values(input).some((i) => id.includes(path.resolve(i)));
};

const baseConfig = (opts = {}) => {
  const {
    rootDir,
    outDir = "./dist",
    input = "./src/index.ts",
    ...rest
  } = opts;

  return defineConfig({
    input,
    external: isExernal,
    output: baseOutput({ outDir, rootDir }),
    plugins: basePlugins(),
    onLog(level, log, handler) {
      if (log.code === 'CIRCULAR_DEPENDENCY') {
        return; // Ignore circular dependency warnings
      }
      if (level === 'warn') {
        handler('error', log); // turn other warnings into errors
      } else {
        handler(level, log); // otherwise, just print the log
      }
    },
    onwarn(warning, warn) {
      if (warning.code === "MIXED_EXPORTS") {
        // json files are always mixed exports
        if (warning?.id?.endsWith(".json")) {
          return;
        }

        // we only care about mixed exports in our input files
        if (warning.id && !isInput(warning.id, input)) {
          return;
        }
      }

      if (
        warning.code === "UNUSED_EXTERNAL_IMPORT" &&
        warning.exporter === "react"
      ) {
        return;
      }

      warn(warning);
    },
    ...rest,
  });
};

const baseOutput = ({ outDir, rootDir }) => {
  return [
    {
      dir: outDir,
      entryFileNames: "[name].js",
      chunkFileNames: "[name]-[hash].js",
      exports: "auto",
      format: "cjs",
      sourcemap: true,
      preserveModules: true,
      // Better source maps for development
      sourcemapExcludeSources: false,
      ...(rootDir ? { preserveModulesRoot: rootDir } : {}),
    },
    {
      dir: outDir,
      entryFileNames: "[name].mjs",
      chunkFileNames: "[name]-[hash].mjs",
      format: "esm",
      sourcemap: true,
      preserveModules: true,
      sourcemapExcludeSources: false,
      ...(rootDir ? { preserveModulesRoot: rootDir } : {}),
    },
  ];
};

const basePluginConfig = () => {
  return defineConfig([
    baseConfig({
      input: {
        index: "./server/src/index.ts",
      },
      rootDir: "./server/src",
      outDir: "./dist/server",
    }),
    baseConfig({
      input: {
        index: "./admin/src/index.ts",
      },
      rootDir: "./admin/src",
      outDir: "./dist/admin",
    }),
  ]);
};

export default basePluginConfig();
