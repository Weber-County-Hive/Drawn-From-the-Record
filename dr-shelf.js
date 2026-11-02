/* Drawn From the Record: call-number block at the bottom of the page, page tools
   at the top, and the Top button. Reads the one shared shelf list in the Hive
   library (hive-shelves.js), so a call number from any Hive repo works here. */
(function () {
  var LIST_URL = "https://weber-county-hive.github.io/-weber-county-hive-index/hive-shelves.js";
  var ME = { callNumber: "DR 000.01", name: "The record, drawn out: every Hive cartoon" };
  var esc = function (s) { return String(s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); };
  function ready(fn) {
    if (window.HIVE_SHELVES) return fn();
    var s = document.createElement("script"); s.src = LIST_URL + "?v=1"; s.onload = fn; s.onerror = fn; document.head.appendChild(s);
  }
  function shelves() { return window.HIVE_SHELVES || [{ prefix: "HL", name: "Hive library", url: "https://weber-county-hive.github.io/-weber-county-hive-index/index.html" }]; }

  var box = document.getElementById("dr-shelf");
  if (box) {
    box.innerHTML =
      '<div class="dr-cn-big">Call number <b>' + ME.callNumber + '</b> · Shelf DR 000 · Drawn From the Record</div>' +
      '<div class="dr-nav"><a class="dr-nav-btn" href="https://weber-county-hive.github.io/-weber-county-hive-index/index.html">← <b>HL 000.00</b> The Hive library (every repo)</a><span class="dr-nav-btn dr-off">End of shelf →</span></div>' +
      '<details class="dr-list"><summary>See every page on this shelf, by call number</summary><ol><li class="dr-shelf-head">DR 000 · Drawn From the Record</li><li class="dr-here"><a href="index.html"><span class="dr-cn">DR 000.01</span> ' + esc(ME.name) + ' <em>(you are here)</em></a></li></ol></details>' +
      '<form class="dr-find" id="dr-find" role="search"><label for="dr-q">Look up a call number, name or topic</label>' +
      '<div><input id="dr-q" type="search" placeholder="e.g. FD 200.03, UP 200.01 or MIDA"><button type="submit">Search</button></div></form>' +
      '<div class="dr-search" id="dr-find-out">Names and topics search the cartoons on this page.</div>';
    ready(function () {
      var out = document.getElementById("dr-find-out");
      out.innerHTML = "Names and topics search the cartoons on this page. Call numbers from every shelf work here: " + shelves().map(function (s) {
        return '<a href="' + s.url + '"><b>' + s.prefix + "</b> = " + esc(s.name) + "</a>";
      }).join(" · ") + ".";
    });
    document.getElementById("dr-find").addEventListener("submit", function (e) {
      e.preventDefault();
      var v = document.getElementById("dr-q").value;
      var m = String(v).trim().toUpperCase().match(/^([A-Z]{1,5})\s*(\d{3}(?:\.\d{1,2})?)$/);
      if (m && m[1] !== "DR") {
        var hit = shelves().filter(function (s) { return s.prefix === m[1]; })[0];
        if (hit) { location.href = hit.url + "?q=" + encodeURIComponent(m[1] + " " + m[2]); return; }
        document.getElementById("dr-find-out").innerHTML = "Call number <b>" + esc(m[1] + " " + m[2]) + "</b>: that shelf doesn't have call numbers yet. Try a name or topic instead.";
        return;
      }
      if (m) { document.getElementById("comics").scrollIntoView({ behavior: "smooth" }); return; }
      var t = String(v).trim().toLowerCase(); if (!t) return;
      var hits = [].slice.call(document.querySelectorAll(".comic-card")).filter(function (c) { var alt = [].map.call(c.querySelectorAll("img"), function (i) { return i.alt; }).join(" "); return (c.textContent + " " + alt).toLowerCase().indexOf(t) > -1; });
      var all = document.querySelector('.filter[data-filter="all"]'); if (all) all.click();
      document.getElementById("dr-find-out").innerHTML = hits.length ? hits.length + " cartoon" + (hits.length === 1 ? "" : "s") + " mention <b>" + esc(v) + "</b>. Showing the first one." : "No cartoon mentions <b>" + esc(v) + "</b>. Try another word.";
      if (hits[0]) { hits[0].scrollIntoView({ behavior: "smooth", block: "center" }); hits[0].style.outline = "4px solid #f4c43d"; setTimeout(function () { hits[0].style.outline = ""; }, 3000); }
    });
  }

  /* Page tools under the header */
  var hook = document.getElementById("dr-tools");
  if (hook) {
    var url = location.href.split("#")[0].split("?")[0];
    hook.innerHTML =
      '<a class="dr-tool dr-cnchip" href="#dr-shelf" title="Jump to the call number and search">Call number <b>' + ME.callNumber + '</b> ↓</a>' +
      '<a class="dr-tool" href="#about">Why comics?</a>' +
      '<button type="button" class="dr-tool" id="dr-copy">Copy link</button>' +
      '<a class="dr-tool" target="_blank" rel="noopener" href="https://www.facebook.com/sharer/sharer.php?u=' + encodeURIComponent(url) + '">Share on Facebook</a>';
    var cb = document.getElementById("dr-copy");
    cb.addEventListener("click", function () {
      var done = function () { cb.textContent = "Link copied ✓"; setTimeout(function () { cb.textContent = "Copy link"; }, 2500); };
      try { navigator.clipboard.writeText(url).then(done, function () { window.prompt("Copy this link:", url); }); }
      catch (e) { window.prompt("Copy this link:", url); }
    });
  }
  var top = document.createElement("a");
  top.href = "#"; top.className = "dr-totop"; top.textContent = "↑ Top"; top.setAttribute("aria-label", "Back to top of page");
  top.addEventListener("click", function (e) { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); });
  document.body.appendChild(top);
  var showTop = function () { top.style.display = window.scrollY > 900 ? "block" : "none"; };
  window.addEventListener("scroll", showTop, { passive: true }); showTop();
})();
