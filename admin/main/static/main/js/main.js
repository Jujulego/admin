// jQuery plugin
// - panels
$.fn.panel = function(target) {
    // Elements
    const panels = $(".panel");
    const overlay = $("#panel-overlay");

    // Fonction
    function evolve(pan) {
        if (pan.hasClass("show")) {
            pan.removeClass("show");
            overlay.removeClass("show");
        } else {
            pan.addClass("show");
            overlay.addClass("show");

            panels.not(pan).removeClass("show");
        }
    }

    // Events
    overlay.click(function() {
        panels.removeClass("show");
        overlay.removeClass("show");
    });

    // Application
    this.each(function() {
        // Elements
        const btn = $(this);
        const pan = $(target || btn.attr("data-target"));

        // Event
        btn.click(function(e) {
            e.preventDefault();
            evolve(pan);
        });
    });
};

// Activations
$(document).ready(function() {
    $('[data-toggle="panel"]').panel();
    $('[data-toggle="tooltip"]').tooltip();
});