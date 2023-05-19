
const getPiece = (index, arg1, arg2) => mapPiece[index](arg1, arg2)

const mapPiece = [
  (arg1, arg2) => { return; },
  (me, name) => [me, name],
  (me, name) => [name, me],
  (me, n, initState = []) => ((initState = Array(n + 1).fill('')) && (initState[n] = me)) && initState,
  (me, n, initState = []) => ((initState = Array(n + 1).fill('')) && (initState[0] = me)) && initState
]
const filledArray = (arr) => Array.from(arr, (item) => item === undefined ? '' : item);

export default function findOutMrWrong(conversation) {
  const state = {};

  const infos = [
    "I'm in", // static position
    "The man behind me is ", // dynamic and static
    "The man in front of me is ", // dynamic and static
    "people in front of me.", // dynamic
    "people behind me." // dynamic
  ]

  const names = new Set()

  conversation.map((s) => {
    const [name, statement] = s.split(":")
    names.add(name);
    if (!state[name]) state[name] = [];
    const info = statement.split('me is ')[1] || Number(statement.match(/\d+/g)[0])

    infos.map((i, idx) => {
      statement.includes(i) && (state[name][idx] = info)
    })
  })

  const queue = Array(names.size);

  const size = queue.length

  const resultsFromArgumentsMap = Object.fromEntries(Object.entries(state).map(([name, args]) => {
    return [name, args.map((argument, i) => {
      if (argument > 0 && i === 0) {
        let imaginaryQueue = [];
        (imaginaryQueue[argument - 1] = name) && (imaginaryQueue = filledArray(imaginaryQueue));
        const imgQLen = imaginaryQueue.length;
        if (imgQLen < size) {
          for (let i = size - imgQLen; i >= 0; i--) {
            imaginaryQueue.push('')
          }
        }
        return imaginaryQueue
      } else {
        if (argument === 0 && i === 3) {
          const arr = Array(queue.length)
          return (arr[0] = name) && filledArray(arr)
        }
        if (argument === 0 && i === 4) {
          const arr = Array(queue.length);
          return (arr[queue.length - 1] = name) && filledArray(arr)
        }
        return getPiece(i, name, argument)
      }
    }).filter((n) => n && n)]
  }))

  const allPieces = Object.values(resultsFromArgumentsMap).flat()

  console.log(state)
  console.log(allPieces)

}