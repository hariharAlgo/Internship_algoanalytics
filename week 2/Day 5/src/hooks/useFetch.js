import { useState, useEffect } from 'react';

const useFetch = (url, page) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            setError(null);
            try {
                // Appending page parameter to the URL
                // Assuming the API supports ?_page= or ?page=
                // For JSONPlaceholder, it's ?_page=
                const queryParam = url.includes('?') ? '&' : '?';
                const finalUrl = `${url}${queryParam}_page=${page}&_limit=5`;

                const response = await fetch(finalUrl);

                if (!response.ok) {
                    throw new Error(`Error: ${response.status} ${response.statusText}`);
                }

                const result = await response.json();
                setData(result);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [url, page]);

    return { data, loading, error };
};

export default useFetch;
