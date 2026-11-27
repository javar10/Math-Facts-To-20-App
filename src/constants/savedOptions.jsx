export const difficultyOptions = ['beginner', 'easy', 'medium', 'hard', 'expert']

const DEFAULT_DIFFICULTIES = {
    beginner: 2,
    easy: 7,
    medium: 13,
    hard: 17,
    expert: 22,
};

const OPERATION_DIFFICULTIES = {
    addition: {
        beginner: 5,
        easy: 10,
        medium: 15,
        hard: 20,
        expert: 25,
    },
};

export const getDifficultyTargets = (operation) => {
    return OPERATION_DIFFICULTIES[operation] || DEFAULT_DIFFICULTIES;
};


// Numbers up to:
export const maxSum = [5, 10, 20]

// Mode or Operation:
export const operationOptions = [
    'addition',
    'subtraction',
    // 'both'
]