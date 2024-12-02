const User = require('./models/user');

// 创建并保存一个新用户
const newUser = new User({
    username: 'player1',
    password: 'hashed_password',
    points: 100,
});

newUser.save()
.then(() => {
    console.log('User saved successfully!');
})
.catch(err => {
    console.error('Error saving user:', err);
});
