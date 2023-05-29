import React from 'react'

export default function Alert(props) {
    let alertStyle = {
        backgroundColor: props.color.clr,
        height: '45px'
    }
    return (
        <div style={alertStyle}>
            {props.alert && <div className="alert alert-dismissible fade show" role="alert">
                {props.alert.msg}
                <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="alert"
                    aria-label="Close"
                />
            </div >}
        </div>
    )
}

