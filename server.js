const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.post('/fetch-url', async (req, res) => {
    const { url } = req.body;

    if (!url) {
        return res.status(400).json({ success: false, message: 'No URL provided.' });
    }

    try {
        // Fetch the source code from the given URL
        const response = await axios.get(url);
        const sourceCode = response.data;

        // Return the source code to the client
        res.json({ success: true, sourceCode });
    } catch (error) {
        console.error('Error fetching URL:', error);
        res.status(500).json({ success: false, message: 'Failed to fetch the URL.' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
