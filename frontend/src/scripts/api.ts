export function apiGetShortLink(url: string, apiString: string): Promise<string> {
    const params = new URLSearchParams({ url });
    const urlWithParams = `${apiString}?${params.toString()}`;
    return fetch(urlWithParams,
        {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`API: HTTP error: ${response.status}`);
            }
            return response.json()
                .catch(() => {
                    throw new Error(`API: JSON parsing error`);
                })
        })
        .then(data => {
            if (data && data.result === 'success' && typeof data.shortLink === 'string') {
                return data.shortLink;
            } else {
                const message = data?.message || 'API: Unknown API error';
                throw new Error(message);
            }
        })
        .catch (error => {
            console.error('API: short link error:', error);
            throw error
        });
}


