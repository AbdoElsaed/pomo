const { app, BrowserWindow } = require("electron");
const path = require("node:path");

const IS_DEV = process.env.IS_IN_DEVELOPMENT || false;

function createWindow() {
  const win = new BrowserWindow({
    width: 400,
    height: 450,
    webPreferences: {
      nodeIntegration: true,
      enableRemoteModule: true,
    },
  });

  if (IS_DEV) {
    win.loadURL("http://localhost:3000");
    win.webContents.openDevTools();
  } else {
    win.loadURL(`file://${path.join(__dirname, "..", "app", "index.html")}`);
  }
}

app.whenReady().then(createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
