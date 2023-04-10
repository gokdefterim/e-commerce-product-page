new Promise((resolve,reject)=>{
    var jqueryCdn = document.createElement('script');
    jqueryCdn.onload=resolve;
    jqueryCdn.onerror=reject;
    jqueryCdn.src = 'https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.0/jquery.min.js';
    jqueryCdn.type = 'text/javascript';
    document.getElementsByTagName('head')[0].appendChild(jqueryCdn);
}).then(product);

function product (){

    var classes = {
        body : 'body',
        bigPhoto : 'big-photo',
        photo1 : 'photo1',
        photo2 : 'photo2',
        photo3 : 'photo3',
        photo4 : 'photo4',
        photo1Img : 'photo1-img',
        photo2Img : 'photo2-img',
        photo3Img : 'photo3-img',
        photo4Img : 'photo4-img',
        thePrice : 'the-price',
        minus : 'minus',
        plus : 'plus',
        number : 'number',
        add : 'add',
        badge : 'badge',
        rightButton : 'right-button',
        leftButton : 'left-button',
        slide : 'slide',
        popupShadow : 'popup-shadow',
        popupContainer : 'popup-container',
        close : 'close',
        mobMenu : 'mob-menu',
        mobSideBar : 'mob-side-bar',
        mobClose : 'mob-close',
        mobShadow : 'mob-shadow',
        mobMinus : 'mob-minus',
        mobPlus : 'mob-plus',
        mobNumber : 'mob-number',
        mobAdd : 'mob-add',
        mobBadge : 'mob-badge',
        mobLeftBut : 'mob-left-but',
        mobRightBut : 'mob-right-but',
        mobSlide : 'mob-slide',
        cart : 'cart',
        basket : 'basket',
        body : 'body',
        cartTitle : 'cart-title',
        cartContent : 'cart-content',
        cartEmpty : 'cart-empty',
        cartTitleP : 'cart-title-p',
        basketProduct : 'basket-product',
        basketThumbnail : 'basket-thumbnail',
        basketInfo : 'basket-info',
        basketPrice : 'basket-price',
        basketTitle : 'basket-title',
        boldPrice : 'bold-price',
        delete : 'delete',
        checkOut : 'check-out',
        checkOutButton : 'check-out-button'
    }

    var selectors = {};

    Object.keys(classes).forEach(function (key) {
        selectors[key] = '.' + classes[key];
    });

    var badge = 0;
    var count = 0;
    var counter = 0;
    var basketProductsHtml;
    var pageId = ($('h1').html()).replace(/\s/g , "");

    $(classes.body).click(function(e){
        var clickedElement = e.target.className;
        console.log(clickedElement);
        if (clickedElement === classes.cart ||
            clickedElement === classes.cartTitle ||
            clickedElement === classes.cartTitleP ||
            clickedElement === classes.cartEmpty ||
            clickedElement === classes.cartContent ||
            clickedElement === classes.basketThumbnail ||
            clickedElement === classes.basketPrice ||
            clickedElement === classes.basketTitle ||
            clickedElement === classes.boldPrice ||
            clickedElement.split(" ")[1] === classes.delete ) {
            $(selectors.basket).css('display', 'block');
        }
        else {
            $(selectors.basket).css('display', 'none');
        }
    });

    $(selectors.photo1).click(function() {
        counter = 0;
        changes();
    });
    $(selectors.photo2).click(function() {
        counter = 1;
        changes();
    });
    $(selectors.photo3).click(function() {
        counter = 2;
        changes();
    });
    $(selectors.photo4).click(function() {
        counter = 3;
        changes();
    });

    $(selectors.minus).click(function() {
        if (count > 0) {
            count --;
            $(selectors.number).html(`${count}`);
        }
    });
    $(selectors.plus).click(function() {
        count ++;
        $(selectors.number).html(`${count}`);
    });
    $(selectors.add).click(function() {
        badge += count;
        $(selectors.badge).html(`${badge}`);
        $(selectors.badge).css('background-color', '#FF0000');

        count = 0;
        $(selectors.number).html(`${count}`);

        basketProductsHtml = 
        `<div class="${classes.basketProduct} ${pageId}">
            <div class="${classes.basketThumbnail}"></div>
            <div class="${classes.basketInfo}">
                <p class="${classes.basketTitle}">${$('h1').html()}</p>    
                <p class="${classes.basketPrice}">
                    $${$(selectors.thePrice).html()} x ${badge} 
                    <b class="${classes.boldPrice}">$${($(selectors.thePrice).html()*badge).toFixed(2)}</b>
                </p>  
            </div>
            <img class="${pageId} ${classes.delete}" src="images/icon-delete.svg" alt="">
        </div>`;
    });
    
    $(selectors.cart).click(function() {
        if (badge == 0) {
            $(selectors.basket).css('display', 'visible');
        }
        else {

            var checkOutHtml = 
            `<div class="${classes.checkOut}">
                <p class="${classes.checkOutButton}"> Checkout </p>
            </div>`
            
            $(selectors.cartContent).html("");
            $(selectors.cartContent).css('justify-content' , 'space-between');
            $(selectors.cartContent).append(basketProductsHtml);

            if (!!($('.check-out')[0])) {
            }
            else {
                $(selectors.cartContent).after(checkOutHtml);
            }
        }

        $(selectors.delete).click(function(e) {

            var deleted = e.target.className.split(" ")[0];
            $(`.${deleted}`).remove();

            $(selectors.basket).css('display', 'block');

            if (!!($(selectors.basketThumbnail)[0])) {
            }
            else {
                $(selectors.checkOut).remove();
                $(selectors.cartContent).css('justify-content' , 'center');
                $(selectors.cartContent).append(`<p class="${classes.cartEmpty}">Your cart is empty.</p>`);
                badge = 0;
                $(selectors.badge).html(``);
                $(selectors.badge).css('background-color', '#FFFFFF');
            }

        })
    });

    $(selectors.bigPhoto).click(function() {
        $(selectors.popupShadow).css('display', 'block');
        $(selectors.popupContainer).css('display', 'block');
    });

    $(selectors.close).click(function() {
            
        $(selectors.popupShadow).css('display', 'none');
        $(selectors.popupContainer).css('display', 'none');
    
    });
    $(selectors.popupShadow).click(function() {
            
        $(selectors.popupShadow).css('display', 'none');
        $(selectors.popupContainer).css('display', 'none');
    
    });

    $(selectors.rightButton).click(function() {
        if (counter < 3) {
            counter++;
            changes();
        }
      });

    $(selectors.leftButton).click(function() {
        if (counter > 0) {
            counter--;
            changes();
        } 
      });

    var changes = () => {

        if (counter === 0) {
            $(selectors.slide).css({'margin-left': '0' , 'transition': 'all 1s ease-in-out'});
            $(selectors.bigPhoto).css('background-image', 'url(images/image-product-1.jpg)');
        
            $(selectors.photo1Img).css('opacity', 0.5);
            $(selectors.photo2Img).css('opacity', 1);
            $(selectors.photo3Img).css('opacity', 1);
            $(selectors.photo4Img).css('opacity', 1);
            
            $(selectors.photo1).css('border', '2px solid #ff7d1a');
            $(selectors.photo2).css('border', 'none');
            $(selectors.photo3).css('border', 'none');
            $(selectors.photo4).css('border', 'none');
        }
        else if (counter === 1) {
            $(selectors.slide).css({'margin-left': '-700px', 'transition': 'all 1s ease-in-out'});
            $(selectors.bigPhoto).css('background-image', 'url(images/image-product-2.jpg)');
        
            $(selectors.photo1Img).css('opacity', 1);
            $(selectors.photo2Img).css('opacity', 0.5);
            $(selectors.photo3Img).css('opacity', 1);
            $(selectors.photo4Img).css('opacity', 1);
            
            $(selectors.photo2).css('border', '2px solid #ff7d1a');
            $(selectors.photo1).css('border', 'none');
            $(selectors.photo3).css('border', 'none');
            $(selectors.photo4).css('border', 'none');
        }
        else if (counter === 2) {
            $(selectors.slide).css({'margin-left': '-1400px', 'transition': 'all 1s ease-in-out'});
            $(selectors.bigPhoto).css('background-image', 'url(images/image-product-3.jpg)');
        
            $(selectors.photo1Img).css('opacity', 1);
            $(selectors.photo2Img).css('opacity', 1);
            $(selectors.photo3Img).css('opacity', 0.5);
            $(selectors.photo4Img).css('opacity', 1);
            
            $(selectors.photo3).css('border', '2px solid #ff7d1a');
            $(selectors.photo2).css('border', 'none');
            $(selectors.photo1).css('border', 'none');
            $(selectors.photo4).css('border', 'none');    
        }
        else if (counter === 3) {
            $(selectors.slide).css({'margin-left': '-2100px', 'transition': 'all 1s ease-in-out'});
            $(selectors.bigPhoto).css('background-image', 'url(images/image-product-4.jpg)');
        
            $(selectors.photo1Img).css('opacity', 1);
            $(selectors.photo2Img).css('opacity', 1);
            $(selectors.photo3Img).css('opacity', 1);
            $(selectors.photo4Img).css('opacity', 0.5);
           
            $(selectors.photo4).css('border', '2px solid #ff7d1a');
            $(selectors.photo2).css('border', 'none');
            $(selectors.photo3).css('border', 'none');
            $(selectors.photo1).css('border', 'none');    
        }
        
    }

    $(selectors.mobMenu).click(function() {
        $(selectors.mobSideBar).css({'margin-left': '0', 'transition': 'all 1s ease-in-out'});
        $(selectors.mobShadow).css('display', 'block');
    })
    $(selectors.mobClose).click(function() {
        $(selectors.mobSideBar).css({'margin-left': '-70vw', 'transition': 'all 1s ease-in-out'});
        $(selectors.mobShadow).css('display', 'none');
    })

    $(selectors.mobMinus).click(function() {
        if (count > 0) {
            count --;
            $(selectors.mobNumber).html(`${count}`);
        }
    });
    $(selectors.mobPlus).click(function() {
        count ++;
        $(selectors.mobNumber).html(`${count}`);
    });
    $(selectors.mobAdd).click(function() {
        badge += count;
        $(selectors.mobBadge).html(`${badge}`);
        $(selectors.mobBadge).css('background-color', '#FF0000');

        count = 0;
        $(selectors.mobNumber).html(`${count}`);
    });

    $(selectors.mobRightBut).click(function() {
        if (counter < 3) {
            counter++;
            mobChanges();
        }
      });

    $(selectors.mobLeftBut).click(function() {   
        if (counter > 0) {
            counter--;
            mobChanges();
        } 
      });

      var mobChanges = () => {

        if (counter === 0) {
            $(selectors.mobSlide).css({'margin-left': '0' , 'transition': 'all 1s ease-in-out'});        
        }
        else if (counter === 1) {
            $(selectors.mobSlide).css({'margin-left': '-100vw', 'transition': 'all 1s ease-in-out'});
        }
        else if (counter === 2) {
            $(selectors.mobSlide).css({'margin-left': '-200vw', 'transition': 'all 1s ease-in-out'});
        }
        else if (counter === 3) {
            $(selectors.mobSlide).css({'margin-left': '-300vw', 'transition': 'all 1s ease-in-out'});
        }
        
    }

    (function initialize(){
        setStyle();
    })();
}