const { Observable, map, filter, switchMap, of } = require('rxjs');

// promise (eager)
console.log('before declaring promise')
var promise = new Promise(function (resolve, reject) {
    console.log('* hello from the promise land');
    resolve({ value: 1 });
});
console.log('after declaring promise');
promise.then((value) => {console.log('****** promise value: ', value);})
console.log('****** end promise demo \n')

// observables (lazy)
console.log('before declaring observable');
var observable = new Observable( (observer) => {
    console.log('* hello from inside observable')
    observer.next(1);
    observer.next(2);
    observer.next(3);
    
    setTimeout(() => { // make it wait
      observer.next(4);
      observer.complete();// done observing (no more data can be sent)
      observer.next(5);// will not be observed
    }, 1000);
    
  }).pipe( map((value) => value * 3));// every source value will be mapped to a new value (sourceVal * 3)
  
  console.log('just before subscribe');

  // observable.subscribe(x => console.log('got value ' + x));
  observable.subscribe({
    next: x => console.log('* A got value ' + 3* x),
    error: err => console.error('something wrong occurred: ' + err),
    complete: () => console.log('done'),
  });
  
  console.log('just after subscribe');

// just before subscribe
// got value 1
// got value 2
// got value 3
// just after subscribe
// got value 4
// done