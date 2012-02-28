// Lengthy v1.0.1.1.1.1
// Copyright (c) 2012 Rémi Prévost <http://exomel.com>
// Freely distributable under the terms of the MIT license.
// <http://github.com/remiprev/lengthy>

// Heading Anchors v1.0.2 (modified version by Rémi Prévost)
// Copyright (c) 2010-2012 Rafaël Blais Masson <http://twitter.com/rafBM>
// Freely distributable under the terms of the MIT license.
// <http://github.com/rafBM/heading-anchors>

window.Lengthy = {

  $: function(selector) { // {{{
    return [].slice.call(document.querySelectorAll(selector), 0)
  }, // }}}

  init: function() { // {{{

    var readme = document.getElementById("readme")
    if (!readme) { return true; }

    var name = readme.getElementsByClassName("name")[0]
    if (!name) { return true; }

    var toc = document.createElement("div")
      , article = readme.getElementsByClassName("markdown-body")[0]
      , toggle = document.createElement('a')
      , firstElement = article.childNodes[0]

    // Table of contents
    toc.id = "lengthy-toc"
    toc.style.display = "none"
    toc.innerHTML = "<p>Contents</p>"

    if (firstElement && firstElement.nodeType == Node.ELEMENT_NODE) {
      firstElement.style.marginTop = firstElement.style.paddingTop = "0"
    }
    article.insertBefore(toc, article.childNodes[0])

    // Toggle link
    toggle.className = "lengthy-toc-toggle"
    toggle.setAttribute("href", "javascript://")
    toggle.innerHTML = "▼"
    toggle.addEventListener("click", function() {
      if (toc.style.display == "none") {
        toc.style.display = "block"
        this.innerHTML = "▲"
      } else {
        toc.style.display = "none"
        this.innerHTML = "▼"
      }
    })

    name.style.position = "relative"
    name.appendChild(toggle)

    // Populate the table of contents
    this.populateToc()
  }, // }}}

  populateToc: function() { // {{{
    // Most of this method code was extracted from @rafBM’s excellent <https://github.com/rafBM/heading-anchors> library
    var slugize = function(str) { return str.replace(/['’]/g, '').replace(/[^a-z0-9]+/ig, '-') }
    var existingSlugsNumbers = {}
      , selector = ".markdown-body h1, .markdown-body h2, .markdown-body h3, .markdown-body h4, .markdown-body h5, .markdown-body h6"

    this.$(selector).forEach(function(heading) {
      var anchor = document.createElement('a')
        , item = document.createElement('li')
        , slug = slugize(heading.id ? heading.id : heading.textContent)
        , title = heading.textContent
        , level = parseInt(heading.tagName.replace(/\w/, ""))

      // if slug #Foo-bar already exists, create #Foo-bar-2, #Foo-bar-3 and so on
      if (slug in existingSlugsNumbers) {
        existingSlugsNumbers[slug] += 1
        slug += '-' + existingSlugsNumbers[slug]
      } else {
        existingSlugsNumbers[slug] = 1
      }

      // Add the anchor element to the heading
      anchor.href = "#"+slug
      anchor.innerHTML = " ¶"
      anchor.className = "heading-anchor"
      heading.id = slug
      heading.appendChild(anchor)

      // Add the link in the table of contents
      var toc = document.getElementById("lengthy-toc")
      item.innerHTML = "<a href='#"+slug+"'>" + title + "</a>"
      item.style.marginLeft = (5 + (level - 1) * 20)+"px"
      toc.appendChild(item)
    })

    var headingInHash = document.getElementById(location.hash.substr(1))
    if (headingInHash)
      window.scrollTo(0, headingInHash.offsetTop)
  } // }}}

}

window.Lengthy.init();
