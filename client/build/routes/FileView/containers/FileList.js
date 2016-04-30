'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _reactRedux = require('react-redux');

var _redux = require('redux');

var _Heading = require('./../components/Heading');

var _Heading2 = _interopRequireDefault(_Heading);

var _FileItem = require('./../components/FileItem');

var _FileItem2 = _interopRequireDefault(_FileItem);

var _FileActions = require('../../../actions/FileActions');

var FileActions = _interopRequireWildcard(_FileActions);

var _fileTools = require('../../../tools/fileTools');

var _TooltipActions = require('../../../actions/TooltipActions');

var TooltipActions = _interopRequireWildcard(_TooltipActions);

var _Tooltip = require('../../../components/Tooltip');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var FileList = function (_React$Component) {
	_inherits(FileList, _React$Component);

	function FileList(props) {
		_classCallCheck(this, FileList);

		var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(FileList).call(this, props));

		_this.onNewDir = _this.onNewDir.bind(_this);
		_this.onInputKeyPress = _this.onInputKeyPress.bind(_this);
		_this.onInputBlur = _this.onInputBlur.bind(_this);
		return _this;
	}

	_createClass(FileList, [{
		key: 'onNewDir',
		value: function onNewDir(e) {
			var val = e.target.value;
			if ((0, _fileTools.isValidFilename)(val)) {
				this.props.onNewDir(this.props.currentFile.path, e.target.value);
				this.props.hideTooltip();
			} else {
				this.props.showTooltip(e.target, 'Invalid filename.', _Tooltip.Orientation.RIGHT, '#900');
			}
		}
	}, {
		key: 'onInputBlur',
		value: function onInputBlur(e) {
			this.onNewDir(e);
		}
	}, {
		key: 'onInputKeyPress',
		value: function onInputKeyPress(e) {
			if (e.charCode === 13) this.onNewDir(e);
		}
	}, {
		key: 'render',
		value: function render() {
			var _this2 = this;

			var isDir = function isDir(file) {
				return file.filetype === 'directory';
			};

			var currentFile = this.props.currentFile;
			var dirname = isDir(currentFile) ? currentFile.path : _path2.default.dirname(currentFile.path);

			return _react2.default.createElement(
				'div',
				{ className: 'file-list' },
				_react2.default.createElement(
					'div',
					{ className: 'header' },
					_react2.default.createElement(_Heading2.default, { sort: currentFile.dirData.sort, onSort: this.props.onSort, heading: 'Name' }),
					_react2.default.createElement(_Heading2.default, { sort: currentFile.dirData.sort, onSort: this.props.onSort, heading: 'Modified' })
				),
				_react2.default.createElement(
					'div',
					{ className: 'file-item-list' },
					currentFile.dirData.files.map(function (file, index) {
						var link = _path2.default.join(dirname, file.name) + (isDir(file) ? '/' : '');
						return _react2.default.createElement(_FileItem2.default, { key: index,
							link: link,
							file: file,
							onNavigate: _this2.props.onNavigate,
							loading: _this2.props.loading });
					}),
					currentFile.newDirStage === _FileActions.NewDirStage.PROMPT ? _react2.default.createElement(
						'div',
						{ className: 'item dir' },
						_react2.default.createElement(
							'div',
							{ className: 'name' },
							_react2.default.createElement('input', { type: 'text',
								ref: function ref(c) {
									return c ? c.focus() : {};
								},
								onBlur: this.onInputBlur,
								onKeyPress: this.onInputKeyPress })
						)
					) : ''
				)
			);
		}
	}]);

	return FileList;
}(_react2.default.Component);

function mapDispatchToProps(dispatch) {
	return {
		onSort: (0, _redux.bindActionCreators)(FileActions, dispatch).sortFiles,
		onNewDir: (0, _redux.bindActionCreators)(FileActions, dispatch).newDirectory,
		showTooltip: (0, _redux.bindActionCreators)(TooltipActions, dispatch).showTooltip,
		hideTooltip: (0, _redux.bindActionCreators)(TooltipActions, dispatch).hideTooltip
	};
}

exports.default = (0, _reactRedux.connect)(null, mapDispatchToProps)(FileList);