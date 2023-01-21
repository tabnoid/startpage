/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */

/**
 * Search function
 */

const searchInput = document.querySelector("#searchbar > input")
const searchButton = document.querySelector("#searchbar > button")

const lookup = {"/":"/","deepl":"https://deepl.com/","reddit":"https://reddit.com/","maps":"https://maps.google.com/"}
const engine = "google"
const engineUrls = {
  deepl: "https://www.deepl.com/translator#-/-/",
  duckduckgo: "https://duckduckgo.com/?q=",
  ecosia: "https://www.ecosia.org/search?q=",
  google: "https://www.google.com/search?q=",
  startpage: "https://www.startpage.com/search?q=",
  youtube: "https://www.youtube.com/results?q=",
}

const isWebUrl = value => {
  try {
    const url = new URL(value)
    return url.protocol === "http:" || url.protocol === "https:"
  } catch {
    return false
  }
}

const getTargetUrl = value => {
  if (isWebUrl(value)) return value
  if (lookup[value]) return lookup[value]
  return engineUrls[engine] + value
}

const search = () => {
  const value = searchInput.value
  const targetUrl = getTargetUrl(value)
  window.open(targetUrl, "_self")
}

searchInput.onkeyup = event => event.key === "Enter" && search()
searchButton.onclick = search

/**
 * inject bookmarks into html
 */

const bookmarks = [{"id":"2SyguLdM5h7QSjt5","label":"reddit","bookmarks":[{"id":"zXe0kduQyvYWUoTi","label":"r/startpages","url":"https://www.reddit.com/r/startpages/"},{"id":"VO07eCpUf6mZfsAO","label":"r/typescript","url":"https://www.reddit.com/r/typescript/"},{"id":"EFzLmcZC0NmVJw4j","label":"r/reactjs","url":"https://www.reddit.com/r/reactjs/"}]},{"id":"mAGbpGyoLkglQzW0","label":"design tools","bookmarks":[{"id":"SSivSG3Q7cYKhYN8","label":"pixlrx","url":"https://pixlr.com/x/"},{"id":"T5ADMMCAX1shKNg7","label":"image enlarger","url":"https://bigjpg.com/en"},{"id":"rzQWCvBSSQpCVa3n","label":"haikei","url":"https://app.haikei.app/"},{"id":"Dhm15O8FUUuQB15g","label":"css gradients","url":"https://larsenwork.com/easing-gradients/"}]},{"id":"SV2tPFEDp6j1qYWM","label":"worth reading","bookmarks":[{"id":"csDNAtGqTDxszlSA","label":"happy hues","url":"https://www.happyhues.co/"},{"id":"vpWORALmvfagodpq","label":"styled-components","url":"https://www.joshwcomeau.com/react/demystifying-styled-components/"},{"id":"mrf7k5D1s0UUrpGK","label":"react docs","url":"https://reactjs.org/docs/getting-started.html"}]},{"id":"fVovZtErVNhh1xwi","label":"sources","bookmarks":[{"id":"6eChQ13l92hNpu4z","label":"icons","url":"https://feathericons.com/"},{"id":"PGuHzEEehsz1rs6s","label":"gif","url":"https://designyoutrust.com/2019/05/the-chill-and-retro-motion-pixel-art-of-motocross-saito/"},{"id":"fz9VFuT7YPhWNe29","label":"@startpage","url":"https://prettycoffee.github.io/startpage"},{"id":"CzRWrl50GGq9715j","label":"author","url":"https://prettycoffee.github.io/"}]}]

const createGroupContainer = () => {
  const container = document.createElement("div")
  container.className = "bookmark-group"
  return container
}

const createGroupTitle = title => {
  const h2 = document.createElement("h2")
  h2.innerHTML = title
  return h2
}

const createBookmark = ({ label, url }) => {
  const li = document.createElement("li")
  const a = document.createElement("a")
  a.href = url
  a.innerHTML = label
  li.append(a)
  return li
}

const createBookmarkList = bookmarks => {
  const ul = document.createElement("ul")
  bookmarks.map(createBookmark).forEach(li => ul.append(li))
  return ul
}

const createGroup = ({ label, bookmarks }) => {
  const container = createGroupContainer()
  const title = createGroupTitle(label)
  const bookmarkList = createBookmarkList(bookmarks)
  container.append(title)
  container.append(bookmarkList)
  return container
}

const injectBookmarks = () => {
  const bookmarksContainer = document.getElementById("bookmarks")
  bookmarksContainer.append()
  bookmarks.map(createGroup).forEach(group => bookmarksContainer.append(group))
}

injectBookmarks()
