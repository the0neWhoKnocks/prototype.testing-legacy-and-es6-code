import 'SRC_SCRIPTS/es5/Es5Class.js';

/**
 * Split views in your IDE, and have one view be the file you want to test
 * and the other view be your test file.
 */  
describe('Es5Class', () => {
  let sandbox, logStub, testClass;
  
  beforeEach(() => {
    sandbox = sinon.sandbox.create();
    
    /**
     * For methods that execute within a constructor you'll need to stub them
     * out on the prototype to ensure they don't execute.
     */
    logStub = sandbox.stub(bizLib.util, 'log');
    
    
    testClass = new bizLib.Es5Class();
  });
  
  afterEach(() => {
    sandbox.restore();
  });
  
  it("should be defined", () => {
    testClass.should.be.an.instanceOf(bizLib.Es5Class);
  });
  
  describe('init', () => {
    it("should initialize the component", () => {
      const opts = {
        namespace: 'test',
        defaultText: 'Goodbye World'
      };
      
      testClass.init();
      
      expect( testClass.namespace ).to.equal( testClass.namespace );
      logStub.should.be.calledWith('Es5 class initializing', testClass.defaultText);
      
      testClass.init(opts);
      
      expect( testClass.namespace ).to.equal( opts.namespace );
      logStub.should.be.calledWith('Es5 class initializing', opts.defaultText);
    });
  });
});