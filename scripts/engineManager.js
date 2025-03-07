// engineManager.js
const EngineManager = (() => {
    const { Engine, Render, Runner, World, Bodies } = Matter;
    
    let engine, world, render, runner;
  
    function initEngine() {
      engine = Engine.create();
      world = engine.world;
  
      render = Render.create({
        element: document.getElementById("gameContainer"),
        engine: engine,
        options: {
          width: window.innerWidth,
          height: window.innerHeight,
          wireframes: false,
          background: "#a0d8f1"
        }
      });
  
      Render.run(render);
      runner = Runner.create();
    }
  
    function runEngine() {
      Runner.run(runner, engine);
  
      window.addEventListener("resize", () => {
        render.canvas.width = window.innerWidth;
        render.canvas.height = window.innerHeight;
        Matter.Render.lookAt(render, {
          min: { x: 0, y: 0 },
          max: { x: window.innerWidth, y: window.innerHeight }
        });
      });
    }
  
    function createDefaultLevel() {
      const floor = Bodies.rectangle(
        window.innerWidth / 2,
        window.innerHeight - 10,
        window.innerWidth,
        20,
        { isStatic: true, render: { fillStyle: "#8B4513" } }
      );
  
      World.add(world, floor);
    }
  
    function addBody(bodyOrBodies) {
      Matter.World.add(world, bodyOrBodies);
    }
  
    function removeBody(body) {
      Matter.World.remove(world, body);
    }
  
    function getEngine() {
      return engine;
    }
  
    function getWorld() {
      return world;
    }
  
    return {
      initEngine,
      runEngine,
      createDefaultLevel,
      addBody,
      removeBody,
      getEngine,
      getWorld
    };
  })();
  