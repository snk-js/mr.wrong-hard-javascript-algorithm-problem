
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

    const nameFormated = typeof info === 'string' && info.replace('.', '')

    infos.map((i, idx) => {
      if (typeof i === 'string') (i = i.replace('.', ''))
      statement.includes(i) && (state[name][idx] = nameFormated || info)
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


  const objectiveArgs = Object.fromEntries(
    Object.entries(collectArgsByType(resultsFromArgumentsMap, 'number')).map(([name, positionArr]) => {
      let position = positionArr[0];
      let arr = Array(size).fill(null); // Assuming the length is always 3
      arr[position] = name;
      return [name, arr];
    })
  );

  const subjectiveArgs = collectArgsByType(resultsFromArgumentsMap, 'string')

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

  const possiblePermutations = Object.entries(Object.entries(subjectiveArgs).reduce((acc, [name, args]) => {
    const states = args.map(arg => possibleStates(arg, size));
    acc[name] = states.reduce((acc, state2) => {
      return mergeStates(acc, state2);
    }, states.shift());
    return acc;
  }, {}))



  const subjectiveMergedWithObjectiveArgs = possiblePermutations.map(([name, args]) => {
    if (objectiveArgs[name]) args = args.map(arg => mergeQueuePossibility(arg, objectiveArgs[name])).filter(Boolean);
    return [name, args]
  })

  const mutableObject = Object.fromEntries(subjectiveMergedWithObjectiveArgs);
  const keys = Object.keys(mutableObject);

  const dynamicArgsMatchBetweenAgents = () => {
    let i = 0;
    let k = 0;
    let l = 0;
    let entrie = []
    const truthy = {}

    const getRestArguments = () => Object.entries(mutableObject);

    agent: while ((entrie = extract(mutableObject, keys[i]))) {
      const [name, values] = entrie;
      truthy[name] = [];
      agentArg: for (const imaginaryQeuePossibility of values) {
        restArgs: for (const [argOwner, args] of getRestArguments()) {
          for (const arg of args) {
            console.log(name + k, argOwner + l, mergeQueuePossibility(imaginaryQeuePossibility, arg))
            l = (l + 1) % args.length
          }
        }
        k = (k + 1) % values.length
      }
      i++
    }
    return truthy
  }

  console.log(dynamicArgsMatchBetweenAgents());

}

// Merge two states and return the merged state
function mergeQueuePossibility(state1, state2) {
  const mergedState = Array(state1.length).fill(null);  // initialize with null values
  let names = new Set();

  for (let i = 0; i < state1.length; i++) {
    if (state1[i] !== null && state2[i] !== null) {
      if (state1[i] !== state2[i]) {
        return null;
      } else {
        mergedState[i] = state1[i];
      }
    } else if (state1[i] !== null) {
      mergedState[i] = state1[i];
    } else if (state2[i] !== null) {
      mergedState[i] = state2[i];
    }

    if (mergedState[i]) {
      if (names.has(mergedState[i])) {
        return null; // Names repeated in the merged state
      } else {
        names.add(mergedState[i]);
      }
    }
  }

  return mergedState;
}

// extract the key from the object and return the key and the value
function extract(obj, key) {
  if (obj.hasOwnProperty(key)) {
    const value = obj[key];
    delete obj[key];
    return [key, value];
  }
}