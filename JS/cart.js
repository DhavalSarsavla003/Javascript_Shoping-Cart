let body = document.getElementById('body');
let total=document.getElementById('total-detail');


let CartDisplay = () => {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let str = '';
    let sum = 0;
    let qunt = 0;
    let Discount=0;

    cart.forEach(item => {
        str += `
            <div class="d-flex flex-wrap col-11 justify-content-center align-items-center border-black-cart my-2 px-2 rounded-2">
                <div class="col-12 col-md-2 bg-secondary rounded-2 my-2">
                    <img src="${item.thumbnail}" width="100">
                </div>
                <div class="col-12 col-md-4 title my-2">
                    <p> ${item.title} </p>
                </div>
                <div class="col-12 col-md-2 Quantity my-2">
                    <button class=" btn btn-secondary text-white" onclick="return decqun(${item.id})">-</button>
                        ${item.quantity}
                    <button class="btn btn-secondary text-white" onclick="return incqun(${item.id})">+</button>
                </div>
                <div class="col-12 col-md-2 price my-2">
                    <p>Price : ₹${(item.price * item.quantity).toFixed(2)}</p>
                </div>
                <div class="col-12 col-md-2 delete-button my-2">
                    <button class="btn btn-secondary text-white" onclick="return DeleteCartItem(${item.id})"> Delete </button>
                </div>
            </div>  
        `;
        qunt += item.quantity;  
        sum += (item.price * item.quantity);
    });


    body.innerHTML = str;
    if (cart == 0) {
        body.innerHTML ='<p class="text-center">Cart Is Empty..</p>';
        document.querySelector('.total-detail-bill').style="display:none;";
    }

    if(sum >= 500 && sum<=1000){
        Discount = 5;
    }
    else if(sum >= 1001 && sum<=2000){
        Discount = 10;
    }
    else if(sum>=2001){
        Discount = 15;
    }
    
    let finalBill = (sum*Discount)/100; 
    let finalTotal = (sum-finalBill).toFixed(2);

    total.innerHTML = `<div class="col-12"><span>Quantity : </span> ${qunt}</div><div class="col-12">Price : ₹${sum.toFixed(2)}</div></div><div class="col-12">Discount : ${Discount}%</div><div class="col-12">Discount Price : ₹${finalBill.toFixed(2)}</div> <div class="col-12">Final Bill : ${finalTotal}</div>`;


}

const incqun = (id) => {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let records = cart.map((prd) => {
        if (id == prd.id) {
            prd.quantity = prd.quantity += 1;
            return prd;
        } else {
            return prd;
        }
    })
    localStorage.setItem('cart', JSON.stringify(records));
    CartDisplay();
}

const decqun = (id) => {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let records = cart.map((prd) => {
        if (id == prd.id) {
            if (prd.quantity > 1) {
                prd.quantity = prd.quantity -= 1;
            }
            return prd;

        } else {
            return prd;
        }
    })
    localStorage.setItem('cart', JSON.stringify(records));
    CartDisplay();
}

let DeleteCartItem = (id) => {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let records = cart.filter(prd => {
        return prd.id != id;
    })
    localStorage.setItem('cart', JSON.stringify(records));
    CartDisplay();
}

CartDisplay();
