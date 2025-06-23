// Script de personnalisation du panier Ecwid
// - Bouton "Vider le panier"
// - Masquage des prix ligne par ligne
// - Affichage uniquement du sous-total et total

window.ec = window.ec || {};
window.ec.config = window.ec.config || {};
window.ec.config.storefrontUrls = window.ec.config.storefrontUrls || {};

function logDebug(message) {
  console.log(`[DEBUG] ${message}`);
}

Ecwid.OnAPILoaded.add(function () {
  logDebug("Ecwid API chargée 17h07");

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
    buttonContainer.style.margin = '10px 0';

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

    clearButton.addEventListener('click', function (e) {
      e.preventDefault();
      e.stopPropagation();
      logDebug("Vidage du panier demandé");
      Ecwid.Cart.clear(function (success, error) {
        if (success == true) {
          logDebug("Panier vidé avec succès");
        } else {
          console.error("Erreur lors du vidage du panier:", error);
        }
      });
      return false;
    });

    buttonContainer.appendChild(clearButton);

    if (cartContainer.firstChild && cartContainer.firstChild.nextSibling) {
      cartContainer.insertBefore(buttonContainer, cartContainer.firstChild.nextSibling);
    } else {
      cartContainer.appendChild(buttonContainer);
    }
  }

  function masquerPrixLignesPanier() {
    // Cible les éléments contenant les prix ligne par ligne
    document.querySelectorAll('.ec-cart-item__price-inner').forEach(el => {
      el.style.display = 'none';
    });

    // Optionnel : masquer aussi les éventuels éléments TVA par ligne s'ils existent
    document.querySelectorAll('.ec-cart__tax').forEach(el => {
      el.style.display = 'none';
    });
  }

  Ecwid.OnPageLoaded.add(function (page) {
    currentPageType = page.type;
    logDebug(`Page chargée: ${page.type}`);

    if (page.type === "CART") {
      setTimeout(() => {
        addClearCartButton();
        masquerPrixLignesPanier();
      }, 1000);
    }
  });

  const style = document.createElement('style');
  style.textContent = `
    #ecwid-clear-cart-button:hover {
      background-color: #000000 !important;
    }

    .ec-cart-item__count-value {
      visibility: visible !important;
      opacity: 1 !important;
    }

    /* Masquer les boutons de suppression */
    .ec-cart-item:not(.ec-cart-item--summary) .ec-cart-item__control {
      opacity: 0 !important;
      visibility: hidden !important;
    }

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

    .ec-cart-shopping__wrap {
      display: none !important;
    }

    /* Masquer le prix unitaire et total ligne */
    .ec-cart__item-price,
    .ec-cart__total-price {
      display: none !important;
    }
  `;
  document.head.appendChild(style);
  logDebug("Styles CSS appliqués");
});
