const pcContainer = document.querySelector(".pc-container");
const isUserPolish = window.location.href == "http://michaljeleniewski.pl/"
const isUserMobile = window.innerWidth < 1100;

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

const techInnerContainers = document.querySelectorAll(".technologies-and-skills-inner-container")
const techImgContainers = document.querySelectorAll('.tech-img-container')

const portfolioElements = document.querySelectorAll(".portfolio-element")

const gallery = document.querySelector(".gallery");
const portfolioGalleryIcons = document.querySelectorAll(".gallery_icon");
const portfolioElementsGallerySize = {
    "gomove": 4,
    "variaposnania": 4
}

const contactForm = document.querySelector("#form")

const sliderButton = document.querySelector('.slider-button');
const slider = document.querySelector(".slider");
const sliderBorderSize = parseInt(window.getComputedStyle(slider).getPropertyValue('border-bottom'))

const mobileFirstContainer = document.querySelector(".first-container");


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
    sliderButton.style.transition = "top .4s";
    textContainer.style.transition = "bottom .2s";
    let newButtonPosition = (newTextPosition / (textContainer.offsetHeight - centerContainer.offsetHeight)) * (slider.offsetHeight - sliderButton.offsetHeight)
    if (newButtonPosition > slider.offsetHeight - sliderButton.offsetHeight - 2 * sliderBorderSize) {
        newButtonPosition = slider.offsetHeight - sliderButton.offsetHeight - 2 * sliderBorderSize;
    }
    if (newTextPosition > textContainer.offsetHeight - centerContainer.offsetHeight) {
        newTextPosition = textContainer.offsetHeight - centerContainer.offsetHeight;
    }
    sliderButton.style.top = newButtonPosition + "px";
    textContainer.style.bottom = newTextPosition + "px";
    setTimeout(() => {
        displayElements();
    }, 200);
}

function handleScrollMove(newPosition) {
    if (newPosition < 0) {
        newPosition = 0;
    }
    if (newPosition > slider.offsetHeight - sliderButton.offsetHeight - 2 * sliderBorderSize) {
        newPosition = slider.offsetHeight - sliderButton.offsetHeight - 2 * sliderBorderSize;
    }
    sliderButton.style.top = newPosition + "px";
    textContainer.style.bottom = (newPosition / (slider.offsetHeight - 2 * sliderBorderSize - sliderButton.offsetHeight)) * (textContainer.offsetHeight - centerContainer.offsetHeight) + "px";
    updateActiveMark(newPosition);
}

function displayEducationSection(i) {
    timelineElements[i].style.opacity = "1";
    timelineElements[i].style.left = "0px"
    const imgIndex = i >= timelineElements.length / 2 ? i - timelineElements.length / 2 : i + timelineElements.length / 2
    console.log(timelineImageElements[imgIndex])
    timelineImageElements[imgIndex].style.opacity = "1";
    timelineImageElements[imgIndex].style.left = "0px"
}

function displayElements() {
    const textReaded = parseInt(window.getComputedStyle(textContainer).getPropertyValue('bottom'))
    const actualTextPosition = isUserMobile ? window.scrollY - window.innerHeight / 2 : centerContainer.offsetHeight / 2 + textReaded;
    let comparedTextPosition = 0;
    comparedTextPosition += isUserMobile ? mobileFirstContainer.offsetHeight : textSections[0].offsetHeight;
    comparedTextPosition += document.querySelector(".timeline h1").offsetHeight
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

    comparedTextPosition += document.querySelector(".technologies-and-skills h1").offsetHeight

    for (let i = 0; i < techInnerContainers.length; i++) {
        if (actualTextPosition > comparedTextPosition) {
            techInnerContainers[i].style.opacity = "1";
            techInnerContainers[i].style.left = "0px"
            comparedTextPosition += techInnerContainers[i].offsetHeight
        }
    }

    comparedTextPosition += document.querySelector(".portfolio h1").offsetHeight

    for (let i = 0; i < portfolioElements.length; i++) {
        if (actualTextPosition > comparedTextPosition) {
            portfolioElements[i].style.opacity = "1";
            portfolioElements[i].style.bottom = "0px"
            comparedTextPosition += portfolioElements[i].offsetHeight
        }
    }

    comparedTextPosition += document.querySelector(".contact-form h1").offsetHeight
    if (actualTextPosition > comparedTextPosition) {
        contactForm.style.opacity = "1"
    }
}

function displayGallery(id) {
    const mainImageContainer = document.querySelector(".main-img");
    const allImagesContainer = document.querySelector(".other-images-inner-container");
    const mainImgEl = document.createElement("img");
    const mainImgUrl = isUserPolish ? `./images/${id}_${1}.png` : `../images/${id}_${1}.png`;
    mainImgEl.setAttribute("id", 1);
    mainImgEl.src = mainImgUrl;
    mainImageContainer.insertAdjacentElement('afterbegin', mainImgEl);
    for (let i = 1; i <= portfolioElementsGallerySize[id]; i++) {
        const imgEl = document.createElement("img");
        const imgUrl = isUserPolish ? `./images/${id}_${i}.png` : `../images/${id}_${i}.png`;
        imgEl.src = imgUrl;
        const imgId = `${i}`
        imgEl.setAttribute("id", imgId);
        allImagesContainer.insertAdjacentElement('beforeend', imgEl)
    }
    allImagesContainer.children[0].classList.add('image-active');
    let displayedPhoto = mainImageContainer.children[0];
    enablePhotoChanging(displayedPhoto)
    gallery.style.display = "flex"
}

function enablePhotoChanging(displayedPhoto) {
    const allImages = document.querySelectorAll(".other-images-inner-container img");
    const rightArrow = document.querySelector(".right-arrow");
    const leftArrow = document.querySelector(".left-arrow");
    const closeButton = document.querySelector(".close-gallery")

    allImages.forEach(img => {
        img.addEventListener("click", (e) => {
            for (let i = 0; i <= allImages.length; i++) {
                if (i + 1 == e.target.id) {
                    displayedPhoto.src = img.src;
                    displayedPhoto.id = img.id;
                    img.classList.add("image-active");
                }
                else {
                    allImages[i].classList.remove("image-active")
                }
            }
        })
    })

    leftArrow.addEventListener("click", () => {
        let displayedPhotoId;
        for (let i = 0; i < allImages.length; i++) {
            if (displayedPhoto.id == 1) {
                displayedPhoto.src = allImages[allImages.length - 1].src;
                displayedPhotoId = allImages[allImages.length - 1].id;
                allImages[allImages.length - 1].classList.add("image-active");
                allImages[0].classList.remove("image-active")
            }
            else if (displayedPhoto.id == allImages[i].id) {
                displayedPhoto.src = allImages[i - 1].src;
                displayedPhotoId = allImages[i - 1].id;
                allImages[i].classList.remove("image-active")
                allImages[i - 1].classList.add("image-active")
            }
        }
        displayedPhoto.id = `${displayedPhotoId}`;
    })

    rightArrow.addEventListener("click", () => {
        let displayedPhotoId;
        for (let i = 0; i < allImages.length; i++) {
            if (displayedPhoto.id == allImages.length) {
                displayedPhoto.src = allImages[0].src;
                displayedPhotoId = allImages[0].id
                allImages[allImages.length - 1].classList.remove("image-active");
                allImages[0].classList.add("image-active");
            }
            else if (displayedPhoto.id == allImages[i].id) {
                displayedPhoto.src = allImages[i + 1].src;
                displayedPhotoId = allImages[i + 1].id
                allImages[i].classList.remove("image-active")
                allImages[i + 1].classList.add("image-active");
            }
        }
        displayedPhoto.id = `${displayedPhotoId}`;
    })
    closeButton.addEventListener("click", () => {
        displayedPhoto.remove();
        allImages.forEach(image => {
            image.remove()
        })
        gallery.style.display = "none"
    })
}

function clearContactForm() {
    document.getElementById('fullName').value = "";
    document.getElementById('email').value = "";
    document.getElementById('message').value = "";
}

window.addEventListener('load', () => {
    pcContainer.style.left = 0 + "px";
    pcContainer.style.opacity = "1";
})

setTimeout(() => {
    languageSection.style.height = (leftContainer.offsetHeight - marksSection.offsetHeight) / 2 + "px";
    socialSection.style.height = (leftContainer.offsetHeight - marksSection.offsetHeight) / 2 + "px";
}, 100)

if (!isUserMobile) {
    bottomBackground.style.top = centerContainer.offsetHeight - bottomBackground.offsetHeight + "px"
}

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
            let newPosition = e.clientY - slider.getBoundingClientRect().top - sliderButton.offsetHeight / 2;
            handleScrollMove(newPosition)
            displayElements();
        }
    });
});

if (!isDragging) {
    slider.addEventListener("click", (e) => {
        sliderButton.style.transition = "top .2s"
        textContainer.style.transition = "bottom .2s"
        let newPosition = e.clientY - slider.getBoundingClientRect().top - sliderButton.offsetHeight / 2;
        handleScrollMove(newPosition)
        setTimeout(() => {
            displayElements();
        }, 200);
    })
}

centerContainer.addEventListener("mousewheel", (e) => {
    const scrollPower = 30
    let delta = e.wheelDelta;
    let newPosition;
    if (delta > 0) {
        newPosition = sliderButton.getBoundingClientRect().top - slider.getBoundingClientRect().top - sliderBorderSize - scrollPower;
    } else if (delta < 0) {
        newPosition = sliderButton.getBoundingClientRect().top - slider.getBoundingClientRect().top - sliderBorderSize + scrollPower;
    }
    handleScrollMove(newPosition)
    displayElements();
})

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

document.addEventListener("touchmove", () => {
    displayElements()
})

portfolioGalleryIcons.forEach(icon => {
    icon.addEventListener("click", (e) => {
        displayGallery(e.target.id)
    })
})


contactForm.addEventListener('submit', function (e) {
    e.preventDefault()
    const fullName = document.getElementById('fullName').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
    const errorElement = document.getElementById('error-message');

    if (!fullName || !email || !message) {
        errorElement.textContent = isUserPolish ? 'Wszystkie pola są wymagane' : 'All fields are required';
        return;
    }

    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        errorElement.textContent = isUserPolish ? 'Nieprawidłowy adres e-mail' : 'Incorrect e-mail adress';
        return;
    }
    const formData = new FormData();
    formData.append('fullName', fullName);
    formData.append('email', email);
    formData.append('message', message);

    errorElement.textContent = '';
    const loader = document.getElementById('loader');
    loader.style.display = 'block';

    fetch('submit_form.php', {
        method: 'POST',
        body: formData
    })
        .then(response => response.text())
        .then(data => {
            clearContactForm();
            errorElement.textContent = isUserPolish ? 'Wiadomość została wysłana' : 'Message successfully sent';
            loader.style.display = 'none';
            console.log(data);
        })
        .catch(error => {
            errorElement.textContent = isUserPolish ? 'Nie udało się wysłać wiadomości, spróbuj ponownie' : 'Failed to send message, please try again';
            console.error('Błąd:', error);
            loader.style.display = 'none';
        });
});