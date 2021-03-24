// eslint-disable-next-line no-unused-vars
import {Parody, ParodyDom} from '../parody';

class InputNumber extends Parody
{
    constructor( props )
    {
        super(props);

        this.onChange = ('change' in props) ? props.change  : function(){};
    }

    _normalizeValue( value )
    {
        let val = parseInt(value);
        let result = val;

        if( isNaN(val) || val < this.props.min ){
            result = this.props.min;
        }else if( val > this.props.max ){
            result = this.props.max;
        }

        this.props.current = result;
        this.onChange(result);
    }

    render()
    {
        let min = document.createElement('input');
        min.setAttribute('type', 'button');
        min.setAttribute('value', '-');
        min.addEventListener('click', () => {
            this._normalizeValue( this.props.current - 1 );
        })

        let input = document.createElement('input');
        input.setAttribute('type', 'text');
        input.setAttribute('value', this.props.current);
        input.addEventListener('change', (e) => {
            this._normalizeValue(e.target.value);
        })

        let max = document.createElement('input');
        max.setAttribute('type', 'button');
        max.setAttribute('value', '+');

        max.addEventListener('click', () => {
            this._normalizeValue( this.props.current + 1 );
        })

        let div = document.createElement('div');
        div.appendChild(min);
        div.appendChild(input);
        div.appendChild(max);


        return super.render( div );
    }

}

export default InputNumber;