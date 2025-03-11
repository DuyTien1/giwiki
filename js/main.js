// Character Data
const characters = [
	{
		name: "Raiden Shogun",
		title: "Plane of Euthymia",
		element: "electro",
		image: "./assets/characters/raiden.jpg",
	},
	{
		name: "Hu Tao",
		title: "77th Director of the Wangsheng Funeral Parlor",
		element: "pyro",
		image: "./assets/characters/hutao.jpg",
	},
	// Add more characters...
];

// Initialize Wiki
document.addEventListener("DOMContentLoaded", () => {
	initializeCharacters();
	initializeSearch();
	initializeAnimations();
	initializeCharacterSlider();
	initializeCharacterArchive();
});

function initializeCharacters() {
	const characterGrid = document.querySelector(".character-grid");

	characters.forEach((char) => {
		const card = createCharacterCard(char);
		characterGrid.appendChild(card);
	});
}

function createCharacterCard(character) {
	const card = document.createElement("div");
	card.className = "character-card slide-up";

	card.innerHTML = `
        <img src="${character.image}" alt="${character.name}">
        <h3>${character.name}</h3>
        <p>Element: ${character.element}</p>
        <p>Weapon: ${character.weapon}</p>
        <div class="rarity">
            ${"⭐".repeat(character.rarity)}
        </div>
    `;

	return card;
}

function initializeSearch() {
	const searchInput = document.querySelector(".search-bar input");
	const searchBtn = document.querySelector(".search-btn");

	searchBtn.addEventListener("click", () => performSearch(searchInput.value));
	searchInput.addEventListener("keyup", (e) => {
		if (e.key === "Enter") performSearch(searchInput.value);
	});
}

function performSearch(query) {
	// Implement search functionality
	const searchResults = characters.filter((char) =>
		char.name.toLowerCase().includes(query.toLowerCase())
	);
	updateCharacterDisplay(searchResults);
}

// Character Slider functionality
function initializeCharacterSlider() {
	const slider = document.querySelector(".character-slider");
	const slides = document.querySelectorAll(".character-slide");
	const prevBtn = document.querySelector(".prev-btn");
	const nextBtn = document.querySelector(".next-btn");
	const dotsContainer = document.querySelector(".slider-dots");

	let currentSlide = 0;
	let isTransitioning = false;
	const totalSlides = slides.length;

	// Create dots
	slides.forEach((_, index) => {
		const dot = document.createElement("div");
		dot.classList.add("dot");
		if (index === 0) dot.classList.add("active");
		dot.addEventListener("click", () => {
			if (!isTransitioning) goToSlide(index);
		});
		dotsContainer.appendChild(dot);
	});

	const dots = document.querySelectorAll(".dot");

	function updateDots() {
		dots.forEach((dot, index) => {
			dot.classList.toggle("active", index === currentSlide);
		});
	}

	function goToSlide(slideIndex) {
		if (currentSlide === slideIndex) return;

		isTransitioning = true;
		currentSlide = slideIndex;
		const offset = -slideIndex * 100;
		slider.style.transform = `translateX(${offset}%)`;
		updateDots();

		setTimeout(() => {
			isTransitioning = false;
		}, 500); // Match this with CSS transition duration
	}

	function nextSlide() {
		if (!isTransitioning) {
			currentSlide = (currentSlide + 1) % totalSlides;
			goToSlide(currentSlide);
		}
	}

	function prevSlide() {
		if (!isTransitioning) {
			currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
			goToSlide(currentSlide);
		}
	}

	// Event listeners
	nextBtn.addEventListener("click", nextSlide);
	prevBtn.addEventListener("click", prevSlide);

	// Keyboard navigation
	document.addEventListener("keydown", (e) => {
		if (e.key === "ArrowLeft") prevSlide();
		if (e.key === "ArrowRight") nextSlide();
	});

	// Touch events
	let touchStartX = 0;
	let touchEndX = 0;

	slider.addEventListener(
		"touchstart",
		(e) => {
			touchStartX = e.changedTouches[0].screenX;
		},
		{ passive: true }
	);

	slider.addEventListener(
		"touchend",
		(e) => {
			touchEndX = e.changedTouches[0].screenX;
			if (touchStartX - touchEndX > 50) {
				nextSlide();
			} else if (touchEndX - touchStartX > 50) {
				prevSlide();
			}
		},
		{ passive: true }
	);

	// Auto-advance slides
	let slideInterval = setInterval(nextSlide, 5000);

	// Pause auto-advance on hover
	slider.addEventListener("mouseenter", () => {
		clearInterval(slideInterval);
	});

	slider.addEventListener("mouseleave", () => {
		slideInterval = setInterval(nextSlide, 5000);
	});
}
// Initialize slider when DOM is loaded
document.addEventListener("DOMContentLoaded", initializeCharacterSlider);

// Blog category filtering
document.addEventListener("DOMContentLoaded", () => {
	const categoryBtns = document.querySelectorAll(".category-btn");
	const blogCards = document.querySelectorAll(".blog-card");

	categoryBtns.forEach((btn) => {
		btn.addEventListener("click", () => {
			// Remove active class from all buttons
			categoryBtns.forEach((b) => b.classList.remove("active"));
			// Add active class to clicked button
			btn.classList.add("active");

			const category = btn.dataset.category;

			blogCards.forEach((card) => {
				if (category === "all" || card.classList.contains(category)) {
					card.style.display = "block";
				} else {
					card.style.display = "none";
				}
			});
		});
	});
});

function initializeCharacterArchive() {
	const cardsContainer = document.querySelector(".character-cards");
	const filterBtns = document.querySelectorAll(".filter-btn");
	const scrollLeftBtn = document.querySelector(".scroll-left");
	const scrollRightBtn = document.querySelector(".scroll-right");

	// Populate character cards
	function createCharacterCards(chars) {
		cardsContainer.innerHTML = chars
			.map(
				(char) => `
			<div class="character-card" data-element="${char.element}">
				<img src="${char.image}" alt="${char.name}" class="character-card-image">
				<div class="character-card-element">
					<img src="./assets/elements/${char.element}.png" alt="${char.element}">
				</div>
				<div class="character-card-info">
					<h3 class="character-card-name">${char.name}</h3>
					<p class="character-card-title">${char.title}</p>
				</div>
			</div>
		`
			)
			.join("");
	}

	// Initialize with all characters
	createCharacterCards(characters);

	// Filter functionality
	filterBtns.forEach((btn) => {
		btn.addEventListener("click", () => {
			filterBtns.forEach((b) => b.classList.remove("active"));
			btn.classList.add("active");

			const element = btn.dataset.element;
			const filteredChars =
				element === "all" ? characters : characters.filter((char) => char.element === element);

			createCharacterCards(filteredChars);
		});
	});

	// Scroll functionality
	scrollLeftBtn.addEventListener("click", () => {
		cardsContainer.scrollBy({ left: -300, behavior: "smooth" });
	});

	scrollRightBtn.addEventListener("click", () => {
		cardsContainer.scrollBy({ left: 300, behavior: "smooth" });
	});
}

// Scroll to Top functionality
document.addEventListener("DOMContentLoaded", function () {
	const scrollTopBtn = document.getElementById("scrollTopBtn");

	// Show/hide button based on scroll position
	window.addEventListener("scroll", function () {
		if (window.pageYOffset > 300) {
			scrollTopBtn.classList.add("visible");
		} else {
			scrollTopBtn.classList.remove("visible");
		}
	});

	// Smooth scroll to top when button is clicked
	scrollTopBtn.addEventListener("click", function () {
		window.scrollTo({
			top: 0,
			behavior: "smooth",
		});
	});
});

document.addEventListener("DOMContentLoaded", function () {
	const hamburger = document.createElement("button");
	hamburger.className = "hamburger";
	hamburger.innerHTML = "<span></span><span></span><span></span>";

	const nav = document.querySelector(".nav-wrapper");
	const navLinks = document.querySelector(".nav-links");
	const searchBar = document.querySelector(".search-bar");

	nav.insertBefore(hamburger, searchBar);

	hamburger.addEventListener("click", function () {
		navLinks.classList.toggle("active");
		hamburger.classList.toggle("active");
	});

	// Close menu when clicking outside
	document.addEventListener("click", function (e) {
		if (!nav.contains(e.target) && navLinks.classList.contains("active")) {
			navLinks.classList.remove("active");
			hamburger.classList.remove("active");
		}
	});

	// Close menu when window is resized
	window.addEventListener("resize", function () {
		if (window.innerWidth > 992) {
			navLinks.classList.remove("active");
			hamburger.classList.remove("active");
		}
	});
});
