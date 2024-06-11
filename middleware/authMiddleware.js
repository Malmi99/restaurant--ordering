const jwt = require('jsonwebtoken');


module.exports = auth = () => {
  return (req, res, next) => {
    // console.log(req.headers['authorization'])
    try{
      if (req.headers['authorization']){
        const authHeader = req.headers['authorization']
        const token = authHeader && authHeader.split(' ')[1]
        const verified = jwt.verify(token, 'secret');
        // console.log(`Verification ${verified}`)
        req.user = verified;
        next()
      }else{
        res.status(401).json({ error: 'Access denied!' });
      }
    }catch(err){
      res.status(403).json({ error: 'Access denied!' });
    }
  }
}
