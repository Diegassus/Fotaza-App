

const validateFile = (req, res = response, next) => {
    if (!req.files||Object.keys(req.files).length===0) {
      return res.redirect(`http://localhost:8080/profile/edit/${req.params.id}`);
    }
    next();
}

module.exports = {
    validateFile
}