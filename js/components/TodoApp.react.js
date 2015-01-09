var React = require('react');

// Components
//var Footer = require('./Footer.react');
//var Header = require('./Header.react');
var Todos = require('./Todos.react');

//Store
var TodosStore = require('../stores/Todos');





// Utility Functions

/**
* Get todo data from store
*/
function _getTodoState() {
	return {
		allTodos: TodosStore.getAll(),
		areAllComplete: TodosStore.areAllComplete()
	}
};



var TodoApp = React.createClass({


	getInitialState: function() {
		return _getTodoState();
	},


	render: function () {
		return (
			<Todos 
				allTodos={this.state.allTodos}
				areAllComplete={this.state.areAllComplete}
			/>
		);
	}

});

module.exports = TodoApp;