const Fichiers = (function() {
    return {
        // Attributs
        pile: [],
        lrucache: new LRUMap(100),

        zone: undefined,
        btn_retour: undefined,
        breadcrumbs: undefined,

        btn_creer_dossier: undefined,
        btn_suppr_dossier: undefined,
        form_creer_dossier: undefined,

        templates: {
            breadcrumb: undefined,
        },

        // Propriétés
        _dossier: 0,
        get dossier() {
            return this._dossier;
        },
        set dossier(d) {
            if (d !== this._dossier) {
                this.selection.vider()
            }

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
            this.btn_suppr_dossier = $("#btn-suppr-dossier");
            this.form_creer_dossier = $("#form-creer-dossier");

            this.templates.breadcrumb = $("#template-breadcrumb").children();

            // Sub namespaces
            this.objets.init(this.zone);

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

            this.btn_suppr_dossier
                .prop("disabled", true)
                .click(function () {
                    // Parse ids
                    dossiers = [];
                    fichiers = [];

                    Fichiers.selection.selection.forEach(function(v) {
                        if (v.startsWith("dossier")) {
                            dossiers.push(parseInt(v.substr(8)))
                        } else if (v.startsWith("fichier")) {
                            fichiers.push(parseInt(v.substr(8)))
                        }
                    });

                    // Request !
                    Fichiers.supprimer(dossiers, fichiers);
                    Fichiers.selection.vider();
                });

            this.form_creer_dossier
                .submit(function(e) {
                    e.preventDefault();

                    // Création du dossier
                    const fd = new FormData(this);
                    Fichiers.creer_dossier(fd.get("nom"));

                    // et on disparait !
                    Fichiers.form_creer_dossier.addClass("inactif");
                    $(this).find("input").val("");
                });
        },

        // - contenu
        vider: function() {
            this.zone.children(".obj:not(.obj-persist)").remove();
        },

        // - données affichées
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
                this.objets.dossier(res.dossiers[i]);
            }

            for (let i  = 0; i < res.fichiers.length; ++i) {
                this.objets.fichier(res.fichiers[i]);
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

        // - déplacements dans l'arbre
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

        // - commandes
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
            this.objets.dossier(data);

            // et au cache aussi
            const key = `dossier-${data.id}`;
            this.lrucache.set(key, data);
        },
        supprimer: async function(dossiers, fichiers) {
            // Préparation des arguments
            let args = {
                dossiers: dossiers,
                fichiers: fichiers
            };

            // Requete
            await this.requests.request("delete", args)
                .catch(function(err) {
                    console.log(err);
                });

            this.refresh();
        },

        // sub-namespaces
        objets: {
            // Attributs
            zone: undefined,
            templates: {
                dossier: undefined,
                fichier: undefined,
                breadcrumb: undefined,
            },

            // Méthodes
            init: function(zone) {
                // Attributs
                this.zone = zone;

                // - templates
                this.templates.dossier = $("#template-dossier").children();
                this.templates.fichier = $("#template-fichier").children();
            },

            construct: function(tpl, data, key) {
                // Copie & remplissage
                let obj = tpl.clone();
                $(".nom", obj).text(data.nom);

                // Events
                obj.click(function() {
                    obj.toggleClass("selectionne");

                    // Mise à jour de la liste
                    if (obj.hasClass("selectionne")) {
                        Fichiers.selection.ajouter(key)
                    } else {
                        Fichiers.selection.supprimer(key)
                    }
                });

                return obj;
            },

            append: function(obj) {
                // Ajout !
                this.zone.append(obj);
                $(".slider", obj).slider();
            },

            dossier: function(data) {
                // Création de la base
                const dossier = this.construct(this.templates.dossier, data, `dossier-${data.id}`);

                // Events
                dossier.dblclick(function() {
                    Fichiers.ouvrir(data.id);
                });

                // Ajout !
                this.append(dossier);
            },

            fichier: function(data) {
                // Création de la base
                const fichier = this.construct(this.templates.fichier, data, `fichier-${data.id}`);

                // Events

                // Ajout !
                this.append(fichier);
            },
        },
        selection: {
            // Attributs
            selection: [],

            // Méthodes
            ajouter: function(id) {
                this.selection.push(id);

                // Boutons !
                $("#outils button.need-selection")
                    .prop("disabled", false)
            },
            supprimer: function(id) {
                const i = this.selection.indexOf(id);

                if (i !== -1) {
                    this.selection.splice(i, 1);

                    if (this.selection.length === 0) {
                        // Boutons !
                        $("#outils button.need-selection")
                            .prop("disabled", true)
                    }
                }
            },
            vider: function() {
                this.selection = [];

                // Boutons !
                $("#outils button.need-selection")
                    .prop("disabled", true)
            }
        },
        requests: {
            // Attributs
            base_url: `${window.location.origin}/fichiers/api`,

            // Méthodes
            prepare_args: function(kwargs) {
                let args = "";

                for (const key in kwargs) {
                    // Gardien
                    if (!kwargs.hasOwnProperty(key)) continue;

                    // Prepare la ligne
                    if (args === "") {
                        args += '?';
                    } else {
                        args += '&';
                    }

                    // Ajout de l'argument !
                    args += `${key}=${encodeURIComponent(kwargs[key])}`;
                }

                return args;
            },

            request: function(method = "get", args = {}) {
                if ($.inArray(method, ["get", "options"]) !== -1) {
                    // Arguments dans l'url
                    let url = this.base_url + this.prepare_args(args);

                    return $.ajax({
                        type: method,
                        url: url
                    });
                } else {
                    // Arguments dans le corps
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