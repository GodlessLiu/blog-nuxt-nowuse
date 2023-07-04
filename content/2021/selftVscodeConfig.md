---
title: 我自己的一些vscode设置
date: 2021-06-14
tag: 中文
icon: akar-icons:vscode-fill
description: 我的vscode设置
---

> 参考 [Anthony Fu vscode 配置](https://github.com/antfu/vscode-settings)

## code-snippets 代码片段

![es6 代码片段插件](/img/selftVscodeConfig/es6-code-snippets.png)
![vue 代码片段插件](/img/selftVscodeConfig/vue3-snippets.png)

## 自定义的代码片段

我的代码片段

- vue

  ```json
  {
    "Print to v2": {
      "scope": "vue",
      "prefix": "vue2-script-setup",
      "body": [
        "<template>",
        "  <div>\n",
        "  </div>",
        "</template>",
        "<script>",
        "export default {",
        "  data() {",
        "    return {\n",
        "    }",
        "  },",
        "  mounted(){\n",
        "  },",
        "  computed:{\n",
        "  },",
        "  methods:{\n",
        "  },",
        "}"
      ],
      "description": "vue2 setup"
    },
    "Print to v3": {
      "scope": "vue",
      "prefix": "vue3-script-setup",
      "body": [
        "<script setup lang=\"ts\">",
        "const props = defineProps<{",
        "  modelValue?: boolean,",
        "}>()",
        "$1",
        "</script>",
        "",
        "<template>",
        "  <div>",
        "    <slot/>",
        "  </div>",
        "</template>"
      ],
      "description": "vue3 setup with ts"
    }
  }
  ```

- markdown
  ```json
  {
    // Place your 全局 snippets here. Each snippet is defined under a snippet name and has a scope, prefix, body and
    // description. Add comma separated ids of the languages where the snippet is applicable in the scope field. If scope
    // is left empty or omitted, the snippet gets applied to all languages. The prefix is what is
    // used to trigger the snippet and the body will be expanded and inserted. Possible variables are:
    // $1, $2 for tab stops, $0 for the final cursor position, and ${1:label}, ${2:another} for placeholders.
    // Placeholders with the same ids are connected.
    // Example:
    "Print to console": {
      "scope": "markdown",
      "prefix": "md",
      "body": [
        "---",
        "title: $1",
        "date: $2",
        "tag: $3",
        "icon: $4",
        "description: $5",
        "---"
      ],
      "description": "write a blog markdown heade"
    }
  }
  ```
- javascript
  ```js
  {
      // Place your 全局 snippets here. Each snippet is defined under a snippet name and has a scope, prefix, body and
      // description. Add comma separated ids of the languages where the snippet is applicable in the scope field. If scope
      // is left empty or omitted, the snippet gets applied to all languages. The prefix is what is
      // used to trigger the snippet and the body will be expanded and inserted. Possible variables are:
      // $1, $2 for tab stops, $0 for the final cursor position, and ${1:label}, ${2:another} for placeholders.
      // Placeholders with the same ids are connected.
      // Example:
      "Print to console": {
          "scope": "javascript,typescript",
          "prefix": "im",
          "body": [
              "import { $1 } from '$2';"
          ],
          "description": "Import a module"
      }
  }
  ```

## vscode theme

[vitesse dark](https://github.com/antfu/vscode-theme-vitesse)

## vscode setting vscode 设置

```json
{
    {
        // Visuals
        "workbench.activityBar.visible": true,
        "workbench.editor.tabCloseButton": "right",
        "workbench.list.smoothScrolling": true,
        "workbench.sideBar.location": "right",
        "workbench.startupEditor": "newUntitledFile",
        "scm.diffDecorationsGutterWidth": 2,
        "window.zoomLevel": 1,
        // editor
        "editor.tabSize": 2,
        "editor.fontSize": 14,
        "editor.fontLigatures": true,
        "editor.linkedEditing": true,
        // formatter
        "typescript.updateImportsOnFileMove.enabled": "always",
        "editor.codeActionsOnSave": {
            "source.organizeImports": true
        },
        "editor.defaultFormatter": "esbenp.prettier-vscode",
        "editor.formatOnSave": true,
        // extentions
        "projectManager.git.baseFolders": ["C:\\Users\\aifeng liu\\Desktop\\code"],
        "projectManager.sortList": "Recent",
        "extensions.autoUpdate": "onlyEnabledExtensions",
        "extensions.ignoreRecommendations": true,
        "explorer.confirmDelete": false,
        "explorer.confirmDragAndDrop": false,
        "remote.SSH.remotePlatform": {
            "43.136.131.248": "linux"
        },
        "tabnine.experimentalAutoImports": true,
        // terminal
        "terminal.integrated.defaultProfile.windows": "Git Bash",
        "terminal.integrated.cursorBlinking": true,
        "terminal.integrated.cursorStyle": "line",
        "terminal.integrated.fontWeight": "300",
        "terminal.integrated.persistentSessionReviveProcess": "never",
        "terminal.integrated.tabs.enabled": true,
        // other
        "search.exclude": {
            "**/.git": true,
            "**/.github": true,
            "**/.nuxt": true,
            "**/.output": true,
            "**/.pnpm": true,
            "**/.vscode": true,
            "**/.yarn": true,
            "**/bower_components": true,
            "**/dist/**": true,
            "**/logs": true,
            "**/node_modules": true,
            "**/out/**": true,
            "**/package-lock.json": true,
            "**/pnpm-lock.yaml": true,
            "**/tmp": true,
            "**/yarn.lock": true
        },
        "[markdown]": {
            "editor.quickSuggestions": {
            "comments": "on",
            "strings": "on",
            "other": "on"
            }
        },
        "workbench.colorTheme": "Vitesse Dark"
    }

}

```
