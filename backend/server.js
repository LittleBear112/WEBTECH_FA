const express = require("express");
const cors = require("cors");
const multer = require("multer");

const { db, bucket } = require("./firebase-admin");

const app = express();

app.use(cors());
app.use(express.json());

const upload = multer({ storage: multer.memoryStorage() });


// GET ALL ITEMS
app.get("/items", async (req, res) => {

  const snapshot = await db.collection("items").get();

  const items = snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }));

  res.json(items);

});


// GET SINGLE ITEM
app.get("/items/:id", async (req, res) => {

  const doc = await db.collection("items").doc(req.params.id).get();

  res.json({ id: doc.id, ...doc.data() });

});


// ADD ITEM
app.post("/items", async (req, res) => {

  const item = req.body;

  item.claimed = false;
  item.created = new Date();

  const docRef = await db.collection("items").add(item);

  res.json({ id: docRef.id });

});


// CLAIM ITEM
app.post("/claim/:id", async (req, res) => {

  await db.collection("items").doc(req.params.id).update({
    claimed: true
  });

  res.json({ message: "Item claimed" });

});


// DELETE ITEM (ADMIN)
app.delete("/items/:id", async (req, res) => {

  await db.collection("items").doc(req.params.id).delete();

  res.json({ message: "Item deleted" });

});


// IMAGE UPLOAD
app.post("/upload", upload.single("image"), async (req, res) => {

  const file = bucket.file(Date.now() + "_" + req.file.originalname);

  const stream = file.createWriteStream({
    metadata: {
      contentType: req.file.mimetype
    }
  });

  stream.on("error", err => res.status(500).send(err));

  stream.on("finish", async () => {

    await file.makePublic();

    const url = `https://storage.googleapis.com/${bucket.name}/${file.name}`;

    res.json({ imageUrl: url });

  });

  stream.end(req.file.buffer);

});


const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});