console.log("Hello react from Electron");

const { app, BrowserWindow } = require("electron");
const path = require("path");
let mainWindow;

function createWindow() {
	mainWindow = new BrowserWindow({
		width: 800,
		height: 600,
		webPreferences: {
			preload: path.join(__dirname, "preload.js"),
			nodeIntegration: true,
		},
	});

	const SHOW_REACT_APP = true; // To see react app or basic html app
	const startURL = "http://localhost:5173"; // react-vite app url

	if (SHOW_REACT_APP) {
		mainWindow.loadURL(startURL);
	} else {
		// basic html file to show on electron
		mainWindow.loadFile("index.html");
	}

	mainWindow.on("closed", () => (mainWindow = null));
}

app.on("ready", createWindow);

app.on("window-all-closed", () => {
	if (process.platform !== "darwin") {
		app.quit();
	}
});

app.on("activate", () => {
	if (mainWindow === null) {
		createWindow();
	}
});
