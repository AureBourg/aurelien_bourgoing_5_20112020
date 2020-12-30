//On récupère le tableau dans le storage
const storageArray = JSON.parse(localStorage.getItem('userCart'));

//Afficher le chiffre du panier selon le nombre d'items dedans
let cartNumber = document.getElementById('header_cart_number');
cartNumber.innerHTML = storageArray.length;

//Texte si le panier est vide
if(storageArray.length==0){
    document.getElementById('main_cart_products').innerHTML= "Votre panier est vide.";
}else{
    for(let i=0; i<storageArray.length; i++){
        $.get("http://localhost:3000/api/furniture/"+storageArray[i].selectedProductId)
        .done(function(localHostArray){

            let cartProduct = document.createElement('div');
            document.getElementById('products').appendChild(cartProduct);
            cartProduct.innerHTML = ""+
                        "<div id="+storageArray[i].selectedProductId+"_"+storageArray[i].selectedProductVarnish.replace(" ","_")+" class='block_product col-12'>"+
                            "<div class='block_product_img col-5'>"+
                                "<img src="+localHostArray.imageUrl+" alt="+storageArray[i].selectedProductId+"/>"+
                            "</div>"+
                            "<div class='block_product_infos col-4'>"+
                                "<div class='block_product_name'>"+
                                    localHostArray.name+
                                "</div>"+
                                "<div class='block_product_price'>"+
                                    localHostArray.price / 100 +" €"+
                                "</div>"+
                                "<div class='block_product_varnish'>"+
                                    "Vernis : "+storageArray[i].selectedProductVarnish+
                                "</div>"+
                                "<div id='qtyminusplus_"+storageArray[i].selectedProductId+"_"+storageArray[i].selectedProductVarnish.replace(" ","_")+"' class='block_product_quantity'>"+
                                    "<div id='qtynumber_"+storageArray[i].selectedProductId+"_"+storageArray[i].selectedProductVarnish.replace(" ","_")+"' class='block_product_quantity_number'>"+
                                        storageArray[i].selectedProductQty+
                                    "</div>"+
                                "</div>"+
                            "</div>"+
                            "<div id='totaldelete_"+storageArray[i].selectedProductId+"_"+storageArray[i].selectedProductVarnish.replace(" ", "_")+"' class='block_product_total col-3'>"+
                                "<div id='subtotal_"+storageArray[i].selectedProductId+"_"+storageArray[i].selectedProductVarnish.replace(" ","_")+"' class='block_product_subtotal'>"+
                                ((localHostArray.price / 100)*storageArray[i].selectedProductQty)+" €"+
                                "</div>"+
                            "</div>"+
                     "</div>";

            
            //Bouton supprimer article
            let btnDelete = document.createElement('button');
            btnDelete.innerHTML = "<i class='fas fa-trash-alt'></i>";
            document.getElementById("totaldelete_"+storageArray[i].selectedProductId+"_"+storageArray[i].selectedProductVarnish.replace(" ","_")).appendChild(btnDelete);
            // Fonction pour supprimer un objet du panier
            btnDelete.onclick=function(){
                storageArray.splice(i, 1);
                localStorage.setItem('userCart', JSON.stringify(storageArray));
                window.location.reload();
            }


            //Bouton quantité -
            let btnMinus = document.createElement('button');
            btnMinus.innerHTML = "<i class='fas fa-minus'></i>";
            document.getElementById("qtyminusplus_"+storageArray[i].selectedProductId+"_"+storageArray[i].selectedProductVarnish.replace(" ","_")).prepend(btnMinus);
            //Fonction pour diminuer la quantité de l'article
            btnMinus.onclick=function(){
                if(storageArray[i].selectedProductQty>1){
                    storageArray[i].selectedProductQty--;
                    document.getElementById('qtynumber_'+storageArray[i].selectedProductId+'_'+storageArray[i].selectedProductVarnish.replace(" ","_")).innerHTML=storageArray[i].selectedProductQty;
                    document.getElementById('subtotal_'+storageArray[i].selectedProductId+'_'+storageArray[i].selectedProductVarnish.replace(" ","_")).innerHTML=((localHostArray.price / 100)*storageArray[i].selectedProductQty)+" €";
                    console.log(storageArray);
                    localStorage.setItem('userCart', JSON.stringify(storageArray));
                }
            }

            //Bouton quantité +
            let btnPlus = document.createElement('button');
            btnPlus.innerHTML = "<i class='fas fa-plus'></i>";
            document.getElementById("qtyminusplus_"+storageArray[i].selectedProductId+"_"+storageArray[i].selectedProductVarnish.replace(" ","_")).appendChild(btnPlus);
            //Fonction pour augmenter la quantité de l'article
            btnPlus.onclick=function(){
                if(storageArray[i].selectedProductQty<9){
                    storageArray[i].selectedProductQty++;
                    document.getElementById('qtynumber_'+storageArray[i].selectedProductId+'_'+storageArray[i].selectedProductVarnish.replace(" ","_")).innerHTML=storageArray[i].selectedProductQty;
                    document.getElementById('subtotal_'+storageArray[i].selectedProductId+'_'+storageArray[i].selectedProductVarnish.replace(" ","_")).innerHTML=((localHostArray.price / 100)*storageArray[i].selectedProductQty)+" €";
                    console.log(storageArray);
                    localStorage.setItem('userCart', JSON.stringify(storageArray));
                }
            }

        
        })
        .fail(function(){
            alert("Connexion au serveur impossible.");
        });
    }//Fin boucle

    
      //Calcul prix total
        let totalQty = 0;
        let totalPrice = 0;
        for(let i=0;i<storageArray.length;i++){
            totalQty += storageArray[i].selectedProductQty;
            let productQty = (storageArray[i].selectedProductQty);
            $.get("http://localhost:3000/api/furniture/"+storageArray[i].selectedProductId)
            .done(function(localHostArray){
                let subtotal = ((localHostArray.price / 100)*productQty)
                totalPrice += subtotal;
                if(totalQty<2){
                    document.getElementById('total_cart').innerHTML="Total ("+totalQty+" article) : "+totalPrice+" €";
                }else{
                    document.getElementById('total_cart').innerHTML="Total ("+totalQty+" articles) : "+totalPrice+" €";               
                }
            })
        }
        


        /*somme des class .block_product_subtotal
        somme des class .block_product_quantity_number*/

} //Fin else
