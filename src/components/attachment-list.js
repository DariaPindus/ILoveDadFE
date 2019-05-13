import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';

const AttachmentRow = ({att}) => {
	return (
		<div class="attachment-row">
		    <div class="attachment-column attachment-column-icon"><i class="far fa-image"></i></div>
		    <div class="attachment-column attachment-column-name">{att.name}</div>
		    <div class="attachment-column attachment-column-action"><i class="far fa-times" onClick={() => {att.onDelete(att.key)}}></i></div>
		</div>
		);

}

class AttachmentList extends Component {

  	render() {
  		let files = this.props.files || [];

  		if (files && !(files instanceof Array))
  			files = [files]; 

  		return files.map((att, ind) => {
			return (<AttachmentRow att={att} key={ind} onDelete={this.props.onDelete} />);
		});
  	}
}

export default AttachmentList;