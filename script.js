            $.urlParam = function(name) {
                var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.search);
                return (results !== null) ? results[1] || 0 : false;
            }

            function badge(key) {
                return "https://img.shields.io/endpoint.svg?color=red&url=https%3A%2F%2Fapi.myjson.com%2Fbins%2Fmetu-{{KEY}}&link=https%3A%2F%2Feasrng.github.io%2Fmetu%2F%3Fupvote%3D{{KEY}}".split("{{KEY}}").join(encodeURIComponent(key));
            }

            function init() {
                var uvkey = $.urlParam('upvote');
                if (uvkey) {
                    var upvotebtn = $("#upvotebtn");
                    upvotebtn.click(upvotefn)
                    $(".upvotekey").text(uvkey);
                    $('#upvoteModal').modal();
                }
            }
function upvotefn()
{
  fetch("https://api.myjson.com/bins/" + uvkey)
    .then(function (j)
    {
      return j.json()
    })
    .then(function (j)
    {
      return j.message * 0
    })
    .then(function (uv)
    {
      return fetch("https://api.myjson.com/bins/metu-" + uvkey,
      {
        method: "PUT", // *GET, POST, PUT, DELETE, etc.
        mode: "cors", // no-cors, cors, *same-origin
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        credentials: "same-origin", // include, *same-origin, omit
        headers:
        {
          "Content-Type": "application/json",
          // "Content-Type": "application/x-www-form-urlencoded",
        },
        redirect: "follow", // manual, *follow, error
        body: JSON.stringify(
        {
          "schemaVersion": 1,
          "message": "" + (uv + 1),
          "label": "MeTu"
        })
      })
    })
    .then(funtion()
    {
      $("#upvotetoast").toast("show")
    })
}
            $(document).ready(init)
