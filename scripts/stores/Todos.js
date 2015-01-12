var assign = require('object-assign');
var EventEmitter = require('events').EventEmitter;

var AppDispatcher = require('../dispatcher/App');
var TodoConstants = require('../constants/Todo');

// Private store object
var _todos = {};


// This is ... odd;
var CHANGE_EVENT = 'change';

/* 
* Create A New ToDo
* @param {string} Title Text
*/
function _create(text) {
	var id = (+new Date() + Math.floor(Math.random() * 999999)).toString(36);
	_todos[id] = {
		id: id,
		complete: false,
		text: text
	};
};

/**
* Update a TODO item.
* @param  {string} id
* @param {object} updates An object literal containing only the data to be
*     updated.
*/
function _update(id, updates) {
	_todos[id] = assign({}, _todos[id], updates);
}

/**
 * Delete a TODO item.
 * @param  {string} id
 */
function _destroy(id) {
  delete _todos[id];
}





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
	},

	/**
	* Add a change event listener with a callback
	* @param {function} callback
	*/
	addChangeListener: function(callback) {
		this.on(CHANGE_EVENT, callback);
	},

	/**
	* Remove a change event event listener
	* @param {function} callback
	*/
	removeChangeListener: function(callback) {
		this.removeListener(CHANGE_EVENT, callback);
	},

	/*
	* Interface for actually emitting a change event
	* Note: This seems a little silly to me.
	*/
	emitChange: function() {
		this.emit(CHANGE_EVENT);
	}


});




/*
*	Every store recieves all events from the dispatcher
* 	We look for the ones we want here based on the names
*	that are described in the contstants.
*/
AppDispatcher.register(function(action) {

	switch(action.actionType) {
		case TodoConstants.TODO_CREATE:
			text = action.text.trim();
			if (text !== '') {
				_create(text);
			}
			TodosStore.emitChange();
			break;

		case TodoConstants.TODO_TOGGLE_COMPLETE_ALL:
			if (TodosStore.areAllComplete()) {
				updateAll({complete: false});
			} else {
				updateAll({complete: true});
			}
			TodosStore.emitChange();
		break;

		case TodoConstants.TODO_UNDO_COMPLETE:
			_update(action.id, {complete: false});
			TodosStore.emitChange();
		break;

		case TodoConstants.TODO_COMPLETE:
			_update(action.id, {complete: true});
			TodosStore.emitChange();
		break;

		case TodoConstants.TODO_UPDATE_TEXT:
			text = action.text.trim();
			if (text !== '') {
				_update(action.id, {text: text});
			}
			TodosStore.emitChange();
		break;

		case TodoConstants.TODO_DESTROY:
			_destroy(action.id);
			TodosStore.emitChange();
		break;

		case TodoConstants.TODO_DESTROY_COMPLETED:
			destroyCompleted();
			TodosStore.emitChange();
		break;

		default:

	}

});


module.exports = TodosStore;