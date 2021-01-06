const validInfo = JSON.parse(sessionStorage.getItem('confirmOrder'));
const getEmail = JSON.parse(sessionStorage.getItem('userEmail'));
const getName = JSON.parse(sessionStorage.getItem('userName'));


let displayOrderId = document.getElementById("orderId");
let displaytotalPrice = document.getElementById("totalPrice");
let displayEmail = document.getElementById('userEmail');
let displayName = document.getElementById('userName');


displayOrderId.textContent = "" + validInfo.getOrderId;
displaytotalPrice.textContent = "" + validInfo.getTotalPrice.replace("Total :","");
displayEmail.textContent = getEmail;
displayName.textContent = getName;
