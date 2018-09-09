// jQuery plugin
$.fn.navbar = function() {
    // Elements généraux
    const body = $("body");

    // Application !
    this.each(function() {
        // Elements
        const tooltips = $('[data-toggle="tooltip"]', this);
        const toggler = $(".navbar-toggler", this);

        // Fonctions
        function setup() {
            // Fermeture des menus et (des)activation des tooltips
            if (toggler.css('display') === 'none') {
                tooltips.tooltip('enable');
            } else {
                tooltips.tooltip('disable');
            }
        }

        // Events
        $(window).resize(setup);

        // Initialisation
        setup();
    });

    this.each(function() {
        // Elements
        const menus = $('.sidebar .collapse', this);
        const tooltips = $('.sidebar [data-toggle="tooltip"]', this);
        const toggler = $('.sidebar-toggler', this);

        // Fonctions
        function setup() {
            // Fermeture des menus et (des)activation des tooltips
            if (body.hasClass('navbar-reduite')) {
                menus.collapse('hide');
                tooltips.tooltip('enable');
            } else {
                tooltips.tooltip('disable');
            }
        }

        // Events
        toggler.click(function() {
            body.toggleClass('navbar-reduite');
            setup();
        });

        menus.on('show.bs.collapse', function() {
            body.removeClass('navbar-reduite');
        });

        // Initialisation
        setup();
    });

    return this;
};

$(document).ready(function() {
    $('#main-nav').navbar();
});
