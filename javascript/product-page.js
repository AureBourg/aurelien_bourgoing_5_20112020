/*const url = window.location.search;
const urlParam = new URLSearchParams(url);
const id = urlParam.get("id");

let request = new XMLHttpRequest();
request.onreadystatechange = function(){
    if(this.readyState == XMLHttpRequest.DONE && this.status == 200){
        let array = JSON.parse(this.responseText);
        document.getElementById('product_image').innerHTML+= "<img src='"+array.imageUrl+"' alt='"+array._id+"'/>";
        document.getElementById('product_infos_name').innerHTML+= array.name;
        document.getElementById('product_infos_price').innerHTML+= array.price / 1000 + " €";
        document.getElementById('product_infos_personalisation').innerHTML+= "<div class='product_infos_personalisation_title'>"+
                    "<p>Vernis :</p>"+
                "</div>"+
                "<div>"+
                    "<input type='radio' name='personalisation' value='"+array.varnish[0]+"' id='product_infos_personalisation_color_1' checked>"+
                    "<label for='product_infos_personalisation_color'>"+array.varnish[0]+"</label>"+
                  "</div>"+
                  
                  "<div>"+
                    "<input type='radio' name='personalisation' value='"+array.varnish[1]+"' id='product_infos_personalisation_color_2'>"+
                    "<label for='product_infos_personalisation_color_2'>"+array.varnish[1]+"</label>"+
                  "</div>"+
                  
                  "<div>"+
                    "<input type='radio' name='personalisation' value='"+array.varnish[2]+"' id='product_infos_personalisation_color_3'>"+
                    "<label for='product_infos_personalisation_color_3'>"+array.varnish[2]+"</label>"+
                  "</div>";
                  //boucle varnish
        document.getElementById('product_infos_description').innerHTML+= array.description;

        let cartButton = document.getElementById('button_add_to_cart');
        //let cartNumber = document.getElementById('header_cart_number');

        cartButton.setAttribute('data-id', array._id)

        /*cartNumber.innerHTML = sessionStorage.length -1;
        cartButton.onclick = function(){
            sessionStorage.setItem(array._id, JSON.stringify(array));
            cartNumber.innerHTML = sessionStorage.length -1;
        } */

        /*cartProducts = [];
        sessionStorage.setItem('panier', cartProducts)
        console.log(cartProducts);

        cartButton.onclick = function(){
          let productToAdd = {
            "id": cartButton.getAttribute('data-id'),
            "quantity" : 1
          };
          let newCartProducts = cartProducts.push(productToAdd);
          sessionStorage.setItem('panier', newCartProducts);       
        };*/

/*let cartProductsDepart = [];
let productToAdd = {
  "id": cartButton.getAttribute('data-id'),
  "quantity" : 1
};


sessionStorage.setItem('panier', JSON.stringify(cartProductsDepart));
cartButton.onclick = function(cartProducts) {
    sessionStorage.getItem('panier');
    cartProductsDepart.push(productToAdd);
    cartProducts.textContent = cartProductsDepart;
    sessionStorage.setItem('panier', JSON.stringify(cartProducts));
    console.log(JSON.parse(sessionStorage.getItem('panier')));
}

      
};
}
request.open("GET","http://localhost:3000/api/furniture/"+id);
request.send();*/

// Verifier si le panier est déja présent dans le storage
if (localStorage.getItem("userCart")) {

} else {
  //Création du array de produits dans le storage
  let cartInit = [];
  localStorage.setItem("userCart", JSON.stringify(cartInit));
};
let userCart = JSON.parse(localStorage.getItem("userCart"));

//Creation de la variable id
const urlParam = new URLSearchParams(window.location.search);
const id = urlParam.get("id");

//Afficher le chiffre du panier selon le nombre d'items dedans
let cartNumber = document.getElementById('header_cart_number');
cartNumber.innerHTML = userCart.length; 

//Requete API avec la variable "id" pour afficher les éléments de l'item selectionné
$.get("http://localhost:3000/api/furniture/"+id)
  .done(function(selectedProduct){

    document.getElementById('product_image').innerHTML+= "<img src='"+selectedProduct.imageUrl+"' alt='"+selectedProduct._id+"'/>";
    document.getElementById('product_infos_name').innerHTML+= selectedProduct.name;
    document.getElementById('product_infos_price').innerHTML+= selectedProduct.price / 1000 + " €";
    document.getElementById('product_infos_description').innerHTML+= selectedProduct.description;

    // création du menu déroulant pour la selection des options du produit
    let varnishOption = selectedProduct.varnish;
    varnishOption.forEach((varnish) => {
      let varnishChoice = document.createElement('option')
      varnishChoice.setAttribute
      document.getElementById("varnish-options").appendChild(varnishChoice).innerHTML = varnish;
    });
  })
  .fail(function(error){
    alert("Oups, une erreur s'est produite ! La page que vous recherchez n'existe pas");
  });

//Fonction ajouter le produit au panier de l'utilisateur
let cartButton = document.getElementById('button_add_to_cart');  
cartButton.onclick = function() { //Fonction au clic sur le bouton 'Ajouter au panier'
    $.get("http://localhost:3000/api/furniture/"+id)
    .done(function(selectedProduct){ //Récupérer les infos du produit choisis par l'utilisateur
        let selectedProductId = selectedProduct._id;
        let selectedProductQty = parseInt(document.getElementById('productQuantity').options[document.getElementById('productQuantity').selectedIndex].value);
        let selectedProductVarnish = document.getElementById('varnish-options').options[document.getElementById('varnish-options').selectedIndex].text;
        
        //Verifier si le produit avec le varnish est dans le array
        let objetVise = userCart.filter(function(objet){
          return objet.selectedProductId == selectedProductId && objet.selectedProductVarnish == selectedProductVarnish
        });        
        
        //Si le produit n'est pas dans le array, on le met
        if (objetVise.length == 0){
          userCart.push({
              selectedProductId,
              selectedProductQty,
              selectedProductVarnish
            });
          cartNumber.innerHTML = userCart.length; //Et on met le chiffre du panier à jour
        }
        else{ //Sinon, on ajoute la quantité voulue à la quantité du produit dans le array
          objetVise[0].selectedProductQty = objetVise[0].selectedProductQty + selectedProductQty;
        }
            
        localStorage.setItem('userCart', JSON.stringify(userCart)); //On place le array dans le storage
        cartNumber.innerHTML = userCart.length; //On met à jour le chiffre du panier
        console.log(userCart);

        //Mettre une fonction ici qui fait apparaitre la div cachée avec le message "Le produit à été ajouté au panier"
        //OU creer un message avec une anim d'apparition en CSS et la declencher au clic

        
    })
    .fail(function(error){
      alert("Oups, une erreur s'est produite ! Nous n'avons pas pu ajouter ce produit au panier");
    });
};


  
