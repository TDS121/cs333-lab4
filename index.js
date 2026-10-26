/*
Lab 4 Part 1: QR code generator

1. Ask the user for a URL with the @inquirer/prompts package.
2. Turn it into a QR code PNG with the qrcode package.
3. Save every URL, with the date and time, to urls.txt using node:fs/promises.
4. Tell the user it worked.
*/

import { input } from "@inquirer/prompts";
import QRCode from "qrcode";
import { appendFile } from "node:fs/promises";

// Step A + C: ask for a web address, and only accept a real URL
const url = await input({
  message: "Which website should the QR code point to?",
  validate: function (value) {
    if (URL.canParse(value)) {
      return true;
    }
    return "Type the whole address, starting with https://";
  },
});
console.log("You typed:", url);

// Step B + D: make the QR code and name the file after the website
const filename = new URL(url).hostname + ".png";
await QRCode.toFile(filename, url);
console.log("Saved", filename);

// Step E: keep a list of every address
await appendFile("urls.txt", url + "\n");
console.log("Added it to urls.txt");

// Step F: show the QR code in the terminal too
const picture = await QRCode.toString(url, { type: "terminal", small: true });
console.log(picture);
