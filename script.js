const images = document.querySelectorAll(".image");

const ZOOM_WIDTH = 400;
const ZOOM_HEIGHT = 400;

const LENS_WIDTH = 300;
const LENS_HEIGHT = 300;

images.forEach((image) => {
  const initializeZoom = () => {
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

    const onMouseEnter = () => {
      zoomNode.style.display = "block";
      lensNode.style.display = "block";
    }

    const onMouseLeave = (event) => {
      const imageRect = image.getBoundingClientRect();

      if (
        !(imageRect.left <= event.clientX && event.clientX <= imageRect.right) 
        || !(imageRect.top <= event.clientY && event.clientY <= imageRect.bottom)
      ) {
        zoomNode.style.display = "none";
        lensNode.style.display = "none";  
      }
    }

    const onMouseMove = (event) => {
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
    }

    lensNode.addEventListener("mouseleave", onMouseLeave);
    lensNode.addEventListener("mousemove", onMouseMove);

    image.addEventListener("mouseenter",onMouseEnter);
    image.addEventListener("mouseleave", onMouseLeave);
    image.addEventListener("mousemove", onMouseMove);
  };

  if(image.complete){
    initializeZoom()
  } else {
    image.onload = initializeZoom;
  }
});
