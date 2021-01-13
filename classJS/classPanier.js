class Panier {
	
	ajouterUnArticle() {
		if (localStorage.getItem("userCart")) {

		} else {
		  let cartInit = [];
		  localStorage.setItem("userCart", JSON.stringify(cartInit));
		};
		let userCart = JSON.parse(localStorage.getItem("userCart"));

		cartButton.onclick = function() {
		    $.get("URL"+id)
		    .done(function(oneProduct){
		        let objetVise = userCart.filter(function(objet){
		          return objet.oneProduct.id == oneProduct.id
		        });      

		        if (objetVise.length == 0){
		            userCart.push(
                        {
                        oneProductId,
                        oneProductQty
                        }
                    );
		        }
		        else{
		          objetVise[0].oneProduct.qty = objetVise[0].oneProduct.qty + oneProduct.qty;
                }
                
                localStorage.setItem('userCart', JSON.stringify(userCart));
            })                  
        }
	}

	enleverUnArticle(){
		let btnDelete = document.createElement('button');
        btnDelete.innerHTML = "<i class='fas fa-trash-alt'></i>";
        document.getElementById("divparent").appendChild(btnDelete);
        
        btnDelete.onclick = function(){
	        storageArray.splice(i, 1);
	        localStorage.setItem('userCart', JSON.stringify(storageArray));
	        window.location.reload();
        }
	}

	ajouterUneQuantite(){

	    let btnPlus = document.createElement('button');
	    btnPlus.innerHTML = "<i class='fas fa-plus'></i>";
	    document.getElementById("divparent").appendChild(btnPlus);
        
        btnPlus.onclick = function(){
            if(storageArray[i].Qty<9){
                storageArray[i].selectedProduct.qty++;
                document.getElementById('divQtyNumber').innerHTML=storageArray[i].Qty;
                document.getElementById('divSubtotal').innerHTML=((localHostArray.price/100)*storageArray[i].Qty)+" €";
                document.getElementById('divTotalprice').innerHTML="Total : "+sumtotal+" €";
                localStorage.setItem('userCart', JSON.stringify(storageArray));
            }
        }
	}

	retirerUneQuantite(){
		let btnMinuc = document.createElement('button');
	    btnMinus.innerHTML = "<i class='fas fa-minus'></i>";
	    document.getElementById("divparent").appendChild(btnMinus);
        
        btnPlus.onclick = function(){
            if(storageArray[i].Qty>1){
                storageArray[i].selectedProductQty--;
                document.getElementById('divQtyNumber').innerHTML=storageArray[i].Qty;
                document.getElementById('divSubtotal').innerHTML=((localHostArray.price/100)*storageArray[i].Qty)+" €";
                document.getElementById('divTotalprice').innerHTML="Total : "+sumtotal+" €";
                localStorage.setItem('userCart', JSON.stringify(storageArray));
            }
        }
	}

	sousTotal(){
        let subtotal = document.createElement('div');
        subtotal.innerHTML = ((localHostArray.price/100)*storageArray[i].Qty)+" €";
        document.getElementById("divparent").appendChild(subtotal);

	}

	prixTotal(){		
        sumtotal = function(selector) {
            var sum = 0;
            $(selector).each(function() {
                sum += parseInt($(this).text());
            });
            return sum;
        }
        document.getElementById('divTotalprice').innerHTML="Total : "+sumtotal+" €";
	}
}