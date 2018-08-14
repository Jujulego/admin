$(document).ready(function() {
    // sidebar
    $("#sidebar-toggler").click(function(e) {
        $("body").toggleClass("navbar-reduite");

        // Fermeture des menus
        if ($("body").hasClass("navbar-reduite")) {
            $(".sidebar .collapse").collapse("hide");
        }
    });

    $(".sidebar .collapse").on("show.bs.collapse", function() {
        $("body").removeClass("navbar-reduite");
    })
});
