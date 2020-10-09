
const {renderContent} = require('./util');
const container = require('markdown-it-container');

// module.exports = [
//   [
//     container,
//     'demo',
//     {
//       validate: function (params) {
//         return params.trim().match(/^demo\s+(.*)$/);
//       },
//
//       render: (tokens, idx) => renderContent(tokens, idx)
//     }
//   ],
//   [container, 'tip'],
//   [container, 'warning']
// ];


module.exports = md => {
  md.use(container, 'demo', {
    validate(params) {
      return params.trim().match(/^demo\s*(.*)$/);
    },
    render: (tokens, idx) => renderContent(tokens, idx)
  });

  md.use(container, 'tip');
  md.use(container, 'warning');
};
