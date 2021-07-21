const { Subject, BehaviorSubject, ReplaySubject, AsyncSubject } = require('rxjs');

console.log('******************************** subject - unbuffered value')
const subject = new Subject();

subject.next(1);// called from somewhere else in the application

// no one was subscribed so the value 1 is lost
subject.subscribe((value) => console.log('A: ', value));// somewhere in the application listening for a change
subject.next(2);
subject.subscribe((value) => console.log('B: ', value));
subject.next(3);


console.log('\n')
console.log('******************************** behaviorSubject - single buffer value')
const behaviorSubject = new BehaviorSubject(1);

behaviorSubject.subscribe((value) => console.log('A: ', value));// somewhere in the application listening for a change
behaviorSubject.next(2);
behaviorSubject.subscribe((value) => console.log('B: ', value));
behaviorSubject.next(3);
behaviorSubject.subscribe((value) => console.log('C: ', value));

console.log('\n');
console.log('****************************** replaySubject - n buffer values')
const replaySubject = new ReplaySubject(3); // buffer size 3

replaySubject.next(1);
replaySubject.next(2);
replaySubject.next(3);
replaySubject.subscribe((value) => console.log('A:', value));// gets 1, 2, 3
replaySubject.next(4);// one new value for A
replaySubject.subscribe((value) => console.log('B:', value));// gets 2, 3, 4
replaySubject.next(5);// one new value for A and B (they already received previous two)
replaySubject.subscribe((value) => console.log('C:', value));// gets 3, 4, 5


console.log('\n');
console.log('****************************** asyncSubject - receive last value on complete')
const asyncSubject = new AsyncSubject(); 

asyncSubject.next(1);
asyncSubject.subscribe((value) => console.log('A: ', value));// gets nothing
asyncSubject.next(2);
asyncSubject.subscribe((value) => console.log('B: ', value));// gets nothing
asyncSubject.next(3);
asyncSubject.next(4);
asyncSubject.next(5);
asyncSubject.subscribe((value) => console.log('C: ', value));// gets nothing yet

asyncSubject.complete();// now A, B, and C get the last value sent - 5