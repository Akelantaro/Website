const express = require('express');
const router = express.Router();
const axios = require('axios');

router.post('/tracer', (req, res1) => {
    console.log(req.body.spans);
    //console.log(Object.entries(req.body)[0]);
    axios.post('http://localhost:4000/spans/recordspan',
        req.body.spans
    ).then(res => {
        console.log(res);
        res1.sendStatus(200);
  })
  .catch(err => {
    console.log('Error: ', err.message);
    res1.sendStatus(500);
  });
})

module.exports = router;