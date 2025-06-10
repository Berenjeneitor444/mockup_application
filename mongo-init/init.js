db.createUser({
  user: "mockupUser",
  pwd: "TestingApi2025",
  roles: [
    { role: "readWrite", db: db.getName() }
  ]
});