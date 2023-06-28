---
title: electron踩坑
date: 2022-04-17
icon: mdi:electron-framework
tag: electron
description: electron 初始化
---

## VUE+ELECTRON+VITE
初始化项目
```bash
npm init vite # 初始vite
cd
npm i
cnpm i electron 
cnpm i electron-plugin-vite -D
```
创建electron/index.ts
```js
import { app, BrowserWindow } from 'electron'
import winState from 'electron-win-state'
const createWindow = () => {
    let mainWindowState = new winState({
        defaultWidth: 1000,
        defaultHeight: 800
    });
    const win = new BrowserWindow({
        height: mainWindowState.height,
        width: mainWindowState.width,
        x: mainWindowState.x,
        y: mainWindowState.y
    })
    win.loadURL(`${process.env['VITE_DEV_SERVER_URL']}`)
    mainWindowState.manage(win)
}
app.whenReady().then(() => {
    createWindow()
    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })
})
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
})
```

修改vite.config.ts
```js
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import electron from 'vite-plugin-electron'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), electron({
    entry: "electron/index.ts"
  })],
})
```

修改package.json
```json
{
  "name": "vue3-electron-vite",
  "private": true,
  "version": "0.0.0",
  "main": "dist/electron/index.js",
  "scripts": {
    "dev": "cross-env NODE_ENV=development vite",
    "build": "vue-tsc && vite build && electron-builder",
    "preview": "vite preview"
  },
  "dependencies": {
    "cross-env": "^7.0.3",
    "electron-win-state": "^1.1.22",
    "vue": "^3.2.37"
  },

  "devDependencies": {
    "@vitejs/plugin-vue": "^3.0.0",
    "electron": "^19.0.10",
    "electron-builder": "^23.1.0",
    "typescript": "^4.6.4",
    "vite": "^3.0.0",
    "vite-plugin-electron": "^0.8.3",
    "vue-tsc": "^0.38.4"
  },

  "build": {
    "appId": "com.electron.desktop",
    "productName": "electron",
    "asar": true,
    "copyright": "Copyright © 2022 electron",
    "directories": {
      "output": "release/"
    },

    "files": [
      "dist"
    ],
    "mac": {
      "artifactName": "${productName}_${version}.${ext}",
      "target": [
        "dmg"
      ]

    },

    "win": {
      "target": [
        {
          "target": "nsis",
          "arch": [
            "x64"
          ]
        }
      ],
      "artifactName": "${productName}_${version}.${ext}"
    },
    "nsis": {
      "oneClick": false,
      "perMachine": false,
      "allowToChangeInstallationDirectory": true,
      "deleteAppDataOnUninstall": false
    },
    "publish": [
      {
        "provider": "generic",
        "url": "http://127.0.0.1:8080"
      }
    ],
    "releaseInfo": {
      "releaseNotes": "版本更新的具体内容"
    }
  }
}
```
打包electron
```bash
npm i electron-builder@23.1.0
npm run build
```

### 子进程向主进程
```vue
// 渲染进程
<script setup lang="ts">
import { ipcRenderer } from 'electron'
const send = () => {
  ipcRenderer.send("message", 123123123)
}
</script>

// 主进程
ipcMain.on("message", (_, e) => {
        console.log(e, '来了');
})
```
### 主进程向子进程
```js
// 主进程
setTimeout(() => {
        win.webContents.send("load", { message: "electron初始化了" })
 }, 1000)
// 子进程
ipcRenderer.on("load", (_, data) => {
  console.log(data);
})
```

## 打包的坑
==注意版本==  
==解决第一次打包慢==  
electron-builder第一次会去在github上下载一些文件。我们可以手动下载并且放在相应文件下。

### 组件通信的坑
### 白屏现象
在vite.config,ts里面加上
```ts
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import electron from 'vite-plugin-electron'
import electronRenderer from 'vite-plugin-electron-renderer'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), electron({
    main: {
      entry: "./electron/index.ts"
    }
  }), electronRenderer()],
})
```
### vscode开发环境乱码
在npm script中加上
```json
"dev": "chcp 65001 && cross-env NODE_ENV=development vite",
```
### 通信之间，在主进程要加上
```js
const win = new BrowserWindow({
        height: 500,
        width: 1000,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false
        }
})
```

### 开发环境和生产环境不一致 isPackage不管用
使用cross-env声明环境变量
```bash
"dev": "chcp 65001 && cross-env NODE_ENV=development vite",
```
```js
 if (process.env.NODE_ENV != 'development') {
        win.loadFile(path.join(__dirname, "../index.html"));
    } else {
        win.loadURL(`${process.env['VITE_DEV_SERVER_URL']}`)
    }
```
