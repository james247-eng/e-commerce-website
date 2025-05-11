
// sliding function
const brand_wrapper = document.querySelector(".brand-wrapper");
const inner_wrapper = document.querySelector(".inner-wrapper");
const shop_inner_wrapper = document.querySelector(".shop-inner-wrapper");
const nav_links = document.querySelectorAll(".nav-links");
const shop_slider_button = document.querySelectorAll(".shop-slider-button");


nav_links.forEach((item, index)=>{
    item.addEventListener("click",()=>{
       brand_wrapper.style.transform = ` translateX(${- 100 * index }vw)`
       shop_inner_wrapper.style.transform = ` translateX(${- 100 * index }vw)`
       inner_wrapper.style.transform = ` translateX(${- 100 * index }vw)`
    })
})
shop_slider_button.forEach((item, index)=>{
    item.addEventListener("click",()=>{
       shop_inner_wrapper.style.transform = ` translateX(${- 100 * index }vw)`
    })
})


/* shop rendering*/


const nike = document.getElementById("nike")
const blinks = document.getElementById("blinks")
const adidas = document.getElementById("adidas")
const hippie = document.getElementById("hippie")
const puma = document.getElementById("puma")


const basket = JSON.parse(localStorage.getItem("data")) || []; // basket for storing customer's selection


const generate_nike =()=>{
   //access the database
   return(nike.innerHTML = nike_data.map((products)=>{
      const{id, name, price, img, description}= products;
      const search= basket.find((product)=>product.id === id);
      return`
      <div id=product-id-${id} class="product-card">
         <img src=${img} alt="">
         <h5 class="price"><i class="fa fa-tag" aria-hidden="true"></i> $ ${price}</h5>
         <h4 class="name">${name}</h4>
         <h5 class="description">${description}</h5>
         <div class="button-quan">
            <i class="fa fa-cart-plus" aria-hidden="true" onclick="add_to_cart(${id})"></i>
            <h5 class="quantity" id=${id}>
               ${search === undefined? 0 : search.item}
            </h5>
         </div>
      </div>
      `
   }).join(""))
}

generate_nike();

const generate_blinks =()=>{
   //access the database
   return(blinks.innerHTML = blinks_data.map((products)=>{
      const{id, name, price, img, description}= products;
      const search= basket.find((product)=>product.id === id);
      return`
      <div id=product-id-${id} class="product-card">
         <img src=${img} alt="">
         <h5 class="price"><i class="fa fa-tag" aria-hidden="true"></i> $ ${price}</h5>
         <h4 class="name">${name}</h4>
         <h5 class="description">${description}</h5>
         <div class="button-quan">
            <i class="fa fa-cart-plus" aria-hidden="true" onclick="add_to_cart(${id})"></i>
            <h5 class="quantity" id=${id}>
               ${search === undefined? 0 : search.item}
            </h5>
         </div>
      </div>
      `
   }).join(""))
}

generate_blinks();

const generate_adidas =()=>{
   //access the database
   return(adidas.innerHTML = adidas_data.map((products)=>{
      const{id, name, price, img, description}= products;
      const search= basket.find((product)=>product.id === id);
      return`
      <div id=product-id-${id} class="product-card">
         <img src=${img} alt="">
         <h5 class="price"><i class="fa fa-tag" aria-hidden="true"></i> $ ${price}</h5>
         <h4 class="name">${name}</h4>
         <h5 class="description">${description}</h5>
         <div class="button-quan">
            <i class="fa fa-cart-plus" aria-hidden="true" onclick="add_to_cart(${id})"></i>
            <h5 class="quantity" id=${id}>
               ${search === undefined? 0 : search.item}
            </h5>
         </div>
      </div>
      `
   }).join(""))
}

generate_adidas();

const generate_hippie =()=>{
   //access the database
   return(hippie.innerHTML = hippie_data.map((products)=>{
      const{id, name, price, img, description}= products;
      const search= basket.find((product)=>product.id === id);
      return`
      <div id=product-id-${id} class="product-card">
         <img src=${img} alt="">
         <h5 class="price"><i class="fa fa-tag" aria-hidden="true"></i> $ ${price}</h5>
         <h4 class="name">${name}</h4>
         <h5 class="description">${description}</h5>
         <div class="button-quan">
            <i class="fa fa-cart-plus" aria-hidden="true" onclick="add_to_cart(${id})"></i>
            <h5 class="quantity" id=${id}>
               ${search === undefined? 0 : search.item}
            </h5>
         </div>
      </div>
      `
   }).join(""))
}

generate_hippie();

const generate_puma =()=>{
   //access the database
   return(puma.innerHTML = puma_data.map((products)=>{
      const{id, name, price, img, description}= products;
      const search= basket.find((product)=>product.id === id);
      return`
      <div id=product-id-${id} class="product-card">
         <img src=${img} alt="">
         <h5 class="price"><i class="fa fa-tag" aria-hidden="true"></i> $ ${price}</h5>
         <h4 class="name">${name}</h4>
         <h5 class="description">${description}</h5>
         <div class="button-quan">
            <i class="fa fa-cart-plus" aria-hidden="true" onclick="add_to_cart(${id})"></i>
            <h5 class="quantity" id=${id}>
               ${search === undefined? 0 : search.item}
            </h5>
         </div>
      </div>
      `
   }).join(""))
}

generate_puma();

// add to cart function ( this function is to add the selected
//  item to the cart when the button is clicked)

const add_to_cart = (id)=>{
   // target the selected item by it id
   const selectedItem = id;
   // search for the selected item in the basket
   const search = basket.find((products)=>products.id === selectedItem.id);
   // push the selected item to the basket if its not alredady in the basket
   if(search === undefined){
      basket.push({id:selectedItem.id, item:1})
   }
   // else if its already in the basket just increas the quantity by 1
   else{
      search.item +=1
   }
   update(selectedItem.id);
   localStorage.setItem("data", JSON.stringify(basket));
   
}

// update function

const update = (id)=>{
   const selectedItem = id;
   const search= basket.find((product)=>product.id === id);
   document.getElementById(id).innerHTML = search.item;
   cart_update();
}

// cart update

const cart_update=()=>{
   const cart = document.getElementById("cart");
   cart.innerHTML = basket.map((products)=>products.item).reduce((a, b)=>a + b, 0);
}

cart_update();

// togle nav bar functionality
const show_menu_btn = document.querySelector(".fa-bars");
const hide_menu_btn = document.querySelector(".fa-times");
const navbottom = document.querySelector(".navbottom");
const show_menu = ()=>{
   navbottom.style.visibility = "visible";
   show_menu_btn.style.display = 'none';
   hide_menu_btn.style.visibility ='visible';
}
const hide_menu = ()=>{
   navbottom.style.visibility = "hidden";
   hide_menu_btn.style.visibility ='hidden';
   show_menu_btn.style.display = 'block';
}
