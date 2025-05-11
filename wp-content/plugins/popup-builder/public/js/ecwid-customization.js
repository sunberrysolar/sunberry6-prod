<script>
window.ec = window.ec || {};
window.ec.config = window.ec.config || {};
window.ec.config.storefrontUrls = window.ec.config.storefrontUrls || {};

var currentPageType = '';

Ecwid.OnAPILoaded.add(function() {
  console.log("Ecwid API chargée");

  function customizeCart() {
    // on ne touche rien si on n'est pas sur le panier
    if (currentPageType !== "CART") return;
    console.log("Personnalisation du panier…");

    // masquer avec hidden
    document.querySelectorAll('.ec-cart-item__control, .ec-cart-item__count')
            .forEach(el => el.hidden = true);

    // ajouter le bouton s’il n’existe pas encore
    if (!document.getElementById('ecwid-clear-cart-button')) {
      var cartBody = document.querySelector('.ec-cart__body');
      if (!cartBody) return;

      var btn = document.createElement('button');
      btn.id = 'ecwid-clear-cart-button';
      btn.textContent = 'X Vider le panier';
      Object.assign(btn.style, {
        display:      'block',
        background:   '#e672f7',
        color:        '#fff',
        border:       'none',
        padding:      '10px 15px',
        margin:       '10px 0',
        borderRadius: '5px',
        cursor:       'pointer',
        fontWeight:   'bold'
      });
      btn.addEventListener('click', function(e) {
        e.preventDefault();
        Ecwid.Cart.clear(function(success, error) {
          if (!success) console.error('Erreur vidage :', error);
        });
      });

      var head = cartBody.querySelector('.ec-cart__head');
      cartBody.insertBefore(btn, head || cartBody.firstChild);
      console.log("Bouton 'Vider le panier' ajouté");
    }
  }

  Ecwid.OnPageLoaded.add(function(page) {
    currentPageType = page.type;
    if (page.type === "CART") {
      setTimeout(customizeCart, 300);
    }
  });

  Ecwid.OnCartChanged.add(function() {
    if (currentPageType === "CART") {
      setTimeout(customizeCart, 300);
    }
  });
});
</script>
