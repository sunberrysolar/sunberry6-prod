<script>
// Script de personnalisation du panier Ecwid
// - Bouton "Vider le panier"
// - Masquage des prix
// - Masquage des quantités
// - Réactivation des croix de suppression
// - Désactivation du clic sur les produits

window.ec = window.ec || {};
window.ec.config = window.ec.config || {};
window.ec.config.storefrontUrls = window.ec.config.storefrontUrls || {};

// Masquage initial avant le rendu
(function injectImmediateCSS() {
  const style = document.createElement('style');
  style.textContent = `
    /* Masquer les prix dès le chargement */
    .ec-cart__item-price,
    .ec-cart__total-price,
    .ec-cart-item__price-inner,
    .ec-cart__tax {
      display: none !important;
    }
  `;
  document.head.appendChild(style);
})();

// Logging
function logDebug(msg) {
  console.log("[DEBUG] " + msg);
}

Ecwid.OnAPILoaded.add(function () {
  logDebug("Ecwid API chargée");

  let currentPageType = '';

  function addClearCartButton() {
    if (currentPageType !== "CART") {
      const btn = document.getElementById('ecwid-clear-cart-button');
      if (btn) btn.remove();
      return;
    }

    if (document.getElementById('ecwid-clear-cart-button')) return;

    const cartContainer = document.querySelector('.ec-cart__body');
    if (!cartContainer) return;

    const wrapper = document.createElement('div');
    wrapper.style.textAlign = 'center';
    wrapper.style.margin = '10px 0';

    const clearBtn = document.createElement('button');
    clearBtn.id = 'ecwid-clear-cart-button';
    clearBtn.textContent = 'X Vider le panier';
    clearBtn.style.backgroundColor = '#e672f7';
    clearBtn.style.color = 'white';
    clearBtn.style.border = 'none';
    clearBtn.style.padding = '10px 15px';
    clearBtn.style.borderRadius = '5px';
    clearBtn.style.cursor = 'pointer';
    clearBtn.style.fontWeight = 'bold';

    clearBtn.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();

      Ecwid.Cart.clear(function(success, error) {
        if (!success) console.error(error);
      });
    });

    wrapper.appendChild(clearBtn);

    cartContainer.insertBefore(wrapper, cartContainer.children[1]);
  }

  function reMask() {
    document.querySelectorAll(
      '.ec-cart-item__price-inner, .ec-cart__item-price, .ec-cart__total-price, .ec-cart__tax'
    ).forEach(el => el.style.display = 'none');
  }

  Ecwid.OnPageLoaded.add(function (page) {
    currentPageType = page.type;
    logDebug("Page chargée : " + page.type);

    if (page.type === "CART") {
      setTimeout(function () {
        addClearCartButton();
        reMask();
      }, 800);
    }
  });

  // CSS additionnel
  const style = document.createElement('style');
  style.textContent = `
    #ecwid-clear-cart-button:hover {
      background-color: black !important;
    }

    /* ⛔ Masquer complètement les quantités */
    .ec-cart-item__count,
    .ec-cart-item__qty {
      display: none !important;
    }

    /* Afficher les croix de suppression */
    .ec-cart-item__control {
      opacity: 1 !important;
      visibility: visible !important;
      pointer-events: auto !important;
    }

    .ec-cart-item__control-inner svg {
      opacity: 1 !important;
      width: 22px !important;
      height: 22px !important;
    }

    /* Désactiver le clic sur le nom et l'image du produit */
    .ec-cart-item__title a,
    .ec-cart-item__image a {
      pointer-events: none !important;
      cursor: default !important;
      text-decoration: none !important;
    }

    .ec-cart--empty .form-control__button,
    .ec-confirmation__continue,
    .ec-cart-shopping__wrap {
      display: none !important;
    }
  `;
  document.head.appendChild(style);
});
</script>
