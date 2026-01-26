import path from "node:path";

import { defineConfig } from "rollup";
import swc from "@rollup/plugin-swc";
import json from "@rollup/plugin-json";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import dynamicImportVars from "@rollup/plugin-dynamic-import-vars";
import commonjs from "@rollup/plugin-commonjs";

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
    isAdmin = false,
    ...rest
  } = opts;

  return defineConfig({
    input,
    external: isExernal,
    output: baseOutput({ outDir, rootDir, isAdmin }),
    plugins: basePlugins(),
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

const baseOutput = ({ outDir, rootDir, isAdmin = false }) => {
  // For admin builds, don't preserve modules so we can use exports: "default"
  const preserveModules = !isAdmin;
  
  return [
    {
      dir: outDir,
      entryFileNames: "[name].js",
      chunkFileNames: "[name]-[hash].js",
      exports: "auto",
      format: "cjs",
      sourcemap: true,
      preserveModules,
      ...(preserveModules && rootDir ? { preserveModulesRoot: rootDir } : {}),
    },
    {
      dir: outDir,
      entryFileNames: "[name].mjs",
      chunkFileNames: "[name]-[hash].mjs",
      exports: isAdmin ? "default" : "auto",
      format: "esm",
      sourcemap: true,
      preserveModules,
      ...(preserveModules && rootDir ? { preserveModulesRoot: rootDir } : {}),
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
      isAdmin: false,
    }),
    baseConfig({
      input: {
        index: "./admin/src/index.ts",
      },
      rootDir: "./admin/src",
      outDir: "./dist/admin",
      isAdmin: true,
    }),
  ]);
};
export default basePluginConfig();
