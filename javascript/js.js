// Verifier si le panier est déja présent dans le storage
if (localStorage.getItem("userCart")) {

} else {
  //Création du array de produits dans le storage
  let cartInit = [];
  localStorage.setItem("userCart", JSON.stringify(cartInit));
};
let userCart = JSON.parse(localStorage.getItem("userCart"));

//Afficher le chiffre du panier selon le nombre d'items dedans
let cartNumber = document.getElementById('header_cart_number');
cartNumber.innerHTML = userCart.length;
if (userCart.length>9){
    cartNumber.style.fontSize = "16px";
}

// Requete API et boucle pour afficher la liste des produits
$.get("http://localhost:3000/api/furniture/")
    .done(function(products){
        for(let i=0; i<products.length; i++){
            document.getElementById('products').innerHTML+= ""+
            "<div class='col-12 col-sm-6 col-md-4 col-xl-3' id="+products[i]._id+">"+
                "<a href='product-page.html?id="+products[i]._id+"'>"+
                    "<div id='product' class='block_list_product'>"+
                        "<div class='block_list_product_img'>"+
                            "<img src='"+products[i].imageUrl+"' alt='"+products[i]._id+"'/>"+
                        "</div>"+
                        "<div class='block_list_product_name'>"+
                            products[i].name+
                        "</div>"+
                        "<div class='block_list_product_price'>"+
                            products[i].price / 100 +" €"+
                        "</div>"+
                    "</div>"+
                "</a>"+
            "</div>";
        }    
    })
    .fail(function(error){
        alert("Connexion au serveur impossible.");
    });
