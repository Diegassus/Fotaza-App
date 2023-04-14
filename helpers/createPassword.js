const bcrypt = require('bcrypt');

const crypt = (password) => {
    const hash = bcrypt.hashSync(password,10);
    return hash ;
}

module.exports = {
    crypt
}