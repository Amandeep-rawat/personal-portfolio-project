
window.addEventListener('beforeunload', function () {
    window.scrollTo(0, 0);
});

document.addEventListener('DOMContentLoaded', function () {


    // GSAP Animation Timelines
    let t2 = gsap.timeline();

    t2.from(".logo span", {
        y: -60,
        duration: 0.19,
        stagger: 0.14,
        delay: 0.1,
        opacity: 0,
        display: "inline-block"
    }, "load1");

    let viewportWidth = window.innerWidth;

    if (viewportWidth > 700) {
        t2.from(".navbar a", {
            scale: 0,
            stagger: 0.14,
            duration: 0.3,
            delay: 0.1,
            display: "inline-block"
        }, "load1");
    }

    t2.from(".home-content h1", {
        color: "white",
        opacity: 0,
        stagger: 0.4,
        duration: 0.4
    }, "img");

    t2.from(".home-content h3", {
        x: -50,
        opacity: 0,
        duration: 0.3
    });

    t2.from(".home-content p", {
        scale: 0,
        opacity: 0,
        duration: 0.3
    });

    t2.from(".home-content .social-media", {
        x: 20,
        duration: 0.3,
        opacity: 0,
    }, "same1");

    t2.from(".home-content #btnid", {
        duration: 0.2,
        y: 30,
        opacity: 0,
    }, "same1");

    t2.from(".home-img", {
        duration: 1.9,
        y: 80,
        opacity: 0,
    }, "img");

    // t2.from(".about,.services,.portfolio,.contact,.footer",{
    //     display:"none",
    //     duration:0.3
    // })



    var t3 = gsap.timeline({
        scrollTrigger: {
            trigger: ".about",
            scroller: "body",
            start: "top 60%",
            toggleActions: "restart none none reverse"
        }
    });

    t3.from("#about .heading, .about-content h3, .about-content p", {
        x: 80,
        duration: 0.6,
        opacity: 0
    }, "same2");

    t3.from(".about-img", {
        x: -80,
        duration: 0.6,
        opacity: 0
    }, "same2");

    t3.from(".tab-titles", {
        y: 80,
        duration: 0.6,
        opacity: 0
    });

    t3.from(".tab-contents", {
        y: 80,
        duration: 0.6,
        opacity: 0
    });

    let t4 = gsap.timeline({
        scrollTrigger: {
            trigger: ".services-container",
            scroller: "body",
            start: "top 80%",
            end: "top 10%",
            toggleActions: "restart none none reverse"
        }
    });

    t4.from(".services .heading #leftid", {
        duration: 0.6,
        x: -100,
        display: "inline-block",
        opacity: 0
    }, "same3");
    t4.from(".services .heading #rightid", {
        duration: 0.6,
        display: "inline-block",

        x: 100,
        opacity: 0
    }, "same3");

    t4.from(".services-container", {
        y: 70,
        duration: 0.5,
        opacity: 0
    }, "same3");

    let t5 = gsap.timeline({
        scrollTrigger: {
            trigger: ".portfolio .heading",
            scroller: "body",
            start: "top 70%",
            toggleActions: "restart none none reverse"
        }
    });

    t5.from(".portfolio .heading .left", {
        x: -60,
        duration: 0.8,
        display: "inline-block",
        opacity: 0
    }, "same5");

    t5.from(".portfolio .heading .right", {
        x: 60,
        duration: 0.8,
        display: "inline-block",
        opacity: 0
    }, "same5");

    t5.from(".portfolio-box", {
        y: 60,
        stagger: 0.3,
        duration: 0.9,
        opacity: 0
    });

    // Navbar Animation
    var t1 = gsap.timeline();
    t1.pause();

    function menu_icon_gsap() {
        t1.play();
        t1.to(".navbar", {
            right: 0,
            duration: 0.3,
            delay: 0.1,
        });
        t1.from(".navbar a", {
            x: 60,
            stagger: 0.2,
            duration: 0.4,
            delay: 0.1,
            opacity: 0,
            scale: 0
        });
        t1.from(".cross", {
            scale: 0
        });
    }

    var menu_icon = document.querySelector("#menu-icon");
    var crossbar = document.querySelector(".cross");

    menu_icon.addEventListener("click", () => {
        menu_icon_gsap();
    });

    crossbar.addEventListener("click", () => {
        t1.reverse();
    });

    // Navbar Links Scroll (Vanilla JavaScript ScrollIntoView)
    const navbarLinks = document.querySelectorAll('.navbar a');

    navbarLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault(); // Prevent default behavior of anchor tag
            const targetId = link.getAttribute('href').substring(1); // Get target section id
            const targetSection = document.getElementById(targetId); // Get the actual section element
            targetSection.scrollIntoView({ behavior: 'smooth' }); // Scroll to the target section
        });
    });

    // Typed.js Initialization
    const typed = new Typed(".multiple-text", {
        strings: ["Frontend Developer", "Web Designer", "BCA Student"],
        typeSpeed: 30,
        backSpeed: 30,
        backDelay: 1000,
        loop: true
    });

    // Read More Button Functionality
    let readmore = document.querySelectorAll(".services-box .btn");

    readmore.forEach((singlereadmore) => {
        singlereadmore.addEventListener("click", () => {
            let box = singlereadmore.parentNode;
            let p = box.querySelector("p");
            singlereadmore.style.display = "none";
            p.style.overflow = "none";
            p.style.maxHeight = "none";
        });
    });

    // Google Sheets Integration for Form Submission
    const scriptURL = 'https://script.google.com/macros/s/AKfycbymDgVAqocBMjQPGILywkh0lrrT_RFTpKxXQY333Y6-dJ_Cv7SDuLK3ktOV5RH-68gH_A/exec';
    const form = document.forms['submit-to-google-sheet'];
    const msg = document.getElementById("msg");

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            msg.innerHTML = "Please fill in all required fields.";
            return;
        }

        msg.innerHTML = "Sending message...";

        try {
            const response = await fetch(scriptURL, { method: 'POST', body: new FormData(form) });

            if (response.ok) {
                // console.log('Success!', response);
                msg.innerHTML = "Message sent successfully.";
                form.reset();

                setTimeout(() => {
                    msg.innerHTML = "";
                }, 3000);
            } else {
                msg.innerHTML = "Failed to send message. Please try again later.";
            }
        } catch (error) {
            msg.innerHTML = "An unexpected error occurred. Please try again later.";
        }
    });

    function validateForm() {
        const fullName = form.elements['Name'].value.trim();
        const message = form.elements['Message'].value.trim();

        if (fullName === '' || message === '') {
            return false;
        } else {
            return true;
        }
    }

    // Tab Navigation
    const tablinks = document.querySelectorAll('.tab-links');
    const tabcontent = document.querySelectorAll(".tab-contents");

    tablinks.forEach((item, index) => {
        item.addEventListener('click', function () {
            tablinks.forEach(item => {
                item.classList.remove('active-links');
            });
            tabcontent.forEach((tab) => {
                tab.classList.remove("active-tab");
            });
            this.classList.add('active-links');
            tabcontent[index].classList.add("active-tab");
        });
    });




    // back to top 

    function scrollToHomeSection(target) {
        const offsetTop = document.querySelector(target).offsetTop;

        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
    }

    // Event listener for clicking on the "Back to Top" button
    const backToTopButton = document.getElementById('back-to-top');
    if (backToTopButton) {
        backToTopButton.addEventListener('click', (e) => {
            e.preventDefault(); // Prevent default anchor behavior
            const targetId = backToTopButton.getAttribute('href');
            scrollToHomeSection(targetId);
        });
    }

});
