export const baseUrl = 'https://wechat-chat.onrender.com/api/v1';

//post request
export const postRequest = async (url, body, options = {}) => {
    try {
        // console.log("url > ", url)
        // console.log("body > ", body)
        const token = localStorage.getItem('accessToken') || null

        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token ? `Bearer ${token}` : '',
                ...options.headers
            },
            body: body,
            credentials: 'include' // Include cookies if necessary
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        // console.log(data)
        return data;
    } catch (error) {
        console.error('Request failed:', error.message);
        return { error: error.message };
    }
};

//get request
export const getRequest = async (url, options = {}) => {
    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Authorization': localStorage.getItem('accessToken') ? `Bearer ${localStorage.getItem('accessToken')}` : '', // Set Authorization header if token exists
                ...options.headers
            },
            credentials: 'include' // Include cookies if necessary
        });

        const contentType = response.headers.get('Content-Type');

        if (!response.ok) {
            // Attempt to read response as text (could be HTML) if not JSON
            const errorText = await response.text();
            let message = contentType.includes('text/html')
                ? 'Received HTML error page. Check the URL or server response.'
                : 'An error occurred.';
            return { error: true, message: message };
        }

        // Attempt to read response as JSON
        if (contentType.includes('application/json')) {
            const data = await response.json();
            return data;
        } else {
            // Handle unexpected content type
            const text = await response.text();
            return { error: true, message: `Unexpected response format: ${text} ` };
        }
    } catch (error) {
        console.error(`CLIENT::UTILS::SERVICES::getRequest -> ${error.message}`);
        return { error: error.message };
    }
};

//delete request
export const deletRequest = async (url, options = {}) => {
    const token = localStorage.getItem('accessToken') || null

    try {
        const response = await fetch(url, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`, // Attach token to Authorization header
                'Content-Type': 'application/json', // Add if necessary for additional data
            },
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error while deleting chat:", error);
        return { error: error.message };
    }
};

