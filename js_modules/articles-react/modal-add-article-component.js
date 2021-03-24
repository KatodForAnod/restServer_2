import React from "react";
import Modal from "./modal-component"
import {TextField} from "@material-ui/core";

class ModalAddArticle extends Modal
{
    constructor( obj )
    {
        super(obj);

        this.state = {
            title: this.props.title,
            body: this.props.content
        }
    }

    onChangeTitle(title)
    {
        let state = {...this.state};
        state.title = title;
        this.setState(state);
    }

    onChangeContent(content)
    {
        let state = {...this.state};
        state.body = content;
        this.setState(state);
    }


    render()
    {
        return <Modal 
            title="Добавить статью"
            open={this.props.open}
            onClose={ this.props.onClose }
            onOk={ () => { this.props.onOk(this.state) } } >
                <form>
                    <TextField
                        id="title"
                        variant="outlined"
                        label="Заголовок"
                        onChange={ (e) => { this.onChangeTitle(e.target.value) } }
                        />
                    <hr/>
                    <TextField
                        id="content"
                        variant="outlined"
                        label="Контент"
                        multiline
                        rowsMax={4}
                        onChange={ (e) => { this.onChangeContent(e.target.value) } }
                        />
                </form>
            </Modal>
    }
}

export default ModalAddArticle;