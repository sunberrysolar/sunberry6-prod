// Script de personnalisation du panier Ecwid minimaliste
// - Utilise principalement CSS pour masquer les éléments sans interférer avec le comportement natif
// - Ajoute un bouton "Vider le panier" uniquement sur la page panier
// Attendre que le script Ecwid soit complètement chargé
window.ec = window.ec || {};
window.ec.config = window.ec.config || {};
window.ec.config.storefrontUrls = window.ec.config.storefrontUrls || {};
// Variable pour suivre la page actuelle
var currentPageType = '';
// Fonction de journalisation simple
function logDebug(message) {
  console.log(`[DEBUG] ${message}`);
}
// S'assurer que le code s'exécute après le chargement complet d'Ecwid
Ecwid.OnAPILoaded.add(function() {
  logDebug("Ecwid API chargée 8h42");
  
  // Fonction minimale qui ajoute seulement le bouton "Vider le panier"
  function addClearCartButton() {
    try {
      // Ajouter un bouton "Vider le panier" seulement sur la page panier (pas sur paiement)
      const clearButtonExists = document.getElementById('ecwid-clear-cart-button');
      if (currentPageType === "CART") {
        if (!clearButtonExists) {
          const cartContainer = document.querySelector('.ec-cart__body') || document.querySelector('.ec-cart-container') || document.querySelector('.ec-cart');
          if (cartContainer) {
            logDebug("Ajout du bouton 'Vider le panier'");
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
              logDebug("Vidage du panier demandé");
              Ecwid.Cart.clear(function(success, error) { 
                if (success == true) {
                  logDebug("Panier vidé avec succès");
                } else {
                  console.error("Erreur lors du vidage du panier:", error);
                }
              });
            });
            cartContainer.insertBefore(clearButton, cartContainer.firstChild);
          }
        }
      } else {
        if (clearButtonExists) clearButtonExists.remove();
      }
    } catch (error) {
      console.error("Erreur lors de l'ajout du bouton 'Vider le panier':", error);
    }
  }
  
  // Exécuter les personnalisations à chaque changement de page
  Ecwid.OnPageLoaded.add(function(page) {
    currentPageType = page.type;
    logDebug(`Page chargée: ${page.type}`);
    setTimeout(addClearCartButton, 500);
  });
  
  // Appliquer les personnalisations également lors des changements du panier
  Ecwid.OnCartChanged.add(function(cart) {
    logDebug("Panier modifié");
    setTimeout(addClearCartButton, 500);
  });

  // Correction pour les éléments déroulants - Intercepter les clics sur les éléments de liste
  document.addEventListener('click', function(e) {
    // Vérifier si c'est un clic sur l'élément "4 produits" ou similaire
    if (e.target && (e.target.closest('.ec-cart-item__summary') || 
                    e.target.closest('.ec-summary-item') || 
                    e.target.closest('.ec-cart-summary'))) {
      
      // Attendre que le DOM soit mis à jour après le clic
      setTimeout(function() {
        // S'assurer que les handlers des éléments sont correctement réinitialisés
        const summaryItems = document.querySelectorAll('.ec-cart-item__summary, .ec-summary-item, .ec-cart-summary');
        
        summaryItems.forEach(function(item) {
          if (item && !item.hasAttribute('data-ecwid-fixed')) {
            item.setAttribute('data-ecwid-fixed', 'true');
            logDebug("Élément de sommaire sécurisé");
          }
        });
      }, 100);
    }
  }, true); // Utilisation de la phase de capture pour intercepter avant l'erreur
  
  // Première exécution
  setTimeout(addClearCartButton, 500);
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
    
    /* Fix pour éviter les erreurs JS sur les éléments déroulants */
    [data-ecwid-fixed] {
      position: relative;
    }
  `;
  document.head.appendChild(style);
  logDebug("Styles CSS appliqués");
});
