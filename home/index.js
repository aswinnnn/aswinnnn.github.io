const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add("show");
        }
        else {
            entry.target.classList.remove("show")
        }
    });
})

const hiddenelems = document.querySelectorAll(".hidden");
hiddenelems.forEach((e) => observer.observe(e));

// ------------------------ //

window.addEventListener('scroll', () => {
    const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    const scrollFraction = scrollTop / maxScroll;
    const startColor = [188, 170, 164]; // RGB values of the initial background color
    const endColor = [0, 0, 0]; // RGB values of the final background color

    // Calculate the interpolated background color
    const interpolatedColor = startColor.map((channel, index) =>
        Math.round(channel + (endColor[index] - channel) * scrollFraction)
    );

    // Calculate the brightness of the background color
    const brightness = (0.299 * interpolatedColor[0] + 0.587 * interpolatedColor[1] + 0.114 * interpolatedColor[2]) / 255;

    // Set the background color and text color based on scroll position and brightness
    document.body.style.backgroundColor = `rgb(${interpolatedColor.join(',')})`;
    document.body.style.color = brightness > 0.5 ? 'black' : 'white';

    // Change the box shadow of elements with the "card" class
    const cards = document.querySelectorAll('.card');
    const boxShadowColor = brightness > 0.5 ? 'rgba(0,0,0,0.3)' : 'rgba(249,241,241,0.2)';

    cards.forEach((card) => {
        card.style.boxShadow = `0 0 6px 3px ${boxShadowColor}`;
    });
});



