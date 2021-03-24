import React from 'react';
// eslint-disable-next-line no-unused-vars
import InputNumber from "./input-number";
// eslint-disable-next-line no-unused-vars
import { Button,Typography, DialogTitle, Dialog, Slide } from '@material-ui/core';
// eslint-disable-next-line no-unused-vars
import Modal from "./modal";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="down" ref={ref} {...props} />;
});

class Cart extends React.Component{

    constructor( props ){
        super(props);

        this.state = {
            products: [
                { max: 10, price: 100, current: 1 },
                { max: 5, price: 20, current: 2 }
            ],
            popup: {
                open: false
            }
        };
    }

    onChange( i, value ){
        let products = [...this.state.products];
        let product = Object.assign({}, this.state.products[i]);
        product.current = value;
        products[i] = product;
        this.setState({products});
    }

    onAdd() {
        let products = [...this.state.products];
        let product = { max: 20, price: 5, current: 1 };
        products.push(product);
        this.setState({products});
    }

    onRemove( ind ){
        let products = [...this.state.products];
        products.splice(ind, 1);
        this.setState({products});
    }
    
    setPopupOpen( bool )
    {
        let popup = Object.assign( {}, this.state.popup);
        popup.open = bool;
        this.setState({popup});
    }

    render()
    {   
        let summary = this.state.products.reduce( (result, product) => result + product.price*product.current, 0  );

        let inputs = this.state.products.map( (item, i) => {
            return <div key={i}>
                        <InputNumber min="1"
                            max={item.max} 
                            current={ item.current } 
                            change={ (val) => { this.onChange(i, val) } }/>

                        <Button variant="contained" color="secondary" onClick={ () => { this.onRemove(i) } }>
                            Удалить
                        </Button>
                        <hr/>
                    </div> 
        } );

        return <div>
                {inputs}
                <hr/>
                <Typography variant="subtitle1" gutterBottom>{summary}</Typography>
                <Modal title="Панель управления">
                    <Button variant="contained" color="primary" onClick={ () => { this.onAdd() } }>
                        Добавить
                    </Button>
                    <hr/>
                    <div>
                    <Button variant="contained" color="primary" onClick={ () => { this.setPopupOpen(true) } }>
                        Открыть
                    </Button>
                    </div>
                </Modal>
                <Dialog TransitionComponent={Transition} open={this.state.popup.open} onClose={ () => { this.setPopupOpen(false) } } aria-labelledby="simple-dialog-title">
                    <DialogTitle id="simple-dialog-title">Set backup account</DialogTitle>
                </Dialog>
            </div>;
    }


}

export default Cart;