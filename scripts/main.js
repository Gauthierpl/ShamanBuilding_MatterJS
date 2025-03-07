// main.js
document.addEventListener("DOMContentLoaded", () => {
    EngineManager.initEngine();
    EngineManager.runEngine();
    
    GameState.init();
    
    ChamanSystem.init();       // Logique d'invocation
    
    BalloonForce.init();       // Permet de faire monter les ballons
    
    UI.init();
    
    InputManager.init();       // Gère les clics
    
    // Crée le niveau de base (sol, murs, etc.)
    EngineManager.createDefaultLevel();
  
    console.log("Game started!");
  });
  