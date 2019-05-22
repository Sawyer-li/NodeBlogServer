let User = require('../models/user.db.js');
let assert = require('assert');
let user;
describe('init connect mysql',()=>{
  before(function(){
    user = new User();
   })
  it('init connect mysql return success', ()=>{
    assert.equal(user.init(),'success','init connect fail');     
  })        
}) 

describe('addUser', ()=>{
  let testUser = { props: {
      name: 'test1',
      password: 'asdas'
    }
  }
  let user;
  before(function(){
    user = new User(testUser);
    user.init();
  })
  it('addUser return succes', ()=>{
    user.addUser(); 
    let user1 = new User(testUser);
    user1.init(); 
    user1.getUserAllItems(function(result){
        assert.equal(result.username, testUser);     
    })
  })     
}) 

