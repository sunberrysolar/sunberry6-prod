// Script de personnalisation du panier Ecwid avec logs de débogage avancés
// - Désactive les boutons de suppression des produits individuels
// - Désactive les contrôles de quantité tout en préservant l'affichage 
// - Vise à conserver la fonctionnalité du clic sur "X produits" pour afficher la liste
// - Ajoute un bouton "Vider le panier" uniquement sur la page panier

// Attendre que le script Ecwid soit complètement chargé
window.ec = window.ec || {};
window.ec.config = window.ec.config || {};
window.ec.config.storefrontUrls = window.ec.config.storefrontUrls || {};

// Variable pour suivre la page actuelle
var currentPageType = '';

// Fonction de journalisation améliorée
function logDebug(message, obj) {
  const timestamp = new Date().toISOString().substr(11, 8);
  console.log(`[DEBUG ${timestamp}] ${message}`);
  if (obj) console.log(obj);
}

// Fonction pour inspecter les événements sur un élément
function inspectEvents(element, description) {
  if (!element) {
    logDebug(`Élément non trouvé: ${description}`);
    return;
  }
  
  logDebug(`Élément trouvé: ${description}`, {
    tagName: element.tagName,
    classList: Array.from(element.classList),
    attributes: Array.from(element.attributes).map(attr => `${attr.name}="${attr.value}"`),
    innerHTML: element.innerHTML.substring(0, 100) + '...',
    style: element.style.cssText
  });
  
  // Tenter d'identifier les gestionnaires d'événements
  const events = ["click", "mousedown", "mouseup", "keydown", "focus", "blur"];
  logDebug(`Tentative d'identification des gestionnaires d'événements pour: ${description}`);
  
  // On ne peut pas directement accéder aux gestionnaires d'événements définis
  // Nous signalons simplement quel élément est cliquable
  if (window.getComputedStyle(element).pointerEvents !== 'none') {
    logDebug(`L'élément est cliquable (pointerEvents: ${window.getComputedStyle(element).pointerEvents})`);
  } else {
    logDebug(`L'élément n'est PAS cliquable (pointerEvents: ${window.getComputedStyle(element).pointerEvents})`);
  }
}

// S'assurer que le code s'exécute après le chargement complet d'Ecwid
Ecwid.OnAPILoaded.add(function() {
  logDebug("Ecwid API chargée");
  
  // Fonction pour appliquer les personnalisations du panier
  function customizeCart() {
    logDebug("=== DÉBUT DE LA PERSONNALISATION DU PANIER ===");
    
    try {
      // Analyser l'élément de résumé "X produits" avant modification
      const productSummary = document.querySelector('.ec-cart-item--summary .form-control--select-inline');
      inspectEvents(productSummary, "Résumé des produits AVANT modification");
      
      // Tenter de capturer les événements existants
      if (productSummary) {
        const originalClickHandler = productSummary.onclick;
        logDebug(`Gestionnaire de clic original: ${originalClickHandler ? "Présent" : "Non défini"}`);
        
        // Test clonage et réattachement
        logDebug("Tentative d'identification du comportement du clic sur le résumé");
        const clonedNode = productSummary.cloneNode(true);
        productSummary.parentNode.replaceChild(clonedNode, productSummary);
        logDebug("Nœud cloné et remplacé pour préserver l'élément d'origine");
      }
      
      // 1. DÉSACTIVER LES BOUTONS DE SUPPRESSION INDIVIDUELS - UNIQUEMENT POUR LES ARTICLES NORMAUX
      const deleteButtons = document.querySelectorAll('.ec-cart-item:not(.ec-cart-item--summary) .ec-cart-item__control');
      if (deleteButtons.length > 0) {
        logDebug(`${deleteButtons.length} boutons de suppression trouvés pour désactivation`);
        deleteButtons.forEach((button, index) => {
          button.style.pointerEvents = 'none';
          button.style.opacity = '0';
          logDebug(`Bouton de suppression ${index + 1} désactivé`);
        });
      } else {
        logDebug("Aucun bouton de suppression trouvé pour désactivation");
      }
      
      // 2. DÉSACTIVER LES CONTRÔLES DE QUANTITÉ UNIQUEMENT POUR LES PRODUITS INDIVIDUELS
      const quantityControls = document.querySelectorAll('.ec-cart-item:not(.ec-cart-item--summary) .ec-cart-item__count');
      if (quantityControls.length > 0) {
        logDebug(`${quantityControls.length} contrôles de quantité trouvés pour désactivation 1929`);
        quantityControls.forEach((control, index) => {
          const selectControls = control.querySelectorAll('select, button');
          logDebug(`Contrôle de quantité ${index + 1} : ${selectControls.length} éléments internes trouvés`);
          selectControls.forEach(element => {
            element.style.pointerEvents = 'none';
            element.style.opacity = '0.7';
          });
        });
      } else {
        logDebug("Aucun contrôle de quantité trouvé pour désactivation");
      }

      // 3. DEBUG - INSPECTION DU RÉSUMÉ "X PRODUITS" APRÈS MODIFICATION
      const summaryAfter = document.querySelector('.ec-cart-item--summary .form-control--select-inline');
      inspectEvents(summaryAfter, "Résumé des produits APRÈS modification");
      
      // Test du clic sur le résumé
      logDebug("Comportement du clic sur le résumé après modification");
      
      // 4. AJOUTER UN BOUTON "VIDER LE PANIER" SEULEMENT SUR LA PAGE PANIER (pas sur paiement)
      const clearButtonExists = document.getElementById('ecwid-clear-cart-button');
      if (currentPageType === "CART") {
        logDebug("Page de panier détectée, vérification du bouton 'Vider le panier'");
        if (!clearButtonExists) {
          const cartContainer = document.querySelector('.ec-cart__body') || document.querySelector('.ec-cart-container') || document.querySelector('.ec-cart');
          if (cartContainer) {
            logDebug("Conteneur de panier trouvé, ajout du bouton 'Vider le panier'");
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
              logDebug("Bouton 'Vider le panier' cliqué");
              e.preventDefault();
              Ecwid.Cart.clear(function(success, error) { 
                if (success == true) {
                  logDebug("Le panier a été vidé avec succès");
                } else {
                  console.error("Échec du vidage du panier. Message d'erreur: " + error);
                }
              });
            });
            cartContainer.insertBefore(clearButton, cartContainer.firstChild);
            logDebug("Bouton 'Vider le panier' ajouté avec succès");
          } else {
            logDebug("ERREUR: Conteneur de panier non trouvé, impossible d'ajouter le bouton 'Vider le panier'");
          }
        } else {
          logDebug("Bouton 'Vider le panier' déjà présent");
        }
      } else {
        if (clearButtonExists) {
          clearButtonExists.remove();
          logDebug("Bouton 'Vider le panier' supprimé (pas sur page panier)");
        }
      }
    } catch (error) {
      console.error("ERREUR CRITIQUE dans la personnalisation du panier:", error);
    }
    
    logDebug("=== FIN DE LA PERSONNALISATION DU PANIER ===");
  }
  
  // Exécuter les personnalisations à chaque changement de page
  Ecwid.OnPageLoaded.add(function(page) {
    currentPageType = page.type;
    logDebug(`Page chargée: ${page.type}`);
    
    // Utilisation d'un délai pour permettre au DOM d'être complètement chargé
    setTimeout(function() {
      logDebug("Exécution de la personnalisation après délai (page chargée)");
      customizeCart();
      
      // Test de débogage après la personnalisation
      setTimeout(function() {
        const summaryElement = document.querySelector('.ec-cart-item--summary .form-control--select-inline');
        if (summaryElement) {
          logDebug("TEST: Enregistrement d'un gestionnaire de clic pour le débogage");
          summaryElement.addEventListener('click', function(e) {
            logDebug("CLIC DÉTECTÉ sur l'élément de résumé");
          });
        }
      }, 1000);
    }, 500);
  });
  
  // Appliquer les personnalisations également lors des changements du panier
  Ecwid.OnCartChanged.add(function(cart) {
    logDebug("Panier modifié");
    setTimeout(function() {
      logDebug("Exécution de la personnalisation après délai (panier modifié)");
      customizeCart();
    }, 500);
  });

  // Exécuter une première fois pour les éléments déjà présents
  setTimeout(function() {
    logDebug("Exécution initiale de la personnalisation");
    customizeCart();
  }, 500);

  // Observateur de mutation pour détecter les changements dans le DOM
  const observer = new MutationObserver(function(mutations) {
    let hasRelevantChanges = false;
    mutations.forEach(function(mutation) {
      if (mutation.addedNodes.length > 0 || mutation.removedNodes.length > 0) {
        for (let i = 0; i < mutation.addedNodes.length; i++) {
          const node = mutation.addedNodes[i];
          if (node.nodeType === 1 && (
              node.classList && (
                node.classList.contains('ec-cart-item') || 
                node.querySelector('.ec-cart-item')
              )
            )) {
            hasRelevantChanges = true;
            break;
          }
        }
      }
    });
    
    if (hasRelevantChanges) {
      logDebug("Changements détectés dans le DOM des éléments du panier");
      setTimeout(customizeCart, 200);
    }
  });
  
  // Observer les modifications de la structure du panier
  setTimeout(function() {
    const cartElement = document.querySelector('.ec-cart');
    if (cartElement) {
      logDebug("Observateur de mutation configuré pour le panier");
      observer.observe(cartElement, { childList: true, subtree: true });
    } else {
      logDebug("Élément de panier non trouvé pour l'observateur de mutation");
    }
  }, 1000);

  // CSS supplémentaire avec débogage visuel
  const style = document.createElement('style');
  style.textContent = `
    /* Débogage visuel */
    .debug-highlight {
      outline: 2px solid red !important;
    }
    
    #ecwid-clear-cart-button:hover {
      background-color: #000000 !important;
    }
    
    .ec-cart-item__count-value {
      visibility: visible !important;
      opacity: 1 !important;
    }
    
    /* Masquer uniquement les contrôles de suppression pour les articles normaux */
    .ec-cart-item:not(.ec-cart-item--summary) .ec-cart-item__control {
      opacity: 0 !important;
      pointer-events: none !important;
    }
    
    /* IMPORTANT: S'assurer que le résumé reste complètement actif */
    .ec-cart-item.ec-cart-item--summary,
    .ec-cart-item--summary *,
    .ec-cart-item--summary .form-control--select-inline,
    .ec-cart-item--summary .form-control__select-text,
    .ec-cart-item--summary .form-control__arrow {
      pointer-events: auto !important;
      opacity: 1 !important;
      visibility: visible !important;
      cursor: pointer !important;
    }
  `;
  document.head.appendChild(style);
  logDebug("Styles CSS ajoutés");
  
  // Script de débogage global pour capturer les erreurs
  window.addEventListener('error', function(e) {
    logDebug(`ERREUR GLOBALE CAPTURÉE: ${e.message} à ${e.filename}:${e.lineno}:${e.colno}`, e.error);
  });
  
  logDebug("Initialisation du script de personnalisation terminée");
});
