/**
 * Script de personnalisation du panier Ecwid
 * - Ajoute un bouton "Vider le panier"
 * - Supprime les boutons de suppression des produits individuels
 * - Masque les contrôles de quantité
 */

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
    
    // 1. MASQUER LES BOUTONS DE SUPPRESSION INDIVIDUELS
    const deleteButtons = document.querySelectorAll('.ec-cart-item__control');
    if (deleteButtons.length > 0) {
      console.log(`${deleteButtons.length} boutons de suppression masqués`);
      deleteButtons.forEach(button => {
        button.style.display = 'none';
      });
    }
    
    // 2. MASQUER LES CONTRÔLES DE QUANTITÉ
    const quantityControls = document.querySelectorAll('.ec-cart-item__count');
    if (quantityControls.length > 0) {
      console.log(`${quantityControls.length} contrôles de quantité masqués`);
      quantityControls.forEach(control => {
        control.style.display = 'none';
      });
    }
    
    // 3. AJOUTER UN BOUTON "VIDER LE PANIER" S'IL N'EXISTE PAS DÉJÀ
    if (!document.getElementById('ecwid-clear-cart-button')) {
      const cartContainer = document.querySelector('.ec-cart__body') || 
                           document.querySelector('.ec-cart-container') || 
                           document.querySelector('.ec-cart');
      
      if (cartContainer) {
        console.log("Conteneur du panier trouvé");
        
        // Créer le bouton
        const clearButton = document.createElement('button');
        clearButton.id = 'ecwid-clear-cart-button';
        clearButton.textContent = 'X Vider le panier';
        clearButton.classList.add('ec-cart__btn');
        
        // Styling du bouton
        clearButton.style.backgroundColor = '#e672f7';
        clearButton.style.color = '#ffffff';
        clearButton.style.border = 'none';
        clearButton.style.padding = '10px 15px';
        clearButton.style.margin = '10px 0';
        clearButton.style.borderRadius = '5px';
        clearButton.style.cursor = 'pointer';
        clearButton.style.fontWeight = 'bold';
        
        // Ajouter l'événement pour vider le panier
        clearButton.addEventListener('click', function(e) {
          e.preventDefault();
          console.log("Tentative de vidage du panier...");
          
          // Utiliser exactement la méthode documentée par Ecwid
          Ecwid.Cart.clear(function(success, error) { 
            if (success == true) {
              console.log("Le panier a été vidé avec succès");
              // Optionnel: Afficher un message à l'utilisateur
              alert("Votre panier a été vidé");
            } else {
              console.error("Échec du vidage du panier. Message d'erreur: " + error);
              alert("Impossible de vider le panier: " + error);
            }
          });
        });
        
        // Insérer le bouton en haut du panier
        const headerSection = cartContainer.querySelector('.ec-cart__head') || 
                             cartContainer.querySelector('.ec-cart-item:first-child');
        
        if (headerSection) {
          headerSection.parentNode.insertBefore(clearButton, headerSection);
        } else {
          cartContainer.insertBefore(clearButton, cartContainer.firstChild);
        }
        
        console.log("Bouton 'Vider le panier' ajouté");
      } else {
        console.log("Conteneur du panier non trouvé");
      }
    }
  }
  
  // Exécuter les personnalisations à chaque changement de page
  Ecwid.OnPageLoaded.add(function(page) {
    console.log("Page Ecwid chargée:", page.type);
    
    // Mémoriser la page actuelle
    currentPageType = page.type;
    
    // Appliquer les modifications seulement sur la page du panier
    //if (page.type == "CART") {
      // Attendre que le DOM du panier soit complètement chargé
      setTimeout(customizeCart, 500);
      
      // Ajouter une surveillance des modifications pour les changements dynamiques
      const observer = new MutationObserver(function(mutations) {
        customizeCart();
      });
      
      // Observer les changements dans le DOM du panier
      const cartRoot = document.querySelector('.ec-cart') || document.querySelector('.ec-cart-container');
      if (cartRoot) {
        observer.observe(cartRoot, { childList: true, subtree: true });
    //  }
    }
  });
  
  // Appliquer les personnalisations également lors des changements du panier
  Ecwid.OnCartChanged.add(function(cart) {
    console.log("Contenu du panier modifié");
    
    // Vérifier si nous sommes sur la page du panier en utilisant la variable currentPageType
    //if (currentPageType == "CART") {
      setTimeout(customizeCart, 500);
    //}
  });
  
  // CSS supplémentaire
  const style = document.createElement('style');
  style.textContent = `
    #ecwid-clear-cart-button:hover {
      background-color: #000000 !important;
    }
    
    /* Masquer les boutons de suppression */
    .ec-cart-item__control {
      display: none !important;
    }
    
    /* Masquer les contrôles de quantité */
    .ec-cart-item__count {
      display: none !important;
    }
    
    /* Masquer le sélecteur de quantité 
    .form-control--select-inline {
      display: none !important;
    }*/
    
    /* Masquer les menus déroulants de quantité */
    .ec-cart-item__count--select {
      display: none !important;
    }
    
    /* Pour être sûr que rien ne s'affiche */
    .ec-cart-item__count-inner {
      display: none !important;
    }
    
    /* Assurer que le bouton du panier reste bien visible */
    #ecwid-clear-cart-button {
      display: block !important;
      margin: 10px 0 !important;
    }
  `;
  document.head.appendChild(style);
});
