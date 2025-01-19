import axios from 'axios';

export async function sendMsgToHuggingFace(message) {
    try {
        const response = await axios.post('http://127.0.0.1:5000/generate', { prompt: message });
        console.log(response.data.response);
        return response.data.response;
    } catch (error) {
        console.error('Error sending message to Hugging Face:', error);
        throw error;
    }
}
