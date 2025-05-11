<!-- Place ceci dans le <head> de ta page, après l’inclusion du script Ecwid -->
<style>
  /* Masquer visuellement les boutons “supprimer” et les compteurs de quantité */
  .ec-cart-item__control,
  .ec-cart-item__count {
    visibility: hidden !important;
    /* pour éviter les sauts de mise en page */
    height: 0 !important;
    overflow: hidden !important;
  }

  /* Style du bouton “Vider le panier” */
  #ecwid-clear-cart-button {
    display: block;
    background-color: #e672f7;
    color: #ffffff;
    border: none;
    padding: 10px 15px;
    margin: 10px 0;
    border-radius: 5px;
    cursor: pointer;
    font-weight: bold;
  }
  #ecwid-clear-cart-button:hover {
    background-color: #000 !important;
  }
</style>

<!-- Ton widget Ecwid habituel -->
<div data-layout="BIG_ICON_TITLE_SUBTOTAL"
     data-icon="BASKET"
     data-fixed="TRUE"
     data-fixed-position="TOP_RIGHT"
     class="ec-cart-widget"></div>
<script data-cfasync="false" type="text/javascript"
        src="https://app.ecwid.com/script.js?71288281&data_platform=code"
        charset="utf-8"></script>
<script>
  Ecwid.init();

  Ecwid.OnAPILoaded.add(function () {
    function addClearCartButton() {
      // Ne rien faire si on n'est pas sur la page du panier
      if (!document.querySelector('.ec-cart')) return;

      // Ne pas recréer le bouton s'il existe déjà
      if (document.getElementById('ecwid-clear-cart-button')) return;

      var cartBody = document.querySelector('.ec-cart__body');
      if (!cartBody) return;

      var btn = document.createElement('button');
      btn.id = 'ecwid-clear-cart-button';
      btn.textContent = 'X Vider le panier';
      btn.addEventListener('click', function (e) {
        e.preventDefault();
        Ecwid.Cart.clear(function (success, error) {
          if (!success) console.error('Erreur vidage panier :', error);
        });
      });

      // Insérer avant l'en-tête du panier
      var header = cartBody.querySelector('.ec-cart__head');
      if (header) cartBody.insertBefore(btn, header);
      else cartBody.insertBefore(btn, cartBody.firstChild);
    }

    // À chaque chargement de page Ecwid
    Ecwid.OnPageLoaded.add(function (page) {
      if (page.type === 'CART') {
        setTimeout(addClearCartButton, 300);
      }
    });

    // Si le contenu du panier change (quantité, suppression…), on réessaie
    Ecwid.OnCartChanged.add(function () {
      setTimeout(addClearCartButton, 300);
    });
  });
</script>
