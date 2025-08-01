import Fuse from "fuse.js";
import Mark from "mark.js";

// Helper Functions
function show(elem) {
  elem.style.display = "block";
}
function hide(elem) {
  elem.style.display = "none";
}
function param(name) {
  return decodeURIComponent(
    (location.search.split(name + "=")[1] || "").split("&")[0],
  ).replace(/\+/g, " ");
}

function render(templateString, data) {
  let conditionalMatches, conditionalPattern, copy;
  conditionalPattern = /\$\{\s*isset ([a-zA-Z]*) \s*\}(.*)\$\{\s*end\s*}/g;
  //since loop below depends on re.lastInxdex, we use a copy to capture any manipulations whilst inside the loop
  copy = templateString;
  while (
    (conditionalMatches = conditionalPattern.exec(templateString)) !== null
  ) {
    if (data[conditionalMatches[1]]) {
      //valid key, remove conditionals, leave contents.
      copy = copy.replace(conditionalMatches[0], conditionalMatches[2]);
    } else {
      //not valid, remove entire section
      copy = copy.replace(conditionalMatches[0], "");
    }
  }
  templateString = copy;
  //now any conditionals removed we can do simple substitution
  let key, find, re;
  for (key in data) {
    find = "\\$\\{\\s*" + key + "\\s*\\}";
    re = new RegExp(find, "g");
    templateString = templateString.replace(re, data[key]);
  }
  return templateString;
}

function populateResults(results) {
  const searchQuery = document.getElementById("search-query").value;
  const searchResults = document.getElementById("search-results");

  // pull template from hugo template definition
  const templateDefinition = document.getElementById(
    "search-result-template",
  ).innerHTML;

  results.forEach(function (value, key) {
    const contents = value.item.contents;
    let snippet = "";
    let snippetHighlights = [];

    snippetHighlights.push(searchQuery);
    snippet = contents.substring(0, summaryInclude * 2) + "&hellip;";

    //replace values
    let tags = "";
    if (value.item.tags) {
      value.item.tags.forEach(function (element) {
        tags +=
          "<li><a href='/tags/" +
          element.toLowerCase().replaceAll(" ", "-") +
          "' class='taxonomy-tag'><i class='bi bi-tag'></i> " +
          element +
          "</a></li>";
      });
    }
    let categories = "";
    if (value.item.categories) {
      value.item.categories.forEach(function (element) {
        categories +=
          "<li><a href='/categories/" +
          element.toLowerCase().replaceAll(" ", "-") +
          "' class='taxonomy-category'>" +
          element +
          "</a></li>";
      });
    }

    const output = render(templateDefinition, {
      key: key,
      title: value.item.title,
      link: value.item.permalink,
      tags: tags,
      categories: categories,
      snippet: snippet,
      author: value.item.author.join(", "),
      date: value.item.date,
      readingtime: value.item.readingtime + " Minutes",
    });
    searchResults.innerHTML += output;

    snippetHighlights.forEach(function (snipvalue, snipkey) {
      const instance = new Mark(document.getElementById("summary-" + key));
      instance.mark(snipvalue);
    });
  });
}

const summaryInclude = 180;
const fuseOptions = {
  shouldSort: true,
  includeMatches: true,
  includeScore: true,
  tokenize: true,
  location: 0,
  distance: 100,
  minMatchCharLength: 1,
  keys: [
    { name: "title", weight: 0.45 },
    { name: "contents", weight: 0.4 },
    { name: "tags", weight: 0.1 },
    { name: "categories", weight: 0.05 },
  ],
};

document.addEventListener("DOMContentLoaded", function () {
  // =============================
  // Search
  // =============================

  const inputBox = document.getElementById("search-query");
  if (inputBox !== null) {
    const searchQuery = param("q");
    if (searchQuery) {
      inputBox.value = searchQuery || "";
      executeSearch(searchQuery, false);
    } else {
      const searchResults = document.getElementById("search-results");
      if (searchResults) {
        searchResults.innerHTML =
          '<p class="search-results-empty text-center text-content text-2xl">Please enter a word or phrase above or look at <a href="/tags">available tags</a>.</p>';
      }
    }
  }

  function executeSearch(searchQuery) {
    show(document.querySelector(".search-loading"));

    fetch("/index.json").then(function (response) {
      if (response.status !== 200) {
        console.log(
          "Looks like there was a problem. Status Code: " + response.status,
        );
        return;
      }
      // Examine the text in the response
      response
        .json()
        .then(function (pages) {
          const fuse = new Fuse(pages, fuseOptions);
          const result = fuse.search(searchQuery);
          if (result.length > 0) {
            populateResults(result);
          } else {
            document.getElementById("search-results").innerHTML =
              '<p class=\"search-results-empty\">No matches found</p>';
          }
          hide(document.querySelector(".search-loading"));
        })
        .catch(function (err) {
          console.log("Fetch Error :-S", err);
        });
    });
  }
});
