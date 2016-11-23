import 'SRC_SCRIPTS/es5/Es5Class.js';

/**
 * Split views in your IDE, and have one view be the file you want to test
 * and the other view be your test file.
 */  
describe('Es5Class', () => {
  let sandbox, initStub, testClass;
  
  beforeEach(() => {
    sandbox = sinon.sandbox.create();
    
    /**
     * For methods that execute within a constructor you'll need to stub them
     * out on the prototype to ensure they don't execute.
     */
    initStub = sandbox.stub(window.namespace.Es5Class.prototype, 'init');
    
    
    testClass = new window.namespace.Es5Class();
  });
  
  afterEach(() => {
    sandbox.restore();
  });
  
  it("should be defined", () => {
    testClass.should.be.a.function;
    initStub.should.be.calledWith(undefined);
  });
  
  describe('init', () => {
    /**
     * Since `init` was stubbed out above, we now need to restore it so it can
     * be tested here.
     */
    beforeEach(() => {
      initStub.restore();
    });
    
    it("should initialize the component", () => {
      const logStub = sandbox.stub(window.namespace.util, 'log');
      const opts = {
        namespace: 'test'
      };
      
      testClass.init(opts);
      
      expect( testClass.namespace ).to.equal( opts.namespace );
      logStub.should.be.calledWith('Es5 class initializing');
      
      testClass.init();
      
      expect( testClass.namespace ).to.equal( 'exampleClass' );
      logStub.should.be.calledWith('Es5 class initializing');
    });
  });
});