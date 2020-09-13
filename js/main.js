/**
 * @file Script contenant les fonctions de base
 * @author Jonathan Martel (jmartel@cmaisonneuve.qc.ca)
 * @version 0.1
 * @update 2019-01-21
 * @license Creative Commons BY-NC 3.0 (Licence Creative Commons Attribution - Pas d’utilisation commerciale 3.0 non transposé)
 * @license http://creativecommons.org/licenses/by-nc/3.0/deed.fr
 *
 */

//const BaseURL = "https://e1995654.webdev.cmaisonneuve.qc.ca/vino_etu/";
const BaseURL = document.baseURI;
//console.log(BaseURL);
window.addEventListener('load', function() {
    console.log("load");
    document.querySelectorAll(".btnBoire").forEach(function(element) {
        //console.log(element);
        element.addEventListener("click", function(evt) {
            let id_bouteille = evt.target.parentElement.dataset.id_bouteille;
            let id_cellier = evt.target.parentElement.dataset.id_cellier;
            let requete = new Request(BaseURL + "index.php?requete=boireBouteilleCellier", { method: 'POST', body: '{"id_bouteille": ' + id_bouteille + ', "id_cellier": ' + id_cellier + ' }' });
            console.log(requete);

            fetch(requete)
                .then(response => {
                    if (response.status === 200) {
                        return response.json();
                    } else {
                        throw new Error('Erreur');
                    }
                })
                .then(response => {
                    console.debug(response);
                    requete = new Request(BaseURL + "index.php?requete=consulterQuantiteBouteilleCellier&id_bouteille=" + id_bouteille + "&id_cellier=" + id_cellier, { method: 'GET' });
                    console.log(requete);
                    fetch(requete)
                        .then(response => {
                            if (response.status === 200) {
                                return response.json();
                            } else {
                                throw new Error('Erreur');
                            }
                        })
                        .then(response => {
                            console.debug(response);
                            let quantiteBoite = evt.target.parentElement.parentElement.getElementsByClassName('quantite')[0];
                            quantiteBoite.innerHTML = 'Quantité: ' + response.quantite;
                        }).catch(error => {
                            console.error(error);
                        });
                }).catch(error => {
                    console.error(error);
                });
        })

    });

    document.querySelectorAll(".btnAjouter").forEach(function(element) {
        //console.log(element);
        element.addEventListener("click", function(evt) {
            let id_bouteille = evt.target.parentElement.dataset.id_bouteille;
            let id_cellier = evt.target.parentElement.dataset.id_cellier;
            let requete = new Request(BaseURL + "index.php?requete=ajouterBouteilleCellier", { method: 'POST', body: '{"id_bouteille": ' + id_bouteille + ', "id_cellier": ' + id_cellier + ' }' });

            fetch(requete)
                .then(response => {
                    if (response.status === 200) {
                        return response.json();
                    } else {
                        throw new Error('Erreur');
                    }
                })
                .then(response => {
                    console.debug(response);
                    requete = new Request(BaseURL + "index.php?requete=consulterQuantiteBouteilleCellier&id_bouteille=" + id_bouteille + "&id_cellier=" + id_cellier, { method: 'GET' });
                    fetch(requete)
                        .then(response => {
                            if (response.status === 200) {
                                return response.json();
                            } else {
                                throw new Error('Erreur');
                            }
                        })
                        .then(response => {
                            console.debug(response);
                            let quantiteBoite = evt.target.parentElement.parentElement.getElementsByClassName('quantite')[0];
                            quantiteBoite.innerHTML = 'Quantité: ' + response.quantite;
                        }).catch(error => {
                            console.error(error);
                        });
                }).catch(error => {
                    console.error(error);
                });
        })
    });

    let inputNomBouteille = document.querySelector("[name='nom_bouteille']");
    console.log(inputNomBouteille);
    let liste = document.querySelector('.listeAutoComplete');

    if (inputNomBouteille) {
        inputNomBouteille.addEventListener("keyup", function(evt) {
            console.log(evt);
            let nom = inputNomBouteille.value;
            liste.innerHTML = "";
            if (nom) {
                let requete = new Request(BaseURL + "index.php?requete=autocompleteBouteille", { method: 'POST', body: '{"nom": "' + nom + '"}' });
                fetch(requete)
                    .then(response => {
                        if (response.status === 200) {
                            return response.json();
                        } else {
                            throw new Error('Erreur');
                        }
                    })
                    .then(response => {
                        console.log(response);


                        response.forEach(function(element) {
                            liste.innerHTML += "<li data-id='" + element.id + "'>" + element.nom + "</li>";
                        })
                    }).catch(error => {
                        console.error(error);
                    });
            }


        });

        let bouteille = {
            cellier: document.getElementById('cellier'),
            nom: document.querySelector(".nom_bouteille"),
            millesime: document.querySelector("[name='millesime']"),
            quantite: document.querySelector("[name='quantite']"),
            date_achat: document.querySelector("[name='date_achat']"),
            prix: document.querySelector("[name='prix']"),
            garde_jusqua: document.querySelector("[name='garde_jusqua']"),
            notes: document.querySelector("[name='notes']"),
        };


        liste.addEventListener("click", function(evt) {
            console.dir(evt.target)
            if (evt.target.tagName == "LI") {
                bouteille.nom.dataset.id = evt.target.dataset.id;
                bouteille.nom.innerHTML = evt.target.innerHTML;

                liste.innerHTML = "";
                inputNomBouteille.value = "";

            }
        });

        let btnAjouter = document.querySelector("[name='ajouterBouteilleCellier']");
        if (btnAjouter) {
            btnAjouter.addEventListener("click", function(evt) {

                let choice = bouteille.cellier.selectedIndex;
                let idCellier = bouteille.cellier.options[choice].value;
                console.log(idCellier);

                var param = {
                    "id_bouteille": bouteille.nom.dataset.id,
                    "id_cellier": idCellier,
                    "date_achat": bouteille.date_achat.value,
                    "garde_jusqua": bouteille.garde_jusqua.value,
                    "notes": bouteille.notes.value,
                    "prix": bouteille.prix.value,
                    "quantite": bouteille.quantite.value,
                    "millesime": bouteille.millesime.value,
                };
                let requete = new Request(BaseURL + "index.php?requete=ajouterNouvelleBouteilleCellier", { method: 'POST', body: JSON.stringify(param) });
                console.log(requete);
                fetch(requete)
                    .then(response => {
                        if (response.status === 200) {
                            console.log('1');
                            return response.json();
                        } else {
                            throw new Error('Erreur');
                        }
                    })
                    .then(response => {
                        console.log(response);

                    }).catch(error => {
                        console.error(error);
                    });

            });
        }
    }


});