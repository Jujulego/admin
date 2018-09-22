const Toasts = {
    // Attributs
    btn: null,
    badge: null,
    panel: null,
    template: null,

    messages: [],

    // Méthodes
    init: function() {
        // Elements
        this.btn = $("#toasts-btn");
        this.panel = $("#toasts-panel");

        this.badge = $(".badge", this.btn);
        this.template = this.panel.children(".template").children();

        // Events
        this.btn.click(function() {
            Toasts.preview.alert.removeClass("show");

            Toasts.badge
                .removeClass("badge-warning")
                .addClass("badge-info")
        });

        // Sous-Namespaces
        this.preview.init();

        // Initialisation
        this.load();
    },

    load: function() {
        // Analyse children to get Django's messages
        let msgs = this.panel.children().not(".template");

        msgs.each(function() {
            let msg = $(this);
            let classes = msg.attr("class").split(' ');
            let cls = null;

            for (let i = 0; i < classes.length; ++i) {
                if (/^(alert-.+)$/.test(classes[i])) {
                    cls = RegExp.$1;
                    break;
                }
            }

            Toasts.messages.push({
                msg: msg.text(),
                cls: cls,
                dom: msg
            });
        });

        // Initialisation
        if (this.messages.length !== 0) {
            // Preview du dernier message
            this.preview.set_message(this.messages[0]);

            // Badge
            this.badge
                .removeClass("badge-info")
                .addClass("show").addClass("badge-warning")
                .text(this.messages.length);
        } else {
            this.badge.removeClass("show");
        }
    },

    sync: function() {
        // Request for new messages
        $.get({
            url: `${window.location.origin}/messages`,

            success: function(data) {
                data["messages"].forEach(function(msg) {
                    Toasts.toast(msg.message, `alert-${msg.level}`);
                });
            },
            error: function() {
                Toasts.error("Impossible de récupérer les derniers messages");
            }
        });
    },

    toast: function(msg, cls = "alert-info") {
        // Copie du template
        let copie = this.template.clone();

        // Remplissage
        copie
            .addClass(cls)
            .html(msg);

        // Ajout !
        let message = {
            msg: msg,
            cls: cls,
            dom: copie
        };
        this.messages.push(message);

        this.panel.prepend(copie);
        this.badge
            .removeClass("badge-info")
            .addClass("show").addClass("badge-warning")
            .text(this.messages.length);

        // Preview
        this.preview.set_message(message);
    },

    info:    (msg) => Toasts.toast(msg, "alert-info"),
    success: (msg) => Toasts.toast(msg, "alert-success"),
    warning: (msg) => Toasts.toast(msg, "alert-warning"),
    error:   (msg) => Toasts.toast(msg, "alert-danger"),

    // Sous-Namespaces
    preview: {
        // Attributs
        alert: null,
        message: null,
        timeout: null,

        // Méthodes
        init: function() {
            // Eléments
            this.alert = $("#toasts-preview");

            // Event
            this.alert
                .mouseenter(this.clear_timeout)
                .mouseleave(this.set_timeout);

            this.alert.children("button")
                .click(function() {
                    Toasts.preview.alert.removeClass("show");
                });
        },

        set_message: function(msg) {
            // Supressionn du précédant
            if (this.message != null) {
                this.alert.removeClass(this.message.cls)
            }

            // Ajout du nouveau
            this.message = msg;
            this.alert
                .addClass("alert " + msg.cls + " fade show")
                .children("span").text(msg.msg);

            this.set_timeout();
        },

        clear_timeout: function() {
            if (Toasts.preview.alert.hasClass("show")) {
                if (Toasts.preview.timeout != null) {
                    clearTimeout(Toasts.preview.timeout);
                }
            }
        },

        set_timeout: function() {
            if (Toasts.preview.alert.hasClass("show")) {
                Toasts.preview.clear_timeout();
                Toasts.preview.timeout = setTimeout(Toasts.preview.on_timeout, 10000);
            }
        },

        on_timeout: function() {
            Toasts.preview.alert.removeClass("show");
            Toasts.preview.timeout = null;
        }
    }
};

$(document).ready(function() {
    Toasts.init();
});