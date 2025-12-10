import { useState, useEffect, useRef, useCallback } from 'react'
import './NetflixRow.css'

const generateMovies = (start, count) => {
    const titles = [
        'Stranger Things', 'Money Heist', 'Dark', 'The Witcher', 'Squid Game',
        'Bridgerton', 'Ozark', 'The Crown', 'Narcos', 'Peaky Blinders',
        'Breaking Bad', 'Better Call Saul', 'The Office', 'Friends', 'Seinfeld',
        'Black Mirror', 'Mindhunter', 'You', 'Wednesday', 'The Last of Us'
    ]
    return Array.from({ length: count }, (_, i) => ({
        id: start + i,
        title: titles[(start + i) % titles.length],
        year: 2020 + ((start + i) % 4),
        rating: (7 + Math.random() * 2).toFixed(1)
    }))
}

function NetflixRow() {
    const [movies, setMovies] = useState(() => generateMovies(0, 10))
    const [loading, setLoading] = useState(false)
    const [hasMore, setHasMore] = useState(true)
    const observerRef = useRef()
    const loadMoreRef = useRef()

    const loadMore = useCallback(() => {
        if (loading || !hasMore) return
        setLoading(true)
        setTimeout(() => {
            if (movies.length >= 50) {
                setHasMore(false)
            } else {
                const newMovies = generateMovies(movies.length, 10)
                setMovies(prev => [...prev, ...newMovies])
            }
            setLoading(false)
        }, 800)
    }, [loading, hasMore, movies.length])

    useEffect(() => {
        observerRef.current = new IntersectionObserver(
            entries => {
                if (entries[0].isIntersecting && hasMore && !loading) {
                    loadMore()
                }
            },
            { threshold: 0.1 }
        )

        if (loadMoreRef.current) {
            observerRef.current.observe(loadMoreRef.current)
        }

        return () => {
            if (observerRef.current) {
                observerRef.current.disconnect()
            }
        }
    }, [loadMore, hasMore, loading])

    return (
        <div className="netflix-container">
            <h2>Trending Now</h2>
            <p className="subtitle">Scroll down to load more (Infinite Scroll)</p>
            <div className="movies-grid">
                {movies.map(movie => (
                    <div key={movie.id} className="movie-card">
                        <div className="movie-poster">
                            <span className="movie-icon">🎬</span>
                        </div>
                        <div className="movie-info">
                            <h3 className="movie-title">{movie.title}</h3>
                            <div className="movie-meta">
                                <span>{movie.year}</span>
                                <span className="rating">⭐ {movie.rating}</span>
                            </div>
                        </div>
                        <div className="movie-overlay">
                            <button className="play-btn">▶ Play</button>
                            <button className="add-btn">+ My List</button>
                        </div>
                    </div>
                ))}
            </div>
            <div ref={loadMoreRef} className="load-more-trigger">
                {loading && <div className="loader">Loading more...</div>}
                {!hasMore && <p className="end-message">You've seen all titles!</p>}
            </div>
        </div>
    )
}

export default NetflixRow
