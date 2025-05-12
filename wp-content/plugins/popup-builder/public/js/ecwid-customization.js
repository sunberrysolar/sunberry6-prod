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
  logDebug("Ecwid API chargée");
  
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
    
    // Trouver le conteneur du panier
    const cartContainer = document.querySelector('.ec-cart__body') || 
                          document.querySelector('.ec-cart-container') || 
                          document.querySelector('.ec-cart');
    
    if (!cartContainer) return;
    
    logDebug("Ajout du bouton 'Vider le panier'");
    
    // Créer le bouton
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
    
    // Ajouter l'action de vidage du panier
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
    
    // Ajouter le bouton au conteneur
    cartContainer.insertBefore(clearButton, cartContainer.firstChild);
  }
  
  // Exécuter uniquement à chaque changement de page
  Ecwid.OnPageLoaded.add(function(page) {
    currentPageType = page.type;
    logDebug(`Page chargée: ${page.type}`);
    
    // Ajouter le bouton avec un délai pour s'assurer que le DOM est prêt
    setTimeout(addClearCartButton, 500);
    
    // Correction pour les liens de code promo
    if (page.type === "CART") {
      setTimeout(fixCouponLinks, 800);
    }
  });
  
  // Fonction pour corriger les liens de code promo
  function fixCouponLinks() {
    // Observer les changements dans le DOM pour détecter l'ajout des liens de code promo
    const observer = new MutationObserver(function(mutations) {
      mutations.forEach(function(mutation) {
        if (mutation.addedNodes && mutation.addedNodes.length > 0) {
          // Vérifier si les liens de code promo sont présents
          const couponLinks = document.querySelectorAll('.ec-cart-coupon__text .ec-link, .ec-cart__coupon .ec-link');
          
          if (couponLinks.length > 0) {
            logDebug("Liens de code promo détectés, application des correctifs");
            
            couponLinks.forEach(link => {
              // S'assurer que le lien est cliquable
              link.style.pointerEvents = 'auto';
              link.style.cursor = 'pointer';
              
              // Remplacer l'événement de clic par un qui ouvre directement le champ de saisie
              link.onclick = function(e) {
                e.preventDefault();
                e.stopPropagation();
                
                // Trouver le conteneur parent du coupon
                const couponContainer = link.closest('.ec-cart__coupon') || link.closest('.ec-cart-coupon');
                if (couponContainer) {
                  // Afficher le champ de saisie du code promo
                  const discountGroup = couponContainer.nextElementSibling;
                  if (discountGroup && discountGroup.classList.contains('ec-cart-discount-group')) {
                    discountGroup.style.display = 'block';
                    
                    // Mettre le focus sur le champ de saisie
                    const input = discountGroup.querySelector('input[type="text"]');
                    if (input) {
                      setTimeout(() => input.focus(), 100);
                    }
                  }
                }
                
                return false;
              };
            });
          }
        }
      });
    });
    
    // Observer les changements dans tout le document
    observer.observe(document.body, {
      childList: true,
      subtree: true
    });
  }
  
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
    
    /* Fix pour les liens de code promo pour qu'ils soient cliquables */
    .ec-cart-coupon__text .ec-link, 
    .ec-cart__coupon .ec-link {
      cursor: pointer !important;
      pointer-events: auto !important;
      display: inline-block !important;
      position: relative !important;
      z-index: 100 !important;
    }
    
    /* Style de survol pour les liens du code promo */
    .ec-cart-coupon__text .ec-link:hover,
    .ec-cart__coupon .ec-link:hover {
      text-decoration: underline !important;
      color: #e672f7 !important;
    }
    
    /* S'assurer que l'interaction avec le code promo soit possible */
    .ec-cart__coupon,
    .ec-cart-discount-group,
    .ec-cart-coupon__wrap,
    .ec-cart-coupon__input,
    .ec-cart-coupon__buttons {
      pointer-events: auto !important;
      position: relative !important;
      z-index: 50 !important;
    }
    
    /* Assurer que le champ de saisie du code promo est accessible */
    .ec-cart-coupon__input input,
    .ec-cart-coupon__buttons button {
      pointer-events: auto !important;
      cursor: pointer !important;
    }
    
    /* Fix pour le conteneur de résumé afin d'éviter des erreurs JS */
    .ec-cart-item__summary {
      display: block !important;
      pointer-events: none !important;
    }
    
    /* Mais permettre aux liens et boutons dans le résumé d'être cliquables */
    .ec-cart-item__summary a,
    .ec-cart-item__summary button,
    .ec-cart-item__summary .ec-link {
      pointer-events: auto !important;
    }
    
    /* Fixer l'affichage du texte du résumé pour éviter les erreurs JS */
    .ec-cart-item__summary-text {
      pointer-events: auto !important;
      cursor: default !important;
      display: inline-block !important;
      padding: 5px !important;
    }
  `;
  document.head.appendChild(style);
  logDebug("Styles CSS appliqués");
  
  // Lancer la première exécution
  setTimeout(addClearCartButton, 500);
});
