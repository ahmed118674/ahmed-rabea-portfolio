/* ==========================================================================
   Renders the page from window.SITE (see js/data.js).
   You normally do not need to edit this file.
   ========================================================================== */
(function () {
  "use strict";

  var S = window.SITE;
  if (!S) { return; }

  /* ---------- helpers ---------- */
  function el(tag, props, kids) {
    var node = document.createElement(tag);
    Object.keys(props || {}).forEach(function (k) {
      var v = props[k];
      if (v === null || v === undefined || v === false) { return; }
      if (k === "class") { node.className = v; }
      else if (k === "text") { node.textContent = v; }
      else { node.setAttribute(k, v === true ? "" : v); }
    });
    (kids || []).forEach(function (c) {
      if (c === null || c === undefined) { return; }
      node.appendChild(typeof c === "string" ? document.createTextNode(c) : c);
    });
    return node;
  }

  // Only allow safe link types
  function safeUrl(u) {
    return typeof u === "string" && /^(https?:\/\/|mailto:|assets\/|\.\/|\/)/i.test(u) ? u : "";
  }

  function $(sel) { return document.querySelector(sel); }

  var NS = "http://www.w3.org/2000/svg";
  function icon(name, cls) {
    var d = ICONS[name];
    var svg = document.createElementNS(NS, "svg");
    svg.setAttribute("viewBox", "0 0 24 24");
    svg.setAttribute("aria-hidden", "true");
    svg.setAttribute("class", "icon" + (cls ? " " + cls : ""));
    if (d.stroke) { svg.setAttribute("data-stroke", ""); }
    var p = document.createElementNS(NS, "path");
    p.setAttribute("d", d.d);
    svg.appendChild(p);
    return svg;
  }

  var ICONS = {
    linkedin: { d: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" },
    facebook: { d: "M9.101 23.691v-7.98H6.627v-3.667h2.474v-1.58c0-4.085 1.848-5.978 5.858-5.978.401 0 .955.042 1.468.103a8.68 8.68 0 0 1 1.141.195v3.325a8.623 8.623 0 0 0-.653-.036 26.805 26.805 0 0 0-.733-.009c-.707 0-1.259.096-1.675.309a1.686 1.686 0 0 0-.679.622c-.258.42-.374.995-.374 1.752v1.297h3.919l-.386 2.103-.287 1.564h-3.246v8.245C19.396 23.238 24 18.179 24 12.044c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.628 3.874 10.35 9.101 11.647Z" },
    whatsapp: { d: "M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" },
    mail: { stroke: true, d: "M3.5 6.5h17v11h-17zM3.8 7l8.2 6.2L20.2 7" },
    arrow: { stroke: true, d: "M7 17 17 7M8.5 7H17v8.5" },
    download: { stroke: true, d: "M12 4v11M7.5 10.8 12 15.3l4.5-4.5M5 19.5h14" },
    copy: { stroke: true, d: "M8.5 8.5h10v11h-10zM5.5 15.5v-11h10" },
    check: { stroke: true, d: "m5 12.5 4.5 4.5L19 7.5" }
  };

  var SOCIALS = [
    { key: "linkedin", label: "LinkedIn", href: function () { return S.links.linkedin; }, shown: function () { return S.links.linkedin; } },
    { key: "facebook", label: "Facebook", href: function () { return S.links.facebook; }, shown: function () { return S.links.facebook; } },
    { key: "whatsapp", label: "WhatsApp", href: function () { return S.links.whatsapp; }, shown: function () { return S.links.whatsapp; } }
  ];

  /* ---------- simple text bindings ---------- */
  document.querySelectorAll('[data-bind="name"]').forEach(function (n) { n.textContent = S.name; });
  document.querySelectorAll('[data-bind="title"]').forEach(function (n) { n.textContent = S.title; });
  document.querySelectorAll('[data-bind="intro"]').forEach(function (n) { n.textContent = S.intro; });
  document.querySelectorAll('[data-bind="brand"]').forEach(function (n) {
    n.textContent = S.name;
  });
  document.title = S.name + " | " + S.title;

  var photo = $("#hero-photo");
  photo.src = S.photo;
  photo.alt = S.photoAlt || S.name;

  /* ---------- hero buttons ---------- */
  var heroActions = $("#hero-actions");
  SOCIALS.forEach(function (s, i) {
    if (!s.shown()) { return; }
    heroActions.appendChild(
      el("a", {
        class: "btn " + (i === 0 ? "btn-primary" : "btn-ghost"),
        href: safeUrl(s.href()), target: "_blank", rel: "noopener noreferrer"
      }, [icon(s.key), el("span", { text: s.label })])
    );
  });
  if (S.links.cv) {
    heroActions.appendChild(
      el("a", { class: "btn btn-text", href: safeUrl(S.links.cv), download: true },
        [icon("download"), el("span", { text: "Download CV" })])
    );
  }

  /* ---------- about ---------- */
  $("#about-h").textContent = S.about.heading;
  var aboutText = $("#about-text");
  S.about.paragraphs.forEach(function (p) { aboutText.appendChild(el("p", { text: p })); });
  var interests = $("#interests");
  S.about.interests.forEach(function (t) { interests.appendChild(el("li", { text: t })); });

  /* ---------- skills ---------- */
  $("#skills-h").textContent = S.labels.skillsHeading;
  var skillsList = $("#skills-list");
  S.skills.forEach(function (t) { skillsList.appendChild(el("li", {}, [el("span", { text: t })])); });

  /* ---------- projects ---------- */
  $("#projects-h").textContent = S.labels.projectsHeading;
  var grid = $("#projects-grid");
  var hasProjects = S.projects && S.projects.length > 0;

  function projectCard(p) {
    var media = p.image
      ? el("img", { src: p.image, alt: "", loading: "lazy" })
      : el("span", { class: "media-empty", "aria-hidden": "true" });
    var card = el("article", { class: "card" }, [
      el("div", { class: "card-media" }, [media]),
      el("div", { class: "card-body" }, [
        el("h3", { text: p.name }),
        el("p", { text: p.description }),
        (p.tech && p.tech.length)
          ? el("ul", { class: "tags", "aria-label": "Technologies" }, p.tech.map(function (t) { return el("li", { text: t }); }))
          : null,
        p.link
          ? el("a", { class: "card-link", href: safeUrl(p.link), target: "_blank", rel: "noopener noreferrer" },
              [el("span", { text: p.linkLabel || "View project" }), icon("arrow")])
          : null
      ])
    ]);
    return card;
  }

  function projectPlaceholder() {
    return el("article", { class: "card card-placeholder" }, [
      el("div", { class: "card-media" }, [el("span", { class: "media-empty", "aria-hidden": "true" })]),
      el("div", { class: "card-body" }, [
        el("h3", { text: "Your project name" }),
        el("p", { text: "A short description of what it does and the problem it solves." }),
        el("ul", { class: "tags", "aria-label": "Technologies" }, ["Flutter", "Dart", "AI"].map(function (t) { return el("li", { text: t }); })),
        el("span", { class: "hint", text: "Placeholder. Add real projects in js/data.js" })
      ])
    ]);
  }

  if (hasProjects) { S.projects.forEach(function (p) { grid.appendChild(projectCard(p)); }); }
  else if (S.settings.showPlaceholders) { for (var i = 0; i < 3; i++) { grid.appendChild(projectPlaceholder()); } }
  else { removeSection("projects"); }

  /* ---------- achievements ---------- */
  $("#ach-h").textContent = S.labels.achievementsHeading;
  var tl = $("#achievements-list");
  var hasAch = S.achievements && S.achievements.length > 0;

  function achItem(a, placeholder) {
    var meta = [a.type, a.organization].filter(Boolean).join(", ");
    return el("li", { class: "tl-item" + (placeholder ? " is-placeholder" : "") }, [
      el("span", { class: "tl-date", text: a.date || "" }),
      el("div", { class: "tl-body" }, [
        el("h3", { text: a.title }),
        meta ? el("p", { class: "tl-meta", text: meta }) : null,
        a.description ? el("p", { text: a.description }) : null,
        a.link ? el("a", { class: "card-link", href: safeUrl(a.link), target: "_blank", rel: "noopener noreferrer" },
          [el("span", { text: "View details" }), icon("arrow")]) : null,
        placeholder ? el("span", { class: "hint", text: "Placeholder. Add real entries in js/data.js" }) : null
      ])
    ]);
  }

  if (hasAch) { S.achievements.forEach(function (a) { tl.appendChild(achItem(a, false)); }); }
  else if (S.settings.showPlaceholders) {
    tl.appendChild(achItem({ date: "Year", title: "Event, competition or certificate title", type: "Type", organization: "Organizer or issuer", description: "A short line about what you did or earned." }, true));
    tl.appendChild(achItem({ date: "Year", title: "Another achievement or experience", type: "Type", organization: "Organization" }, true));
  } else { removeSection("achievements"); }

  function removeSection(id) {
    var s = document.getElementById(id);
    if (s) { s.remove(); }
    S.labels.nav[id] = null;
  }

  /* ---------- navigation (built after sections are resolved) ---------- */
  var navList = $("#nav-list");
  Object.keys(S.labels.nav).forEach(function (id) {
    if (!S.labels.nav[id]) { return; }
    navList.appendChild(el("li", {}, [el("a", { href: "#" + id, "data-nav": id, text: S.labels.nav[id] })]));
  });

  /* ---------- contact ---------- */
  $("#contact-h").textContent = S.labels.contactHeading;
  $("#contact-text").textContent = S.labels.contactText;
  var cl = $("#contact-list");

  function contactRow(key, label, value, href, external) {
    return el("li", {}, [
      el("a", { class: "contact-row", href: safeUrl(href), target: external ? "_blank" : null, rel: external ? "noopener noreferrer" : null }, [
        icon(key, "contact-icon"),
        el("span", { class: "contact-label", text: label }),
        el("span", { class: "contact-value", text: value }),
        icon("arrow", "contact-arrow")
      ])
    ]);
  }

  if (S.links.linkedin) { cl.appendChild(contactRow("linkedin", "LinkedIn", S.name, S.links.linkedin, true)); }
  if (S.links.facebook) { cl.appendChild(contactRow("facebook", "Facebook", S.name, S.links.facebook, true)); }
  if (S.links.whatsapp) { cl.appendChild(contactRow("whatsapp", "WhatsApp", S.links.whatsappNumber || "Message me", S.links.whatsapp, true)); }
  if (S.links.email) {
    var emailLi = contactRow("mail", "Email", S.links.email, "mailto:" + S.links.email, false);
    var copyBtn = el("button", { class: "copy-btn", type: "button", "aria-label": "Copy email address" }, [icon("copy")]);
    copyBtn.addEventListener("click", function () {
      function done() {
        copyBtn.replaceChildren(icon("check"));
        copyBtn.setAttribute("aria-label", "Email copied");
        setTimeout(function () { copyBtn.replaceChildren(icon("copy")); copyBtn.setAttribute("aria-label", "Copy email address"); }, 1800);
      }
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(S.links.email).then(done, function () {});
      }
    });
    emailLi.classList.add("has-copy");
    emailLi.appendChild(copyBtn);
    cl.appendChild(emailLi);
  }

  $("#footer-copy").textContent = "© " + new Date().getFullYear() + " " + S.name;

  /* ---------- theme ---------- */
  var root = document.documentElement;
  var toggle = $("#theme-toggle");
  function systemDark() { return window.matchMedia && matchMedia("(prefers-color-scheme: dark)").matches; }
  function currentTheme() { return root.getAttribute("data-theme") || (systemDark() ? "dark" : "light"); }
  if (!root.getAttribute("data-theme") && (S.settings.defaultTheme === "light" || S.settings.defaultTheme === "dark")) {
    root.setAttribute("data-theme", S.settings.defaultTheme);
  }
  function syncThemeColor() {
    var m = document.querySelector('meta[name="theme-color"]');
    if (m) { m.setAttribute("content", currentTheme() === "dark" ? "#0A0F22" : "#EDF0F7"); }
  }
  syncThemeColor();
  toggle.addEventListener("click", function () {
    var next = currentTheme() === "dark" ? "light" : "dark";
    root.setAttribute("data-theme", next);
    try { localStorage.setItem("theme", next); } catch (e) {}
    syncThemeColor();
  });

  /* ---------- mobile menu ---------- */
  var menuBtn = $("#menu-toggle");
  var nav = $("#nav");
  function setMenu(open) {
    nav.classList.toggle("is-open", open);
    menuBtn.setAttribute("aria-expanded", open ? "true" : "false");
    menuBtn.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    document.body.classList.toggle("menu-open", open);
  }
  menuBtn.addEventListener("click", function () { setMenu(!nav.classList.contains("is-open")); });
  nav.addEventListener("click", function (e) { if (e.target.closest("a")) { setMenu(false); } });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape") { setMenu(false); } });

  /* ---------- active nav link ---------- */
  if ("IntersectionObserver" in window) {
    var links = {};
    document.querySelectorAll("[data-nav]").forEach(function (a) { links[a.getAttribute("data-nav")] = a; });
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting && links[en.target.id]) {
          Object.keys(links).forEach(function (k) { links[k].removeAttribute("aria-current"); });
          links[en.target.id].setAttribute("aria-current", "true");
        }
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    Object.keys(links).forEach(function (id) { var s = document.getElementById(id); if (s) { io.observe(s); } });
  }

  /* ---------- badge tilt (responds to the pointer, off for reduced motion) ---------- */
  var badge = $("#badge");
  var reduce = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (!reduce && window.matchMedia && matchMedia("(hover: hover)").matches) {
    var stage = badge.parentElement;
    stage.addEventListener("pointermove", function (e) {
      var r = stage.getBoundingClientRect();
      var x = (e.clientX - r.left) / r.width - 0.5;
      var y = (e.clientY - r.top) / r.height - 0.5;
      badge.style.setProperty("--ry", (x * 9).toFixed(2) + "deg");
      badge.style.setProperty("--rx", (-y * 7).toFixed(2) + "deg");
    });
    stage.addEventListener("pointerleave", function () {
      badge.style.setProperty("--ry", "0deg");
      badge.style.setProperty("--rx", "0deg");
    });
  }
})();
