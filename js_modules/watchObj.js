function watchObj( element, callback ){

    return new Proxy( element, {
        set( target, name, value ){
            target[name] = value;
            callback( name, value );
            return true;
        },
        get(target, name){
            switch( typeof target[name] ){
                case "function":
                    return target[name].bind(target);
                default:
                    return watchObj( target.style, callback);
            }
        }
    } )
}

export default watchObj;