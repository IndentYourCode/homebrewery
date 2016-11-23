const React = require('react');
const _     = require('lodash');
const cx    = require('classnames');

const SYSTEMS = ['5e', '4e', '3.5e', 'Pathfinder']

const MetadataEditor = React.createClass({
	getDefaultProps: function() {
		return {
			metadata: {
				title : '',
				description : '',
				tags : '',
				published : false,
				authors : [],
				systems : []
			},
			onChange : ()=>{}
		};
	},

	handleFieldChange : function(name, e){
		this.props.onChange(_.merge({}, this.props.metadata, {
			[name] : e.target.value
		}))
	},
	handleSystem : function(system, e){
		if(e.target.checked){
			this.props.metadata.systems.push(system);
		}else{
			this.props.metadata.systems = _.without(this.props.metadata.systems, system);
		}
		this.props.onChange(this.props.metadata);
	},
	handlePublish : function(val){
		this.props.onChange(_.merge({}, this.props.metadata, {
			published : val
		}));
	},

	renderSystems : function(){
		return _.map(SYSTEMS, (val)=>{
			return <label key={val}>
				<input
					type='checkbox'
					checked={_.includes(this.props.metadata.systems, val)}
					onChange={this.handleSystem.bind(null, val)} />
				{val}
			</label>
		});
	},

	renderPublish : function(){
		if(this.props.metadata.published){
			return <button className='unpublish' onClick={this.handlePublish.bind(null, false)}>
				<i className='fa fa-ban' /> unpublish
			</button>
		}else{
			return <button className='publish' onClick={this.handlePublish.bind(null, true)}>
				<i className='fa fa-globe' /> publish
			</button>
		}
	},

	render : function(){
		return <div className='metadataEditor'>

			<div className='field title'>
				<label>title</label>
				<input type='text' className='value'
					value={this.props.metadata.title}
					onChange={this.handleFieldChange.bind(null, 'title')} />
			</div>
			<div className='field description'>
				<label>description</label>
				<textarea value={this.props.metadata.description} className='value'
					onChange={this.handleFieldChange.bind(null, 'description')} />
			</div>
			{/*}
			<div className='field tags'>
				<label>tags</label>
				<textarea value={this.props.metadata.tags}
					onChange={this.handleFieldChange.bind(null, 'tags')} />
			</div>
			*/}

			<div className='field systems'>
				<label>systems</label>
				<div className='value'>
					{this.renderSystems()}
				</div>
			</div>

			<div className='field publish'>
				<label>publish</label>
				<div className='value'>
					{this.renderPublish()}
					<small>Published homebrews will be publicly searchable (eventually...)</small>
				</div>
			</div>

		</div>
	}
});

module.exports = MetadataEditor;
