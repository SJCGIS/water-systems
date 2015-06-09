describe("Example", function() {
  var map;

  beforeEach(function() {
    map = new L.Map(document.createElement('div')).setView([0,0], 12);
  });

  describe('tests', function() {
    it('should have a test here', function() {
      expect(1).to.equal(1);
    });
  });
});
