const { Observable, map } = require('rxjs');

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
    setTimeout(() => {
      observer.next(4);
      observer.complete();
    }, 1000);
  }).pipe( map((value) => value * 3));
  
  console.log('just before subscribe');

  //observable.subscribe(x => console.log('got value ' + x));‹
  observable.subscribe({
    next: x => console.log('* got value ' + x),
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