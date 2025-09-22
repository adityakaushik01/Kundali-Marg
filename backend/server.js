import express from 'express';
import cors from 'cors';
import fetch from 'node-fetch'; 

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// Replace with your credentials
const clientId = import.meta.env.VITE_CLIENT_ID;
const clientSecret = import.meta.env.VITE_CLIENT_SECRET;

// Token proxy endpoint
app.post('/api/token', async (req, res) => {
  try {
    const response = await fetch('https://api.prokerala.com/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Basic ' + Buffer.from(`${clientId}:${clientSecret}`).toString('base64'),
      },
      body: 'grant_type=client_credentials',
    });

    const data = await response.json();
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Token fetch failed' });
  }
});

app.post('/api/kundli', async (req, res) => {
  const { datetime, latitude, longitude, accessToken } = req.body;

  if (!accessToken || !datetime || !latitude || !longitude) {
    return res.status(400).json({ error: 'Missing required parameters' });
  }

  const encodedDatetime = encodeURIComponent(datetime);

  try {
    const response = await fetch(`https://api.prokerala.com/v2/astrology/kundli/advanced?ayanamsa=1&coordinates=${latitude},${longitude}&datetime=${encodedDatetime}&la=en&year_length=1`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();
    console.log("Kundali data", data);
    res.json(data);
  } catch (error) {
    console.error('Error fetching kundli:', error);
    res.status(500).json({ error: 'Failed to fetch kundli data' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
