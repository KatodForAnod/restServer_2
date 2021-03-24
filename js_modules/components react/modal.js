import React from "react";

class Modal extends React.Component
{
    constructor(obj)
    {
        super(obj);
    }

    render()
    {
        return <div>
            <h4>{this.props.title}</h4>
            <hr/>
            { this.props.children }
        </div>
    }
}

export default Modal;