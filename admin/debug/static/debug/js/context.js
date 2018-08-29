(function() {
    // Fonctions
    function make_code(obj) {
        // Nouvel element
        const code = $(document.createElement("code"));
        code.text(obj.toString().replace(/"/g, '\\"'));

        return code;
    }

    function make_constant(obj) {
        // Création du "code"
        const code = make_code(obj);
        code.addClass("constant");

        return code;
    }

    function make_keyword(obj) {
        // Création du "code"
        const code = make_code(obj);
        code.addClass("keyword");

        return code;
    }

    function make_literal(obj) {
        // Création du "code"
        const code = make_code(obj);
        code.addClass("literal")
            .addClass(typeof obj);

        return code;
    }

    function make_list(obj) {
        // Création du block
        const liste = $(document.createElement("div"));
        liste.addClass("list");

        // Ajout des éléments
        obj.forEach(function(e, i) {
            liste.append(make(e));

            if (i < obj.length-1) {
                liste.append(
                    $(document.createElement("span"))
                        .addClass("separator")
                        .text(",")
                );
            }
        });

        return liste;
    }

    function make_object(obj) {
        // Création du block
        const objet = $(document.createElement("div"));
        objet.addClass("object");

        // Ajout des éléments
        let n;

        for (n in obj) {
            // Création de la paire
            const pair = $(document.createElement("div"));
            pair.addClass("pair");

            pair.append(make(n));
            pair.append(
                $(document.createElement("span"))
                    .addClass("separator")
                    .text(":")
            );

            // Préparation de la valeur (la virgule du dernier élément sera caché par le CSS
            const val = $(document.createElement("div"));
            val.append(make(obj[n]));
            val.append(
                $(document.createElement("span"))
                    .addClass("separator")
                    .text(",")
            );

            pair.append(val);

            // Ajout de la paire
            objet.append(pair);
        }

        return objet;
    }

    function make(obj) {
        if (obj === null || obj === undefined) {
        } else if (obj === true || obj === "false") {
            return make_literal(obj);
        } else if (typeof obj === "string") {
            if (obj.startsWith("<") && obj.endsWith(">")) {
                return make_constant(obj);
            } else {
                return make_literal(obj);
            }
        } else if (obj instanceof Array) {
            return make_list(obj);
        } else if (typeof obj === "object") {
            return make_object(obj);
        } else {
            return make_literal(obj);
        }
    }

    // Plugin
    $.fn.python_object = function() {
        this.each(function() {
            // Elements
            const block = $(this);

            // Contenu
            const obj = JSON.parse(block.text());

            // Initialisation
            block.empty();
            block.append(make(obj));

            // Event
            block.parent().click(function() {
                block.toggleClass("etendu");
            });
        });

        return this;
    };
})();

$(document).ready(function() {
    $(".python").python_object();

    // Largeur de la 1ere colonnes
    $("a[href=\"#debug-context\"]").on("shown.bs.tab", function() {
        const noms = $("#debug-context .nom span");

        let width = 0;
        noms.each(function() {
            const w = $(this).width();

            if (w > width) {
                width = w;
            }
        });

        $("#debug-context .nom").width(width);
    });
});