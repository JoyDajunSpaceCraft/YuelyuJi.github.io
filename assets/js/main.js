/* Yuelyu Ji — site behaviour. No dependencies. */
(function () {
  "use strict";

  var root = document.documentElement;

  /* ---------- Theme toggle ---------- */
  var toggle = document.getElementById("themeToggle");
  if (toggle) {
    toggle.addEventListener("click", function () {
      var next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
      root.setAttribute("data-theme", next);
      try { localStorage.setItem("theme", next); } catch (e) { /* private mode */ }
    });
  }

  /* ---------- Mobile menu ---------- */
  var burger = document.getElementById("burger");
  var navLinks = document.getElementById("navLinks");
  if (burger && navLinks) {
    burger.addEventListener("click", function () {
      var open = navLinks.classList.toggle("is-open");
      burger.setAttribute("aria-expanded", String(open));
    });
    navLinks.addEventListener("click", function (e) {
      if (e.target.tagName === "A") {
        navLinks.classList.remove("is-open");
        burger.setAttribute("aria-expanded", "false");
      }
    });
  }

  /* ---------- Nav border once scrolled ---------- */
  var nav = document.getElementById("nav");
  if (nav) {
    var onScroll = function () { nav.classList.toggle("is-stuck", window.scrollY > 8); };
    addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  /* ---------- Scrollspy: highlight the section you're reading ----------
     Position-based rather than "first intersecting element": adjacent sections
     overlap the observation band by a pixel or two, and the earlier one would
     always win. Here the active section is simply the last one whose top has
     passed under the nav. */
  var links = Array.prototype.slice.call(document.querySelectorAll('.nav__links a[href^="#"]'));
  var sections = links
    .map(function (a) { return document.querySelector(a.getAttribute("href")); })
    .filter(Boolean);

  if (sections.length) {
    var ticking = false;
    var syncSpy = function () {
      ticking = false;
      var current = sections[0];
      for (var i = 0; i < sections.length; i++) {
        if (sections[i].getBoundingClientRect().top <= 100) current = sections[i];
      }
      // At the very bottom the last section may never cross the line; claim it anyway.
      if (innerHeight + scrollY >= document.body.scrollHeight - 2) {
        current = sections[sections.length - 1];
      }
      links.forEach(function (a) {
        a.classList.toggle("is-active", a.getAttribute("href") === "#" + current.id);
      });
    };
    var requestSpy = function () {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(syncSpy);
    };
    addEventListener("scroll", requestSpy, { passive: true });
    addEventListener("resize", requestSpy);
    syncSpy();
  }

  /* ---------- News: collapse to the latest handful ---------- */
  var newsList = document.getElementById("newsList");
  var newsMore = document.getElementById("newsMore");
  if (newsList && newsMore) {
    var shown = 6;
    if (newsList.children.length <= shown) {
      newsList.setAttribute("data-collapsed", "false");
      newsMore.hidden = true;
    }
    newsMore.addEventListener("click", function () {
      var collapsed = newsList.getAttribute("data-collapsed") === "true";
      newsList.setAttribute("data-collapsed", collapsed ? "false" : "true");
      newsMore.setAttribute("aria-expanded", String(collapsed));
      newsMore.textContent = collapsed ? "Show less" : "Show all news";
    });
  }

  /* ---------- Publication filter ---------- */
  var filters = document.getElementById("pubFilters");
  var pubList = document.getElementById("pubList");
  if (filters && pubList) {
    var pubs = Array.prototype.slice.call(pubList.querySelectorAll(".pub"));
    var years = Array.prototype.slice.call(pubList.querySelectorAll(".pub-year"));

    var matches = function (pub, filter) {
      if (filter === "all") return true;
      if (filter === "selected") return pub.classList.contains("pub--selected");
      return pub.dataset.type === filter;
    };

    filters.addEventListener("click", function (e) {
      var btn = e.target.closest("button[data-filter]");
      if (!btn) return;
      var filter = btn.dataset.filter;

      filters.querySelectorAll("button").forEach(function (b) {
        b.setAttribute("aria-pressed", String(b === btn));
      });

      pubs.forEach(function (pub) {
        pub.hidden = !matches(pub, filter);
      });

      // Hide a year heading when every paper under it is filtered out.
      years.forEach(function (heading) {
        var any = pubs.some(function (pub) {
          return pub.dataset.year === heading.dataset.year && !pub.hidden;
        });
        heading.hidden = !any;
      });
    });
  }

  /* ---------- Footer year ---------- */
  var year = document.getElementById("year");
  if (year) year.textContent = String(new Date().getFullYear());
})();
