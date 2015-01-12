var React = require('react');
var ReactPropTypes = React.PropTypes;
var cx = require('react/lib/cx');

var TodoActions = require('../actions/Todo');
var TodoInput = require('./TodoInput.react');

var Todos = React.createClass({


	propTypes: {
		todo: ReactPropTypes.object.isRequired
	},

	getInitialState: function() {
		return {
			isEditing: false
		};
	},

	_onComplete: function() {
		console.log('Complete')
		TodoActions.toggleComplete(this.props.todo);
	},

	_onSave: function(text) {
		console.log('Save', text)
		TodoActions.updateText(this.props.todo.id, text);
	},

	_onDestroy: function() {
		console.log('Destroy')
		TodoActions.destroy(this.props.todo.id);
	},

	_onEdit: function() {
		console.log('_onEdit')
		this.setState({
			isEditing: true
		});
	},



	render: function() {

		var todoData = this.props.todo;

		var baseClass = 'todo ' + cx({
          'completed': todoData.complete,
          'editing': this.state.isEditing
        });

		return (
			<li class={baseClass}>

				<input
					className="toggle"
					type="checkbox"
					checked={todoData.complete}
					onChange={this._onComplete}
				/>

				<TodoInput
					className="edit"
					onSave={this._onSave}
					value={todoData.text}
					onDoubleClick={this._onEdit}
					onClick={this._onEdit}
					disabled={!this.state.isEditing}
				/>

				<button
					class='destroy'
					onClick={this._onDestroy}
				/>

			</li>
		);
	}
});

module.exports = Todos;