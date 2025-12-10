import { useState } from 'react'
import './GmailInbox.css'

const initialEmails = [
    {
        id: 1,
        sender: 'Amazon India',
        subject: 'Your order has been shipped!',
        preview: 'Great news! Your package is on its way and will arrive by...',
        time: '10:30 AM',
        read: false,
        starred: true
    },
    {
        id: 2,
        sender: 'LinkedIn',
        subject: 'New job recommendations for you',
        preview: 'Based on your profile, we found 5 new jobs that match your skills...',
        time: '9:15 AM',
        read: false,
        starred: false
    },
    {
        id: 3,
        sender: 'GitHub',
        subject: 'Security alert for your repository',
        preview: 'We found a potential security vulnerability in one of your dependencies...',
        time: 'Yesterday',
        read: true,
        starred: false
    },
    {
        id: 4,
        sender: 'Swiggy',
        subject: 'Your food is being prepared',
        preview: 'Your order from Dominos Pizza is being prepared and will be delivered...',
        time: 'Yesterday',
        read: true,
        starred: false
    },
    {
        id: 5,
        sender: 'Google',
        subject: 'New sign-in from Windows',
        preview: 'We noticed a new sign-in to your Google Account on a Windows device...',
        time: 'Dec 8',
        read: true,
        starred: true
    },
    {
        id: 6,
        sender: 'Flipkart',
        subject: 'Big Billion Days Sale is here!',
        preview: 'Get ready for massive discounts on electronics, fashion, and more...',
        time: 'Dec 7',
        read: true,
        starred: false
    }
]

function GmailInbox() {
    const [emails, setEmails] = useState(initialEmails)
    const [selectedIds, setSelectedIds] = useState([])

    const allSelected = selectedIds.length === emails.length && emails.length > 0
    const someSelected = selectedIds.length > 0 && selectedIds.length < emails.length

    const handleSelectAll = () => {
        if (allSelected) {
            setSelectedIds([])
        } else {
            setSelectedIds(emails.map(e => e.id))
        }
    }

    const handleSelect = (id) => {
        setSelectedIds(prev =>
            prev.includes(id)
                ? prev.filter(i => i !== id)
                : [...prev, id]
        )
    }

    const handleStar = (id, e) => {
        e.stopPropagation()
        setEmails(prev =>
            prev.map(email =>
                email.id === id ? { ...email, starred: !email.starred } : email
            )
        )
    }

    const handleMarkRead = () => {
        setEmails(prev =>
            prev.map(email =>
                selectedIds.includes(email.id) ? { ...email, read: true } : email
            )
        )
        setSelectedIds([])
    }

    const handleMarkUnread = () => {
        setEmails(prev =>
            prev.map(email =>
                selectedIds.includes(email.id) ? { ...email, read: false } : email
            )
        )
        setSelectedIds([])
    }

    const handleDelete = () => {
        setEmails(prev => prev.filter(email => !selectedIds.includes(email.id)))
        setSelectedIds([])
    }

    const handleArchive = () => {
        setEmails(prev => prev.filter(email => !selectedIds.includes(email.id)))
        setSelectedIds([])
    }

    return (
        <div className="gmail-container">
            <h2>Inbox</h2>
            <div className="gmail-toolbar">
                <div className="toolbar-left">
                    <label className="checkbox-container">
                        <input
                            type="checkbox"
                            checked={allSelected}
                            ref={(el) => el && (el.indeterminate = someSelected)}
                            onChange={handleSelectAll}
                        />
                        <span className="checkmark"></span>
                    </label>
                    {selectedIds.length > 0 && (
                        <span className="selected-count">{selectedIds.length} selected</span>
                    )}
                </div>
                {selectedIds.length > 0 && (
                    <div className="bulk-actions">
                        <button onClick={handleArchive} className="action-btn" title="Archive">
                            📥
                        </button>
                        <button onClick={handleDelete} className="action-btn" title="Delete">
                            🗑️
                        </button>
                        <button onClick={handleMarkRead} className="action-btn" title="Mark as read">
                            ✉️
                        </button>
                        <button onClick={handleMarkUnread} className="action-btn" title="Mark as unread">
                            📧
                        </button>
                    </div>
                )}
            </div>
            <ul className="email-list">
                {emails.map(email => (
                    <li
                        key={email.id}
                        className={`email-item ${!email.read ? 'unread' : ''} ${selectedIds.includes(email.id) ? 'selected' : ''}`}
                    >
                        <label className="checkbox-container">
                            <input
                                type="checkbox"
                                checked={selectedIds.includes(email.id)}
                                onChange={() => handleSelect(email.id)}
                            />
                            <span className="checkmark"></span>
                        </label>
                        <button
                            className={`star-btn ${email.starred ? 'starred' : ''}`}
                            onClick={(e) => handleStar(email.id, e)}
                        >
                            {email.starred ? '★' : '☆'}
                        </button>
                        <div className="email-content">
                            <span className="email-sender">{email.sender}</span>
                            <span className="email-subject">{email.subject}</span>
                            <span className="email-preview"> - {email.preview}</span>
                        </div>
                        <span className="email-time">{email.time}</span>
                    </li>
                ))}
            </ul>
            {emails.length === 0 && (
                <div className="empty-state">No emails in inbox</div>
            )}
        </div>
    )
}

export default GmailInbox
