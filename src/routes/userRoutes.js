const express = require('express');
const passport = require('passport');
const prisma = require('../config/prisma');

const router = express.Router();

router.get('/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
    const { id } = req.params;
    prisma.user.findUnique({ where: { id: parseInt(id) } })
        .then(user => {
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            res.status(200).json({ user });
        }
        ).catch(error => {
            console.error('Error fetching user:', error);
            res.status(500).json({ message: 'Internal server error' });
        })
        .finally(async () => {
            await prisma.$disconnect();
        });
});

module.exports = router;