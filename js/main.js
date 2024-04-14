// Function to handle scrolling effects
const flower = document.getElementById("flower")
const project = document.getElementById("projectTitle")
const cards = document.getElementsByClassName("cards")

function scrolling() {
    const scrollPosition = window.scrollY;
    flower.style.transform = `rotate(${scrollPosition/8}deg)`;
    var opacity = (scrollPosition / 400) - 1;
    if (window.innerWidth > 768){
        for (const card of cards) {
            card.style.left = `${900 - scrollPosition }px`;
            opacity = Math.min(1, Math.max(0, opacity));
            card.style.opacity = opacity;
        }
    }
}

// Event listener for scroll events
window.addEventListener('scroll', scrolling);

// Draggable button functionality
document.addEventListener("DOMContentLoaded", function () {
    var draggableButton = document.getElementById("draggableButton");
    var draggableButtonHeader = document.getElementById("draggableButtonHeader");

    var offsetX, offsetY;

    draggableButtonHeader.addEventListener("mousedown", function (e) {
        e.preventDefault();

        offsetX = e.clientX - draggableButton.getBoundingClientRect().left;
        offsetY = e.clientY - draggableButton.getBoundingClientRect().top;

        function moveButton(e) {
            var x = e.clientX - offsetX + window.scrollX;
            var y = e.clientY - offsetY + window.scrollY;

            draggableButton.style.left = x + "px";
            draggableButton.style.top = y + "px";
        }

        function stopMoving() {
            document.removeEventListener("mousemove", moveButton);
            document.removeEventListener("mouseup", stopMoving);
        }

        document.addEventListener("mousemove", moveButton);
        document.addEventListener("mouseup", stopMoving);
    });
});

// Change language functionality
function changeLanguage(lang) {
    fetch('../translation.json')
        .then(response => response.json())
        .then(translations => {
            document.getElementById('aboutLink').textContent = translations[lang].aboutLink;
            document.getElementById('projectsLink').textContent = translations[lang].projectsLink;
            document.getElementById('contactLink').textContent = translations[lang].contactLink;
            document.getElementById('intro1').textContent = translations[lang].about.intro1;
            document.getElementById('intro2').textContent = translations[lang].about.intro2;
            document.getElementById('projectsTitle').textContent = translations[lang].projects.title;
            document.getElementById('projectTitle1').textContent = translations[lang].projects.projectTitle1;
            document.getElementById('projectTitle2').textContent = translations[lang].projects.projectTitle2;
            document.getElementById('projectTitle3').textContent = translations[lang].projects.projectTitle3;
            document.getElementById('title1').textContent = translations[lang].projects.title1;
            document.getElementById('paragraph1').textContent = translations[lang].projects.paragraph1;
            document.getElementById('title2').textContent = translations[lang].projects.title2;
            document.getElementById('paragraph2').textContent = translations[lang].projects.paragraph2;
            document.getElementById('title3').textContent = translations[lang].projects.title3;
            document.getElementById('paragraph3').textContent = translations[lang].projects.paragraph3;
            var learnMore = document.getElementsByClassName('learnMore'); 
            for(const div of learnMore){
                div.textContent = translations[lang].projects.learnMore;
            }
            var moreProjects = document.getElementsByClassName('moreProjects'); 
            for(const div of moreProjects){
                div.textContent = translations[lang].projects.moreProjects;
            }
            var moreProjectsLink = document.getElementsByClassName('moreProjectsLink'); 
            for(const div of moreProjectsLink){
                div.textContent = translations[lang].projects.moreProjectsLink;
            }
            document.getElementById('contactTitle').textContent = translations[lang].contact.title;
            document.getElementById('emailLabel').textContent = translations[lang].contact.form.email;
            document.getElementById('messageLabel').textContent = translations[lang].contact.form.message;
            document.getElementById('submitButton').textContent = translations[lang].contact.form.submit;
            document.getElementById('resetButton').textContent = translations[lang].contact.form.reset;
            document.getElementById('chLang').textContent = translations[lang].lang;
            document.getElementById('download').textContent = translations[lang].download;
            if (document.getElementById('confirm_msg')){
                document.getElementById('confirm_msg').textContent = translations[lang].msg;
            }
            document.getElementById('chLangTitle').textContent = translations[lang].chLangTitle;
        })
        .catch(error => console.error('Error loading translations:', error));
}

// Initialize language based on user preference or default to English
const lastSelectedLang = localStorage.getItem('selectedLang') || 'Eng';
changeLanguage(lastSelectedLang);

// Event listener for language change
document.getElementById('chLang').addEventListener('click', function() {
    const currentLang = document.getElementById('chLang').textContent;
    const newLang = currentLang === 'Eng' ? 'Fr' : 'Eng';

    localStorage.setItem('selectedLang', newLang);

    changeLanguage(newLang);
});

// Mouse movement tracker for cards hover effect 
document.addEventListener("mousemove", function(e){
    for(const card of cards){
        let rect = card.getBoundingClientRect();
        var x = e.clientX - rect.left;
        var y = e.clientY - rect.top;
        card.style.setProperty("--x", x +"px");
        card.style.setProperty("--y", y +"px");
    }
});

// Block scrolling when the popup is up
var style = document.createElement('style');
style.innerHTML = `.no-scroll { overflow: hidden; };`
document.head.appendChild(style);

function openPopup(id) {
    document.getElementById(id).showModal();
    document.body.classList.add('no-scroll');
}
  
function closePopup(id) {
    document.getElementById(id).setAttribute('closing','');
    document.getElementById(id).addEventListener('animationend', function() {
        document.getElementById(id).removeAttribute('closing');
        document.getElementById(id).close();
    }, {once: true})
    document.body.classList.remove('no-scroll');
}
  
document.addEventListener("DOMContentLoaded", function() {
    var popupButtons = document.querySelectorAll(".popup-button");
  
    popupButtons.forEach(function(button) {
      button.addEventListener("click", function() {
        var popupId = button.getAttribute("data-popup");
        openPopup(popupId);
      });
    });
});  

// Download button functionality
document.getElementById('downloadButton').addEventListener('click', function() {
    var currentLang = document.getElementById('chLang').textContent;

    var filePath = './pdf/'
    var fileNames = {
        "Eng": '(eng)Imane_kimissi.pdf',
        "Fr": '(fr)Imane_kimissi.pdf'
    }
    var link = document.createElement('a');
    
    link.href = filePath + fileNames[currentLang];
    link.download = fileNames[currentLang];
    link.target = "_blank";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
});

// Scroll down symbol
document.addEventListener("DOMContentLoaded", function() {
    setTimeout(function () {
        document.getElementById("scrollDownSymbol").style.opacity = 1;
    }, 2000);
    window.addEventListener("scroll", function () {
        document.getElementById("scrollDownSymbol").style.opacity = 0;
    });
});

// Contact
document.getElementById("contactForm").addEventListener("submit", function(event) {
    event.preventDefault();

    var formData = new FormData(this);
    var xhr = new XMLHttpRequest();

    xhr.open("POST", "https://formspree.io/f/xbjnkkqz");
    xhr.setRequestHeader("Accept", "application/json");
    xhr.onreadystatechange = function () {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            var messageDiv = document.getElementById("confirm_msg");
            messageDiv.style.display = "block";
            if (xhr.status === 200) {
                messageDiv.textContent = "Your message has been sent, thank you for contacting me!";
            } 
            else {
                messageDiv.textContent = "There was an error sending your message. Please try again later.";
            }
        }
    };
    xhr.send(formData);
});