// Script de personnalisation du panier Ecwid minimaliste
// - Uniquement JS pour le bouton "Vider le panier"
// - Tout le reste en CSS pur

// Attendre que le script Ecwid soit complètement chargé
window.ec = window.ec || {};
window.ec.config = window.ec.config || {};
window.ec.config.storefrontUrls = window.ec.config.storefrontUrls || {};

// Fonction de journalisation simple
function logDebug(message) {
  console.log(`[DEBUG] ${message}`);
}

// S'assurer que le code s'exécute après le chargement complet d'Ecwid
Ecwid.OnAPILoaded.add(function() {
  logDebug("Ecwid API chargée 9h50");
  
  // Variable pour suivre la page actuelle
  var currentPageType = '';
  
  // Fonction minimale qui ajoute seulement le bouton "Vider le panier"
  function addClearCartButton() {
    // Vérifier si nous sommes sur la page CART
    if (currentPageType !== "CART") {
      const existingButton = document.getElementById('ecwid-clear-cart-button');
      if (existingButton) existingButton.remove();
      return;
    }
    
    // Vérifier si le bouton existe déjà
    if (document.getElementById('ecwid-clear-cart-button')) return;
    
    // Trouver le conteneur du panier - CHANGEMENT : utiliser un sélecteur plus spécifique
    // et éviter d'insérer le bouton au début du conteneur
    const cartContainer = document.querySelector('.ec-cart__body');
    
    if (!cartContainer) {
      logDebug("Conteneur du panier non trouvé");
      return;
    }
    
    logDebug("Ajout du bouton 'Vider le panier'");
    
    // Créer un conteneur dédié pour notre bouton
    const buttonContainer = document.createElement('div');
    buttonContainer.id = 'ecwid-clear-cart-button-container';
    buttonContainer.style.textAlign = 'center';
    buttonContainer.style.margin = '10px 0';
    
    // Créer le bouton
    const clearButton = document.createElement('button');
    clearButton.id = 'ecwid-clear-cart-button';
    clearButton.textContent = 'X Vider le panier';
    clearButton.style.backgroundColor = '#e672f7';
    clearButton.style.color = '#ffffff';
    clearButton.style.border = 'none';
    clearButton.style.padding = '10px 15px';
    clearButton.style.borderRadius = '5px';
    clearButton.style.cursor = 'pointer';
    clearButton.style.fontWeight = 'bold';
    
    // Ajouter l'action de vidage du panier
    clearButton.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation(); // Empêcher la propagation de l'événement
      logDebug("Vidage du panier demandé");
      Ecwid.Cart.clear(function(success, error) { 
        if (success == true) {
          logDebug("Panier vidé avec succès");
        } else {
          console.error("Erreur lors du vidage du panier:", error);
        }
      });
      return false; // Empêcher le comportement par défaut
    });
    
    // Ajouter le bouton au conteneur dédié
    buttonContainer.appendChild(clearButton);
    
    // CHANGEMENT : Ajouter le conteneur après le premier élément enfant au lieu de le mettre en premier
    // Cela devrait éviter d'interférer avec la structure attendue par Ecwid
    if (cartContainer.firstChild && cartContainer.firstChild.nextSibling) {
      cartContainer.insertBefore(buttonContainer, cartContainer.firstChild.nextSibling);
    } else {
      // Fallback si la structure est différente
      cartContainer.appendChild(buttonContainer);
    }
  }
  
  // Exécuter uniquement à chaque changement de page
  Ecwid.OnPageLoaded.add(function(page) {
    currentPageType = page.type;
    logDebug(`Page chargée: ${page.type}`);
    
    // CHANGEMENT : Augmenter le délai pour s'assurer que tous les éléments Ecwid sont chargés
    // avant d'ajouter notre bouton
    if (page.type === "CART") {
      setTimeout(addClearCartButton, 1000);
    }
  });
  
  // CSS uniquement - approche non intrusive
  const style = document.createElement('style');
  style.textContent = `
    /* Style pour le bouton "Vider le panier" */
    #ecwid-clear-cart-button:hover {
      background-color: #000000 !important;
    }
    
    /* Maintenir visible les valeurs de quantité */
    .ec-cart-item__count-value {
      visibility: visible !important;
      opacity: 1 !important;
    }
    
    /* Masquer les boutons de suppression pour les articles individuels uniquement */
    .ec-cart-item:not(.ec-cart-item--summary) .ec-cart-item__control {
      opacity: 0 !important; 
      visibility: hidden !important;
    }
    
    /* Désactiver les contrôles de quantité pour les articles individuels uniquement */
    .ec-cart-item:not(.ec-cart-item--summary) .ec-cart-item__count select,
    .ec-cart-item:not(.ec-cart-item--summary) .ec-cart-item__count button {
      opacity: 0.5 !important;
      pointer-events: none !important;
    }
    
    /* S'assurer que tous les éléments du résumé restent actifs */
    .ec-cart-item--summary * {
      pointer-events: auto !important;
      opacity: 1 !important;
      visibility: visible !important;
    }

    /* Masquer le bouton "Parcourir la boutique" */
    .ec-cart__button {
    display: none !important;
    }

    /* Masquer lien "Continuer mes achats" */
    .ec-cart__shopping .ec-cart-shopping {
    display: none !important;
    }
  `;
  document.head.appendChild(style);
  logDebug("Styles CSS appliqués");
});
