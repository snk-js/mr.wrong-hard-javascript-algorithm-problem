
export default function findOutMrWrong(conversation) {
  const state = {};

  const infos = [
    "I'm in", // static position
    "The man behind me is ", // dynamic (have many possible truthy permutations)
    "The man in front of me is ", // dynamic (have many possible truthy permutations).
    "people in front of me.", // same as last or first position
    "people behind me." // same as last or first position
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

  const mapPiece = [
    (me, n) => n - 1,
    (me, name) => [me, name],
    (me, name) => [name, me],
    // front
    (me, n) => n,
    // back
    (me, n) => size - n - 1
  ]

  const getPiece = (index, arg1, arg2) => mapPiece[index](arg1, arg2)

  const resultsFromArgumentsMap = Object.fromEntries(Object.entries(state).map(([name, args]) => {
    return [name, Array.from(new Set(args.map((argument, i) => {
      if (argument > 0 && i === 0) return argument - 1
      // if 0 people is in front of me
      // I am theorically the first one 
      if (argument === 0 && i === 3) return 0
      // if 0 people is behind me
      // I am theorically the last one
      if (argument === 0 && i === 4) return size - 1
      return getPiece(i, name, argument)

    }).filter((n) => n !== null && n !== undefined)))]
  }))

  const collectArgsByType = (argsList, type) => {
    return Object.fromEntries(Object.entries(argsList)
      .map(([name, args]) => {
        return [
          name,
          args.filter(arg => {
            if (Array.isArray(arg)) {
              return arg.every(item => typeof item === type);
            } else {
              return typeof arg === type;
            }
          }),
        ];
      })
      .filter(([name, args]) => args.length > 0));
  };

  const subjectiveArgs = collectArgsByType(resultsFromArgumentsMap, 'string')

  const objectiveArgs = collectArgsByType(resultsFromArgumentsMap, 'number')


  function possibleStates(pair, size) {
    const positions = Array(size).fill(null);
    const results = [];

    for (let i = 0; i < size - 1; i++) {
      const state = [...positions];
      state[i] = pair[0];
      state[i + 1] = pair[1];
      results.push(state);
    }

    return results;
  }

  function mergeStates(states1, states2) {
    const merged = [];

    for (const state1 of states1) {
      for (const state2 of states2) {
        const mergedState = mergeTwoStates(state1, state2);
        if (mergedState) {
          merged.push(mergedState);
        }
      }
    }

    return merged;
  }

  function mergeTwoStates(state1, state2) {
    const mergedState = [];
    const names = new Set();

    for (let i = 0; i < state1.length; i++) {
      if (state1[i] === null && state2[i] === null) {
        mergedState.push(null);
      } else if (state1[i] === null) {
        if (names.has(state2[i])) {
          return null; // conflict: name already exists in the mergedState
        }
        mergedState.push(state2[i]);
        names.add(state2[i]);
      } else if (state2[i] === null) {
        if (names.has(state1[i])) {
          return null; // conflict: name already exists in the mergedState
        }
        mergedState.push(state1[i]);
        names.add(state1[i]);
      } else if (state1[i] === state2[i]) {
        if (names.has(state1[i])) {
          return null; // conflict: name already exists in the mergedState
        }
        mergedState.push(state1[i]);
        names.add(state1[i]);
      } else {
        return null; // conflict: cannot merge
      }
    }

    return mergedState;
  }

  const possiblePermutations = Object.entries(subjectiveArgs).reduce((acc, [name, args]) => {
    const states = args.map(arg => possibleStates(arg, size));
    acc[name] = states.reduce((acc, state2) => {
      return mergeStates(acc, state2);
    }, states.shift());
    return acc;
  }, {})

  console.log(possiblePermutations);

}