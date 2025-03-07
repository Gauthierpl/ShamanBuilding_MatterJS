// gameState.js
const GameState = (() => {
    // Type d'objet sélectionné pour le Chaman
    let currentChamanObject = "plank";
  
    // Position de la souris (mise à jour par InputManager)
    let mouseX = 0;
    let mouseY = 0;

    let previewAngle =0;//angle de rotation de l'aperçu
  
    function init() {
      // On pourrait initialiser des compteurs ou stocks d’objets (ex. 5 planks, 3 balloons, etc.)
      console.log("GameState initialized");
    }
  
    return {
      init,
      currentChamanObject,
      mouseX,
      mouseY,
      previewAngle
    };
  })();
  