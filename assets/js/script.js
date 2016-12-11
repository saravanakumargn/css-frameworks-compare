$(document).ready(function () {
    $.getJSON("assets/data.json", function (data) {
        var items = [];
        var url = "";
        $.each(data, function (key, val) {
            url = "https://api.github.com/repos/";
            $("#framework-list > tbody > tr").each(function (index) {
                currentObj = $(this);
                if (currentObj[0].id == key) {
                    url += val + "/releases/latest";
                    $.ajax({
                        url: url,
                        async: false,
                        success: function (result) {
                            var published_at = new Date(result.published_at);
                            var month = published_at.toLocaleString('en-US', {
                                month: "long"
                            });
                            var prerelease = "";
                            if(!result.prerelease) {
                                prerelease = '<span class="tag tag-pill tag-success">Latest release</span>';
                            }
                            else {
                                prerelease = '<span class="tag tag-pill tag-warning">Pre-release</span>';
                            }
                            currentObj[0].children[3].innerHTML = "<div>" + month + " " + published_at.getDate() + ", " + published_at.getFullYear() + "</div>";
                            currentObj[0].children[4].innerHTML = "<div>" + prerelease + "</div>";
                        }
                    });
                }
            });
        });

    });
    //    $('#framework-list').DataTable({
    //        "paging": false,
    //        "info": false
    //    });

});