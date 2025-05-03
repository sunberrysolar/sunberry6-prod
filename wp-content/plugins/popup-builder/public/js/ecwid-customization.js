// Script pour ajouter un bouton "Vider le panier" et supprimer les boutons de suppression individuels
// À placer dans votre code HTML, idéalement juste avant la fermeture du </body>

Ecwid.OnAPILoaded.add(function() {
  // S'abonner aux événements de mise à jour du panier
  Ecwid.OnCartChanged.add(function(cart) {
    // Attendre que le DOM du panier soit prêt
    setTimeout(customizeCartPage, 500);
  });
  
  // S'abonner aux événements de changement de page
  Ecwid.OnPageLoaded.add(function(page) {
    // Si nous sommes sur la page du panier
    if (page.type == 'CART') {
      setTimeout(customizeCartPage, 500);
    }
  });

  // Fonction pour personnaliser la page du panier
  function customizeCartPage() {
    // Vérifie si le bouton "Vider le panier" existe déjà
    if (!document.getElementById('clear-cart-button')) {
      // Trouver le conteneur du panier
      const cartContainer = document.querySelector('.ec-cart-container');
      
      if (cartContainer) {
        // Créer le bouton "Vider le panier"
        const clearButton = document.createElement('button');
        clearButton.id = 'clear-cart-button';
        clearButton.className = 'ec-cart-clear-button';
        clearButton.textContent = 'Vider le panier';
        clearButton.style.marginTop = '10px';
        clearButton.style.marginBottom = '10px';
        clearButton.style.padding = '8px 16px';
        clearButton.style.backgroundColor = '#ff4d4d';
        clearButton.style.color = 'white';
        clearButton.style.border = 'none';
        clearButton.style.borderRadius = '4px';
        clearButton.style.cursor = 'pointer';
        
        // Ajouter l'événement pour vider le panier
        clearButton.addEventListener('click', function() {
          // Utiliser l'API Ecwid pour vider le panier
          Ecwid.Cart.clear();
        });
        
        // Insérer le bouton en haut du panier
        const headerSection = cartContainer.querySelector('.ec-cart__head') || cartContainer.firstChild;
        if (headerSection) {
          headerSection.parentNode.insertBefore(clearButton, headerSection.nextSibling);
        } else {
          cartContainer.prepend(clearButton);
        }
      }
    }
    
    // Masquer les boutons de suppression individuels
    const deleteButtons = document.querySelectorAll('.ec-cart-item__delete');
    deleteButtons.forEach(function(button) {
      button.style.display = 'none';
    });
  }
});

// CSS supplémentaire (à ajouter à votre feuille de style ou dans une balise <style>)
const style = document.createElement('style');
style.textContent = `
  /* Style pour le bouton "Vider le panier" au survol */
  #clear-cart-button:hover {
    background-color: #ff3333;
  }
  
  /* Cacher définitivement les boutons de suppression individuels */
  .ec-cart-item__delete {
    display: none !important;
  }
`;
document.head.appendChild(style);
