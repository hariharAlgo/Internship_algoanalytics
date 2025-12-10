import './YouTubeLayout.css'

const videos = [
    { id: 1, title: 'Learn React in 30 Minutes', channel: 'Web Dev Simplified', views: '1.2M', time: '2 weeks ago', duration: '30:15' },
    { id: 2, title: 'JavaScript Tips and Tricks', channel: 'Fireship', views: '890K', time: '5 days ago', duration: '12:34' },
    { id: 3, title: 'CSS Grid Complete Guide', channel: 'Kevin Powell', views: '450K', time: '1 month ago', duration: '45:22' },
    { id: 4, title: 'Node.js Crash Course', channel: 'Traversy Media', views: '2.1M', time: '3 months ago', duration: '1:20:45' },
    { id: 5, title: 'TypeScript for Beginners', channel: 'The Net Ninja', views: '670K', time: '2 weeks ago', duration: '28:10' },
    { id: 6, title: 'Redux Toolkit Tutorial', channel: 'Codevolution', views: '320K', time: '1 week ago', duration: '55:30' },
    { id: 7, title: 'Next.js 14 New Features', channel: 'Vercel', views: '180K', time: '3 days ago', duration: '18:44' },
    { id: 8, title: 'Build a Full Stack App', channel: 'JavaScript Mastery', views: '1.5M', time: '2 months ago', duration: '2:45:00' },
]

const categories = ['All', 'JavaScript', 'React', 'Web Development', 'CSS', 'Node.js', 'TypeScript', 'Tutorials']

function YouTubeLayout() {
    return (
        <div className="youtube-container">
            <div className="category-chips">
                {categories.map((cat, idx) => (
                    <button key={cat} className={`chip ${idx === 0 ? 'active' : ''}`}>
                        {cat}
                    </button>
                ))}
            </div>
            <div className="videos-grid">
                {videos.map(video => (
                    <div key={video.id} className="video-card">
                        <div className="video-thumbnail">
                            <span className="thumbnail-icon">▶</span>
                            <span className="video-duration">{video.duration}</span>
                        </div>
                        <div className="video-details">
                            <div className="channel-avatar">
                                {video.channel.charAt(0)}
                            </div>
                            <div className="video-info">
                                <h3 className="video-title">{video.title}</h3>
                                <p className="channel-name">{video.channel}</p>
                                <p className="video-stats">
                                    {video.views} views • {video.time}
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default YouTubeLayout
