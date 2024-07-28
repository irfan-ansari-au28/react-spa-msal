const express = require('express');
const cors = require('cors');

const app = express();
const port = 5000;

app.use(cors());

const users = {
  "sample1@email.com": { "emailId": "ankitpandey.srmgpc@gmail.com", "displayName": "Ankit Pandey", "role": "allow" },
  "irfan.ansari@kaaratech.com": { "emailId": "irfan.ansari@kaaratech.com", "displayName": "Irfan Anari", "role": "admin" },
  "sample3@email.com": { "emailId": "janedoe@example.com", "displayName": "Jane Doe", "role": "allow" },
  "sample4@email.com": { "emailId": "marksmith@example.com", "displayName": "Mark Smith", "role": "allow" },
  "sample5@email.com": { "emailId": "emilyjones@example.com", "displayName": "Emily Jones", "role": "allow" }
};

app.get('/api/v1/entity/getUser', (req, res) => {
  const emailId = req.query.emailId;
  if (users[emailId]) {
    res.json(users[emailId]);
  } else {
    res.status(404).json({ error: 'User not found' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
