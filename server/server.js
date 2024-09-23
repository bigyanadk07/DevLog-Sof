const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const devlogRoutes = require('./routes/devRoutes');
const PDFDocument = require('pdfkit');
const Devlog = require('./models/devModel'); // Add this line

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/devlogsof', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log('MongoDB connection error:', err));

// Routes
app.use('/devlogs', devlogRoutes);

// Generate PDF Report
app.get('/api/reports', async (req, res) => {
    try {
        const devlogs = await Devlog.find();

        if (devlogs.length === 0) {
            return res.status(404).send('No devlogs found');
        }

        const doc = new PDFDocument();

        res.setHeader('Content-disposition', 'attachment; filename=devlog_report.pdf');
        res.setHeader('Content-type', 'application/pdf');

        doc.pipe(res);

        doc.fontSize(25).text('Devlog Report', { align: 'center' });
        doc.moveDown();

        devlogs.forEach(devlog => {
            doc.fontSize(12).text(`Title: ${devlog.title}`);
            doc.text(`Date: ${devlog.date}`);
            doc.text(`Changes: ${devlog.changes}`);
            doc.text(`Tags: ${devlog.tags || 'N/A'}`);
            doc.moveDown();
        });

        doc.end();
    } catch (error) {
        console.error('Error generating report:', error);
        res.status(500).send('Error generating report');
    }
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
