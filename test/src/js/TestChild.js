( function( _, _child ){

    _.TestChild = class TestChild {
        add( a, b ){
            return _child.add( a, b );
        }
        subtract( a, b ){
            return _child.subtract( a, b );
        }
        multiply( a, b ){
            return _child.multiply( a, b );
        }
        divide( a, b ){
            return _child.divide( a, b );
        }
    };

} )( rootNamespace, rootNamespace.childNamespace );