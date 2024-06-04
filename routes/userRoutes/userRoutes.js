const url = require('url');

const createUser = require('./createUser')
const getUser = require('./getUser')
const listUsers = require('./listUsers')
const updateUser = require('./updateUser')
const deleteUser = require('./deleteUser')

const userRoutes = (req, res) => {
   const parseUrl = url.parse(req.url, true);
   const method = req.method;
   const path = parseUrl.pathname;

   res.setHeader('Content-Type', 'application/json');

   if (path === '/users' && method === 'GET') {
      listUsers(req, res);
   } else if (path === '/users' && method === 'POST') {
      createUser(req, res);
   } else if (path.startsWith('/users/') && method === 'GET') {
      getUser(req, res);
   } else if (path.startsWith('/users/') && method === 'PUT') {
      updateUser(req, res);
   } else if (path.startsWith('/users/') && method === 'DELETE') {
      deleteUser(req, res);
   } else {
      res.writeHead(404);
      res.end(JSON.stringify({ message: 'Route not found in users' }))
   }
}

module.exports = userRoutes;