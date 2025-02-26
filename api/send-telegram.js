// This file would be deployed to your serverless function host (Vercel, Netlify, etc.)
const express = require('express');
const axios = require('axios');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Your Telegram Bot Token (keep this secret!)
const TELEGRAM_BOT_TOKEN = '7740455140:AAGqpwpFSvGvHcg0etTTdVeBIU6l1mwrZC4';
// Hardcoded channel ID
const TELEGRAM_CHANNEL_ID = '-1002413000076';

app.post('/api/send-telegram', async (req, res) => {
    try {
        const { name, email, message } = req.body;
        
        if (!name || !email || !message) {
            return res.status(400).json({ success: false, message: 'Missing required fields' });
        }
        
        // Format message for Telegram
        const formattedMessage = `
💌 New Love Letter for Seleira 💌

From: ${name}
Email: ${email}

Message:
${message}
        `;
        
        // Send to Telegram with hardcoded channel ID
        const response = await axios.post(
            `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`,
            {
                chat_id: TELEGRAM_CHANNEL_ID,
                text: formattedMessage,
                parse_mode: 'HTML'
            }
        );
        
        if (response.data.ok) {
            return res.status(200).json({ success: true, message: 'Message sent to Telegram' });
        } else {
            throw new Error('Failed to send message to Telegram');
        }
    } catch (error) {
        console.error('Error sending to Telegram:', error);
        return res.status(500).json({ success: false, message: 'Error sending message' });
    }
});

// For local development
if (process.env.NODE_ENV !== 'production') {
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
}

// For serverless deployment
module.exports = app;

// For Netlify Functions
exports.handler = async function(event, context) {
  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  try {
    const { name, email, message } = JSON.parse(event.body);
    
    if (!name || !email || !message) {
      return {
        statusCode: 400,
        body: JSON.stringify({ success: false, message: 'Missing required fields' })
      };
    }
    
    // Format message for Telegram
    const formattedMessage = `
💌 New Love Letter for Seleira 💌

From: ${name}
Email: ${email}

Message:
${message}
    `;
    
    // Send to Telegram with hardcoded channel ID
    const response = await axios.post(
      `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`,
      {
        chat_id: TELEGRAM_CHANNEL_ID,
        text: formattedMessage,
        parse_mode: 'HTML'
      }
    );
    
    if (response.data.ok) {
      return {
        statusCode: 200,
        body: JSON.stringify({ success: true, message: 'Message sent to Telegram' })
      };
    } else {
      throw new Error('Failed to send message to Telegram');
    }
  } catch (error) {
    console.error('Error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ success: false, message: 'Error sending message' })
    };
  }
}; 