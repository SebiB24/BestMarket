function updateCartBadge() {
    let nrItems = localStorage.getItem('cartItemCount') || 0

    if (nrItems > 0) {
        $('#cart-badge').text(nrItems).show()
    } else{
        $('#cart-badge').hide()
    }
}

$('document').ready(function(){
    updateCartBadge();
})