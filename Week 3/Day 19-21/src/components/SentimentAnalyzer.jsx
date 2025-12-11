import { useState } from 'react'
import { analyzeSentiment } from '../services/gemini'
import './SentimentAnalyzer.css'

function SentimentAnalyzer() {
    const [text, setText] = useState('')
    const [result, setResult] = useState(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    const handleAnalyze = async () => {
        if (!text.trim()) return

        setLoading(true)
        setError('')
        try {
            const analysis = await analyzeSentiment(text)
            setResult(analysis)
        } catch (err) {
            setError('Failed to analyze sentiment. Please try again.')
        }
        setLoading(false)
    }

    const getSentimentColor = (sentiment) => {
        switch (sentiment) {
            case 'positive': return '#4caf50'
            case 'negative': return '#e53935'
            default: return '#ff9800'
        }
    }

    const getSentimentEmoji = (sentiment) => {
        switch (sentiment) {
            case 'positive': return '😊'
            case 'negative': return '😔'
            default: return '😐'
        }
    }

    return (
        <div className="sentiment-container">
            <div className="sentiment-header">
                <h2>💬 Sentiment Analyzer</h2>
                <span className="powered-by">Powered by Gemini</span>
            </div>

            <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Enter text to analyze its sentiment..."
                className="sentiment-input"
                rows={4}
            />

            <button
                onClick={handleAnalyze}
                className="analyze-btn"
                disabled={loading || !text.trim()}
            >
                {loading ? 'Analyzing...' : 'Analyze Sentiment'}
            </button>

            {error && <p className="error-message">{error}</p>}

            {result && (
                <div
                    className="sentiment-result"
                    style={{ borderColor: getSentimentColor(result.sentiment) }}
                >
                    <div className="result-top">
                        <span className="sentiment-emoji">{getSentimentEmoji(result.sentiment)}</span>
                        <div className="result-info">
                            <span
                                className="sentiment-label"
                                style={{ color: getSentimentColor(result.sentiment) }}
                            >
                                {result.sentiment?.toUpperCase()}
                            </span>
                            <div className="score-bar">
                                <div
                                    className="score-fill"
                                    style={{
                                        width: `${result.score}%`,
                                        backgroundColor: getSentimentColor(result.sentiment)
                                    }}
                                />
                            </div>
                            <span className="score-text">{result.score}% confidence</span>
                        </div>
                    </div>
                    <p className="result-summary">{result.summary}</p>
                </div>
            )}
        </div>
    )
}

export default SentimentAnalyzer
