// jQuery plugin
// - panels
$.fn.panel = function(target) {
    this.each(function() {
        // Elements
        const btn = $(this);
        const pan = $(target || btn.attr("data-target"));

        // Event
        btn.click(function(e) {
            e.preventDefault();
            pan.toggleClass("show");
        });
    });
};

// Activations
$(document).ready(function() {
    $('[data-toggle="panel"]').panel();
    $('[data-toggle="tooltip"]').tooltip();
});