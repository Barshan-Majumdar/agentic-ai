#!/usr/bin/env node

const { spawn } = require("node:child_process");
const path = require("node:path");

const packageDir = __dirname;
const indexPath = path.join(packageDir, "index.js");

const child = spawn(process.execPath, [indexPath, ...process.argv.slice(2)], {
  stdio: "inherit",
});

child.on("exit", (code, signal) => {
  if (signal) {
    process.kill(process.pid, signal);
  } else {
    process.exit(code ?? 0);
  }
});
