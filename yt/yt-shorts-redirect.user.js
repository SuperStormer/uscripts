// ==UserScript==
// @name         YT Shorts Redirect
// @namespace    mchang.name
// @version      1.0.0
// @description  Better YT Shorts redirector
// @author       michael mchang.name
// @match        https://*.youtube.com/*
// @match        https://m.youtube.com/*
// @icon         https://www.google.com/s2/favicons?domain=youtube.com
// @updateURL    https://raw.githubusercontent.com/mchangrh/uscripts/main/yt/yt-shorts-redirect.user.js
// @downloadURL  https://raw.githubusercontent.com/mchangrh/uscripts/main/yt/yt-shorts-redirect.user.js
// @grant        none
// ==/UserScript==

const redirect = (input, force = false) => {
  const [path, videoID] = input.split("/").slice(1);
  if (force || path === "shorts") window.location.replace(`https://www.youtube.com/watch?v=${videoID}`);
}

const startEventHook = (e) => {
  if (e.detail.pageType == "shorts") redirect(e.detail.url, true)
}
const mobileEventHook = (e) => redirect(e.detail.href)

document.addEventListener("yt-navigate-start", startEventHook);
window.addEventListener("state-navigatestart", mobileEventHook)
redirect(window.location.pathname)