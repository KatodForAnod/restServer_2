import React from 'react';
// eslint-disable-next-line no-unused-vars
import { Button, TextField } from '@material-ui/core';

class InputNumber extends React.Component
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

        this.onChange(result);
    }

    render()
    {
        return <div>
            <Button onClick={ () => this._normalizeValue( this.props.current - 1 ) } variant="outlined">-</Button>
            <TextField
                id="outlined-number"
                label="Number"
                type="number"
                value={this.props.current}
                InputLabelProps={{
                    shrink: true,
                }}
                onChange={ (e) => this._normalizeValue(e.target.value) }
                variant="outlined"
            />
            <Button onClick={ () => this._normalizeValue( this.props.current + 1 ) } variant="outlined">+</Button>
        </div>;
    }

}

export default InputNumber;