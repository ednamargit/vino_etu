<div class="ajouter">
    <h4>Ajouter une nouvelle bouteille au cellier </h4>
    <div class="nouvelleBouteille" vertical layout>
        <div class="recherche_nom_bouteille">Rechercher par nom : <input type="text" name="nom_bouteille">
        <ul class="listeAutoComplete"></ul></div>
        <?php
        //Transformer le résultat de Json en array 
        $arrayCelliers = json_decode($dataCellier, true);
        ?>
        
        <div class="infoBouteille">
        <p>Nom : <span data-id_bouteille="" class="nom_bouteille"></span></p>
                <p>Num Cellier<select id="cellier"> 
                    <?php foreach ($arrayCelliers as $cellier) { ?> //Récupérer les différents id_cellier de la BD
                        <option value="<?php echo $cellier['id'];?>"><?php echo $cellier['id'] ; ?></option>
                    <?php } ?>
                </select></p>  
                <p>Millesime : <input name="millesime"></p><span class="erreur" id="erreurMil"></span>
                <p>Quantite : <input name="quantite" value="1"></p><span class="erreur" id="erreurQuan"></span>
                <p>Date achat : <input name="date_achat" type="date">
                <p>Prix : <input name="prix"></p><span class="erreur" id="erreurPrix"></span>
                <p>Garde : <input name="garde_jusqua"></p><span class="erreur" id="erreurGarde"></span>
                <p>Notes <input name="notes"></p><span class="erreur" id="erreurNotes"></span>
                <button name="ajouterBouteilleCellier">Ajouter la bouteille</button>
            </div>
        </div>
    </div>
</div>
</div>