import React, {Fragment} from 'react';

class ProfileStatus extends React.Component {

    state = {
        editMode: false
    }

    render() {
        return <Fragment>
            {!this.state.editMode &&
            <div>
                <span>{this.props.status}</span>
            </div>
            }
            {this.state.editMode &&
            <div>
                <input value={this.props.status}/>
            </div>
            }
        </Fragment>
    }
}

export default ProfileStatus