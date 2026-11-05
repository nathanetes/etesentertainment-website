(function () {
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Pressed type: split the wordmark into letters with a slight, fixed tilt each.
  var seed = 11;
  function rnd() { seed = (seed * 9301 + 49297) % 233280; return seed / 233280; }
  var n = 0;
  document.querySelectorAll(".wordmark .ink").forEach(function (line) {
    var text = line.textContent;
    line.textContent = "";
    line.setAttribute("aria-hidden", "true");
    for (var i = 0; i < text.length; i++) {
      var s = document.createElement("span");
      s.className = "ch";
      s.textContent = text[i];
      var r = (rnd() * 1.2 - 0.6).toFixed(2) + "deg";
      s.style.setProperty("--r", r);
      s.style.setProperty("--i", n++);
      s.style.transform = "rotate(" + r + ")";
      line.appendChild(s);
    }
  });
  var h1 = document.getElementById("company");
  if (h1) h1.setAttribute("aria-label", "Etes Entertainment");

  // Boot screen: first visit per session only, skipped for reduced motion.
  var seen = false;
  try { seen = sessionStorage.getItem("etes-booted") === "1"; } catch (e) {}
  if (!reduce && !seen) {
    var boot = document.createElement("div");
    boot.className = "boot";
    boot.setAttribute("aria-hidden", "true");
    boot.innerHTML =
      '<div class="boot-win"><div class="titlebar"><span class="name">Etes Entertainment LLC</span>' +
      '<span class="btns"><span class="x">×</span></span></div>' +
      '<div class="boot-body"><span>Loading A1 Records catalog…</span>' +
      '<div class="boot-track"><div class="boot-fill"></div></div>' +
      '<span class="muted">Est. 2024</span></div></div>';
    document.body.appendChild(boot);
    requestAnimationFrame(function () {
      requestAnimationFrame(function () { boot.querySelector(".boot-fill").style.width = "100%"; });
    });
    setTimeout(function () {
      boot.classList.add("out");
      document.body.classList.add("press");
      setTimeout(function () { boot.remove(); }, 400);
    }, 1000);
    try { sessionStorage.setItem("etes-booted", "1"); } catch (e) {}
  }

  // Barcode drawn from the catalog prefix.
  var bc = document.getElementById("barcode");
  if (bc) {
    var code = "A1R-NE-ETES2024", bars = [];
    for (var i = 0; i < code.length; i++) {
      var c = code.charCodeAt(i);
      for (var b = 0; b < 4; b++) bars.push(((c >> b) & 3) + 1);
    }
    var total = bars.reduce(function (a, b) { return a + b; }, 0) + bars.length;
    var narrow = window.matchMedia("(max-width: 560px)");
    var drawBars = function () {
      var horiz = narrow.matches, pos = 0, out = "";
      bc.setAttribute("viewBox", horiz ? "0 0 " + total + " 10" : "0 0 10 " + total);
      bc.setAttribute("preserveAspectRatio", "none");
      bars.forEach(function (w, idx) {
        if (idx % 2 === 0) out += horiz
          ? '<rect x="' + pos + '" y="0" width="' + w + '" height="10" fill="#EEF0EC"/>'
          : '<rect x="0" y="' + pos + '" width="10" height="' + w + '" fill="#EEF0EC"/>';
        pos += w + 1;
      });
      bc.innerHTML = out;
    };
    drawBars();
    if (narrow.addEventListener) narrow.addEventListener("change", drawBars);
  }

  // Live meter: bars move gently while the strip is on screen.
  var wave = document.getElementById("wave");
  if (wave) {
    var N = 160, base = [], rects = [];
    seed = 2024;
    wave.setAttribute("viewBox", "0 0 " + (N * 6) + " 64");
    var line = document.createElementNS("http://www.w3.org/2000/svg", "line");
    line.setAttribute("x1", 0); line.setAttribute("y1", 32); line.setAttribute("x2", N * 6); line.setAttribute("y2", 32);
    line.setAttribute("stroke", "#EEF0EC"); line.setAttribute("stroke-opacity", ".5");
    wave.appendChild(line);
    for (var k = 0; k < N; k++) {
      var env = 0.35 + 0.65 * Math.abs(Math.sin(k / 13)) * (0.6 + 0.4 * Math.sin(k / 37));
      base.push(env * (20 + rnd() * 38));
      var r = document.createElementNS("http://www.w3.org/2000/svg", "rect");
      r.setAttribute("x", k * 6); r.setAttribute("width", 3);
      wave.appendChild(r); rects.push(r);
    }
    var visible = true, last = 0;
    var paint = function (t) {
      for (var j = 0; j < N; j++) {
        var mod = reduce ? 1 : 0.72 + 0.28 * Math.sin(t / 260 + j * 0.45) * Math.sin(t / 610 + j * 0.13);
        var hh = Math.max(3, Math.min(60, base[j] * mod));
        rects[j].setAttribute("y", (32 - hh / 2).toFixed(1));
        rects[j].setAttribute("height", hh.toFixed(1));
        rects[j].setAttribute("fill", hh > 44 ? "#FF5A1F" : "#EEF0EC");
      }
    };
    paint(0);
    if (!reduce) {
      if ("IntersectionObserver" in window) {
        new IntersectionObserver(function (e) { visible = e[0].isIntersecting; }).observe(wave);
      }
      var loop = function (t) {
        if (visible && t - last > 50) { paint(t); last = t; }
        requestAnimationFrame(loop);
      };
      requestAnimationFrame(loop);
    }
  }

  // Status bar clock in Central time.
  var clock = document.getElementById("clock");
  if (clock) {
    var tick = function () {
      try {
        clock.textContent = new Date().toLocaleTimeString("en-US", { timeZone: "America/Chicago", hour: "numeric", minute: "2-digit" }) + " Chicago";
      } catch (e) { clock.textContent = "Central Time"; }
    };
    tick();
    setInterval(tick, 15000);
  }

  // Copy button for the management address.
  document.querySelectorAll("[data-copy]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var text = btn.getAttribute("data-copy");
      var done = function () { btn.textContent = "Copied"; setTimeout(function () { btn.textContent = "Copy address"; }, 1800); };
      var select = function () {
        var el = document.getElementById("mgmt");
        var range = document.createRange(); range.selectNodeContents(el);
        var sel = window.getSelection(); sel.removeAllRanges(); sel.addRange(range);
      };
      if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(text).then(done, select);
      else select();
    });
  });
})();
