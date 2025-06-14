// Sidebar
function showSidebar() {
  const sidebar = document.querySelector('.sidebar');
  sidebar.style.display = 'flex';
}

function hideSidebar() {
  const sidebar = document.querySelector('.sidebar');
  sidebar.style.display = 'none';
}

// Reset scroll & remove hash
window.onload = function () {
  window.scrollTo(0, 0);
};

if (window.location.hash) {
  history.replaceState("", document.title, window.location.pathname + window.location.search);
  window.scrollTo(0, 0);
}

// Slideshow
let slideIndex = 1;
let autoSlideInterval; // menyimpan timer
let slidePaused = false;

function showSlides(n) {
  const slides = document.getElementsByClassName("mySlides");
  const dots = document.getElementsByClassName("dot");

  if (n > slides.length) slideIndex = 1;
  if (n < 1) slideIndex = slides.length;

  for (let i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  for (let i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }

  slides[slideIndex - 1].style.display = "block";
  dots[slideIndex - 1].className += " active";
}

function plusSlides(n) {
  showSlides(slideIndex += n);
  resetAutoSlide();
}

function currentSlide(n) {
  showSlides(slideIndex = n);
  resetAutoSlide();
}

function startAutoSlide() {
  autoSlideInterval = setInterval(() => {
    if (!slidePaused) {
      plusSlides(1);
    }
  }, 2000);
}

function stopAutoSlide() {
  clearInterval(autoSlideInterval);
}

function resetAutoSlide() {
  stopAutoSlide();
  startAutoSlide();
}

showSlides(slideIndex);
startAutoSlide();

// Pause on hover (opsional)
const slideshowContainer = document.querySelector(".slideshow-container");

if (slideshowContainer) {
  slideshowContainer.addEventListener("mouseenter", () => {
    slidePaused = true;
  });
  slideshowContainer.addEventListener("mouseleave", () => {
    slidePaused = false;
  });

  // Swipe gesture
  let touchStartX = 0;
  let touchEndX = 0;

  slideshowContainer.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
  });

  slideshowContainer.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipeGesture();
  });

  function handleSwipeGesture() {
    const swipeThreshold = 50;
    const swipeDistance = touchEndX - touchStartX;

    if (Math.abs(swipeDistance) > swipeThreshold) {
      if (swipeDistance < 0) {
        plusSlides(1); // geser kiri
      } else {
        plusSlides(-1); // geser kanan
      }
    }
  }
}

const form = document.getElementById("guestbook-form");
const entriesContainer = document.getElementById("guestbook-entries");

function loadEntries() {
  entriesContainer.innerHTML = "";
  const data = JSON.parse(localStorage.getItem("bukuTamu")) || [];

  data.forEach(entry => {
    const div = document.createElement("div");
    div.innerHTML = `
      <strong>${entry.nama}</strong><br>
      <em>${entry.komentar}</em><br>
    `;
    entriesContainer.appendChild(div);
  });
}

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const nama = form.nama.value.trim();
  const komentar = form.komentar.value.trim();

  if (!nama || !komentar) return;

  const newEntry = { nama, komentar };
  const data = JSON.parse(localStorage.getItem("bukuTamu")) || [];
  data.push(newEntry);
  localStorage.setItem("bukuTamu", JSON.stringify(data));

  form.reset();
  loadEntries();
});

window.onload = loadEntries;

const resetBtn = document.getElementById("reset-data");

resetBtn.addEventListener("click", () => {
  localStorage.removeItem("bukuTamu"); // hapus data dari localStorage
  loadEntries(); // refresh tampilan, jadi kosong
});

  function showPopup() {
    document.getElementById("promo-popup").style.display = "block";
  }

  function closePopup() {
    document.getElementById("promo-popup").style.display = "none";
    const nextTime = Date.now() + 2 * 60 * 1000; // 2 menit ke depan
    localStorage.setItem("nextPopupTime", nextTime);
  }

  // Saat halaman dimuat
  window.onload = function () {
    const nextTime = localStorage.getItem("nextPopupTime");
    const now = Date.now();

    if (!nextTime || now >= nextTime) {
      showPopup();
    } else {
      const delay = nextTime - now;
      setTimeout(showPopup, delay);
    }
  };
