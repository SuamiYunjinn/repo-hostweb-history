const scrollDot = document.getElementById('scrollDot');
const timeline = document.getElementById('timeline');
const progressBar = document.getElementById('progressBarFill');
const backToTopButton = document.getElementById("backToTop");

function updateDotPosition() {
  const timelineTop = timeline.offsetTop;
  const timelineHeight = timeline.offsetHeight;
  const dotY = window.scrollY + window.innerHeight / 2 - timelineTop;
  const maxDotY = timelineHeight - scrollDot.offsetHeight;
  const clampedY = Math.max(0, Math.min(dotY, maxDotY));
  scrollDot.style.top = `${clampedY}px`;
}

function updateProgressBar() {
  const scrollTop = window.scrollY;
  const scrollHeight = document.body.scrollHeight - window.innerHeight;
  const progress = Math.min(100, (scrollTop / scrollHeight) * 100);
  progressBar.style.width = `${progress}%`;
}

window.addEventListener('scroll', () => {
  updateDotPosition();
  updateProgressBar();
  backToTopButton.style.display = window.scrollY > 300 ? "flex" : "none";
});

window.addEventListener('resize', updateDotPosition);

window.addEventListener('load', () => {
  updateDotPosition();
  updateProgressBar();
});

backToTopButton.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// Intersection Observer untuk fade-in dan fade-out
const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('fade-in');
        entry.target.classList.remove('fade-out');
      } else {
        entry.target.classList.add('fade-out');
        entry.target.classList.remove('fade-in');
      }
    });
  },
  { threshold: 0.25 }
);

document.querySelectorAll('.timeline-entry').forEach(entry => {
  // Inisialisasi kelas fade-out agar tidak langsung terlihat
  entry.classList.add('fade-out');
  observer.observe(entry);
});