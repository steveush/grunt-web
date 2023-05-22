( function( _ ) {

    _.TestClass = class TestClass {

        static staticField = 'static-field';

        static staticMethod() {
            return 'static-method';
        }

        suppliedArgs;

        constructor( ...spreadArgs ) {
            this.suppliedArgs = spreadArgs;
        }

        #privateField = 'private-field';

        #privateMethod() {
            return 'private-method';
        }

        publicField = 'public-field';

        publicMethod(){
            return 'public-method';
        }
    };

} )( rootNamespace );