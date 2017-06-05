$(document).ready(function () {
    $log_display = $("pre#log_text");
});


// Open log file
function view_log(){
    $log_display.hide();
    logfile = $("select#log_file").val();

    $.post(url_base + "/ajax/get_log_text", {"logfile": logfile})
    .done(function(r){
        $log_display.text(r);
        $log_display.show();
    });
};

function download_log(){
    logfile = $("select#log_file").val();
    window.open(url_base + "/logs/" + logfile)
};
