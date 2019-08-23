var user = {
    getUserByPhone:'select * from user where phone=?',
    insert:'insert into user(name,phone,email,password)values(?,?,?,?)',
    query:'select * from user where phone=?',
    queryPwd:'select * from user where password=?'
};
module.exports=user;