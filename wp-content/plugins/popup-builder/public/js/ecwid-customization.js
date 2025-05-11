// Script de personnalisation du panier Ecwid
// - Ajoute un bouton "Vider le panier" uniquement sur la page panier (pas sur paiement)
// - Désactive les boutons de suppression des produits individuels
// - Désactive les contrôles de quantité tout en préservant l'affichage

window.ec = window.ec || {};
window.ec.config = window.ec.config || {};
window.ec.config.storefrontUrls = window.ec.config.storefrontUrls || {};

// Variable pour suivre la page actuelle
let currentPageType = '';

// Attendre que le script Ecwid soit complètement chargé
Ecwid.OnAPILoaded.add(() => {
    console.log("Ecwid API chargée");
    
    // Fonction pour personnaliser le panier
    function customizeCart() {
        console.log("Personnalisation du panier en cours...");
        
        // Désactiver les boutons de suppression individuels
        const deleteButtons = document.querySelectorAll('.ec-cart-item__control');
        deleteButtons.forEach(button => {
            button.style.pointerEvents = 'none';
            button.style.opacity = '0';
        });

        // Désactiver les contrôles de quantité tout en conservant l'affichage
        const quantityControls = document.querySelectorAll('.ec-cart-item__count');
        quantityControls.forEach(control => {
            control.style.pointerEvents = 'none';
            const quantityDisplays = control.querySelectorAll('.ec-cart-item__count-value');
            quantityDisplays.forEach(display => {
                display.style.opacity = '1';
            });
        });

        // Gérer les liens de déroulement des détails du produit
        const dropdownLinks = document.querySelectorAll('.ec-cart-item__details-toggler');
        dropdownLinks.forEach(link => {
            link.style.pointerEvents = 'auto';
            link.style.visibility = 'visible';
            link.style.opacity = '1';
        });

        // Ajouter le bouton "Vider le panier" uniquement sur la page panier
        if (currentPageType === "CART") {
            if (!document.getElementById('ecwid-clear-cart-button')) {
                const cartContainer = document.querySelector('.ec-cart__body') || document.querySelector('.ec-cart-container') || document.querySelector('.ec-cart');
                if (cartContainer) {
                    const clearButton = document.createElement('button');
                    clearButton.id = 'ecwid-clear-cart-button';
                    clearButton.textContent = 'X Vider le panier';
                    clearButton.classList.add('ec-cart__btn');
                    clearButton.style.backgroundColor = '#e672f7';
                    clearButton.style.color = '#ffffff';
                    clearButton.style.padding = '10px 15px';
                    clearButton.style.margin = '10px 0';
                    clearButton.style.borderRadius = '5px';
                    clearButton.style.cursor = 'pointer';
                    clearButton.style.fontWeight = 'bold';
                    clearButton.addEventListener('click', e => {
                        e.preventDefault();
                        Ecwid.Cart.clear((success, error) => {
                            if (success) console.log("Le panier a été vidé avec succès");
                            else console.error("Échec du vidage du panier. Erreur:", error);
                        });
                    });
                    cartContainer.insertBefore(clearButton, cartContainer.firstChild);
                }
            }
        } else {
            const existingButton = document.getElementById('ecwid-clear-cart-button');
            if (existingButton) existingButton.remove();
        }
    }

    // Appliquer les personnalisations à chaque changement de page
    Ecwid.OnPageLoaded.add(page => {
        currentPageType = page.type;
        setTimeout(customizeCart, 500);
    });

    // Appliquer les personnalisations lors des changements du panier
    Ecwid.OnCartChanged.add(() => {
        setTimeout(customizeCart, 500);
    });

    // CSS supplémentaire pour améliorer l'apparence
    const style = document.createElement('style');
    style.textContent = `
        #ecwid-clear-cart-button:hover { background-color: #000000 !important; }
        .ec-cart-item__details-toggler { visibility: visible !important; opacity: 1 !important; pointer-events: auto !important; cursor: pointer !important; }
        .ec-cart-item__details-list { visibility: visible !important; }
        .ec-cart-item__count { pointer-events: none !important; }
        .ec-cart-item__count-value { visibility: visible !important; opacity: 1 !important; }
        .ec-cart-item__control { opacity: 0 !important; pointer-events: none !important; }
    `;
    document.head.appendChild(style);
});
