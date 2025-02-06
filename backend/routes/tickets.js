const express = require('express');
const router = express.Router();
const { getDB } = require('../config/mongo');

const tickets = getDB('support').collection('tickets');

router.get('/', async (req, res) => {
  try {
    const search = req.query.search || '';
    const sort = req.query.sort ? JSON.parse(req.query.sort) : {};
    const page = parseInt(req.query.p) || 0;
    const query = search ? { $text: { $search: search } } : {};

    const items = await tickets.find(query).sort(sort).skip(page * 50).limit(50).toArray();
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: 'Unexpected Error Occurred!' });
  }
});

router.post('/', async (req, res) => {
  try {
    const ticketData = req.body;
    if (!ticketData) return res.status(400).json({ error: 'No ticket data provided' });

    const lastTicket = await tickets.find().sort({ ticket: -1 }).limit(1).toArray();
    ticketData.ticket = lastTicket.length ? lastTicket[0].ticket + 1 : 1;

    const result = await tickets.insertOne(ticketData);
    res.status(201).json(await tickets.findOne({ _id: result.insertedId }));
  } catch (err) {
    res.status(500).json({ error: `Unexpected Error Occurred: ${err.message}` });
  }
});

router.put('/:ticket_id', async (req, res) => {
  try {
    const ticketId = parseInt(req.params.ticket_id);
    const ticketData = req.body;
    if (!ticketData) return res.status(400).json({ error: 'No ticket data provided' });

    const currentTicket = await tickets.findOne({ ticket: ticketId });
    if (!currentTicket) return res.status(404).json({ error: 'Ticket not found!' });

    ticketData._id = currentTicket._id;
    const result = await tickets.replaceOne({ ticket: ticketId }, ticketData);
    if (result.modifiedCount === 0) return res.status(405).json({ error: 'Ticket not updated!' });

    res.json({ message: 'Ticket updated successfully!' });
  } catch (err) {
    res.status(500).json({ error: `Unexpected Error Occurred: ${err.message}` });
  }
});

router.delete('/:ticket_id', async (req, res) => {
  try {
    const ticketId = parseInt(req.params.ticket_id);
    const result = await tickets.deleteOne({ ticket: ticketId });
    if (result.deletedCount === 0) return res.status(404).json({ error: 'Ticket not found!' });

    res.json({ message: 'Ticket deleted successfully!' });
  } catch (err) {
    res.status(500).json({ error: `Unexpected Error Occurred: ${err.message}` });
  }
});

module.exports = router;
