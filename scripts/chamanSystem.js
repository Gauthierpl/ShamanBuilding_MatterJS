// chamanSystem.js
const ChamanSystem = (() => {
    const { Bodies, Constraint, Query } = Matter;
  
    let engine, world;
  
    // Paramètres du ballon
    const BALLOON_OFFSET = 50;   // Le ballon sera créé 50px plus haut que l’ancrage
    const STRING_LENGTH = 100;   // Longueur du fil
  
    function init() {
      engine = EngineManager.getEngine();
      world = EngineManager.getWorld();
    }
  
    /**
     * placeObject() : Invoque un objet "normal" (plank, box) à la position (x,y)
     */
    function placeObject(type, x, y) {
      let body;
      const angle = GameState.previewAngle * Math.PI / 180;
  
      switch (type) {
        case "plank":
          body = Bodies.rectangle(x, y, 100, 20, {
            label: "plank",
            angle: angle,
            // densité basse si tu veux qu'un ballon puisse la soulever
            density: 0.0001,
            render: { fillStyle: "#964B00" }
          });
          break;
  
        case "box":
          body = Bodies.rectangle(x, y, 40, 40, {
            label: "box",
            angle: angle,
            density: 0.0002, // un peu plus lourd que la planche
            render: { fillStyle: "#805533" }
          });
          break;
  
        default:
          console.warn("Objet inconnu ou balloon géré ailleurs:", type);
          return;
      }
  
      EngineManager.addBody(body);
    }
  
    /**
     * placeBalloonWithAnchor() : 
     *  - Crée le ballon 50px plus haut que (anchorX, anchorY).
     *  - Vérifie s'il y a un body NON STATIQUE sous (anchorX, anchorY).
     *    -> Si oui, on attache le ballon à ce body.
     *    -> Si non, ballon libre.
     */
    function placeBalloonWithAnchor(anchorX, anchorY) {
      // 1) Créer le ballon
      const balloonBody = Bodies.circle(
        anchorX,
        anchorY - BALLOON_OFFSET,
        20,
        {
          label: "balloon",
          render: { fillStyle: "#ffcccc" },
          density: 0.0001,
          frictionAir: 0.08,
          restitution: 0.8
        }
      );
      EngineManager.addBody(balloonBody);
  
      // 2) Vérifier s'il y a un body mobile sous la souris
      const bodyUnderMouse = getBodyUnderMouse(anchorX, anchorY);
  
      if (bodyUnderMouse && !bodyUnderMouse.isStatic) {
        // 3) Créer la contrainte (fil) entre ce body et le ballon
        const constraint = Constraint.create({
          bodyA: bodyUnderMouse,  // on attache le body trouvé
          bodyB: balloonBody,     // au ballon
          pointA: { x: 0, y: 0 }, // centre du body (tu peux ajuster si tu veux l'accrocher à un coin)
          pointB: { x: 0, y: 0 }, // centre du ballon
          length: STRING_LENGTH,
          stiffness: 0.7,
          render: {
            visible: true,
            lineWidth: 2,
            strokeStyle: "#999"
          }
        });
        Matter.World.add(world, constraint);
      } 
      // Sinon, rien => ballon libre
    }
  
    /**
     * Renvoie le premier body trouvé sous (x, y) ou null si aucun
     */
    function getBodyUnderMouse(x, y) {
      const bodies = world.bodies;
      const found = Query.point(bodies, { x, y });
      if (found.length > 0) {
        return found[0];
      }
      return null;
    }
  
    return {
      init,
      placeObject,
      placeBalloonWithAnchor
    };
  })();
  