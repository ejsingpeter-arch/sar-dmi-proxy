const express = require('express');
const cors    = require('cors');
const fetch   = require('node-fetch');
const app     = express();

app.use(cors());

const BASE = 'https://dmigw.govcloud.dk/v2/forecastedr/collections';

app.get('/wind', async (req, res) => {
  const url = `${BASE}/harmonie-dini-sf/position?${new URLSearchParams(req.query)}&f=GeoJSON`;
  try { res.json(await (await fetch(url)).json()); }
  catch (e) { res.status(500).json({ error: e.message }); }
});

app.get('/current', async (req, res) => {
  const url = `${BASE}/dkss-nsbs/position?${new URLSearchParams(req.query)}&f=GeoJSON`;
  try { res.json(await (await fetch(url)).json()); }
  catch (e) { res.status(500).json({ error: e.message }); }
});

app.listen(process.env.PORT || 3000);
