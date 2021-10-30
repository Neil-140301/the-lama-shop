const jwt = require('jsonwebtoken');

const verifyAuth = async (req, res, next) => {
  const authHeader = req.headers.token;

  if (authHeader) {
    const token = authHeader.split(' ')[1];
    jwt.verify(token, process.env.PWD_SECRET, (err, payload) => {
      if (err) {
        res.status(403).json('Invalid token');
      }
      req.user = payload;
      next();
    });
  } else {
    return res.status(400).json('not authorized');
  }
};

const verifyTokenAndAuthorize = (req, res, next) => {
  verifyAuth(req, res, () => {
    if (req.user.id === req.params.id || req.user.isAdmin) {
      next();
    } else {
      res.status(403).json('not authorized');
    }
  });
};

const verifyTokenAndAdmin = (req, res, next) => {
  verifyAuth(req, res, () => {
    if (req.user.isAdmin) {
      next();
    } else {
      res.status(403).json('not authorized');
    }
  });
};

module.exports = { verifyAuth, verifyTokenAndAuthorize, verifyTokenAndAdmin };
