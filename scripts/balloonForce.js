// balloonForce.js
const BalloonForce = (() => {
    let engine, world;

    function init() {
      engine = EngineManager.getEngine();
      world = EngineManager.getWorld();

      // Appliquer la force ascendante en continu
      Matter.Events.on(engine, "beforeUpdate", () => {
        applyBalloonForces();
      });
    }

    function applyBalloonForces() {
      const bodies = world.bodies;
      for (let b of bodies) {
        if (b.label === "balloon") {
          const mass = b.mass;
          // Force un peu plus élevée pour mieux soulever
          const upwardForce = 0.003 * mass; 
          Matter.Body.applyForce(b, b.position, {
            x: 0,
            y: -upwardForce
          });
        }
      }
    }

    return { init };
})();
