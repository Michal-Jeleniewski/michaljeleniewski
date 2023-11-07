const pcContainer = document.querySelector(".pc-container");

const leftContainer = document.querySelector(".left-container")
const languageSection = document.querySelector(".language")
const marksSection = document.querySelector(".marks")
const marks = document.querySelectorAll(".mark")
const socialSection = document.querySelector(".socials")

const aboutMeSection = document.querySelector(".about-me");
const timelineSection = document.querySelector(".timeline");
const technologiesSection = document.querySelector(".technologies-and-skills");
const portfolioSection = document.querySelector(".portfolio");
const contactSection = document.querySelector(".contact-form");
const textSections = [aboutMeSection, timelineSection, technologiesSection, portfolioSection, contactSection]

const centerContainer = document.querySelector(".center-container");
const textContainer = document.querySelector(".text-container");
const bottomBackground = document.querySelector(".background-bottom")

const timelineElements = document.querySelectorAll(".timeline-element")
const timelineImageElements = document.querySelectorAll(".timeline-image-element")

const sliderButton = document.querySelector('.slider-button');
const slider = document.querySelector(".slider");
const sliderBottomBorder = parseInt(window.getComputedStyle(slider).getPropertyValue('border-bottom'))

const techInnerContainers = document.querySelectorAll(".technologies-and-skills-inner-container")
const techImgContainers = document.querySelectorAll('.tech-img-container')

let isDragging = false;

function updateActiveMark(newPosition) {
    const distanceFromTop = newPosition / centerContainer.offsetHeight * textContainer.offsetHeight;
    let activeSection;
    let totalHeight = 0;
    for (let i = 0; i < textSections.length; i++) {
        totalHeight += textSections[i].offsetHeight;
        if (distanceFromTop > totalHeight) {
            continue;
        }
        else {
            activeSection = textSections[i];
            break;
        }
    }
    marks.forEach(mark => {
        if (mark.getAttribute("value") == activeSection.className) {
            mark.classList.add("active")
        }
        else { mark.classList.remove("active") }
    });
}

function handleMarkClick(clickedMark) {
    let totalHeight = 0;
    let newTextPosition;
    for (let i = 0; i < marks.length; i++) {
        if (marks[i] === clickedMark) {
            newTextPosition = totalHeight;
            clickedMark.classList.add("active")
        }
        else {
            totalHeight += textSections[i].offsetHeight;
            marks[i].classList.remove("active")
        }
    }
    sliderButton.style.transition = "top .3s";
    textContainer.style.transition = "bottom .3s";
    let newButtonPosition = (newTextPosition / (textContainer.offsetHeight - centerContainer.offsetHeight)) * (slider.offsetHeight - sliderButton.offsetHeight)
    if (newButtonPosition > slider.offsetHeight - sliderButton.offsetHeight - 2 * sliderBottomBorder) {
        newButtonPosition = slider.offsetHeight - sliderButton.offsetHeight - 2 * sliderBottomBorder;
    }
    if (newTextPosition > textContainer.offsetHeight - centerContainer.offsetHeight) {
        newTextPosition = textContainer.offsetHeight - centerContainer.offsetHeight;
    }
    sliderButton.style.top = newButtonPosition + "px";
    textContainer.style.bottom = newTextPosition + "px";
}

function handleScrollMove(e) {
    let newPosition = e.clientY - slider.getBoundingClientRect().top - sliderButton.offsetHeight / 2;
    if (newPosition < 0) {
        newPosition = 0;
    }
    if (newPosition > slider.offsetHeight - sliderButton.offsetHeight - 2 * sliderBottomBorder) {
        newPosition = slider.offsetHeight - sliderButton.offsetHeight - 2 * sliderBottomBorder;
    }
    sliderButton.style.top = newPosition + "px";
    textContainer.style.bottom = (newPosition / (slider.offsetHeight - sliderButton.offsetHeight)) * (textContainer.offsetHeight - centerContainer.offsetHeight) + "px";
    updateActiveMark(newPosition);
    displayElements();
}

function displayEducationSection(i) {
    timelineElements[i].style.opacity = "1";
    timelineElements[i].style.left = "0px"
    const imgIndex = i >= timelineElements.length / 2 ? i - timelineElements.length / 2 : i + timelineElements.length / 2
    timelineImageElements[imgIndex].style.opacity = "1";
    timelineImageElements[imgIndex].style.left = "0px"
}

function displayElements() {
    const textReaded = parseInt(window.getComputedStyle(textContainer).getPropertyValue('bottom'))
    const actualTextPosition = centerContainer.offsetHeight / 2 + textReaded;
    let comparedTextPosition = 0;
    comparedTextPosition += textSections[0].offsetHeight;
    for (let i = 0; i < timelineElements.length; i++) {
        if (actualTextPosition > comparedTextPosition && i % 2 == 0) {
            displayEducationSection(i)
            comparedTextPosition += timelineElements[i].offsetHeight;
        }
    }
    for (let i = 0; i < timelineElements.length; i++) {
        if (actualTextPosition > comparedTextPosition && i % 2 == 1) {
            displayEducationSection(i)
            comparedTextPosition += timelineElements[i].offsetHeight;
        }
    }
    for (let i = 0; i < techInnerContainers.length; i++) {
        if (actualTextPosition > comparedTextPosition) {
            techInnerContainers[i].style.opacity = "1";
            techInnerContainers[i].style.left = "0px"
            comparedTextPosition += techInnerContainers[i].offsetHeight
        }
    }
}

window.addEventListener('load', () => {
    pcContainer.style.left = 0 + "px";
    pcContainer.style.opacity = "1";
})

setTimeout(() => {
    languageSection.style.height = (leftContainer.offsetHeight - marksSection.offsetHeight) / 2 + "px";
    socialSection.style.height = (leftContainer.offsetHeight - marksSection.offsetHeight) / 2 + "px";
}, 100)

bottomBackground.style.top = centerContainer.offsetHeight - bottomBackground.offsetHeight + "px"

marks.forEach(mark => {
    mark.addEventListener("click", () => {
        handleMarkClick(mark);
    })
})

sliderButton.addEventListener("mousedown", (e) => {
    isDragging = true;

    document.addEventListener("mouseup", () => {
        isDragging = false;
    });

    document.addEventListener("mousemove", (e) => {
        if (isDragging) {
            sliderButton.style.transition = "top 0s"
            textContainer.style.transition = "bottom 0s"
            handleScrollMove(e)
        }
    });
});

if (!isDragging) {
    slider.addEventListener("click", (e) => {
        sliderButton.style.transition = "top .3s"
        textContainer.style.transition = "bottom .3s"
        handleScrollMove(e)
    })
}

techImgContainers.forEach(container => {
    const whiteField = document.createElement("div");
    const techNameElement = document.createElement("div");
    const image = container.children[0].children[0];
    whiteField.className = "white-field";
    techNameElement.className = "tech-name";
    techNameElement.textContent = image.getAttribute("alt");
    container.insertAdjacentElement('beforeend', whiteField)
    container.insertAdjacentElement('beforeend', techNameElement)
    container.addEventListener('mouseover', () => {
        techNameElement.style.bottom = '32px';
        image.style.transform = 'scale(1.15)';
    })
    container.addEventListener('mouseout', () => {
        techNameElement.style.bottom = '72px';
        image.style.transform = 'scale(1)';
    })
})