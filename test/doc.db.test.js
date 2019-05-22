let Doc = require('../models/doc.db.js');
let assert = require('assert');
let doc;
describe('init connect mysql', ()=>{
    before(function(){
        doc = new Doc();        
    })        
    it('init connect mysql return success', ()=>{
        assert.equal(doc.init(),'success','init connect fail');  
    })
        
})

describe('select all doc title', ()=>{
    before(function(){
        doc = new Doc();        
    })        
    it('find doc title return success', ()=>{
        assert.equal(doc.getAllDocTitle(),'success','init connect fail');  
    })
        
})
describe('senddoc', ()=>{
  let testDoc = { props: {
      dochtml: 'this is first document in world!!!',
      author: 'sawyerli'
    }
  }
  let doc;
  before(function(){
    doc = new Doc(testDoc);
    doc.init();
  })
  it('addDocreturn succes', ()=>{
    assert.equal(doc.senddoc(), "success");
    //let user1 = new User(testUser);
    //user1.init(); 
    //user1.getUserAllItems(function(result){
    //    assert.equal(result.username, testUser);     
    //})
  })     
}) 

