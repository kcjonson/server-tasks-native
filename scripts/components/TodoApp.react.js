var React = require('react');

// Components
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

	componentDidMount: function() {
		TodosStore.addChangeListener(this._onChange);
	},

	componentWillUnmount: function() {
		TodosStore.removeChangeListener(this._onChange);
	},

	render: function () {
		return (
			<div class='app'>
				<Todos 
					allTodos={this.state.allTodos}
					areAllComplete={this.state.areAllComplete}
				/>
			</div>
		);
	},

	/**
	* Event handler for 'change' events coming from the TodoStore
	*/
	_onChange: function() {
		this.setState(_getTodoState());
	}

});

module.exports = TodoApp;