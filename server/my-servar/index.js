const express = require('express');
const app = express();
const cors = require('cors');
const port = 3000;
const multer = require('multer');







app.use(cors());
app.use(express.json());



const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

const uri =
  'mongodb+srv://carRentaldb:cTRMYW94bgtZw4Wo@cluster0.jyfctqb.mongodb.net/?retryWrites=true&w=majority';
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    await client.connect();
    const db = client.db('carBookind');
    const cars = db.collection('cars');
    const Bookins = db.collection('bookinsCar');



    app.post('/carpost', async (req, res) => {
      try {
        const carData = req.body;
        const insertedCar = await cars.insertOne(carData);
        res.json(insertedCar);
      } catch (error) {
        console.error('Error inserting document:', error);
        res.status(500).json({ error: 'An error occurred while inserting document' });
      }
    });

    app.get('/cars', async (req, res) => {
      try {
        const allCars = await cars.find().toArray();
        res.json(allCars);
      } catch (error) {
        console.error('Error fetching cars:', error);
        res.status(500).json({ error: 'An error occurred while fetching cars' });
      }
    });

    app.get('/details/:id', async (req, res) => {
      const id = req.params.id; 
      const query = { _id: new ObjectId(id) };
      const delaist = await cars.findOne(query);
      res.json(delaist);
    });


    // booking post

    app.post('/bookings', async (req, res) => {
      try {
        const carData = req.body;
        const insertedCarBooking = await Bookins.insertOne(carData);
        res.json(insertedCarBooking);
      } catch (error) {
        console.error('Error inserting document:', error);
        res.status(500).json({ error: 'An error occurred while inserting document' });
      }
    });


     // get apesefic data from datbase


 
     app.get('/bookings', async (req, res) => {

      const email = req.query.email; // Extract email from query parameter
      const query = { email: email };
      const carts = await Bookins.find(query).toArray();
      res.json(carts);
    });


    //pjojoj

    // Set up multer storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Upload directory
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname); // Rename file
  }
});

const upload = multer({ storage: storage });

// Endpoint for file upload
app.post('/upload', upload.array('photos'), (req, res) => {
  const files = req.files;
  // Do something with uploaded files (save to database, process, etc.)
  res.send({ message: 'Files uploaded successfully', files: files });
});




  


    await client.db('admin').command({ ping: 1 });
    console.log('Pinged your deployment. You successfully connected to MongoDB!');
  } finally {
    // Ensure that the client will close when you finish/error
    // await client.close();
  }
}

run().catch(console.dir);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});