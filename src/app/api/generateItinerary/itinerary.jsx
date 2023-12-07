// path/to/generateItinerary.js
import OpenAI from 'openai';
const apiKey = 'sk-JKlm1FviULZkCzYcoFoCT3BlbkFJCWceKd6GslqGd29jTtFJY';
const apiUrl = 'https://api.openai.com/v1/engines/davinci-codex/completions';

const generateItinerary = async (destination, duration, budget) => {
  try {
    const prompt = `Create a custom itinerary for ${destination} with a duration of ${duration} and a budget of ${budget}.`;
    
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        prompt,
        max_tokens: 200,
      }),
    });

    const data = await response.json();

    return data.choices[0]?.text || '';
  } catch (error) {
    console.error('Error generating itinerary:', error);
    throw error;
  }
};

export default generateItinerary;












// // utils/api.js
// //apikey = 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
// const apiKey = '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';
// const apiUrl = 'https://api.openai.com/v1/engines/davinci-codex/completions';

// export const generateItinerary = async (input) => {
//   try {
//     const response = await fetch(apiUrl, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//         'Authorization': `Bearer ${apiKey}`,
//       },
//       body: JSON.stringify({
//         prompt: `Create a custom itinerary for ${input}`,
//         max_tokens: 200,
//       }),
//     });

//     const data = await response.json();

//     return data.choices[0]?.text || '';
//   } catch (error) {
//     console.error('Error generating itinerary:', error);
//     throw error;
//   }
// };
