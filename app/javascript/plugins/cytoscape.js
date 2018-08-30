import cytoscape from 'cytoscape';

const graph = document.getElementById('cy');

const nodes = JSON.parse(graph.dataset.nodes);
const relationships = JSON.parse(graph.dataset.relationships);
var elements = [];

console.log(nodes)
// console.log(relationships)

var y = 0;
nodes.forEach((node) => {
  elements.push({ data:
                  { id: nodes[y].id,
                    name: nodes[y].name
                  }
                },
                )
  y += 1;
  });

var i = 0;
relationships.forEach((relationship) => {
  elements.push({ data:
                  { id: `${relationships[i].parent_id}-${relationships[i].child_id}`,
                    source: relationships[i].parent_id,
                    target: relationships[i].child_id
                  }
                },
                )
  i += 1;
  });

console.log(elements)

const cy = cytoscape({
  container: document.getElementById('cy'),
    elements:
      elements
  // [
  // // nodes
  // { data: { id: 'a' } },
  // { data: { id: 'b' } },
  // { data: { id: 'c' } },
  // { data: { id: 'd' } },
  // { data: { id: 'g' } },
  // { data: { id: 'h' } },
  // { data: { id: 'e' } },
  // { data: { id: 'f' } },

  // // edges
  // {
  //   data: {
  //     id: 'ab',
  //     source: 'a',
  //     target: 'b'
  //   }
  // },
  // {
  //   data: {
  //     id: 'bc',
  //     source: 'b',
  //     target: 'c'
  //   }
  // },
  // {
  //   data: {
  //     id: 'cd',
  //     source: 'c',
  //     target: 'd'
  //   }
  // },
  // {
  //   data: {
  //     id: 'ce',
  //     source: 'c',
  //     target: 'e'
  //   }
  // },
  // {
  //   data: {
  //     id: 'ef',
  //     source: 'e',
  //     target: 'f'
  //   }
  // },
  //   {
  // data: {
  //     id: 'dg',
  //     source: 'd',
  //     target: 'g'
  //   }
  // },
  //   {
  // data: {
  //     id: 'gh',
  //     source: 'g',
  //     target: 'h',
  //   }
  // },
  //   {
  // data: {
  //     id: 'fh',
  //     source: 'f',
  //     target: 'h',
  //   }
  // }]
,

  layout: {
    name: 'breadthfirst',
    directed: true,
    roots: `#${nodes[0].id}`,
    // padding: 20,
    fit: true,
    // spacingFactor: 1.75,
    height: undefined
    },

  style: [
    {
      selector: 'node:unselected',
      style: {
        label: 'data(name)',
        'text-halign': 'right',
        'text-valign': 'center',
        'text-margin-x': 8,
        'font-size': 16,
        'text-transform': 'uppercase',
        'color': 'gray',
        'width': 64,
        'height': 64,
        'background-color': '#106BA5',
        'border-width': 2,
        'border-color': 'gray',
        // 'border-style': 'solid',
        'overlay-color': 'black',
        'ghost': 'yes',
        'ghost-offset-x': 0,
        'ghost-offset-y': 2,
        'ghost-opacity': 0.1,
        'transition-property': 'overlay-opacity, background-color',
        'transition-duration': 100
      }
    },{
    selector: 'node:selected',
      style: {
        label: 'data(name)',
        'text-halign': 'right',
        'text-valign': 'center',
        'text-margin-x': 8,
        'font-size': 16,
        'text-transform': 'uppercase',
        'color': 'gray',
        'width': 64,
        'height': 64,
        'background-color': 'orange',
        'border-width': 2,
        'border-color': 'gray',
        // 'border-style': 'double',
        'overlay-color': 'gray',
        'overlay-opacity': 0,
        'ghost': 'yes',
        'ghost-offset-x': 0,
        'ghost-offset-y': 2,
        'ghost-opacity': 0.1,
        'transition-property': 'overlay-opacity, background-color',
        'transition-duration': 200
      }
    },{
      selector: 'edge:unselected',
      style: {
        label: '+',
        // 'font-family': 'Font Awesome Free 5',
        // 'label': '\uf055',
        'font-weight': '900',
        'font-size': '30',
        'color': 'gray',
        'width': 5,
        'line-color': 'lightgray',
        'line-style': 'dashed',
        'overlay-color': 'gray',
        // 'overlay-padding': 14,
        'curve-style': 'bezier',
        'target-arrow-color': 'lightgray',
        // 'target-arrow-shape': 'vee',
        'arrow-scale': 1,
        'ghost': 'yes',
        'ghost-offset-x': 0,
        'ghost-offset-y': 1,
        'ghost-opacity': 0.1,
        'transition-property': 'line-color, target-arrow-color, overlay-opacity',
        'transition-duration': 100
      }
    },{
      selector: 'edge:selected',
      style: {
        label: '+',
        'font-weight': '900',
        'font-size': '30',
        'color': 'gray',
        'width': 5,
        'line-color': 'lightgray',
        'line-style': 'dashed',
        // 'overlay-padding': 14,
        'overlay-color': 'gray',
        'overlay-opacity': 0,
        'curve-style': 'bezier',
        'target-arrow-color': '#BABABA',
        // 'target-arrow-shape': 'vee',
        'arrow-scale': 1,
        'ghost': 'yes',
        'ghost-offset-x': 0,
        'ghost-offset-y': 1,
        'ghost-opacity': 0.1,
        'transition-property': 'line-color, target-arrow-color, overlay-opacity',
        'transition-duration': 100
      },
    },{
      selector: 'core',
      style: {
        'active-bg-opacity': 0
      }
    }],

  // interaction options:
  // minZoom: 0.5,
  // maxZoom: 1,
  userZoomingEnabled: false,
  zoomingEnabled: true,
  userPanningEnabled: false,
  boxSelectionEnabled: false,
  autoungrabify: true,
  });

cy.on('mouseover', 'node', () =>$('html,body').css('cursor', 'pointer'));
cy.on('mouseout', 'node', () =>$('html,body').css('cursor', 'default'));
cy.on('mouseover', 'edge', () =>$('html,body').css('cursor', 'pointer'));
cy.on('mouseout', 'edge', () =>$('html,body').css('cursor', 'default'));
cy.on('click', 'node', (evt) => { document.getElementById('show-node'+ evt.target.id()).click() });
cy.on('click', 'edge', (evt) => {
  let event_node_id = evt.target.id();
  event_node_id = event_node_id.split("-");
  let event_parent_id = event_node_id[0];
  let event_child_id = event_node_id[1];
  let child_id_form = document.getElementById('event_child_id');
  let parent_id_form = document.getElementById('event_parent_id');
  child_id_form.value = event_child_id
  parent_id_form.value = event_parent_id
} );
cy.on('click', 'edge', () => { document.getElementById('add-node').click(); });

