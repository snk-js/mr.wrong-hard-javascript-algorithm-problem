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
```

Two solutions are possible in the last example: 1) Peter is Mr.Wrong and the order is Tom, John, Peter; 2) Tom is Mr.Wrong and the order is John, Peter, Tom. In this case, the result is null.
