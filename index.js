export default function findOutMrWrong(conversation) {
    const { state, people, queue, size } = extractInfos(conversation);
    const info = classifiedInfo(size);
    const mappedPropositionByName = classifyPropositionByName(state, size, info);
    const peoplePositions = peopleCurrentPositionsInTheQueue(mappedPropositionByName, size);
    const nameWindowsByNames = nameWindows(mappedPropositionByName, "string");
    const queuePermutations = possiblePermutations(size, queue, nameWindowsByNames);
    const permutationsObj = Object.fromEntries(queuePermutations);
    const entries = Object.entries(permutationsObj);
    if (entries.length === 1 && !entries[0][1].length) return entries[0][0];
    updateQueuePermuts(peoplePositions, permutationsObj, queuePermutations);
    const possibleQueues = subjectiveMergedWithpeoplePositions(queuePermutations, peoplePositions);
    const result = mergeAll(possibleQueues, people);

    if (Object.values(result).flat().length === 1) {
        for (let [name, queue] of Object.entries(result)) {
            if (!queue.length) continue;
            if (queue.length && queue[0].length && queue[0].length === size) return name;
        }
    }
    // console.log(result);
    return specialLiar(result) || specialLiar2(result) || null;
}

function specialLiar2(obj) {
    let counter = 0;
    let specialOne = null;

    for (let person in obj) {
        const firstArray = obj[person][0];

        if (firstArray && !firstArray.includes(null)) {
            specialOne = person;
            counter++;
        }
    }

    return counter === 1 ? specialOne : null;
}

function specialLiar(possibleQueuesByName) {
    let candidates = [];
    let fullQueuePerson = null;

    for (let person in possibleQueuesByName) {
        if (
            Array.isArray(possibleQueuesByName[person]) &&
            possibleQueuesByName[person].length > 1
        ) {
            let hasNull = possibleQueuesByName[person].some((arr) => arr.includes(null));
            let isFull = possibleQueuesByName[person].some((arr) => !arr.includes(null));

            if (hasNull) {
                candidates.push(person);
            }

            if (isFull) {
                if (fullQueuePerson === null) {
                    fullQueuePerson = person;
                } else {
                    return null;
                }
            }
        } else {
        }
    }

    if (candidates.length === 1) {
        const uniqueSolutions = Object.entries(possibleQueuesByName).filter(([name, queues]) => {
            return queues.length === 1;
        });

        if (uniqueSolutions.length === 1) {
            if (uniqueSolutions[0][1].every((arr) => !arr.includes(null))) {
                return uniqueSolutions[0][0];
            }
        }

        return candidates[0];
    }

    if (candidates.length > 1 && fullQueuePerson) {
        return fullQueuePerson;
    }

    return null;
}

const mergeAll = (possibleQueues, people) => {
    const result = {};
    for (let i = 0; i < people.length; i++) {
        let possibleQueueClone = Object.fromEntries([...possibleQueues]);
        delete possibleQueueClone[people[i]];
        possibleQueueClone = Object.entries(possibleQueueClone);

        let mergedState = Object.fromEntries([possibleQueueClone.pop()]);

        for (const [name, possibleQueues] of possibleQueueClone) {
            mergedState = mergeQueueObject({
                ...mergedState,
                [name]: possibleQueues,
            });
        }

        result[people[i]] = Object.values(mergedState)[0];
    }
    return result;
};

const mergeQueueObject = (mutableObject) => {
    const keys = Object.keys(mutableObject);
    const truthy = {};
    const cache = new Set(); // Cache to store evaluated pairs

    for (const key of keys) {
        if (!mutableObject.hasOwnProperty(key)) continue;
        const nameValues = mutableObject[key];

        for (const [argOwner, args] of Object.entries(mutableObject)) {
            if (argOwner === key) continue; // Skip the same owner

            const pairName = `${key}-${argOwner}`;
            if (cache.has(pairName) || cache.has(`${argOwner}-${key}`)) continue; // Skip if pair already evaluated

            truthy[pairName] = [];

            for (const nv of nameValues) {
                for (const arg of args) {
                    const mergedState = mergeQueuePossibility(nv, arg);
                    mergedState && truthy[pairName].push(mergedState);
                }
            }

            cache.add(pairName);
        }
    }

    return truthy;
};

// Merge two states and return the merged state
function mergeQueuePossibility(state1, state2) {
    const mergedState = Array(state1.length).fill(null); // initialize with null values
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

function removePersonFromObj(obj, keyContaning) {
    const clone = { ...obj };
    for (const key in obj) {
        if (key.includes(keyContaning)) {
            delete clone[key];
        }
    }

    return clone;
}

function findLiar(allTruthyPossibilities, people) {
    let candidates = [];

    for (let person of people) {
        let remainingPossibilities = { ...allTruthyPossibilities }; // make a copy
        for (let pair in remainingPossibilities) {
            if (pair.includes(person)) {
                delete remainingPossibilities[pair];
            }
        }

        let allPairsMatch = Object.values(remainingPossibilities).every((list) => list.length > 0);
        if (allPairsMatch) {
            candidates.push(person);
        }
    }

    if (candidates.length === 0) {
        console.log("No liars found, but it's also inconclusive.");
        return null;
    } else if (candidates.length === 1) {
        console.log(`The liar is ${candidates[0]}`);
        return candidates[0];
    } else {
        console.log(`Inconclusive. Possible liars: ${candidates.join(", ")}`);
        // if all in people are candidates, then return candidates
        if (candidates.length === people.length) {
            return candidates;
        }
        return null;
    }
}

const extractInfos = (c) => {
    const state = {};
    const names = new Set();
    const infos = [
        "I'm in",
        "The man behind me is ",
        "The man in front of me is ",
        "people in front of me.",
        "people behind me.",
    ];
    c.map((s) => {
        const [name, statement] = s.split(":");
        names.add(name);
        if (!state[name]) state[name] = [];
        const info = statement.split("me is ")[1] || Number(statement.match(/\d+/g)[0]);

        const nameFormated = typeof info === "string" && info.replace(".", "");

        infos.map((i, idx) => {
            if (typeof i === "string") i = i.replace(".", "");
            statement.includes(i) && (state[name][idx] = nameFormated || info);
        });
    });
    const people = Array.from(names);
    const queue = Array(names.size);
    const size = queue.length;
    return { state, people, queue, size };
};

const classifyEntrie = (size) => [
    (me, n) => n - 1,
    (me, name) => [me, name],
    (me, name) => [name, me],
    // front
    (me, n) => n,
    // back
    (me, n) => size - n - 1,
];
const classifiedInfo = (size) => (index, arg1, arg2) => classifyEntrie(size)[index](arg1, arg2);

const classifyPropositionByName = (state, size, info) =>
    Object.fromEntries(
        Object.entries(state).map(([name, args]) => {
            return [
                name,
                Array.from(
                    new Set(
                        args
                            .map((argument, i) => {
                                if (argument > 0 && i === 0) return argument - 1;
                                // if 0 people is in front of me
                                // I am theorically the first one
                                if (argument === 0 && i === 3) return 0;
                                // if 0 people is behind me
                                // I am theorically the last one
                                if (argument === 0 && i === 4) return size - 1;
                                return info(i, name, argument);
                            })
                            .filter((n) => n !== null && n !== undefined)
                    )
                ),
            ];
        })
    );

const nameWindows = (argsList, type) => {
    return Object.fromEntries(
        Object.entries(argsList)
            .map(([name, args]) => {
                return [
                    name,
                    args.filter((arg) => {
                        if (Array.isArray(arg)) {
                            return arg.every((item) => typeof item === type);
                        } else {
                            return typeof arg === type;
                        }
                    }),
                ];
            })
            .filter(([name, args]) => args.length > 0)
    );
};

const peopleCurrentPositionsInTheQueue = (mappedPropositionByName, size) =>
    Object.fromEntries(
        Object.entries(nameWindows(mappedPropositionByName, "number")).map(
            ([name, positionArr]) => {
                let position = positionArr[0];
                let arr = Array(size).fill(null);
                arr[position] = name;
                return [name, arr];
            }
        )
    );

function possibleStates(pair, size, state) {
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

const possiblePermutations = (size, state, subjectiveArgs) =>
    Object.entries(
        Object.entries(subjectiveArgs).reduce((acc, [name, args]) => {
            const states = args.map((arg) => possibleStates(arg, size, state));
            acc[name] = states.reduce((acc, state2) => {
                return mergeStates(acc, state2);
            }, states.shift());
            return acc;
        }, {})
    );

const updateQueuePermuts = (peoplePositions, permutationsObj, queuePermutations) => {
    Object.entries(peoplePositions).forEach(([name, args]) => {
        if (!permutationsObj[name]) {
            queuePermutations.push([name, [args]]);
        }
    });
};

const subjectiveMergedWithpeoplePositions = (queuePermutations, peoplePositions) =>
    queuePermutations.map(([name, args]) => {
        if (peoplePositions[name])
            args = args
                .map((arg) => mergeQueuePossibility(arg, peoplePositions[name]))
                .filter(Boolean);
        return [name, args];
    });
