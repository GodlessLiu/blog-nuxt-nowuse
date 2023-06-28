---
title: My own vscode settings
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
        "</template>",
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
## vscode setting vscode设置
```json
{
    // Visuals
    "workbench.activityBar.visible": true,
    "workbench.colorTheme": "Vitesse Dark",
    "workbench.editor.tabCloseButton": "right",
    "workbench.list.smoothScrolling": true,
    "workbench.sideBar.location": "left",
    "workbench.startupEditor": "newUntitledFile",
    // editor
    "editor.accessibilitySupport": "off",
    "editor.cursorSmoothCaretAnimation": "on",
    "editor.find.addExtraSpaceOnTop": false,
    "editor.guides.bracketPairs": "active",
    "editor.inlineSuggest.enabled": true,
    "editor.lineNumbers": "interval",
    "editor.renderWhitespace": "boundary",
    "editor.suggestSelection": "first",
    "editor.tabSize": 2,
    "editor.unicodeHighlight.invisibleCharacters": false,
    "editor.stickyScroll.enabled": true,
    "editor.hover.sticky": true,
    "editor.codeActionsOnSave": {
        "source.fixAll": false,
        "source.fixAll.eslint": true, // this allows ESLint to auto fix on save
        "source.organizeImports": false
    },
    "editor.wordSeparators": "`~!@#%^&*()=+[{]}\\|;:'\",.<>/?",
    "window.dialogStyle": "custom",
    "window.titleBarStyle": "custom",
    "workbench.editor.closeOnFileDelete": true,
    "workbench.editor.highlightModifiedTabs": true,
    "workbench.editor.limit.enabled": true,
    "workbench.editor.limit.perEditorGroup": true,
    "workbench.editor.limit.value": 5,
    "extensions.autoUpdate": "onlyEnabledExtensions",
    "extensions.ignoreRecommendations": true,
    "files.eol": "\n",
    "files.insertFinalNewline": true,
    "files.simpleDialog.enable": true,
    "git.autofetch": true,
    "git.confirmSync": false,
    "git.enableSmartCommit": true,
    "git.untrackedChanges": "separate",
    "terminal.integrated.cursorBlinking": true,
    "terminal.integrated.cursorStyle": "line",
    "terminal.integrated.fontWeight": "300",
    "terminal.integrated.persistentSessionReviveProcess": "never",
    "terminal.integrated.tabs.enabled": true,
    "scm.diffDecorationsGutterWidth": 2,
    "debug.onTaskErrors": "debugAnyway",
    "diffEditor.ignoreTrimWhitespace": false,
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
    "terminal.integrated.shell.windows": "C:\\Program Files\\Git\\bin\\sh.exe",
    "explorer.confirmDelete": false,
    "editor.formatOnType": true,
    "editor.formatOnSave": true,
    "editor.formatOnPaste": true,
    "[markdown]": {
        "editor.quickSuggestions": {
            "comments": "on",
            "strings": "on",
            "other": "on"
        }
    },
    "tabnine.experimentalAutoImports": true,
    "window.zoomLevel": -1,
    "explorer.confirmDragAndDrop": false,
    "[css]": {
        "editor.defaultFormatter": "sibiraj-s.vscode-scss-formatter"
    }
}

```
[file nesting config](https://github.com/antfu/vscode-file-nesting-config)


