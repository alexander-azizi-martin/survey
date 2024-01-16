const images = document.querySelectorAll(".image");

const ZOOM_WIDTH = 400;
const ZOOM_HEIGHT = 400;

const LENS_WIDTH = 300;
const LENS_HEIGHT = 300;

images.forEach((image) => {
  image.onload = () => {
    const lensNode = document.createElement("div");
    lensNode.setAttribute("class", "image-lens");
    image.parentElement.appendChild(lensNode);
    
    const lensWidthRatio = (image.width / LENS_WIDTH);
    const lensHeightRatio = (image.height / LENS_HEIGHT);
  
    const zoomNode = document.createElement("div");
    zoomNode.setAttribute("class", "image-zoom");
    zoomNode.style.backgroundImage = `url(${image.src})`;
    zoomNode.style.backgroundSize = `${ZOOM_WIDTH * lensWidthRatio}px ${ZOOM_HEIGHT * lensHeightRatio}px`;
    image.parentElement.appendChild(zoomNode);

    image.addEventListener("mouseenter", () => {
      zoomNode.style.display = "block";
      lensNode.style.display = "block";
    });

    image.addEventListener("mouseleave", (event) => {
      const imageRect = image.getBoundingClientRect();

      if (
        !(imageRect.left <= event.clientX && event.clientX <= imageRect.right) 
        || !(imageRect.top <= event.clientY && event.clientY <= imageRect.bottom)
      ) {
        zoomNode.style.display = "none";
        lensNode.style.display = "none";  
      }
    });

    lensNode.addEventListener("mouseleave", (event) => {
      const imageRect = image.getBoundingClientRect();

      if (
        !(imageRect.left <= event.clientX && event.clientX <= imageRect.right) 
        || !(imageRect.top <= event.clientY && event.clientY <= imageRect.bottom)
      ) {
        zoomNode.style.display = "none";
        lensNode.style.display = "none";  
      }
    });

    lensNode.addEventListener("mousemove", (event) => {
      const imageRect = image.getBoundingClientRect();
      const mouseX = event.clientX - imageRect.left;
      const mouseY = event.clientY - imageRect.top;

      const lensX = Math.min(
        image.clientWidth - LENS_WIDTH,
        Math.max(0, mouseX - LENS_WIDTH / 2)
      );
      const lensY = Math.min(
        image.clientHeight - LENS_HEIGHT,
        Math.max(0, mouseY - LENS_HEIGHT / 2)
      );
        
      const cellX = (lensX / LENS_WIDTH);
      const cellY = (lensY / LENS_HEIGHT);
      
      lensNode.style.left = `${lensX}px`;
      lensNode.style.top = `${lensY}px`;
      zoomNode.style.backgroundPosition = `-${cellX * ZOOM_WIDTH}px -${cellY * ZOOM_HEIGHT}px`;
    });

    image.addEventListener("mousemove", (event) => {
      const imageRect = image.getBoundingClientRect();

      const mouseX = event.clientX - imageRect.left;
      const mouseY = event.clientY - imageRect.top;

      const lensX = Math.min(
        image.clientWidth - LENS_WIDTH,
        Math.max(0, mouseX - LENS_WIDTH / 2)
      );
      const lensY = Math.min(
        image.clientHeight - LENS_HEIGHT,
        Math.max(0, mouseY - LENS_HEIGHT / 2)
      );
        
      const cellX = (lensX / LENS_WIDTH);
      const cellY = (lensY / LENS_HEIGHT);
      
      lensNode.style.left = `${lensX}px`;
      lensNode.style.top = `${lensY}px`;
      zoomNode.style.backgroundPosition = `-${cellX * ZOOM_WIDTH}px -${cellY * ZOOM_HEIGHT}px`;
    });
  };
});
