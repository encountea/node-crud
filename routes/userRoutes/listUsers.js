const data = require('../../postgres-data');

module.exports = async (req, res) => {
   res.writeHead(200);
   res.end(JSON.stringify(await data.getUsers()));
};

