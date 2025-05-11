/**
 * Script de personnalisation du panier Ecwid
 * - Ajoute un bouton "Vider le panier"
 * - Masque les contrôles de quantité et les boutons de suppression des produits
 */

Ecwid.OnAPILoaded.add(function () {
  console.log("Ecwid API chargée");

  function customizeCart() {
    console.log("Personnalisation du panier en cours...");

    // Limiter l'effet à la page du panier seulement
    const cartPage = document.querySelector('.ec-cart');
    if (!cartPage) return;
    
    // MASQUER LES BOUTONS DE SUPPRESSION INDIVIDUELS
    const deleteButtons = cartPage.querySelectorAll('.ec-cart-item__control');
    deleteButtons.forEach(button => button.hidden = true);

    // MASQUER LES CONTRÔLES DE QUANTITÉ
    const quantityControls = cartPage.querySelectorAll('.ec-cart-item__count');
    quantityControls.forEach(control => control.hidden = true);

    // AJOUTER UN BOUTON "VIDER LE PANIER" S'IL N'EXISTE PAS DÉJÀ
    if (!document.getElementById('ecwid-clear-cart-button')) {
      const cartContainer = cartPage.querySelector('.ec-cart__body');
      if (cartContainer) {
        const clearButton = document.createElement('button');
        clearButton.id = 'ecwid-clear-cart-button';
        clearButton.textContent = 'X Vider le panier';
        clearButton.classList.add('ec-cart__btn');
        
        // Styling du bouton
        Object.assign(clearButton.style, {
          backgroundColor: '#e672f7',
          color: '#ffffff',
          border: 'none',
          padding: '10px 15px',
          margin: '10px 0',
          borderRadius: '5px',
          cursor: 'pointer',
          fontWeight: 'bold'
        });
        
        // Ajouter l'événement pour vider le panier
        clearButton.addEventListener('click', function (e) {
          e.preventDefault();
          console.log("Tentative de vidage du panier...");
          Ecwid.Cart.clear(function (success, error) {
            if (success) {
              console.log("Le panier a été vidé avec succès");
            } else {
              console.error("Échec du vidage du panier. Message d'erreur: " + error);
            }
          });
        });

        // Insérer le bouton en haut du panier
        const headerSection = cartContainer.querySelector('.ec-cart__head');
        if (headerSection) {
          headerSection.parentNode.insertBefore(clearButton, headerSection);
        }
      }
    }
  }

  // Appliquer les personnalisations uniquement sur les pages du panier
  Ecwid.OnPageLoaded.add(function (page) {
    console.log("Page Ecwid chargée:", page.type);
    if (page.type === "CART") {
      setTimeout(customizeCart, 500);
    }
  });
});
