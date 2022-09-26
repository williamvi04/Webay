import bcryptjs from 'bcryptjs';

const users = [
    { name: 'Admin', email: 'admin@webay.com', password: bcryptjs.hashSync('12345678'), isAdmin: true },
    { name: 'William Villalta', email: 'william.jvillalta@gmail.com', password: bcryptjs.hashSync('123456')},
    { name: 'Juan Perez', email: 'juan.perez@gmail.com', password: bcryptjs.hashSync('123456')},
    { name: 'user', email: 'user.new@gmail.com', password: bcryptjs.hashSync('123456')},
    
];

export default users;