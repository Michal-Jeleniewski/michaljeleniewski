const sliderButton = document.querySelector('.slider-button');
const slider = document.querySelector(".slider");
const textContainer = document.querySelector(".text-container");
const centerContainer = document.querySelector(".center-container");

let isDragging = false;

sliderButton.addEventListener("mousedown", (e) => {
    isDragging = true;
    const offsetY = e.clientY - sliderButton.getBoundingClientRect().top;
    document.addEventListener("mouseup", () => {
        isDragging = false;
    });

    document.addEventListener("mousemove", (e) => {
        if (isDragging) {
            let newPosition = e.clientY - slider.getBoundingClientRect().top - offsetY;
            if (newPosition < 0) {
                newPosition = 0;
            }
            if (newPosition > slider.offsetHeight - sliderButton.offsetHeight) {
                newPosition = slider.offsetHeight - sliderButton.offsetHeight;
            }
            sliderButton.style.transition = "top 0s"
            textContainer.style.transition = "bottom 0s"
            sliderButton.style.top = newPosition + "px";
            textContainer.style.bottom = (newPosition / 580) * (textContainer.offsetHeight - centerContainer.offsetHeight) + "px";
            const gradientOpacity = 1 - (newPosition / 580);
            textContainer.style.background = `linear-gradient(to top, rgba(255, 255, 255, 0), rgba(255, 255, 255, 1) ${20 + gradientOpacity * 20}%) 0 0/100% 50%, linear-gradient(to bottom, rgba(255, 255, 255, 1) ${80 - gradientOpacity * 20}%, rgba(255, 255, 255, 0)) 0 100%/100% 50%`;

        }
    });
});
if (!isDragging) {
    slider.addEventListener("click", (e) => {
        let newPosition = e.clientY - slider.getBoundingClientRect().top;
        sliderButton.style.transition = "top .3s"
        textContainer.style.transition = "bottom .3s"
        sliderButton.style.top = newPosition + "px";
        textContainer.style.bottom = (newPosition / 580) * (textContainer.offsetHeight - centerContainer.offsetHeight) + "px";
        const gradientOpacity = 1 - (newPosition / 580);
        textContainer.style.transition = "background 0.3s";
        textContainer.style.background = `linear-gradient(to top, rgba(255, 255, 255, 0), rgba(255, 255, 255, 1) ${20 + gradientOpacity * 20}%) 0 0/100% 50%, linear-gradient(to bottom, rgba(255, 255, 255, 1) ${80 - gradientOpacity * 20}%, rgba(255, 255, 255, 0)) 0 100%/100% 50%`;
 
    })
}



