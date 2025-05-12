// Script de personnalisation du panier Ecwid minimaliste
window.ec = window.ec || {};
window.ec.config = window.ec.config || {};

// Fonction de journalisation simple
function logDebug(message) {
  console.log(`[DEBUG] ${message}`);
}

// S'assurer que le code s'exécute après le chargement complet d'Ecwid
Ecwid.OnAPILoaded.add(function() {
  logDebug("Ecwid API chargée 2008");
  
  // Fonction pour ajouter le bouton "Vider le panier"
  function addClearCartButton(pageType) {
    // Vérifier si nous sommes sur la page CART
    if (pageType !== "CART") return;
    
    // Vérifier si le bouton existe déjà
    if (document.getElementById('ecwid-clear-cart-button')) return;
    
    // Trouver le conteneur du panier
    const cartContainer = document.querySelector('.ec-cart__body') || 
                          document.querySelector('.ec-cart-container') || 
                          document.querySelector('.ec-cart');
    
    if (!cartContainer) {
      logDebug("Conteneur du panier introuvable");
      return;
    }
    
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
        if (success) {
          logDebug("Panier vidé avec succès");
        } else {
          console.error("Erreur lors du vidage du panier:", error);
        }
      });
    });
    
    // Ajouter le bouton au conteneur
    cartContainer.insertBefore(clearButton, cartContainer.firstChild);
  }

  // Surveiller les changements de page
  Ecwid.OnPageLoaded.add(function(page) {
    logDebug(`Page chargée: ${page.type}`);
    addClearCartButton(page.type);
  });
  
  // Exécuter une première fois pour la page actuelle
  Ecwid.getCurrentPage && Ecwid.getCurrentPage(function(page) {
    logDebug(`Page actuelle détectée: ${page.type}`);
    addClearCartButton(page.type);
  });
  
  logDebug("Observation des changements de page activée");
});
