function displaySuccessNotification(msg) {
    $("div#dvSuccessMsg").removeClass("hidden");
    $("div#successNotification").text(msg);
}

function displayErrorNotification(msg) {
    $("div#dvErrorMsg").removeClass("hidden");
    $("div#errorNotification").text(msg);
}

$(document).ready(function () {
    $("div#dvSuccessMsg,#dvErrorMsg").addClass("hidden");
    setInterval(function () {
        if ($('div.messageBox').is(':visible')) {
            $("div.messageBox").addClass("hidden");
        }
    }, 8000);

    //setInterval(function () {
    //    $("div.messageBox").addClass("hidden");
    //}, 8000);
});