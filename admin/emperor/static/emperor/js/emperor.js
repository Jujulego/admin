$(document).ready(function() {
    $(".vassal form").submit(function(e) {
        e.preventDefault();

        // Récupération des données
        const fd = new FormData(this);

        // Envoi
        $.ajax({
            method: "post",
            url: window.location.href,

            data: fd,
            processData: false,
            contentType: false,

            beforeSend: function(xhr) {
                xhr.setRequestHeader("X-CSRFToken", getCookie("csrftoken"));
            },
            success: function() {
                Toasts.sync();
            },
        });
    });

    $(".vassal form button").click(function(e) {
        e.stopPropagation();
    });
});