// ui.js
const UI = (() => {

    const BALLOON_OFFSET = 50; // affichage du ballon 50px plus haut
  
    let overlayCanvas, ctx;
    let selectedBtn = null;
  
    function init() {
      overlayCanvas = document.getElementById("overlayCanvas");
      ctx = overlayCanvas.getContext("2d");
  
      resizeOverlay();
      window.addEventListener("resize", resizeOverlay);
  
      // Gérer les boutons
      const buttons = document.querySelectorAll(".object-btn");
      buttons.forEach(btn => {
        btn.addEventListener("click", () => {
          const objectType = btn.getAttribute("data-object");
          GameState.currentChamanObject = objectType;
          updateUIButtonSelection(objectType);
        });
      });
  
      // Sélectionner par défaut le premier bouton (plank)
      buttons[0].click();
  
      // Lance la boucle de preview
      requestAnimationFrame(drawPreview);
    }
  
    function resizeOverlay() {
      overlayCanvas.width = window.innerWidth;
      overlayCanvas.height = window.innerHeight;
    }
  
    function updateUIButtonSelection(selectedObject) {
      const buttons = document.querySelectorAll(".object-btn");
      buttons.forEach(btn => {
        const objectType = btn.getAttribute("data-object");
        if (objectType === selectedObject) {
          btn.classList.add("selected");
        } else {
          btn.classList.remove("selected");
        }
      });
    }
  
    function drawPreview() {
      ctx.clearRect(0, 0, overlayCanvas.width, overlayCanvas.height);
  
      const type = GameState.currentChamanObject;
      if (!type) {
        requestAnimationFrame(drawPreview);
        return;
      }
  
      const x = GameState.mouseX;
      const y = GameState.mouseY;
      const angle = GameState.previewAngle * Math.PI / 180;
  
      ctx.save();
      ctx.globalAlpha = 0.5;
      ctx.translate(x, y);
      ctx.rotate(angle);
      ctx.fillStyle = "#aaa";
  
      switch (type) {
        case "plank":
          ctx.fillRect(-50, -10, 100, 20);
          break;
        case "box":
          ctx.fillRect(-20, -20, 40, 40);
          break;
        case "balloon":
          // On annule la rotation si on ne veut pas faire pivoter le ballon
          ctx.rotate(-angle);
  
          const balloonX = 0;
          const balloonY = -BALLOON_OFFSET; // 50px plus haut
  
          // Le fil
          ctx.beginPath();
          ctx.moveTo(0, 0);
          ctx.lineTo(balloonX, balloonY);
          ctx.strokeStyle = "#aaa";
          ctx.stroke();
  
          // Le ballon
          ctx.beginPath();
          ctx.arc(balloonX, balloonY, 20, 0, 2 * Math.PI);
          ctx.fill();
          break;
      }
  
      ctx.restore();
      requestAnimationFrame(drawPreview);
    }
  
    return {
      init
    };
  })();
  