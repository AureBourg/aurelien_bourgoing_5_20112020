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
if (userCart.length>9){
  cartNumber.style.fontSize = "16px";
}

//Requete API avec la variable "id" pour afficher les éléments de l'item selectionné
$.get("http://localhost:3000/api/furniture/"+id)
  .done(function(selectedProduct){

    document.getElementById('product_image').innerHTML+= "<img src='"+selectedProduct.imageUrl+"' alt='"+selectedProduct._id+"'/>";
    document.getElementById('product_infos_name').innerHTML+= selectedProduct.name;
    document.getElementById('product_infos_price').innerHTML+= selectedProduct.price / 100 +" €";
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

//On cache le message "Le produit à été ajouté au panier"
$('#header_cart_message').hide();

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

        //Fonction qui fait apparaitre la div cachée avec le message "Le produit à été ajouté au panier"
        let messageCart = document.getElementById('header_cart_message');
        messageCart.innerHTML=""+
        "<div class='header_cart_message_title'>Produit ajouté au panier !</div>"+
        "<div class='header_cart_message_name'>"+selectedProduct.name+" x "+selectedProductQty+"</div>"+ 
        "<div class='header_cart_message_price'>"+selectedProduct.price * selectedProductQty / 100 + " €"+"</div>"+
        "<img src='"+selectedProduct.imageUrl+"' alt='"+selectedProduct._id+"'/>";
        $('#header_cart_message').fadeIn(300).delay(2000).fadeOut(150, 'linear');
    })
    .fail(function(error){
      alert("Oups, une erreur s'est produite ! Nous n'avons pas pu ajouter ce produit au panier");
      //function errorRedirection(){document.location.href="error-page.html"} //Redirection vers page d'erreur
    });
};


  
