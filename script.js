const nytURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json";
const apiKey = "8fmnuqCO1OZMG1AntdaaGGBE5Agaw2Jn";
const apiKeyName = "api-key";
const queryName = "q";
const beginDate = "begin_date";
const endDate = "end_date";
// searches the NYT API Database for a certain query
// @query is a serch term like 'election' or 'bitcoin'

$(document).ready(function () {
  function search(query, filter) {
    const data = {};
    const $startYear = $("#startYear").val();
    const $endYear = $("#endYear").val();
    data[queryName] = query;
    data[apiKeyName] = apiKey;

    if ($startYear) {
      data[beginDate] = $startYear + "0101";
    }

    if ($endYear) {
      data[endDate] = $endYear + "1231";
    }

    if (parseInt($startYear) > parseInt($endYear)) {
      alert("Start year must be before end year");
    }

    $.get(nytURL, data).then(function (response) {
      // TODO: Do something with response
      const $numberOfRecords = parseInt($("#numberOfRecords").val());
      function recordAmount(arr) {
        for (let i = 0; i < $numberOfRecords; i++) {
          console.log("hi");
          //render records
          const article = $("<div>");
          const articleTitle = $("<h1>").text(arr[i].headline.main);
          const articleDate = $("<p>").text(
            moment(arr[i].pub_date).format("MM DD YYYY")
          );
          const authors = $("<p>").text(arr[i].byline.original);
          const articleSection = $("<p>").text(arr[i].section_name);
          const articleDescription = $("<p>").text(arr[i].abstract);
          const linkToArticle = $("<a>")
            .attr("href", arr[i].web_url)
            .text(arr[i].web_url);
          article.append(
            articleTitle,
            articleDate,
            authors,
            articleSection,
            articleDescription,
            linkToArticle
          );
          $(".topArticles").append(article);
        }
      }
      recordAmount(response.response.docs);
      $("#startYear").val("");
      $("#endYear").val("");
      $("#search").val("");
      $("#numberOfRecords").val("");
      console.log(response);
    });
  }

  // TODO: On Click Events
  $(".searchButton").on("click", function () {
    $(".topArticles").empty();
    const $search = $.trim($("#search").val());
    search($search);
  });

  $(".clearButton").on("click", function () {
    $(".topArticles").empty();
  });
});
