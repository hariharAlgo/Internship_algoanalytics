import React, { useState } from 'react';
import useFetch from '../hooks/useFetch';

const Home = () => {
    const [page, setPage] = useState(1);
    const { data, loading, error } = useFetch('https://jsonplaceholder.typicode.com/posts', page);

    return (
        <div className="container">
            <h1>Posts (Page {page})</h1>

            {loading && <p className="loading">Loading data...</p>}

            {error && <p className="error">Error: {error}</p>}

            {data && (
                <ul className="post-list">
                    {data.map(post => (
                        <li key={post.id} className="post-item">
                            <h3>{post.id}. {post.title}</h3>
                            <p>{post.body}</p>
                        </li>
                    ))}
                </ul>
            )}

            <div className="pagination">
                <button
                    onClick={() => setPage(prev => Math.max(prev - 1, 1))}
                    disabled={page === 1 || loading}
                >
                    Previous
                </button>
                <span className="page-number">Page {page}</span>
                <button
                    onClick={() => setPage(prev => prev + 1)}
                    disabled={loading || (data && data.length === 0)}
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default Home;
