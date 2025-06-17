import Config from "../../utils/config";
import axios from 'axios';

const userMessage = async (payload) => {
    try {
        const response = await axios.post(
            `${Config.baseURLAI}chat-ai`,
            payload?.doc,
            {
                headers: {
                    Authorization: `Bearer ${payload.access_token}`,
                },
            }
        );
        return response.data;
    } catch (error) {
        console.error('Error creating:', error.response?.data || error.message);
        throw error;
    }
};

const AiChatServices = {
    userMessage,
};

export default AiChatServices;