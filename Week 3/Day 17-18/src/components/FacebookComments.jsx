import { useState } from 'react'
import './FacebookComments.css'

const initialComments = [
    {
        id: 1,
        author: 'Rahul Sharma',
        avatar: 'RS',
        text: 'This is amazing! Great work on this project.',
        likes: 12,
        liked: false,
        time: '2h',
        replies: [
            {
                id: 101,
                author: 'Priya Patel',
                avatar: 'PP',
                text: 'I totally agree with you!',
                likes: 3,
                liked: false,
                time: '1h',
                replies: []
            },
            {
                id: 102,
                author: 'Amit Kumar',
                avatar: 'AK',
                text: 'Same here, really impressive work.',
                likes: 1,
                liked: false,
                time: '45m',
                replies: []
            }
        ]
    },
    {
        id: 2,
        author: 'Neha Gupta',
        avatar: 'NG',
        text: 'Can you share the source code? Would love to learn from it.',
        likes: 5,
        liked: false,
        time: '3h',
        replies: [
            {
                id: 201,
                author: 'Vikram Singh',
                avatar: 'VS',
                text: 'Yes please! That would be really helpful.',
                likes: 2,
                liked: false,
                time: '2h',
                replies: []
            }
        ]
    },
    {
        id: 3,
        author: 'Deepak Verma',
        avatar: 'DV',
        text: 'Looking forward to more content like this. Keep it up!',
        likes: 8,
        liked: false,
        time: '5h',
        replies: []
    }
]

function Comment({ comment, onLike, onReply, depth = 0 }) {
    const [showReplyInput, setShowReplyInput] = useState(false)
    const [replyText, setReplyText] = useState('')

    const handleReplySubmit = () => {
        if (replyText.trim()) {
            onReply(comment.id, replyText)
            setReplyText('')
            setShowReplyInput(false)
        }
    }

    return (
        <div className={`comment ${depth > 0 ? 'nested' : ''}`}>
            <div className="comment-avatar">{comment.avatar}</div>
            <div className="comment-content">
                <div className="comment-bubble">
                    <span className="comment-author">{comment.author}</span>
                    <p className="comment-text">{comment.text}</p>
                </div>
                <div className="comment-actions">
                    <button
                        className={`action-btn ${comment.liked ? 'liked' : ''}`}
                        onClick={() => onLike(comment.id)}
                    >
                        Like
                    </button>
                    <button
                        className="action-btn"
                        onClick={() => setShowReplyInput(!showReplyInput)}
                    >
                        Reply
                    </button>
                    <span className="comment-time">{comment.time}</span>
                    {comment.likes > 0 && (
                        <span className="comment-likes">👍 {comment.likes}</span>
                    )}
                </div>
                {showReplyInput && (
                    <div className="reply-input-container">
                        <input
                            type="text"
                            value={replyText}
                            onChange={(e) => setReplyText(e.target.value)}
                            placeholder="Write a reply..."
                            className="reply-input"
                            onKeyDown={(e) => e.key === 'Enter' && handleReplySubmit()}
                        />
                        <button onClick={handleReplySubmit} className="reply-submit">
                            Post
                        </button>
                    </div>
                )}
                {comment.replies && comment.replies.length > 0 && (
                    <div className="replies">
                        {comment.replies.map(reply => (
                            <Comment
                                key={reply.id}
                                comment={reply}
                                onLike={onLike}
                                onReply={onReply}
                                depth={depth + 1}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}

function FacebookComments() {
    const [comments, setComments] = useState(initialComments)
    const [newComment, setNewComment] = useState('')

    const handleLike = (commentId) => {
        const updateLikes = (items) => {
            return items.map(item => {
                if (item.id === commentId) {
                    return {
                        ...item,
                        liked: !item.liked,
                        likes: item.liked ? item.likes - 1 : item.likes + 1
                    }
                }
                if (item.replies) {
                    return { ...item, replies: updateLikes(item.replies) }
                }
                return item
            })
        }
        setComments(updateLikes(comments))
    }

    const handleReply = (parentId, text) => {
        const addReply = (items) => {
            return items.map(item => {
                if (item.id === parentId) {
                    const newReply = {
                        id: Date.now(),
                        author: 'You',
                        avatar: 'YU',
                        text: text,
                        likes: 0,
                        liked: false,
                        time: 'Just now',
                        replies: []
                    }
                    return { ...item, replies: [...(item.replies || []), newReply] }
                }
                if (item.replies) {
                    return { ...item, replies: addReply(item.replies) }
                }
                return item
            })
        }
        setComments(addReply(comments))
    }

    const handleAddComment = () => {
        if (newComment.trim()) {
            const comment = {
                id: Date.now(),
                author: 'You',
                avatar: 'YU',
                text: newComment,
                likes: 0,
                liked: false,
                time: 'Just now',
                replies: []
            }
            setComments([comment, ...comments])
            setNewComment('')
        }
    }

    return (
        <div className="fb-comments-container">
            <h2>Comments</h2>
            <div className="comment-input-container">
                <div className="comment-avatar">YU</div>
                <input
                    type="text"
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Write a comment..."
                    className="comment-input"
                    onKeyDown={(e) => e.key === 'Enter' && handleAddComment()}
                />
                <button onClick={handleAddComment} className="post-btn">Post</button>
            </div>
            <div className="comments-list">
                {comments.map(comment => (
                    <Comment
                        key={comment.id}
                        comment={comment}
                        onLike={handleLike}
                        onReply={handleReply}
                    />
                ))}
            </div>
        </div>
    )
}

export default FacebookComments
