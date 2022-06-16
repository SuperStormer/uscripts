// ==UserScript==
// @name         sb.ltn.fi imprecise times
// @namespace    mchang.name
// @version      1.1.1
// @description  Make all times on sb.ltn.fi imprecise
// @author       mchangrh
// @match        https://sb.ltn.fi/*
// @icon         https://sb.ltn.fi/static/browser/logo.png
// @grant        none
// @updateURL    https://gist.github.com/mchangrh/9507604353e37b6abc2f7f6b3c6e1338/raw/sbltnfi-imprecise-times.user.js
// @downloadURL  https://gist.github.com/mchangrh/9507604353e37b6abc2f7f6b3c6e1338/raw/sbltnfi-imprecise-times.user.js
// ==/UserScript==

// replace consequtive zeros at the end (that also follows a .) with nothing
const reduceTime = time => time.replace(/(?<=\.\d+)0+$/g, '');

function findTimes() {
  const headers = [document.querySelectorAll("thead th")].map((item) =>
    item.textContent.trim()
  );
  // get all header indexes
  const startIndex = headers.indexOf("Start");
  const endIndex = headers.indexOf("End");
  const lengthIndex = headers.indexOf("Length")
  table.querySelectorAll("tbody tr").forEach((row) => {
    for (const index of [startIndex, endIndex, lengthIndex]) {
      // skip if index is -1
      if (index === -1) continue
      let cell = row.children[index]
      // loop into the deepest element to not break any other scripts
      while (cell.firstChild) cell = cell.firstChild
      // replace value
      const oldValue = cell.textContent
      cell.textContent = reduceTime(oldValue);
    }
  });
}

(function () {
  "use strict";
  findTimes();
  document.addEventListener("newSegments", (event) => findTimes());
})();