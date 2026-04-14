const movies = [
    {
        id: 1,
        title: "Interstellar",
        year: 2014,
        rating: 8.7,
        genre: "sci-fi",
        poster: "https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=600&q=80",
        type: "4K"
    },
    {
        id: 2,
        title: "Inception",
        year: 2010,
        rating: 8.8,
        genre: "sci-fi",
        poster: "https://images.unsplash.com/photo-1543844541-2563a6272fb2?auto=format&fit=crop&w=600&q=80",
        type: "HD"
    },
    {
        id: 3,
        title: "The Dark Knight",
        year: 2008,
        rating: 9.0,
        genre: "action",
        poster: "https://images.unsplash.com/photo-1478720568477-152d9b164e26?auto=format&fit=crop&w=600&q=80",
        type: "BlueRay"
    },
    {
        id: 4,
        title: "Pulp Fiction",
        year: 1994,
        rating: 8.9,
        genre: "drama",
        poster: "https://images.unsplash.com/photo-1594909122845-11baa439b7bf?auto=format&fit=crop&w=600&q=80",
        type: "HD"
    },
    {
        id: 5,
        title: "The Matrix",
        year: 1999,
        rating: 8.7,
        genre: "sci-fi",
        poster: "https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?auto=format&fit=crop&w=600&q=80",
        type: "4K"
    },
    {
        id: 6,
        title: "Gladiator",
        year: 2000,
        rating: 8.5,
        genre: "action",
        poster: "https://images.unsplash.com/photo-1512149177596-f817c7ef5d4c?auto=format&fit=crop&w=600&q=80",
        type: "HD"
    },
    {
        id: 7,
        title: "The Godfather",
        year: 1972,
        rating: 9.2,
        genre: "drama",
        poster: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&w=600&q=80",
        type: "Classic"
    },
    {
        id: 8,
        title: "Avatar",
        year: 2009,
        rating: 7.9,
        genre: "sci-fi",
        poster: "https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?auto=format&fit=crop&w=600&q=80",
        type: "3D"
    }
];

const movieGrid = document.getElementById('movieGrid');
const searchInput = document.getElementById('movieSearch');
const tabBtns = document.querySelectorAll('.tab-btn');

function displayMovies(moviesToDisplay) {
    movieGrid.innerHTML = '';
    
    if (moviesToDisplay.length === 0) {
        movieGrid.innerHTML = '<p class="no-results">لا توجد نتائج مطابقة لبحثك.</p>';
        return;
    }

    moviesToDisplay.forEach((movie, index) => {
        const card = document.createElement('div');
        card.className = 'movie-card';
        card.style.animationDelay = `${index * 0.1}s`;
        
        card.innerHTML = `
            <span class="badge">${movie.type}</span>
            <img src="${movie.poster}" alt="${movie.title}" class="movie-poster">
            <div class="movie-info">
                <h3>${movie.title}</h3>
                <div class="movie-meta">
                    <span>${movie.year}</span>
                    <div class="rating">
                        <i class="fas fa-star"></i>
                        <span>${movie.rating}</span>
                    </div>
                </div>
            </div>
        `;
        
        movieGrid.appendChild(card);
    });
}

// Initial display
displayMovies(movies);

// Search functionality
searchInput.addEventListener('input', (e) => {
    const term = e.target.value.toLowerCase();
    const filtered = movies.filter(movie => 
        movie.title.toLowerCase().includes(term)
    );
    displayMovies(filtered);
});

// Filter tabs
tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active class from all
        tabBtns.forEach(b => b.classList.remove('active'));
        // Add active to current
        btn.classList.add('active');
        
        const filter = btn.getAttribute('data-filter');
        if (filter === 'all') {
            displayMovies(movies);
        } else {
            const filtered = movies.filter(m => m.genre === filter);
            displayMovies(filtered);
        }
    });
});

// Animation on scroll observer
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.1 });

// Add smooth hover interactions
document.addEventListener('mousemove', (e) => {
    const blobs = document.querySelectorAll('.blob');
    const x = e.clientX / window.innerWidth;
    const y = e.clientY / window.innerHeight;
    
    blobs.forEach((blob, idx) => {
        const speed = (idx + 1) * 20;
        blob.style.transform = `translate(${x * speed}px, ${y * speed}px)`;
    });
});
