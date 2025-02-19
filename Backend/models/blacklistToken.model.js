// Import required module
const mongoose = require('mongoose');

// Define schema for blacklisted JWT tokens
const blacklistTokenSchema = new mongoose.Schema({

    // 'token' field stores the blacklisted JWT (Required & Unique)
    token: { type: String, required: true, unique: true },

    // 'createdAt' field stores the timestamp (Auto-expires after 24 hours)
    createdAt: { type: Date, default: Date.now, expires: 86400 } // 24 hours in seconds

});

// Export the model for use in authentication middleware
module.exports = mongoose.model('BlacklistToken', blacklistTokenSchema);

// A JWT (JSON Web Token) is a piece of information that is issued when a user logs in, which proves they
//  are authenticated. However, after a user logs out, we don’t want that token to be used again. So, we
//  blacklist the token, meaning we store it in a special database so that it can’t be used for future 
// requests.


// ### How does it work in this code?
// 1. **When the user logs out:**
//    - The `logoutUser` function stores the token in the blacklist database (MongoDB).
//    - This is done by creating a record in the `blackListTokenModel` with the JWT token. After the token is added to the blacklist, it can’t be used to authenticate the user anymore.

// 2. **When a user tries to use the token again (e.g., for accessing protected routes):**
//    - The `authUser` or `authCaptain` middleware checks if the token is in the blacklist before verifying it.
//    - If the token is found in the blacklist, the server immediately denies access by returning a "401 Unauthorized" status, even if the token is still valid in terms of structure or signature.
   
// 3. **Token Expiry:**
//    - The tokens are stored with an expiry time of **24 hours**. This means they automatically expire and get deleted after 24 hours. This is handled by the `expires: 86400` property in the `blacklistTokenSchema`. 

//    **Example:**
//    - Let’s say a user logs in and receives a token `abc123`.
//    - They use this token to make requests while authenticated.
//    - If they log out, the token `abc123` is blacklisted by storing it in the database.
//    - If they try to use `abc123` again after logging out, the server will look up the token in the blacklist and deny access if it is found.

// This process helps ensure that a user can't continue using a token after logging out or after a session is invalidated for security reasons. 

// ### Example Scenario:

// - **User login:** The user logs in and gets a token (`abc123`).
// - **User logout:** The user logs out, and `abc123` is stored in the blacklist.
// - **User tries to access a protected route:** The server checks if `abc123` is blacklisted. Since it is, the server denies access, even if the token is still valid.
  
