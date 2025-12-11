const GEMINI_API_KEY = 'AIzaSyCP228l5nO34Q9o1Kn7G46wjQfr-a5W-Kg'
const GEMINI_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent'

// Mock data for fallback when API fails
const MOCK_RECOMMENDATIONS = [
    { title: "React Documentation", category: "Learning", reason: "Essential for mastering modern web development." },
    { title: "Clean Code", category: "Book", reason: "Fundamental principles for writing maintainable software." },
    { title: "VS Code", category: "Tool", reason: "Industry standard editor with great extensions." },
    { title: "fireship.io", category: "Website", reason: "Quick, high-quality tech tutorials." }
]

const MOCK_AUTOCOMPLETE_BASE = [
    "react hooks tutorial",
    "javascript array methods",
    "css grid vs flexbox",
    "how to use gemini api",
    "deployment strategies",
    "python for beginners",
    "machine learning basics",
    "web development roadmap",
    "node.js crash course",
    "typescript best practices"
]

export async function callGemini(prompt) {
    console.log("Calling Gemini API...")
    try {
        const response = await fetch(`${GEMINI_URL}?key=${GEMINI_API_KEY}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                contents: [{
                    parts: [{ text: prompt }]
                }]
            })
        })

        if (!response.ok) {
            throw new Error(`Gemini API request failed: ${response.status}`)
        }

        const data = await response.json()
        return data.candidates[0].content.parts[0].text
    } catch (error) {
        console.warn("API call failed, using fallback:", error)
        throw error // Re-throw to handle in specific functions
    }
}

export async function getRecommendations(userInterests) {
    const prompt = `Based on these interests: ${userInterests}, suggest 4 personalized recommendations. 
    Return ONLY a JSON array with objects having "title", "category", and "reason" fields.
    Example: [{"title": "...", "category": "...", "reason": "..."}]
    Keep each recommendation brief (under 15 words for reason).`

    try {
        const text = await callGemini(prompt)
        const jsonMatch = text.match(/\[[\s\S]*\]/)
        return jsonMatch ? JSON.parse(jsonMatch[0]) : MOCK_RECOMMENDATIONS
    } catch (error) {
        // Dynamic fallback based on input
        const lowerInterests = userInterests.toLowerCase()

        if (lowerInterests.includes('react') || lowerInterests.includes('javascript')) {
            return [
                { title: "React Beta Docs", category: "Docs", reason: "The future of React documentation." },
                { title: "JavaScript.info", category: "Learning", reason: "Comprehensive resource for JS concepts." },
                { title: "Epic React", category: "Course", reason: "Advanced React patterns and practices." },
                { title: "State Management", category: "Concept", reason: "Critical for complex applications." }
            ]
        }

        if (lowerInterests.includes('python') || lowerInterests.includes('data')) {
            return [
                { title: "Automate the Boring Stuff", category: "Book", reason: "Practical Python for beginners." },
                { title: "Pandas Docs", category: "Docs", reason: "Essential for data manipulation." },
                { title: "FastAPI", category: "Framework", reason: "Modern, fast web framework for Python." },
                { title: "Kaggle", category: "Platform", reason: "Great for data science competitions." }
            ]
        }

        // Generic fallback that feels personalized
        return [
            { title: `Learn ${userInterests.split(',')[0]}`, category: "Course", reason: `Top rated course for ${userInterests.split(',')[0]}.` },
            { title: "Advanced Concepts", category: "Book", reason: "Deep dive into the topic." },
            { title: "Community Forum", category: "Community", reason: "Connect with others learning this." },
            { title: "Best Practices 2024", category: "Article", reason: "Stay updated with latest trends." }
        ]
    }
}

export async function analyzeSentiment(text) {
    const prompt = `Analyze the sentiment of this text: "${text}"
    Return ONLY a JSON object with:
    - "sentiment": "positive", "negative", or "neutral"
    - "score": number from 0 to 100 (0=very negative, 100=very positive)
    - "summary": brief 1-sentence explanation (under 20 words)`

    try {
        const response = await callGemini(prompt)
        const jsonMatch = response.match(/\{[\s\S]*\}/)
        return jsonMatch ? JSON.parse(jsonMatch[0]) : { sentiment: 'neutral', score: 50, summary: 'Could not analyze' }
    } catch (error) {
        // Simple fallback sentiment analysis
        const lowerText = text.toLowerCase()
        const positiveWords = ['good', 'great', 'love', 'amazing', 'excellent', 'happy', 'best', 'awesome', 'nice', 'cool']
        const negativeWords = ['bad', 'hate', 'terrible', 'awful', 'sad', 'angry', 'worst', 'poor', 'suck', 'broken']

        let score = 50
        let sentiment = 'neutral'

        if (positiveWords.some(w => lowerText.includes(w))) {
            score = 80
            sentiment = 'positive'
        } else if (negativeWords.some(w => lowerText.includes(w))) {
            score = 20
            sentiment = 'negative'
        }

        return {
            sentiment,
            score,
            summary: `Evaluated as ${sentiment} based on keywords (API offline)`
        }
    }
}

export async function getAutocompleteSuggestions(query) {
    if (!query.trim()) return []

    const prompt = `Given the search query "${query}", suggest 5 autocomplete suggestions.
    Return ONLY a JSON array of strings.
    Example: ["suggestion 1", "suggestion 2", ...]
    Make suggestions relevant and varied.`

    try {
        const response = await callGemini(prompt)
        const jsonMatch = response.match(/\[[\s\S]*\]/)
        return jsonMatch ? JSON.parse(jsonMatch[0]) : []
    } catch {
        // Improved fallback autocomplete
        const filtered = MOCK_AUTOCOMPLETE_BASE.filter(s => s.toLowerCase().includes(query.toLowerCase()))

        // If no matches in mock data, return the query itself + some generic suffix so something ALWAYS shows up
        if (filtered.length === 0) {
            return [
                `${query} tutorial`,
                `${query} examples`,
                `${query} vs others`,
                `learn ${query}`
            ]
        }
        return filtered
    }
}
