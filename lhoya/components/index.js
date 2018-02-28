function Comp(type) {
  let name = type || 'default'; 
  require.ensure([], function(require) {
    var mod = require(`./business/${type}.less`);
  });
}
export default Comp;

