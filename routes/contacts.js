const express = require('express');
const router = express.Router();
const { ObjectId } = require('mongodb');
const dbo = require('../db/connect');

// GET all contacts
router.get('/', async (req, res) => {
  try {
    const db = dbo.getDb();
    const contacts = await db.collection('contacts').find().toArray();
    res.json(contacts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET contact by ID
router.get('/:id', async (req, res) => {
  try {
    const db = dbo.getDb();
    const contact = await db.collection('contacts').findOne({ _id: new ObjectId(req.params.id) });
    if (!contact) return res.status(404).json({ message: 'Contact not found' });
    res.json(contact);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST create new contact
router.post('/', async (req, res) => {
  try {
    const db = dbo.getDb();
    const body = req.body;

    const newContact = {
      firstName: body.firstName.trim(),
      lastName: body.lastName.trim(),
      email: body.email.trim(),
      favoriteColor: body.favoriteColor.trim(),
      birthday: body.birthday.trim()
    };

    const result = await db.collection('contacts').insertOne(newContact);
    res.status(201).json({ id: result.insertedId });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// PUT update contact
router.put('/:id', async (req, res) => {
  try {
    const db = dbo.getDb();
    const body = req.body;
    const contactId = req.params.id;

    const updatedContact = {
      firstName: body.firstName,
      lastName: body.lastName,
      email: body.email,
      favoriteColor: body.favoriteColor,
      birthday: body.birthday
    };

    const result = await db.collection('contacts').updateOne(
      { _id: new ObjectId(contactId) },
      { $set: updatedContact }
    );

    if (result.matchedCount === 0) return res.status(404).json({ message: 'Contact not found' });
    res.sendStatus(204); // Success, no content
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// DELETE contact
router.delete('/:id', async (req, res) => {
  try {
    const db = dbo.getDb();
    const result = await db.collection('contacts').deleteOne({ _id: new ObjectId(req.params.id) });

    if (result.deletedCount === 0) return res.status(404).json({ message: 'Contact not found' });
    res.sendStatus(204);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
