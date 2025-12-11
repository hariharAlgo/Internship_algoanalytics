import { useState, useEffect, useRef } from 'react'
import { getAutocompleteSuggestions } from '../services/gemini'
import './AutocompleteSearch.css'

function AutocompleteSearch() {
    const [query, setQuery] = useState('')
    const [suggestions, setSuggestions] = useState([])
    const [loading, setLoading] = useState(false)
    const [showDropdown, setShowDropdown] = useState(false)
    const [searchHistory, setSearchHistory] = useState([])
    const debounceRef = useRef(null)
    const containerRef = useRef(null)

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (containerRef.current && !containerRef.current.contains(e.target)) {
                setShowDropdown(false)
            }
        }
        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [])

    useEffect(() => {
        if (debounceRef.current) {
            clearTimeout(debounceRef.current)
        }

        if (query.trim().length < 2) {
            setSuggestions([])
            return
        }

        debounceRef.current = setTimeout(async () => {
            setLoading(true)
            try {
                const results = await getAutocompleteSuggestions(query)
                setSuggestions(results)
                setShowDropdown(true)
            } catch (err) {
                setSuggestions([])
            }
            setLoading(false)
        }, 500)

        return () => {
            if (debounceRef.current) {
                clearTimeout(debounceRef.current)
            }
        }
    }, [query])

    const handleSelect = (suggestion) => {
        setQuery(suggestion)
        setShowDropdown(false)
        if (!searchHistory.includes(suggestion)) {
            setSearchHistory([suggestion, ...searchHistory.slice(0, 4)])
        }
    }

    const handleSearch = () => {
        if (query.trim()) {
            if (!searchHistory.includes(query)) {
                setSearchHistory([query, ...searchHistory.slice(0, 4)])
            }
            setShowDropdown(false)
        }
    }

    return (
        <div className="autocomplete-container" ref={containerRef}>
            <div className="autocomplete-header">
                <h2>🔍 AI Autocomplete</h2>
                <span className="powered-by">Powered by Gemini</span>
            </div>

            <div className="search-box">
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onFocus={() => suggestions.length > 0 && setShowDropdown(true)}
                    placeholder="Start typing to get AI suggestions..."
                    className="search-input"
                    onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                />
                <button onClick={handleSearch} className="search-btn">
                    {loading ? '...' : '→'}
                </button>

                {showDropdown && suggestions.length > 0 && (
                    <ul className="suggestions-dropdown">
                        {suggestions.map((suggestion, idx) => (
                            <li
                                key={idx}
                                onClick={() => handleSelect(suggestion)}
                                className="suggestion-item"
                            >
                                <span className="suggestion-icon">🔍</span>
                                {suggestion}
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            {searchHistory.length > 0 && (
                <div className="search-history">
                    <p className="history-label">Recent searches:</p>
                    <div className="history-chips">
                        {searchHistory.map((item, idx) => (
                            <button
                                key={idx}
                                onClick={() => setQuery(item)}
                                className="history-chip"
                            >
                                {item}
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    )
}

export default AutocompleteSearch
