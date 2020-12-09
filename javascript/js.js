let request = new XMLHttpRequest();
request.onreadystatechange = function(){
    if(this.readyState == XMLHttpRequest.DONE && this.status == 200){
        let array = JSON.parse(this.responseText);
        for(let i=0; i<array.length; i++){
        document.getElementById('products').innerHTML+= "<div class='col-10 col-md-4'>"+
            "<a href='product-page.html?id="+array[i]._id+"'>"+
                "<div id='product' class='block_product'>"+
                    "<div class='block_product_img'>"+
                        "<img src='"+array[i].imageUrl+"' alt='"+array[i]._id+"'/>"+
                    "</div>"+
                    "<div class='block_product_name'>"+
                        array[i].name+
                    "</div>"+
                    "<div class='block_product_price'>"+
                        array[i].price / 1000 +" €"+
                    "</div>"+
                "</div>"+
            "</a>"+
        "</div>";
        }
        let cartNumber = document.getElementById('header_cart_number');
        cartNumber.innerHTML = sessionStorage.length -1;
    }
}
request.open("GET","http://localhost:3000/api/furniture");
request.send();


