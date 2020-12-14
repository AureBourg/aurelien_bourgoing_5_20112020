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

// verification de l'existence d'un panier utilisateur dans le local.storage sinon création d'un nouveau panier
if (localStorage.getItem("userCart")) {
  console.log("Panier utilisateur existant dans le local storage");
} else {
  console.log("Création d'un panier utilisateur dans le local storage");
  //Création du tableau de produits dans le storage
  let cartInit = [];
  localStorage.setItem("userCart", JSON.stringify(cartInit));
};
let userCart = JSON.parse(localStorage.getItem("userCart"));

//Creation d'une condition pour attribuer une valeur à la variable "id"
const urlParam = new URLSearchParams(window.location.search);
const id = urlParam.get("id");

//Requete API avec le param "id" pour afficher les éléments de l'item selectionné
$.get("http://localhost:3000/api/furniture/"+id)
  .done(function(selectedProduct){

    document.getElementById('product_image').innerHTML+= "<img src='"+selectedProduct.imageUrl+"' alt='"+selectedProduct._id+"'/>";
    document.getElementById('product_infos_name').innerHTML+= selectedProduct.name;
    document.getElementById('product_infos_price').innerHTML+= selectedProduct.price / 1000 + " €";
    document.getElementById('product_infos_description').innerHTML+= selectedProduct.description;

    // création du menu déroulant pour la selection des options du produit
    let varnishOptions = selectedProduct.varnish;
    /*for(i=0, i<varnishOptions.length, i++){
      let varnishChoice = document.getElementById("varnish-options");
      varnishChoice.innerHTML += "<option>"+varnish+"</option>";
    };*/
})
  .fail(function(error){
    alert("Oups, une erreur s'est produite ! La page que vous recherchez n'existe pas");
  });




  
