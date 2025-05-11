/**
 * Script de personnalisation du panier Ecwid
 * - Ajoute un bouton "Vider le panier" uniquement sur la page panier (pas sur paiement)
 * - Désactive les boutons de suppression des produits individuels
 * - Désactive les contrôles de quantité tout en préservant l'affichage
 */
// Attendre que le script Ecwid soit complètement chargé
window.ec = window.ec || {};
window.ec.config = window.ec.config || {};
window.ec.config.storefrontUrls = window.ec.config.storefrontUrls || {};
// Variable pour suivre la page actuelle
var currentPageType = '';
// S'assurer que le code s'exécute après le chargement complet d'Ecwid
Ecwid.OnAPILoaded.add(function() {
  console.log("Ecwid API chargée");
  
  // Fonction pour appliquer les personnalisations du panier
  function customizeCart() {
    console.log("Personnalisation du panier en cours...");
    
    // 1. DÉSACTIVER LES BOUTONS DE SUPPRESSION INDIVIDUELS
    const deleteButtons = document.querySelectorAll('.ec-cart-item__control');
    if (deleteButtons.length > 0) {
      console.log(`${deleteButtons.length} boutons de suppression désactivés`);
      deleteButtons.forEach(button => {
        // Utiliser pointerEvents au lieu de visibility pour empêcher complètement l'interaction
        button.style.pointerEvents = 'none';
        button.style.opacity = '0';  // Rendre invisible mais conserver la structure DOM
      });
    }
    
    // 2. DÉSACTIVER LES CONTRÔLES DE QUANTITÉ TOUT EN CONSERVANT L'AFFICHAGE
    const quantityControls = document.querySelectorAll('.ec-cart-item__count');
    if (quantityControls.length > 0) {
      console.log(`${quantityControls.length} contrôles de quantité désactivés`);
      quantityControls.forEach(control => {
        // Rendre les contrôles de quantité non interactifs tout en les gardant visibles
        control.style.pointerEvents = 'none';
        
        // Assurer que les valeurs sont bien visibles
        const quantityDisplays = control.querySelectorAll('.ec-cart-item__count-value');
        quantityDisplays.forEach(display => {
          if (display) {
            display.style.opacity = '1';
          }
        });
      });
    }
    
    // 3. S'ASSURER QUE LE LIEN DE DÉROULEMENT DE LA LISTE FONCTIONNE
    const dropdownLinks = document.querySelectorAll('.ec-cart-item__details-toggler');
    if (dropdownLinks.length > 0) {
      console.log(`${dropdownLinks.length} liens de déroulement détectés`);
      dropdownLinks.forEach(link => {
        // Réinitialiser les styles pour permettre l'interaction
        link.style.pointerEvents = 'auto';
        link.style.visibility = 'visible';
        link.style.opacity = '1';
        
        // Supprimer les écouteurs d'événements existants qui pourraient être problématiques
        const newLink = link.cloneNode(true);
        link.parentNode.replaceChild(newLink, link);
        
        // Ajouter un écouteur d'événement personnalisé si nécessaire
        newLink.addEventListener('click', function(e) {
          console.log("Clic sur le lien de déroulement");
          // Laisser l'événement se propager mais empêcher les erreurs
          try {
            const detailsContainer = this.closest('.ec-cart-item__details-container');
            if (detailsContainer) {
              const detailsList = detailsContainer.querySelector('.ec-cart-item__details-list');
              if (detailsList) {
                detailsList.style.display = detailsList.style.display === 'none' ? 'block' : 'none';
                e.preventDefault(); // Empêcher le comportement par défaut si on gère nous-mêmes
              }
            }
          } catch (err) {
            console.log("Gestion du clic personnalisée:", err);
          }
        });
      });
    }
    
    // 3. AJOUTER UN BOUTON "VIDER LE PANIER" SEULEMENT SUR LA PAGE PANIER (pas sur paiement)
    const clearButtonExists = document.getElementById('ecwid-clear-cart-button');
    
    // Si nous sommes sur la page CART, ajouter le bouton s'il n'existe pas
    if (currentPageType === "CART") {
      if (!clearButtonExists) {
        const cartContainer = document.querySelector('.ec-cart__body') || 
                            document.querySelector('.ec-cart-container') || 
                            document.querySelector('.ec-cart');
        
        if (cartContainer) {
          console.log("Conteneur du panier trouvé");
          
          // Créer le bouton
          const clearButton = document.createElement('button');
          clearButton.id = 'ecwid-clear-cart-button';
          clearButton.textContent = 'X Vider le panier';
          clearButton.classList.add('ec-cart__btn');
          
          // Styling du bouton
          clearButton.style.backgroundColor = '#e672f7';
          clearButton.style.color = '#ffffff';
          clearButton.style.border = 'none';
          clearButton.style.padding = '10px 15px';
          clearButton.style.margin = '10px 0';
          clearButton.style.borderRadius = '5px';
          clearButton.style.cursor = 'pointer';
          clearButton.style.fontWeight = 'bold';
          
          // Ajouter l'événement pour vider le panier
          clearButton.addEventListener('click', function(e) {
            e.preventDefault();
            console.log("Tentative de vidage du panier...");
            
            // Utiliser exactement la méthode documentée par Ecwid
            Ecwid.Cart.clear(function(success, error) { 
              if (success == true) {
                console.log("Le panier a été vidé avec succès");
              } else {
                console.error("Échec du vidage du panier. Message d'erreur: " + error);
              }
            });
          });
          
          // Insérer le bouton en haut du panier
          const headerSection = cartContainer.querySelector('.ec-cart__head') || 
                              cartContainer.querySelector('.ec-cart-item:first-child');
          
          if (headerSection) {
            headerSection.parentNode.insertBefore(clearButton, headerSection);
          } else {
            cartContainer.insertBefore(clearButton, cartContainer.firstChild);
          }
          
          console.log("Bouton 'Vider le panier' ajouté");
        } else {
          console.log("Conteneur du panier non trouvé");
        }
      }
    } else {
      // Si nous ne sommes pas sur la page CART, supprimer le bouton s'il existe
      if (clearButtonExists) {
        clearButtonExists.remove();
        console.log("Bouton 'Vider le panier' supprimé car nous ne sommes pas sur la page panier");
      }
    }
  }
  
  // Exécuter les personnalisations à chaque changement de page
  Ecwid.OnPageLoaded.add(function(page) {
    console.log("Page Ecwid chargée:", page.type);
    
    // Mémoriser la page actuelle
    currentPageType = page.type;
    
    // Appliquer les modifications sur toutes les pages, mais le bouton sera conditionnel
    setTimeout(customizeCart, 500);
      
    // Ajouter une surveillance des modifications pour les changements dynamiques
    const observer = new MutationObserver(function(mutations) {
      customizeCart();
    });
      
    // Observer les changements dans le DOM du panier
    const cartRoot = document.querySelector('.ec-cart') || document.querySelector('.ec-cart-container');
    if (cartRoot) {
      observer.observe(cartRoot, { childList: true, subtree: true });
    }
  });
  
  // Appliquer les personnalisations également lors des changements du panier
  Ecwid.OnCartChanged.add(function(cart) {
    console.log("Contenu du panier modifié");
    setTimeout(customizeCart, 500);
  });
  
  // CSS supplémentaire
  const style = document.createElement('style');
  style.textContent = `
    #ecwid-clear-cart-button:hover {
      background-color: #000000 !important;
    }
    
    /* S'assurer que les listes de produits et liens de déroulement sont bien visibles */
    .ec-cart-item__details-toggler {
      visibility: visible !important;
      opacity: 1 !important;
      pointer-events: auto !important;
      cursor: pointer !important;
    }
    
    .ec-cart-item__details-list {
      visibility: visible !important;
    }
    
    /* Désactiver les contrôles de quantité mais les garder visibles */
    .ec-cart-item__count {
      pointer-events: none !important;
    }
    
    .ec-cart-item__count-value {
      visibility: visible !important;
      opacity: 1 !important;
    }
    
    /* Masquer seulement les contrôles interactifs tout en conservant l'affichage */
    .ec-cart-item__count select,
    .ec-cart-item__count button,
    .ec-cart-item__count .form-control--select-inline button {
      opacity: 0.7;
      pointer-events: none;
    }
    
    /* Masquer les boutons de suppression */
    .ec-cart-item__control {
      opacity: 0 !important;
      pointer-events: none !important;
    }
    
    /* Assurer que le bouton du panier reste bien visible */
    #ecwid-clear-cart-button {
      display: block !important;
      margin: 10px 0 !important;
    }
  `;
  document.head.appendChild(style);
});
