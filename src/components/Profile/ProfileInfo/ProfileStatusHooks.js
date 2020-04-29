import React, {Fragment, useEffect, useState} from 'react';

const ProfileStatusHooks = (props) => {

    let [editMode, setEditMode] = useState(false)
    let [status, setStatus] = useState(props.status)

    useEffect(() => {
        setStatus(props.status)
    }, [props.status])

    const activateEditMode = () => {
        setEditMode(true)
    }
    const deactivateEditMode = () => {
        setEditMode(false)
        props.updateStatus(status)
    }

    const onStatusChange = (e) => {
        setStatus(e.currentTarget.value)
    }


    return (
        <div>
            {!editMode &&
            <div>
                <strong>status: </strong>
                <span onDoubleClick={activateEditMode}>{props.status || '------'}</span>
            </div>
            }
            {editMode &&
            <div>
                <input
                    onBlur={deactivateEditMode}
                    autoFocus={true}
                    onChange={onStatusChange}
                    value={status}/>
            </div>
            }
        </div>
    )


}

export default ProfileStatusHooks