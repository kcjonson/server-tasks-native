var assign = require('object-assign');
var EventEmitter = require('events').EventEmitter; 

// Private store object
var _todos = {};

var TodosStore = assign({}, EventEmitter.prototype, {

	/**
	* Get all Todos
	* @return {object}
	*/
	getAll: function() {
		return _todos;
	},

	/** 
	* Are all the todos complete?
	* @return {boolean}
	*/
	areAllComplete: function() {
		for (var id in _todos) {
			if (!_todos[id].complete) {
				return false;
			}
		}
		return true;
	}


});

module.exports = TodosStore;