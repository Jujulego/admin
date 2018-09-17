const Terminals = (function() {
    // Objets
    function Terminal(id, tab, terminal) {
        // Attributs
        this.id = id;
        this.tab = tab;
        this.terminal = terminal;
        this.socket = undefined;

        this.text = $("pre", this.terminal);

        this.form = $("form", this.terminal);
        this.input = $("input", this.terminal);

        // Initialisation
        this.clear();
        this.connect();

        // Event
        const term = this;
        $(".fa-times", this.tab).click(function(e) {
            e.stopPropagation();
            e.preventDefault();

            Terminals.destroy(term.id);
        });

        this.tab.children("a").on("shown.bs.tab", function() {
            term.input.focus();
        });

        this.terminal.click(function() {
            term.input.focus();
        });

        this.form.submit(function(e) {
            e.preventDefault();
            term.onsubmit();
        });
    }

    Terminal.prototype.connect = function() {
        this.socket = new WebSocket(`ws://${window.location.host}/ws/terminal`);
        this.socket.onopen = (() => this.onopen());
        this.socket.onmessage = ((msg) => this.onmessage(msg));
        this.socket.onclose = ((e) => this.onclose(e));

        this.log("Connection en cours <span class='connecting'></span>");
    };

    Terminal.prototype.onopen = function() {
        this.log("Connecté !");
    };

    Terminal.prototype.onsubmit = function() {
        // récupération et reset
        const v = this.input.val();
        this.input.val("");

        // Echo
        this.print(`>>> ${v}\n`);

        // Envoi au serveur
        this.socket.send(v);
    };

    Terminal.prototype.onmessage = function(msg) {
        this.print(msg.data);
    };

    Terminal.prototype.onclose = function(e) {
        this.log(`[${e.code}] ${e.reason || Terminals.close_codes[e.code]}`, Terminals.niveaux.serveur);

        this.form.css("display", "none");
    };

    Terminal.prototype.print = function(text) {
        // Test ?
        const div = this.terminal.children("div");
        const isScrolledDown = this.terminal.scrollTop() + this.terminal.height() >= div.height() - 10;

        // Ajout
        let base = this.text.html();
        base += text;

        this.text.html(base);

        // Scroll !
        if (isScrolledDown) {
          this.terminal.animate({
            scrollTop: div.height()
          }, 500);
        }
    };

    Terminal.prototype.log = function(msg, niveau = Terminals.niveaux.client) {
        this.print(`<span class="log"><span class="${niveau.couleur}">${niveau.scope} :</span> ${msg}\n</span>`);
    };

    Terminal.prototype.clear = function() {
        this.text.html("");
    };

    Terminal.prototype.show = function() {
        this.tab.children("a").tab('show');
    };

    Terminal.prototype.destroy = function() {
        // Destruction !
        this.tab.remove();
        this.terminal.remove();

        // Déconnexion
        if (this.socket !== undefined) {
            this.socket.close();
            this.log("déconnecté !");

            this.socket = undefined;
        }
    };

    // Namespace
    return {
        // Attributs
        panel: undefined,
        tabs: undefined,
        panels: undefined,

        terminals: [],
        id: 0,

        templates: {
            tab: undefined,
            terminal: undefined,
        },

        niveaux: {
            client: {
                scope: "client ",
                couleur: "bleu",
            },
            serveur: {
                scope: "serveur",
                couleur: "jaune",
            },
        },

        close_codes: {
            1000: "Normal Closure",
            1001: "Going Away",
            1002: "Protocol Error",
            1003: "Unsupported Data",
            1005: "No Status Recvd",
            1006: "Abnormal Closure",
            1007: "Invalid frame playload data",
            1008: "Policy Violation",
            1009: "Message too big",
            1010: "Missing Extension",
            1011: "Internal Error",
            1012: "Service Restart",
            1013: "Try Again Later",
            1014: "Bad Gateway",
            1015: "TLS Handshake",
        },

        // Méthodes
        init: function() {
            // Récupération d'éléments
            this.panel = $("#terminal-panel");
            this.tabs = $("#terminal-toolbar .nav");
            this.panels = $("#terminal-tabs");

            this.templates.tab      = $(".template > .nav-item", this.panel);
            this.templates.terminal = $(".template > .terminal", this.panel);

            // Détection des terminaux existants
            this.terminals = [];
            this.detect();

            // Events
            $("#terminal-btn-add").click(() => Terminals.add());
        },

        detect: function() {
            this.tabs.children().each(function() {
                // Onglet
                const onglet = $(this);
                const lien = onglet.children(".nav-link");

                // Terminal
                const term = $(lien.attr("href"));

                // Id
                const id = `terminal-${++(Terminals.id)}`;

                term.attr("id", id);
                lien.attr("href", "#" + id);

                // Construction de l'objet !
                Terminals.terminals.push(
                    new Terminal(Terminals.terminals.length, onglet, term)
                );
            });
        },

        add: function() {
            // Templates
            const tab = this.templates.tab.clone();
            const terminal = this.templates.terminal.clone();

            const id = `terminal-${++(this.id)}`;

            terminal.attr("id", id);
            tab.children("a").attr("href", "#" + id);

            // Ajout
            this.tabs.append(tab);
            this.panels.append(terminal);

            const term = new Terminal(this.terminals.length, tab, terminal);
            this.terminals.push(term);
            term.show();
        },

        destroy: function(id) {
            // Affiche le suivant
            if (id >= this.terminals.length - 1) {
                this.terminals[0].show();
            } else {
                this.terminals[id+1].show();
            }

            // Supprime de la liste
            this.terminals[id].destroy();
            this.terminals.splice(id, 1);

            // Update les id
            let i;
            for (i = id; i < this.terminals.length; ++i) {
                this.terminals[i].id = i;
            }
        }
    };
})();

$(document).ready(function() {
    // Initialisation
    Terminals.init();
});