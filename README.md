# mr.wrong-hard-javascript-algorithm-problem

I found this problem mesmerizing curious to solve, I just wanted to record my progress

Task
Mr.Right always tell the truth, Mr.Wrong always tell the lies.

Some people are queuing to buy movie tickets, and one of them is Mr.Wrong. Please judge who is Mr.Wrong according to their conversation.

[[Input]] A string array: conversation

They always talking about I'm in ... position., The man behind me is ... ., The man in front of me is ... ., There are/is ... people in front of me., There are/is ... people behind me..

Please note that everyone has at least one sentence and only one people is Mr.Wrong ;-)

[[Output]] A string: The name of Mr.Wrong. If can not judge, return null (when several valid solutions are possible).

```
Examples:
conversation=[
"John:I'm in 1st position.",
"Peter:I'm in 2nd position.",
"Tom:I'm in 1st position.",
"Peter:The man behind me is Tom."
]
findOutMrWrong(conversation) should return "Tom"

conversation=[
"John:I'm in 1st position.",
"Peter:I'm in 2nd position.",
"Tom:I'm in 1st position.",
"Peter:The man in front of me is Tom."
]
findOutMrWrong(conversation) should return "John"

conversation=[
"John:I'm in 1st position.",
"Peter:There is 1 people in front of me.",
"Tom:There are 2 people behind me.",
"Peter:The man behind me is Tom."
]
findOutMrWrong(conversation) should return "Tom"

const conversation=[
"John:The man behind me is Peter.",
"Peter:There is 1 people in front of me.",
"Tom:There are 2 people behind me.",
"Peter:The man behind me is Tom."
]
findOutMrWrong(conversation) should return null


Two solutions are possible in the last example: 1) Peter is Mr.Wrong and the order is Tom, John, Peter; 2) Tom is Mr.Wrong and the order is John, Peter, Tom. In this case, the result is null.

// personal notes:

on line 56
// the result of the disired data structure to solve the problem is done
// {
// Dowfls: [ 3 ],
// Ljiyxbmr: [ 1 ],
// Cvvugb: [ 2 ],
// Tzjlvruhk: [ [ 'Tzjlvruhk', 'Dowfls.' ], 2 ]
// }

// where the array of indexs are the possible
// positions of the names in the queue

// where the array of names are the possible pair
// of names that should match one or more specific
// position of the queue

// now to solve this problem we need to think proceduraly:

// suppose there's A, B and C agents in the queue
// so the size of the queue is n = 3;
// in order to find one mr. wrong (because may have been more than one)
// we need to pick one of the agents and verify if the other agents
// if n - 1 agents to be truthy altogether and the picked agent to be falsy
// then the picked agent is the mr. wrong
// -------------------------------

// edge cases and special conditions:
// 1. a agent is truthy if none of it's arguments are falsy

// 2. a agent can have 0 or more arguments

// 3. a agent can have 0 or more possible truthy permutations in a given argument

// 4. an argument is falsy if it doesn't match to all the arguments of the other agents altogether

// 5. an argument with more then 1 possible truthy permutations is truthy if one of the permutations is truthy
// compared to all arguments of the other agents altogether

// 6. to assert if a agent is possible mr. wrong
// 6.1 we need to pick this agent
// 6.2 firstly mount the truthy permutations of the arguments of the other agents
// mostly will be 1 way to be truthy
// 6.3 if picked agent has none truthy arguments against the all
// truthy permutations of the other agents then the picked agent is the mr. wrong
// 7. a result is a agent if one and only one agent is mr. wrong
// 8. if there's more then one mr. wrong then the result is inconclusive
// 9. if there's no mr. wrong then the result is inconclusive

// example:
// {
// Dowfls: [ 3 ],
// Ljiyxbmr: [ 1 ],
// Cvvugb: [ 2 ],
// Tzjlvruhk: [ [ 'Tzjlvruhk', 'Dowfls.' ], 2 ]
// }

// Dowfls = 0
// Ljiyxbmr = 1
// Cvvugb = 2
// Tzjlvruhk = 3

// enum possibleAgents = {0, 1, 2, 3}: x

// now we visualize possible truthy permutations of the arguments of the other agents:
// to agent 0: [x, x, x, 0];
// to agent 1: [x, 1, x, x];
// to agent 2: [x, x, 2, x];
// to agent 3: [
// -------------- 1st argument ----------------
// [x, x, 3, x] due to his argument being at 3rd position
// -------------- 2nd argument ----------------
// [3, 0, x, x] due to his argument of always being in front of Dowfls (1)
// [x, 3, 0, x] due to his argument of always being in front of Dowfls (2)
// [x, x, 3, 0] due to his argument of always being in front of Dowfls (3)
// --------------------------------------------
// ]

// if we pick agent, he has 2 arguments, one which is static and the other is dynamic
// which means that for that dynamic argument being truthy, one of the 3 possible permutations
// must be truthy

// in order for agent 3 to be mr. wrong:
// 1. he must not be in front of Dowfls in any situtation
// OR
// 2. he must not be at the 3rd position of the queue in any situation

// 6.2 following a truthy version of the queue except the picked agent:
// [x, 1, 2, 0]
// 6.3 if picked agent has none truthy arguments against the all:
// [x, x, 3, x] // false ( doesn't match )
// [3, 0, x, x] // false ( doesn't match )
// [x, 3, 0, x] // false ( doesn't match )
// [x, x, 3, 0] // false ( doesn't match )
// then the picked agent is the mr. wrong

// BUT, this is not the definitive answer
// because we need to check if all other
// picked agents isolatedly wouldn't be mr. wrong
// in that same example, if we pick agent 2, we would have:

// 0. [x, x, x, 0]
// 1. [x, 1, x, x]
// 3. [
// -------------- 1st argument ----------------
// [x, x, 3, x], // true
// -------------- 2nd argument ----------------
// [3, 0, x, x], // false
// [x, 3, 0, x], // false
// [x, x, 3, 0], // true
// --------------------------------------------
// ]

// as we see both arguments can be truthy together so agent 3 is not mr. wrong
// now we see agent 2 we picked:

// 0. [x, x, 2, x] // false, because in all other arguments
// the 3rd position is already taken by agent 3
// so agent 2 is mr. wrong

// finally, there's more then one mr. wrong, so the result is inconclusive (null as result)
```
