import type { UserConfig } from 'vite'
import { webExtensions } from '../constants'

// TODO we need to traverse to get sub-deps...

export function getOptimizeDeps(mode: 'build' | 'serve') {
  const needsInterop = [
    '@vxrn/safe-area',
    '@vxrn/vendor/react-19',
    '@vxrn/vendor/react-dom-19',
    '@vxrn/vendor/react-dom-client-19',
    '@vxrn/vendor/react-dom-server.browser-19',
    '@vxrn/vendor/react-jsx-19',
    '@vxrn/vendor/react-jsx-dev-19',
    'react',
    'react/jsx-runtime',
    'react/jsx-dev-runtime',
    'react-dom',
    'react-dom/server',
    'react-dom/client',
    'react-native-web-internals',
    'react-native-web',
    'url-parse',
    'query-string',
    'escape-string-regexp',
    'use-latest-callback',
    'react-is',
    'fast-deep-equal',
    '@supabase/auth-helpers-react',
    'core-js',
    'parse-numeric-range',
    'use-sync-external-store',
    'use-sync-external-store/shim',
    'expo-constants',
    'expo-linking',
    'inline-style-prefixer',
    '@docsearch/react',
    '@algolia/autocomplete-core',
    '@algolia/autocomplete-plugin-algolia-insights',
    '@algolia/autocomplete-shared',
    'moti',
  ]

  const depsToOptimize = [
    ...needsInterop,

    'lodash',
    'moti/author',

    // added these when using a worker env
    'reading-time',
    'mdx-bundler/client',
    'gray-matter',
    'glob',
    'memoize-one',
    'css-in-js-utils',
    'hyphenate-style-name',
    'use-sync-external-store',
    'react-native-reanimated', // uses .web.js extensions
    '@react-navigation/core',
    '@react-navigation/native',
    '@react-navigation/elements',
    '@react-navigation/bottom-tabs',
    '@react-navigation/native-stack',
    'vxs',
    'vxs/server-render',
    'styleq',
    'fbjs',
    'vxs/headers',
    '@vxrn/universal-color-scheme',
    '@vxrn/color-scheme',
    'requires-port',
    'querystringify',
    'compare-versions',
    'strict-uri-encode',
    'decode-uri-component',
    'split-on-first',
    'filter-obj',
    'scheduler',
    'warn-once',
    '@radix-ui/react-compose-refs',
    '@radix-ui/react-slot',
    'expo-splash-screen',
    'nanoid',
    'swr',
    'swr/mutation',
    'one',
    'one/zero',
    'one/headers',
    'one/server-render',
    'refractor/lang/tsx',
    'invariant',
    'tamagui/linear-gradient',
    '@tamagui/linear-gradient',
    '@react-native/normalize-color',
    'expo-modules-core',
    'expo-status-bar',
    'react-native-web',
    // 'react-native-web-lite',
    'react-native',
    '@floating-ui/react',
    '@floating-ui/react-dom',
    '@tamagui/constants',
    '@tamagui/react-native-use-responder-events',
    '@tamagui/react-native-svg',
    '@tamagui/alert-dialog',
    '@react-navigation/routers',
    '@tamagui/simple-hash',
    '@tamagui/one-theme',
    '@tamagui/use-did-finish-ssr',
    '@tamagui/use-event',
    '@tamagui/portal',
    '@tamagui/compose-refs',
    '@tamagui/use-debounce',
    '@tamagui/avatar',
    '@tamagui/core',
    '@tamagui/dialog',
    '@tamagui/group',
    '@tamagui/helpers-icon',
    '@tamagui/helpers',
    '@tamagui/image',
    '@tamagui/lucide-icons',
    '@tamagui/animations-moti',
    '@tamagui/popover',
    '@tamagui/popper',
    '@tamagui/scroll-view',
    '@tamagui/select',
    '@tamagui/sheet',
    '@tamagui/switch',
    '@tamagui/tabs',
    '@tamagui/toast',
    '@tamagui/toggle-group',
    '@tamagui/tooltip',
    '@tamagui/use-window-dimensions',
    '@tamagui/web',
    'tamagui',
    'react-native-web',
    'reforest',
  ]

  if (mode === 'build') {
    // breaks in serve mode
    depsToOptimize.push('@babel/runtime')
  }

  return {
    needsInterop,
    depsToOptimize,
    optimizeDeps: {
      include: depsToOptimize,
      exclude: ['util', '@swc/wasm', '@swc/core-darwin-arm64', 'moti/author'],
      needsInterop,
      // TODO this should go away! native doesnt want this
      esbuildOptions: {
        resolveExtensions: webExtensions,
      },
    } satisfies UserConfig['optimizeDeps'],
  }
}
