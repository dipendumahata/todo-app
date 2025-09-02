// Hardcoded user and in-memory profile storage
const user = {
  id: 'u1',
  username: 'testuser',
  password: '1234' // plain text for demo (junior project)
};

// profile will be stored in memory after user submits profile form
let profile = null; // { name, email, phone, userId }

module.exports = {
  user,
  getProfile: () => profile,
  saveProfile: (p) => { profile = p; return profile; }
};
