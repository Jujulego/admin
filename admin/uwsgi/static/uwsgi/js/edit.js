$(document).ready(function() {
    // Elements
    const select = $("#language");
    const vassal = $("#vassal");
    const suppr = $(".btn-suppr");

    const editor = CodeMirror(document.getElementById("config"), {
        mode: "properties",
        value: config,
        lineNumbers: true,
        indentUnit: 4,
    });

    // Fonctions
    function setupINI() {
        editor.setOption("mode", "properties");

        if (editor.getValue() === "") {
            editor.setValue("[uwsgi]")
        }
    }

    function setupJSON() {
        editor.setOption("mode", {name: "javascript", json: true});
    }

    function setupXML() {
        editor.setOption("mode", "xml");
    }

    function setupYAML() {
        editor.setOption("mode", "yaml");
    }

    const configs = {
        'ini': setupINI,
        'json': setupJSON,
        'xml': setupXML,
        'yaml': setupYAML
    };

    // Events
    select.change(function() {
        configs[select.val()]();
    });

    vassal.submit(function(e) {
        e.preventDefault();

        // Récupération des données
        const fd = new FormData(this);
        fd.append("config", editor.getValue());

        // Envoi
        $.ajax({
            method: "post",
            url: window.location.href,

            data: fd,
            processData: false,
            contentType: false,

            success: function(data) {
                if (data.redirect !== undefined) {
                    window.location.href = window.location.origin + data.redirect;
                }
            },
        })
    });

    suppr.click(function() {
        // Envoi
        $.ajax({
            method: "delete",
            url: window.location.href,
            contentType: "application/json",

            beforeSend: function(xhr) {
                xhr.setRequestHeader("X-CSRFToken", getCookie("csrftoken"));
            },
            success: function(data) {
                window.location.href = window.location.origin + data.redirect;
            },
        })
    });
});