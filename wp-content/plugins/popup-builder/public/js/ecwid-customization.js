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
    /* Masquer le prix unitaire et total ligne dès le début test2*/
    .ec-cart__item-price,
    .ec-cart__total-price,
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

Ecwid.OnAPILoaded.add(function () {
  logDebug("Ecwid API chargée");

  var currentPageType = '';

  function addClearCartButton() {
    if (currentPageType !== "CART") {
      const existingButton = document.getElementById('ecwid-clear-cart-button');
      if (existingButton) existingButton.remove();
      return;
    }

    if (document.getElementById('ecwid-clear-cart-button')) return;

    const cartContainer = document.querySelector('.ec-cart__body');
    if (!cartContainer) {
      logDebug("Conteneur du panier non trouvé");
      return;
    }

    const buttonContainer = document.createElement('div');
    buttonContainer.id = 'ecwid-clear-cart-button-container';
    buttonContainer.style.textAlign = 'center';
    buttonContainer.style.margin = '20px 0';

    const clearButton = document.createElement('button');
    clearButton.id = 'ecwid-clear-cart-button';
    clearButton.textContent = '🗑️ VIDER TOUT LE PANIER';
    clearButton.style.backgroundColor = '#e672f7';
    clearButton.style.color = '#ffffff';
    clearButton.style.border = 'none';
    clearButton.style.padding = '15px 30px';
    clearButton.style.borderRadius = '8px';
    clearButton.style.cursor = 'pointer';
    clearButton.style.fontWeight = 'bold';
    clearButton.style.fontSize = '16px';
    clearButton.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.2)';
    clearButton.style.transition = 'all 0.3s ease';

    clearButton.addEventListener('click', function (e) {
      e.preventDefault();
      e.stopPropagation();
      clearEntireCart();
      return false;
    });

    buttonContainer.appendChild(clearButton);

    if (cartContainer.firstChild && cartContainer.firstChild.nextSibling) {
      cartContainer.insertBefore(buttonContainer, cartContainer.firstChild.nextSibling);
    } else {
      cartContainer.appendChild(buttonContainer);
    }
  }

  function clearEntireCart() {
    logDebug("Vidage du panier demandé");
    Ecwid.Cart.clear(function (success, error) {
      if (success == true) {
        logDebug("Panier vidé avec succès");
      } else {
        console.error("Erreur lors du vidage du panier:", error);
      }
    });
  }

  function forcerMasquagePrixSiRedessiné() {
    // Renforce le masquage après chargement dynamique
    document.querySelectorAll('.ec-cart-item__price-inner, .ec-cart__item-price, .ec-cart__total-price, .ec-cart__tax').forEach(el => {
      el.style.display = 'none';
    });
  }

  function intercepterCroixSuppression() {
    // Sélectionner toutes les croix de suppression des produits
    const deleteButtons = document.querySelectorAll('.ec-cart-item__wrap-remove, .ec-cart-item__remove, .ec-minicart-item__remove');

    deleteButtons.forEach(button => {
      // Éviter de réattacher l'événement si déjà fait
      if (button.dataset.intercepted === 'true') return;
      button.dataset.intercepted = 'true';

      // Rendre le bouton visible
      button.style.opacity = '1';
      button.style.visibility = 'visible';
      button.style.pointerEvents = 'auto';

      // Intercepter le clic
      button.addEventListener('click', function (e) {
        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation();

        logDebug("Clic sur croix de suppression - vidage complet du panier");
        clearEntireCart();

        return false;
      }, true); // capture phase pour intercepter avant Ecwid
    });
  }

  // Observer les changements du DOM pour intercepter les nouvelles croix
  function setupMutationObserver() {
    const observer = new MutationObserver(function(mutations) {
      if (currentPageType === "CART") {
        intercepterCroixSuppression();
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
        intercepterCroixSuppression();
      }, 500);

      // Réappliquer après un délai supplémentaire pour gérer le chargement asynchrone
      setTimeout(() => {
        intercepterCroixSuppression();
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
      background-color: #d35400 !important;
      transform: scale(1.05);
      box-shadow: 0 6px 8px rgba(0, 0, 0, 0.3) !important;
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
      padding: 10px;
      background: linear-gradient(135deg, #f5f5f5 0%, #e0e0e0 100%);
      border-radius: 8px;
      margin: 15px 0 !important;
    }
  `;
  document.head.appendChild(style);
});
