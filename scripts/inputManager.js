// inputManager.js
const InputManager = (() => {
    function init() {
      document.addEventListener("mousemove", onMouseMove);
      document.addEventListener("mousedown", onMouseDown);
      document.addEventListener("wheel", onMouseWheel);
    }
  
    function onMouseMove(e) {
      GameState.mouseX = e.clientX;
      GameState.mouseY = e.clientY;
    }
  
    function onMouseDown(event) {
      if (isMouseOverUI(event)) {
        return; // Si la souris est sur l'UI, on ignore
      }
  
      // Clic gauche
      if (event.button === 0) {
        const type = GameState.currentChamanObject;
        const x = event.clientX;
        const y = event.clientY;
  
        if (type === "balloon") {
          // On laisse chamanSystem gérer la contrainte ou non
          ChamanSystem.placeBalloonWithAnchor(x, y);
        } else {
          ChamanSystem.placeObject(type, x, y);
        }
  
      } else if (event.button === 2) {
        // Clic droit => désélection
        GameState.currentChamanObject = null;
        updateUIButtonSelection(null);
      }
    }
  
    function onMouseWheel(event) {
      if (GameState.currentChamanObject) {
        GameState.previewAngle += event.deltaY > 0 ? 15 : -15;
        GameState.previewAngle %= 360;
      }
    }
  
    function isMouseOverUI(event) {
      return event.target.closest("#uiContainer") !== null;
    }
  
    return {
      init
    };
  })();
  