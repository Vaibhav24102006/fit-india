import express from "express";
import cors from "cors";
import { auth, db } from "./firebase-config.js";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";

const app = express();
app.use(express.json());
app.use(cors());

// Function to check if a user is an admin
async function checkAdmin(uid) {
  const docRef = doc(db, "roles", uid);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists() && docSnap.data().role === "admin") {
    return true;
  }
  return false;
}

// Signup route
app.post("/signup", async (req, res) => {
  const { email, password, name, role } = req.body;

  try {
    // Create user with Firebase Authentication
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const userId = userCredential.user.uid;

    // Store user in Firestore
    await setDoc(doc(db, "users", userId), {
      name: name,
      email: email,
      role: role || "user" // Default role is "user"
    });

    res.status(200).json({ message: "User Created", userId });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Example route to check if a user is an admin
app.get("/check-admin/:uid", async (req, res) => {
  const { uid } = req.params;

  try {
    const isAdmin = await checkAdmin(uid);
    if (isAdmin) {
      res.status(200).json({ message: "User is an admin." });
    } else {
      res.status(200).json({ message: "User is not an admin." });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Start the server
app.listen(5000, () => console.log("Server running on port 5000"));