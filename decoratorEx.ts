function g() {
    return function(target,propertyKey:string,descriptor:PropertyDescriptor) {
        console.log(target);
        console.log(propertyKey);
        console.log(descriptor);
    }
}

class C {
    @g()
    method() {
        console.log('m');
    }
}