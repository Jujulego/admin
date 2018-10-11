const Fichiers = (function() {
    return {
        // Attributs
        pile: [],
        lrucache: new LRUMap(100),

        zone: undefined,
        btn_retour: undefined,
        breadcrumbs: undefined,

        btn_creer_dossier: undefined,
        form_creer_dossier: undefined,

        templates: {
            dossier: undefined,
            fichier: undefined,
            breadcrumb: undefined,
        },

        // Propriétés
        _dossier: 0,
        get dossier() {
            return this._dossier;
        },
        set dossier(d) {
            this._dossier = d;
            this.refresh();

            // Gestion du bouton ;)
            if (this.pile.length) {
                this.btn_retour.addClass("actif");
            } else {
                this.btn_retour.blur()
                    .removeClass("actif");
            }
        },

        // Méthodes
        init: function() {
            // Eléments
            this.zone = $("#fichiers");
            this.btn_retour = $("#btn-retour");
            this.breadcrumbs = $("ol.breadcrumb");

            this.btn_creer_dossier = $("#btn-creer-dossier");
            this.form_creer_dossier = $("#form-creer-dossier");

            this.templates.dossier = $("#template-dossier").children();
            this.templates.fichier = $("#template-fichier").children();
            this.templates.breadcrumb = $("#template-breadcrumb").children();

            // Events
            this.btn_retour.click(function() {
                Fichiers.retour();
            });

            this.breadcrumbs.children().last()
                .click(function() {
                    Fichiers.retour(0);
                });

            this.btn_creer_dossier
                .click(function() {
                    Fichiers.form_creer_dossier.removeClass("inactif");
                });

            this.form_creer_dossier
                .submit(function(e) {
                    e.preventDefault();

                    // Création du dossier
                    const fd = new FormData(this);
                    Fichiers.creer_dossier(fd.get("nom"));

                    // et on disparait !
                    Fichiers.form_creer_dossier.addClass("inactif");
                });
        },

        vider: function() {
            this.zone.children(".obj:not(.obj-persist)").remove();
        },

        ouvrir: async function(d) {
            // Breadcrumb
            this.breadcrumbs.children().removeClass("active");

            const breadcrumb = this.templates.breadcrumb.clone();
            breadcrumb.addClass("active")
                .click(function() {
                    if (!$(this).hasClass("active")) {
                        Fichiers.retour(d);
                    }
                });

            $(".text", breadcrumb)
                .text((await this.metadata("dossier", d)).nom);

            this.breadcrumbs.append(breadcrumb);

            // Empilage
            this.pile.push(this.dossier);

            // Changement
            this.dossier = d;
        },

        retour: function(dossier) {
            if (dossier === undefined) {
                dossier = this.pile[this.pile.length-1];
            }

            while (this.pile.length) {
                const d = this.pile.pop();

                // Breadcrumbs
                const bc = $(".breadcrumb-item:not(.removing)", this.breadcrumbs).last();
                console.log(bc);
                bc.addClass("removing")
                    .on("animationend", function() {
                        $(this).remove();
                    });

                $(".breadcrumb-item:not(.removing)", this.breadcrumbs).last().addClass("active");

                // Ouverture !
                if (d === dossier) {
                    this.dossier = d;
                    break;
                }
            }
        },

        refresh: async function() {
            // Préparation des arguments
            let args = {};
            if (this.dossier !== 0) {
                args = {
                    parent: this.dossier,
                };
            }

            // Requête !
            const res = await this.requests.request("get", args)
                .catch(function(err) {
                    console.log(err);
                });

            // Rafraichissement de l'affichage
            this.vider();

            for (let i  = 0; i < res.dossiers.length; ++i) {
                this.add_dossier(res.dossiers[i]);
            }

            for (let i  = 0; i < res.fichiers.length; ++i) {
                this.add_fichier(res.fichiers[i]);
            }
        },

        metadata: async function(type, obj) {
            // Check cache
            const key = `${type}-${obj}`;
            if (this.lrucache.has(key)) {
                return this.lrucache.get(key);
            }

            // Requête !
            const args = {};
            args[type] = obj;

            const res = await this.requests.request("options", args)
                .catch(function(err) {
                    console.log(err);
                });

            // Cache !
            this.lrucache.set(key, res);
            return res;
        },

        construct_obj: function(tpl, data) {
            // Copie & remplissage
            let obj = tpl.clone();
            $(".nom", obj).text(data.nom);

            return obj;
        },

        add_dossier: function(data) {
            // Création de la base
            const dossier = this.construct_obj(this.templates.dossier, data);

            // Events
            dossier.dblclick(function() {
                Fichiers.ouvrir(data.id);
            });

            // Ajout !
            this.zone.append(dossier);
            $(".slider", dossier).slider();
        },

        add_fichier: function(data) {
            // Création de la base
            const fichier = this.construct_obj(this.templates.fichier, data);

            // Events

            // Ajout !
            this.zone.append(fichier);
            $(".slider", fichier).slider();
        },

        creer_dossier: async function(nom) {
            // Préparation des arguments
            let args = {
                nom: nom
            };

            if (this.dossier !== 0) {
                args["parent"] = this.dossier;
            }

            // Requete
            const data = await this.requests.request("put", args)
                .catch(function(err) {
                    console.log(err);
                });

            // Ajout !
            this.add_dossier(data);

            // au cache aussi
            const key = `dossier-${data.id}`;
            this.lrucache.set(key, data);
        },

        // sub-namespaces
        requests: {
            // Attributs
            base_url: `${window.location.origin}/fichiers/api`,

            // Méthodes
            prepare_args: function(kwargs) {
                let args = "";

                for (const key in kwargs) {
                    if (args === "") {
                        args += '?';
                    } else {
                        args += '&';
                    }

                    args += `${key}=${encodeURIComponent(kwargs[key])}`;
                }

                return args;
            },

            request: function(method = "get", args = {}) {
                if ($.inArray(method, ["get", "options"]) !== -1) {
                    let url = this.base_url + this.prepare_args(args);

                    return $.ajax({
                        type: method,
                        url: url
                    });
                } else {
                    return $.ajax({
                        method: method,
                        url: this.base_url,
                        data: args,

                        beforeSend: function(xhr) {
                            xhr.setRequestHeader("X-CSRFToken", getCookie("csrftoken"));
                        },
                    })
                }
            },
        }
    };
})();

$(document).ready(function() {
    Fichiers.init();
    Fichiers.refresh();
});