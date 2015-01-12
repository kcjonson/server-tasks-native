var React = require('react');
var ReactPropTypes = React.PropTypes;
var Todo = require('./Todo.react');
var TodoActions = require('../actions/Todo');
var TodoInput = require('./TodoInput.react');

var Todos = React.createClass({



	propTypes: {
	    allTodos: ReactPropTypes.object.isRequired,
	    areAllComplete: ReactPropTypes.bool.isRequired
	},


	_onSave: function(text) {
		if (text && text.trim()) {
			TodoActions.create(text);
		}
	},


	render: function() {


	    var todosData = this.props.allTodos;
    	var todoItems = [];

    	for (var key in todosData) {
			todoItems.push(<Todo key={key} todo={todosData[key]} />);
		}



		return (
			<div class='Todos'>
				<h1>Todos</h1>
				<TodoInput
					placehoder='What needs to be done?'
					onSave={this._onSave}
				/>
				<ul class='items'>{todoItems}</ul>
			</div>
		);	
	}

});

module.exports = Todos;