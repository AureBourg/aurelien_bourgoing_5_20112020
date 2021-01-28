class Panier {

    constructor(i=null, localHostArray=null){
        if(i!=null && localHostArray!=null){
            this.i = i;
            this.localHostArray = localHostArray;
        }
    }

	enleverUnArticle(){

		//Bouton supprimer article
        let btnDelete = document.createElement('button');
        btnDelete.innerHTML = "<i class='fas fa-trash-alt'></i>";
        document.getElementById("totaldelete_"+storageArray[this.i].selectedProductId+"_"+storageArray[this.i].selectedProductVarnish.replace(" ","_")).appendChild(btnDelete);
        // Fonction pour supprimer un objet du panier
        btnDelete.onclick=()=>{
            storageArray.splice(this.i, 1);
            localStorage.setItem('userCart', JSON.stringify(storageArray));
            window.location.reload();
        }
	}

	ajouterUneQuantite(){

	    //Bouton quantité +
        let btnPlus = document.createElement('button');
        btnPlus.innerHTML = "<i class='fas fa-plus'></i>";
        document.getElementById("qtyminusplus_"+storageArray[this.i].selectedProductId+"_"+storageArray[this.i].selectedProductVarnish.replace(" ","_")).appendChild(btnPlus);
        //Fonction pour augmenter la quantité de l'article
        btnPlus.onclick=()=>{
            if(storageArray[this.i].selectedProductQty<9){
                storageArray[this.i].selectedProductQty++;
                document.getElementById('qtynumber_'+storageArray[this.i].selectedProductId+'_'+storageArray[this.i].selectedProductVarnish.replace(" ","_")).innerHTML=storageArray[this.i].selectedProductQty;
                document.getElementById('subtotal_'+storageArray[this.i].selectedProductId+'_'+storageArray[this.i].selectedProductVarnish.replace(" ","_")).innerHTML=((this.localHostArray.price / 100)*storageArray[this.i].selectedProductQty)+" €";
                document.getElementById('total_cart').innerHTML="Total : "+sumtotal('block_product_subtotal')+" €";
                localStorage.setItem('userCart', JSON.stringify(storageArray));
            }
        }
	}

	retirerUneQuantite(){

		//Bouton quantité -
        let btnMinus = document.createElement('button');
        btnMinus.innerHTML = "<i class='fas fa-minus'></i>";
        document.getElementById("qtyminusplus_"+storageArray[this.i].selectedProductId+"_"+storageArray[this.i].selectedProductVarnish.replace(" ","_")).prepend(btnMinus);
        //Fonction pour diminuer la quantité de l'article
        btnMinus.onclick=()=>{
            if(storageArray[this.i].selectedProductQty>1){
                storageArray[this.i].selectedProductQty--;
                document.getElementById('qtynumber_'+storageArray[this.i].selectedProductId+'_'+storageArray[this.i].selectedProductVarnish.replace(" ","_")).innerHTML=storageArray[this.i].selectedProductQty;
                document.getElementById('subtotal_'+storageArray[this.i].selectedProductId+'_'+storageArray[this.i].selectedProductVarnish.replace(" ","_")).innerHTML=((this.localHostArray.price / 100)*storageArray[this.i].selectedProductQty)+" €";
                document.getElementById('total_cart').innerHTML="Total : "+sumtotal('block_product_subtotal')+" €";
                localStorage.setItem('userCart', JSON.stringify(storageArray));
            }
        }
	}

	sousTotal(){

        //Sous-total de chaque produit
        let subtotal = document.createElement('div');
        console.log(this.localHostArray.price);
        subtotal.innerHTML = ((parseInt(this.localHostArray.price) / 100)*parseInt(storageArray[this.i].selectedProductQty))+" €";
        document.getElementById("subtotal_"+storageArray[this.i].selectedProductId+"_"+storageArray[this.i].selectedProductVarnish.replace(" ","_")).appendChild(subtotal);

	}
    
    updateCartNumber(){

        let cartNumber = document.getElementById('header_cart_number');
        cartNumber.innerHTML = storageArray.length;
        if (storageArray.length>9){
            cartNumber.style.fontSize = "16px";
        }
    }
}