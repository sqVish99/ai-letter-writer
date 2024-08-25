import axios from 'axios';
import { decrypt } from '../utils/utils';

const openaiService = {
  async generateLetter(prompt) {
    try {
      const response = await axios.post(
        'https://api.openai.com/v1/chat/completions',
        {
          model: 'gpt-4o-mini',
          messages: [
            {
              role: 'user',
              content: prompt,
            },
          ],
          max_tokens: 500,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${decrypt("U2FsdGVkX18tSr155UjsPGHqIvgPpBaMPq0tXtLcbDUPF/DvA7X3ydo8AkuFwF6ANfUtjHuFeJdcYV17AD/bdrJ7kuuG328Py7uswvg0CFhkVD4HW1LVyPgRJOqLUskbto/M21nxFtETF6HqIy6uEIWQGUXR/PM5GVl2FX60PBCOONb1n3XgbvskUCbe7nH45XuWlQlrRbRUIXqlS4v85A==")}`,
          },
        }
      );
      return response.data.choices[0].message.content.trim();
    } catch (error) {
      console.error('Error generating letter:', error);
      return 'Sorry, there was an error generating the letter.';
    }
  },
};

export default openaiService;
