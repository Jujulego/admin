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

    return this;
};

$.fn.slider = function(vitesse=20) { // vitesse en ms/px
    // Application
    this.each(function() {
        // Elements
        const box = $(this);
        const txt = box.children("span");

        // Initialisation
        const dist = txt.width() - box.width();

        txt.css("right", `${dist}px`);
        txt.css("transition-duration", `${dist * vitesse}ms`);
    });

    return this;
};

// Fonctions
function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = jQuery.trim(cookies[i]);
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

// Activations
$(document).ready(function() {
    $('[data-toggle="panel"]').panel();
    $('[data-toggle="tooltip"]').tooltip();

    $('.slider').slider();
});