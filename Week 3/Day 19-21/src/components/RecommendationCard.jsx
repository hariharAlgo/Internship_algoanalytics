import { useState } from 'react'
import { getRecommendations } from '../services/gemini'
import './RecommendationCard.css'

function RecommendationCard() {
    const [interests, setInterests] = useState('')
    const [recommendations, setRecommendations] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    const handleGetRecommendations = async () => {
        if (!interests.trim()) return

        setLoading(true)
        setError('')
        try {
            const results = await getRecommendations(interests)
            setRecommendations(results)
        } catch (err) {
            setError('Failed to get recommendations. Please try again.')
        }
        setLoading(false)
    }

    return (
        <div className="recommendation-container">
            <div className="rec-header">
                <h2>🎯 AI Recommendations</h2>
                <span className="powered-by">Powered by Gemini</span>
            </div>

            <div className="rec-input-section">
                <input
                    type="text"
                    value={interests}
                    onChange={(e) => setInterests(e.target.value)}
                    placeholder="Enter your interests (e.g., coding, music, fitness)"
                    className="rec-input"
                    onKeyDown={(e) => e.key === 'Enter' && handleGetRecommendations()}
                />
                <button
                    onClick={handleGetRecommendations}
                    className="rec-btn"
                    disabled={loading || !interests.trim()}
                >
                    {loading ? 'Loading...' : 'Get Recommendations'}
                </button>
            </div>

            {error && <p className="error-message">{error}</p>}

            {recommendations.length > 0 && (
                <div className="recommendations-grid">
                    {recommendations.map((rec, idx) => (
                        <div key={idx} className="rec-card">
                            <span className="rec-category">{rec.category}</span>
                            <h3 className="rec-title">{rec.title}</h3>
                            <p className="rec-reason">{rec.reason}</p>
                        </div>
                    ))}
                </div>
            )}

            {recommendations.length === 0 && !loading && (
                <div className="rec-placeholder">
                    <p>Enter your interests above to get personalized AI recommendations</p>
                </div>
            )}
        </div>
    )
}

export default RecommendationCard
