// Script de personnalisation du panier Ecwid corrigé
// - Désactive les boutons de suppression des produits individuels
// - Désactive les contrôles de quantité tout en préservant l'affichage
// - Ajoute un bouton "Vider le panier" uniquement sur la page panier

// Attendre que le script Ecwid soit complètement chargé
window.ec = window.ec || {};
window.ec.config = window.ec.config || {};
window.ec.config.storefrontUrls = window.ec.config.storefrontUrls || {};

// Variable pour suivre la page actuelle
var currentPageType = '';

// S'assurer que le code s'exécute après le chargement complet d'Ecwid
Ecwid.OnAPILoaded.add(function() {
  console.log("Ecwid API chargée");
  
  // Fonction pour appliquer les personnalisations du panier
  function customizeCart() {
    console.log("Personnalisation du panier en cours...");
    
    // 1. DÉSACTIVER LES BOUTONS DE SUPPRESSION INDIVIDUELS
    const deleteButtons = document.querySelectorAll('.ec-cart-item__control');
    if (deleteButtons.length > 0) {
      console.log(`${deleteButtons.length} boutons de suppression désactivés`);
      deleteButtons.forEach(button => {
        button.style.pointerEvents = 'none';
        button.style.opacity = '0';
      });
    }
    
    // 2. DÉSACTIVER LES CONTRÔLES DE QUANTITÉ (sans affecter le résumé "4 produits")
    const quantityControls = document.querySelectorAll('.ec-cart-item__count');
    if (quantityControls.length > 0) {
      console.log(`${quantityControls.length} contrôles de quantité désactivés`);
      quantityControls.forEach(control => {
        // Désactiver seulement les boutons et sélecteurs internes
        const selectControls = control.querySelectorAll('select, button');
        selectControls.forEach(element => {
          element.style.pointerEvents = 'none';
          element.style.opacity = '0.7';
        });
      });
    }

    // 3. AJOUTER UN BOUTON "VIDER LE PANIER" SEULEMENT SUR LA PAGE PANIER (pas sur paiement)
    const clearButtonExists = document.getElementById('ecwid-clear-cart-button');
    if (currentPageType === "CART") {
      if (!clearButtonExists) {
        const cartContainer = document.querySelector('.ec-cart__body') || document.querySelector('.ec-cart-container') || document.querySelector('.ec-cart');
        if (cartContainer) {
          const clearButton = document.createElement('button');
          clearButton.id = 'ecwid-clear-cart-button';
          clearButton.textContent = 'X Vider le panier';
          clearButton.classList.add('ec-cart__btn');
          clearButton.style.backgroundColor = '#e672f7';
          clearButton.style.color = '#ffffff';
          clearButton.style.border = 'none';
          clearButton.style.padding = '10px 15px';
          clearButton.style.margin = '10px 0';
          clearButton.style.borderRadius = '5px';
          clearButton.style.cursor = 'pointer';
          clearButton.style.fontWeight = 'bold';
          clearButton.addEventListener('click', function(e) {
            e.preventDefault();
            Ecwid.Cart.clear(function(success, error) { 
              if (success == true) {
                console.log("Le panier a été vidé avec succès");
              } else {
                console.error("Échec du vidage du panier. Message d'erreur: " + error);
              }
            });
          });
          cartContainer.insertBefore(clearButton, cartContainer.firstChild);
        }
      }
    } else {
      if (clearButtonExists) clearButtonExists.remove();
    }
  }
  
  // Exécuter les personnalisations à chaque changement de page
  Ecwid.OnPageLoaded.add(function(page) {
    currentPageType = page.type;
    setTimeout(customizeCart, 500);
  });
  
  // Appliquer les personnalisations également lors des changements du panier
  Ecwid.OnCartChanged.add(function(cart) {
    setTimeout(customizeCart, 500);
  });

  // CSS supplémentaire
  const style = document.createElement('style');
  style.textContent = `
    #ecwid-clear-cart-button:hover {
      background-color: #000000 !important;
    }
    .ec-cart-item__count-value {
      visibility: visible !important;
      opacity: 1 !important;
    }
    .ec-cart-item__control {
      opacity: 0 !important;
      pointer-events: none !important;
    }
  `;
  document.head.appendChild(style);
});
