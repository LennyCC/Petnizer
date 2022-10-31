const express = require ('express');
const router = express.Router();


router.get('/mascota', (req, res) => {
  res.render('mascota', {
    title: 'Tu Mascota'
  });
});

router.get('/newmascota', (req, res) => {
  res.render('newmascota', {
    title: 'Nueva Mascota'
  });
});











module.exports = router;