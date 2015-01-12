var React = require('react');
var ReactPropTypes = React.PropTypes;


var ENTER_KEY_CODE = 13;


var TodoInput = React.createClass({


	propTypes: {
		className: ReactPropTypes.string,
		id: ReactPropTypes.string,
		placeholder: ReactPropTypes.string,
		onSave: ReactPropTypes.func.isRequired,
		value: ReactPropTypes.string,
		onClick: ReactPropTypes.func,
		disabled: ReactPropTypes.bool
	},

	getInitialState: function() {
		return {
			value: this.props.value || '',
			disabled: this.props.disabled || false
		};
	},

	/*
	* Field onChange handler.
	*
	* Note: It is absolutely required to save the value back to
	* the state here, otherwise you cannot edit the input.
	* It's inportant to note here that the template is specifing
	* "onChange" which is a react handler, not "onchange" which is
	* the javascript event handler.
	*
	* It's also worth noting that React will remove the native
	* browser "onchange" event from the node even if you try and
	* use it in the template.
	*
	* So, this is absolutely crazy, but you can remove the "event"
	* parameter in the function dec and this still works, I have
	* no idea why.  My mind is blown.
	*/
	_onChange: function () {
		this.setState({
    		value: event.target.value
    	});
	},

	_onKeyDown: function() {
		if (event.keyCode === ENTER_KEY_CODE) {
			this._save();
		}
	},

	_save: function() {
		this.props.onSave(this.state.value);
		this.setState({
			value: ''
		});
	},


	/*
	* componentWillReceiveProps is the list of params that can
	* change after being created.  Its purpost is to copy props
	* to state before the render.
	*/

	componentWillReceiveProps: function(nextProps) {
		this.setState({
			disabled: nextProps.disabled,
			value: nextProps.value
		});
	},


	render: function() {

		var isDisabled = this.state.disabled ? "true" : false;

		return (
			<input
				className={this.props.className}
				id={this.props.id}
				placeholder={this.props.placeholder}
				onBlur={this._save}
				onChange={this._onChange}
				onKeyDown={this._onKeyDown}
				onClick={this.props.onClick}
				value={this.state.value}
				autoFocus={true}
				disabled={isDisabled}
			/>
		);
	},

});

module.exports = TodoInput;