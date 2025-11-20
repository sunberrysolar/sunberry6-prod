// Script de personnalisation du panier Ecwid
// - Bouton "Vider le panier" bien visible
// - Masquage des prix ligne par ligne dès le premier chargement
// - Affichage uniquement du sous-total et total
// - Croix de suppression visibles mais vident tout le panier

window.ec = window.ec || {};
window.ec.config = window.ec.config || {};
window.ec.config.storefrontUrls = window.ec.config.storefrontUrls || {};

// 🔒 Injecter un style global immédiatement pour cacher les prix à l'affichage initial
(function injectImmediateCSS() {
  const style = document.createElement('style');
  style.textContent = `
    /* Masquer le prix unitaire et total ligne dès le début testXXXX*/
    .ec-cart__item-price,
    .ec-cart-item__price-inner {
      display: none !important;
    }

    /* Masquer TVA éventuelle */
    .ec-cart__tax {
      display: none !important;
    }
  `;
  document.head.appendChild(style);
})();

function logDebug(message) {
  console.log(`[DEBUG] ${message}`);
}

// Suivi global de l'état de vidage pour que les autres scripts puissent patienter
window.__ecwidCartClearing = window.__ecwidCartClearing || false;

function setCartClearingState(isClearing, source) {
  window.__ecwidCartClearing = isClearing;
  const eventName = isClearing ? 'ecwidCartClearing' : 'ecwidCartCleared';
  const event = new CustomEvent(eventName, { detail: { source: source || 'unknown' } });
  document.dispatchEvent(event);
}

function getCartQuantitySnapshot(cartSnapshot) {
  if (!cartSnapshot || !Array.isArray(cartSnapshot.items)) return 0;
  return cartSnapshot.items.reduce(function(total, cartItem) {
    return total + (cartItem.quantity || 0);
  }, 0);
}

function waitUntilCartIsEmpty(callback, attemptsLeft = 30) {
  if (attemptsLeft <= 0) {
    callback(false);
    return;
  }

  Ecwid.Cart.get(function(cartSnapshot) {
    if (getCartQuantitySnapshot(cartSnapshot) === 0) {
      callback(true);
    } else {
      setTimeout(function() {
        waitUntilCartIsEmpty(callback, attemptsLeft - 1);
      }, 200);
    }
  });
}

function clearCartWithStateTracking(triggerLabel) {
  if (typeof Ecwid === 'undefined' || !Ecwid.Cart) {
    console.warn('Ecwid.Cart indisponible pour le vidage du panier');
    return;
  }

  if (window.__ecwidCartClearing) {
    logDebug('Vidage déjà en cours, requête ignorée');
    return;
  }

  setCartClearingState(true, triggerLabel);

  Ecwid.Cart.clear(function (success, error) {
    if (success == true) {
      logDebug("Panier vidé (confirmation API), vérification de l'état vide...");
      waitUntilCartIsEmpty(function(emptyConfirmed) {
        if (!emptyConfirmed) {
          console.warn("Impossible de confirmer que le panier est vide après clear");
        }
        setCartClearingState(false, triggerLabel);
      });
    } else {
      setCartClearingState(false, triggerLabel);
      console.error("Erreur lors du vidage du panier:", error);
    }
  });
}

// Variable globale pour suivre le type de page
var currentPageType = '';
const DELETE_BUTTON_SELECTOR = '.ec-cart-item__wrap-remove, .ec-cart-item__remove, .ec-minicart-item__remove, .ec-cart-item__control--remove, .ec-cart-item__control-inner, .ec-cart-item__control';

// Intercepter les clics au niveau du document AVANT le chargement d'Ecwid
// pour bloquer l'événement avant qu'Ecwid ne le traite
document.addEventListener('click', function(e) {
  if (currentPageType !== "CART") return;

  // Vérifier si le clic est sur une croix de suppression ou un de ses enfants
  // Ajout de sélecteurs supplémentaires pour couvrir tous les cas possibles
  const deleteButton = e.target.closest(DELETE_BUTTON_SELECTOR);

  if (deleteButton) {
    e.preventDefault();
    e.stopPropagation();
    e.stopImmediatePropagation();

    logDebug("Clic sur croix de suppression - vidage complet du panier");

    // Vider le panier via l'API Ecwid
    if (typeof Ecwid !== 'undefined' && Ecwid.Cart) {
      clearCartWithStateTracking('delete-cross');
    }

    return false;
  }
}, true); // true = phase capture, avant la phase bubbling

// Ajouter aussi sur mousedown pour intercepter encore plus tôt
document.addEventListener('mousedown', function(e) {
  if (currentPageType !== "CART") return;

  const deleteButton = e.target.closest(DELETE_BUTTON_SELECTOR);

  if (deleteButton) {
    e.preventDefault();
    e.stopPropagation();
    e.stopImmediatePropagation();
    return false;
  }
}, true);

function attachToEcwid() {
  if (!(window.Ecwid && Ecwid.OnAPILoaded && Ecwid.OnPageLoaded)) {
    document.addEventListener('ecwidLoaded', function handleEcwidLoaded() {
      document.removeEventListener('ecwidLoaded', handleEcwidLoaded);
      attachToEcwid();
    });
    return;
  }

  Ecwid.OnAPILoaded.add(function () {
    logDebug("Ecwid API chargée");

    let addClearCartRetryTimeout = null;

    function addClearCartButton() {
      logDebug(`addClearCartButton appelée - currentPageType: ${currentPageType}`);

      if (currentPageType !== "CART") {
        const existingButton = document.getElementById('ecwid-clear-cart-button');
        if (existingButton) existingButton.remove();
        if (addClearCartRetryTimeout) {
          clearTimeout(addClearCartRetryTimeout);
          addClearCartRetryTimeout = null;
        }
        return;
      }

      if (document.getElementById('ecwid-clear-cart-button')) {
        logDebug("Bouton déjà présent, abandon");
        return;
      }

      // Essayer plusieurs sélecteurs
      let cartTitle = document.querySelector('.ec-page-title');
      logDebug(`Sélecteur .ec-page-title: ${cartTitle ? 'TROUVÉ' : 'NON TROUVÉ'}`);

      if (!cartTitle) {
        cartTitle = document.querySelector('.ec-cart__body');
        logDebug(`Sélecteur alternatif .ec-cart__body: ${cartTitle ? 'TROUVÉ' : 'NON TROUVÉ'}`);
      }

      if (!cartTitle) {
        cartTitle = document.querySelector('.ec-cart');
        logDebug(`Sélecteur alternatif .ec-cart: ${cartTitle ? 'TROUVÉ' : 'NON TROUVÉ'}`);
      }

      if (!cartTitle) {
        logDebug("Aucun conteneur trouvé, nouvelle tentative planifiée");
        if (!addClearCartRetryTimeout) {
          addClearCartRetryTimeout = setTimeout(function retryAddClearButton() {
            addClearCartRetryTimeout = null;
            addClearCartButton();
          }, 400);
        }
        return;
      }

      logDebug(`Conteneur trouvé: ${cartTitle.className}`);

      const buttonContainer = document.createElement('div');
      buttonContainer.id = 'ecwid-clear-cart-button-container';
      buttonContainer.style.textAlign = 'left';
      buttonContainer.style.margin = '10px 15px';
      buttonContainer.style.background = 'transparent';
      buttonContainer.style.display = 'block';
      buttonContainer.style.visibility = 'visible';
      buttonContainer.style.position = 'relative';
      buttonContainer.style.zIndex = '1000';

      const clearButton = document.createElement('button');
      clearButton.id = 'ecwid-clear-cart-button';
      clearButton.textContent = 'Vider le panier';
      clearButton.style.backgroundColor = '#000000';
      clearButton.style.color = '#ffffff';
      clearButton.style.border = 'none';
      clearButton.style.padding = '10px 20px';
      clearButton.style.borderRadius = '5px';
      clearButton.style.cursor = 'pointer';
      clearButton.style.fontWeight = 'normal';
      clearButton.style.fontSize = '14px';
      clearButton.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.2)';
      clearButton.style.transition = 'all 0.3s ease';
      clearButton.style.display = 'inline-block';
      clearButton.style.visibility = 'visible';

      clearButton.addEventListener('click', function (e) {
        e.preventDefault();
        e.stopPropagation();
        clearEntireCart();
        return false;
      });

      buttonContainer.appendChild(clearButton);

      // Insérer directement dans le h1 ou juste après
      const h1Element = cartTitle.querySelector('.page-title__name');
      if (h1Element && h1Element.parentNode) {
        // Insérer après le h1, dans le même parent
        if (h1Element.nextSibling) {
          h1Element.parentNode.insertBefore(buttonContainer, h1Element.nextSibling);
          logDebug("Bouton inséré après le h1 via insertBefore");
        } else {
          h1Element.parentNode.appendChild(buttonContainer);
          logDebug("Bouton inséré après le h1 via appendChild");
        }
      } else {
        // Fallback : insérer après .ec-page-title
        if (cartTitle.nextSibling) {
          cartTitle.parentNode.insertBefore(buttonContainer, cartTitle.nextSibling);
          logDebug("Bouton inséré après .ec-page-title via insertBefore");
        } else {
          cartTitle.parentNode.appendChild(buttonContainer);
          logDebug("Bouton inséré après .ec-page-title via appendChild");
        }
      }

      // Vérifier que le bouton a bien été ajouté
      const btnCheck = document.getElementById('ecwid-clear-cart-button');
      logDebug(`Vérification après insertion: ${btnCheck ? 'BOUTON PRÉSENT' : 'BOUTON ABSENT'}`);
    }

    function clearEntireCart() {
      logDebug("Vidage du panier demandé");
      clearCartWithStateTracking('custom-clear-button');
    }

    function forcerMasquagePrixSiRedessiné() {
      // Renforce le masquage après chargement dynamique
      document.querySelectorAll('.ec-cart-item__price-inner, .ec-cart__item-price, .ec-cart__tax').forEach(el => {
        el.style.display = 'none';
      });
    }

    function styliserCroixSuppression() {
      // Rendre les croix visibles
      const deleteButtons = document.querySelectorAll('.ec-cart-item__wrap-remove, .ec-cart-item__remove, .ec-minicart-item__remove');

      deleteButtons.forEach(button => {
        button.style.opacity = '1';
        button.style.visibility = 'visible';
        button.style.pointerEvents = 'auto';
      });
    }

    // Observer les changements du DOM pour styliser les nouvelles croix
    function setupMutationObserver() {
      const observer = new MutationObserver(function(mutations) {
        if (currentPageType === "CART") {
          addClearCartButton();
          styliserCroixSuppression();
          forcerMasquagePrixSiRedessiné();
        }
      });

      // Observer le body pour les changements
      observer.observe(document.body, {
        childList: true,
        subtree: true
      });
    }

    Ecwid.OnPageLoaded.add(function (page) {
      currentPageType = page.type;
      logDebug(`Page chargée: ${page.type}`);

      if (page.type === "CART") {
        setTimeout(() => {
          addClearCartButton();
          forcerMasquagePrixSiRedessiné();
          styliserCroixSuppression();
        }, 500);

        // Réappliquer après un délai supplémentaire pour gérer le chargement asynchrone
        setTimeout(() => {
          styliserCroixSuppression();
          forcerMasquagePrixSiRedessiné();
        }, 1500);
      }
    });

    // Initialiser l'observateur de mutations
    setupMutationObserver();

    // Styles CSS
    const style = document.createElement('style');
    style.textContent = `
    #ecwid-clear-cart-button:hover {
      background-color: #333333 !important;
      box-shadow: 0 3px 6px rgba(0, 0, 0, 0.3) !important;
    }

    .ec-cart-item__count-value {
      visibility: visible !important;
      opacity: 1 !important;
    }

    /* Rendre les croix de suppression visibles */
    .ec-cart-item__wrap-remove,
    .ec-cart-item__remove,
    .ec-minicart-item__remove {
      opacity: 1 !important;
      visibility: visible !important;
      pointer-events: auto !important;
      cursor: pointer !important;
    }

    /* Désactiver le sélecteur de quantité */
    .ec-cart-item:not(.ec-cart-item--summary) .ec-cart-item__count select,
    .ec-cart-item:not(.ec-cart-item--summary) .ec-cart-item__count button {
      opacity: 0.5 !important;
      pointer-events: none !important;
    }

    .ec-cart-item--summary * {
      pointer-events: auto !important;
      opacity: 1 !important;
      visibility: visible !important;
    }

    .ec-cart--empty .form-control__button {
      display: none !important;
    }

    .ec-confirmation__continue {
      display: none !important;
    }

    .ec-cart-shopping__wrap {
      display: none !important;
    }

    /* Style pour le bouton vider le panier */
    #ecwid-clear-cart-button-container {
      padding: 0;
      background: transparent !important;
      border-radius: 0;
      margin: 10px 15px !important;
      display: block !important;
      visibility: visible !important;
      opacity: 1 !important;
      position: relative !important;
      z-index: 1000 !important;
    }

    #ecwid-clear-cart-button {
      display: inline-block !important;
      visibility: visible !important;
      opacity: 1 !important;
    }
  `;
    document.head.appendChild(style);
  });
}

attachToEcwid();
