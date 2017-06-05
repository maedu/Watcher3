$(document).ready(function() {
    var $body = $("body");
    label_color = $body.css("color");
    label_size = $body.css("font-size");
    font_family = $body.css("font-family")


    status_colors = [];
    $("div#status_colors > span").each(function(i, elem){
        status_colors.push($(elem).css("background-color"))
    });

    profile_colors = [];
    $("div#profile_colors > span").each(function(i, elem){
        profile_colors.push($(elem).css("background-color"))
    });

    var get_stats = $.get(url_base + "/ajax/generate_stats")
    .done(function(r){
        stats = JSON.parse(r)
        render_charts(stats)
    })

    $(window).on("beforeunload", function(){
        get_stats.abort();
    });
});

function render_charts(stats){
    /* Renders charts of library stats
    stats: JSON object of stats
    Gathers colors from hidden textarea

    */

    Morris.Donut({
        element: $("div#chart_status div.chart"),
        data: stats["status"],
        colors: status_colors,
        labelColor: label_color,
        labelSize: label_size
    })

    Morris.Donut({
        element: $("div#chart_profiles .chart"),
        data: stats["qualities"],
        colors: profile_colors,
        labelColor: label_color,
        labelSize: label_size
    })

    Morris.Bar({
        element: $("div#chart_years .chart"),
        data: stats["years"],
        xkey: "year",
        ykeys: ["value"],
        labels: ["Movies"],
        barColors: label_color,
        xLabelAngle: 35
    })

    Morris.Line({
        element: $("div#chart_added .chart"),
        data: stats["added_dates"],
        xkey: "added_date",
        ykeys: ["value"],
        labels: ["Movies Added"],
        lineColors: label_color,
        pointFillColors: label_color,
        pointStrokeColors: label_color,
        xLabels: "month",
        smooth: false
    })

    Morris.Bar({
        element: $("div#chart_scores .chart"),
        data: stats["scores"],
        xkey: "score",
        ykeys: ["value"],
        labels: ["Movies"],
        barColors: label_color,
        pointFillColors: label_color,
        pointStrokeColors: label_color
    })



    $("svg text").css("font-family", font_family)
    $("svg > path").attr("stroke", "none");
}
