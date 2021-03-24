// eslint-disable-next-line no-unused-vars
import {Parody, ParodyDom, watchObj} from '../parody';
// eslint-disable-next-line no-unused-vars
import InputNumber from './input-number';

class Cart extends Parody{

    constructor( props ){
        super(props);

        this.state = {};

        this.initProxy( { products: [
            { max: 10, price: 100, current: 1 },
            { max: 5, price: 20, current: 2 }
        ]} );
        
    }

    onChange( i, value )
    {
        this.state.products[i].current = value;
    }

    onAdd = () => {
        this.state.products.push({ max: 20, price: 5, current: 1 });
    }

    onRemove = ( ind ) => {
        this.state.products.splice(ind, 1);
    }
    
    render()
    {   
        let summary = this.state.products.reduce( (result, product) => result + product.price*product.current, 0  );

        let inputs = this.state.products.map( (item, i) => {
            return <div>
                        <InputNumber min="1" max={item.max} current={ item.current } 
                    change={this.onChange.bind(this, i)}/>
                        <input type="button" value="x" onclick={this.onRemove.bind(this, i)}/>
                        <hr/>
                    </div> 
        } );

        return super.render(
            <div>
                {inputs}
                <hr/>
                <div>{summary}</div>
                <input type="button" value="+" onclick={this.onAdd} />
            </div>
        );
    }


}

export default Cart;