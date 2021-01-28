class Panier {

	enleverUnArticle(i){

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
	}

	ajouterUneQuantite(i, localHostArray){

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
                document.getElementById('total_cart').innerHTML="Total : "+sumtotal('block_product_subtotal')+" €";
                localStorage.setItem('userCart', JSON.stringify(storageArray));
            }
        }
	}

	retirerUneQuantite(i, localHostArray){

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
                document.getElementById('total_cart').innerHTML="Total : "+sumtotal('block_product_subtotal')+" €";
                localStorage.setItem('userCart', JSON.stringify(storageArray));
            }
        }
	}

	sousTotal(i, localHostArray){

        //Sous-total de chaque produit
        let subtotal = document.createElement('div');
        subtotal.innerHTML = ((localHostArray.price / 100)*storageArray[i].selectedProductQty)+" €";
        document.getElementById("subtotal_"+storageArray[i].selectedProductId+"_"+storageArray[i].selectedProductVarnish.replace(" ","_")).appendChild(subtotal);

	}
    
    updateCartNumber(){

        let cartNumber = document.getElementById('header_cart_number');
        cartNumber.innerHTML = storageArray.length;
        if (storageArray.length>9){
            cartNumber.style.fontSize = "16px";
        }
    }
}