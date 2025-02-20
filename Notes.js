// ### **🚀 Full Deployment Process: Pushing Code to GitHub & Deploying on Render (Frontend & Backend)**
// This guide will walk you through everything from **pushing your code to GitHub** to **deploying both your frontend and backend on Render** step by step.  

// ---

// ## **🛠 1️⃣ Set Up Git in Frontend & Backend**
// If your project is not yet on GitHub, follow these steps.

// ### **A) Initialize Git in Both Frontend & Backend**
// First, **go to your project folder** and make sure it has both the frontend and backend inside it:
// ```
// MobiRide/
//   ├── backend/
//   ├── frontend/
// ```

// Now, go inside MobiRide
// git init




// ## **📝 2️⃣ Create a `.gitignore` File**
// A `.gitignore` file prevents unnecessary files from being uploaded to GitHub.

// ### **A) Backend `.gitignore`**
// Inside `backend/`, create a `.gitignore` file and add:
// ```
// node_modules
// .env
// ```

// ### **B) Frontend `.gitignore`**
// Inside `frontend/`, create a `.gitignore` file and add:
// ```
// node_modules
// dist
// ```
// 🔹 **Why ignore `dist`?** → Render will build `dist` itself, so we don't need to upload it.

// ---

// ## **🔗 3️⃣ Push Both Frontend & Backend to GitHub**
// Now, create a **GitHub repository**:  
// Go to [GitHub](https://github.com/new) → Create a new repo named `MobiRide`.

// ### **A) Add Backend and frontend to GitHub**
// ```sh
// cd backend
// git add .
// git commit -m "Initial commit - Backend and Frontend"
// git branch -M main
// git remote add origin https://github.com/PiyushYadav1414/MobiRide.git
// git push -u origin main
// ```


// ✅ **Your code is now on GitHub!** 🎉

// ---

// ## **🚀 4️⃣ Deploy Backend on Render**
// 1. **Go to** [Render](https://dashboard.render.com/)
// 2. Click **"New" → "Web Service"**
// 3. Select your GitHub repository (`MobiRide`)
// 4. Set the **Root Directory** to name of the folder of backend in this i have name `Backend`  
// 5. Choose **Node.js** as the environment
// 6. we need to change thepackage.json file of backedn
// "scripts": {
//     "start": "node server.js",  
//     "test": "echo \"Error: no test specified\" && exit 1"
//   },
//   **then we will Set the Start Command:** 
//   
//    node server.js
//    ```
// 7. Click **Create Web Service**  

// ✅ Your backend is now deploying! 🎉  
// After deployment, Render will give you a **live URL**, e.g.:
// ```
// https://piyush-mobiride.onrender.com
// ```

// ---

// ## **🌐 5️⃣ Deploy Frontend on Render**
// 1. Go to **Render Dashboard**
// 2. Click **"New" → "Static Site"**
// 3. Select your GitHub repository (`MobiRide`)
// 4. Set the **Root Directory** to name of frontedn in my case the folder name is `frontend`
// 5. **Set the Build Command:**
//    ```sh
//    npm install && npm run build
//    ```
// 6. **Set the Publish Directory:**
//    ```
//    dist
//    ```
// 7. Click **Create Static Site**  

// ✅ Your frontend is now deploying! 🎉  
// After deployment, Render will give you a **live URL**, e.g.:
// ```
// https://mobiride-piyush.onrender.com
// ```

// ---

// ## **🛠 6️⃣ Update Frontend API URL**
// Now, update your frontend to use your backend API.  
// Inside `frontend/src/config.js`, set:
// ```js
// const API_BASE_URL = "https://piyush-mobiride.onrender.com";
// ```

// Then, commit and push the change:
// ```sh
// git add .
// git commit -m "Updated API URL for deployment"
// git push origin main
// ```

// ---

// ## **🎉 Done! Your Full-Stack App is Live!**
// Now you have:  
// ✅ **Backend deployed at:** `https://piyush-mobiride.onrender.com`  
// ✅ **Frontend deployed at:** `https://mobiride-piyush.onrender.com`  

// Let me know if you need help! 🚀