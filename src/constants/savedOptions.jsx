export const difficultyOptions = ['beginner', 'easy', 'medium', 'hard', 'expert']

const DEFAULT_DIFFICULTIES = {
    beginner: 5,
    easy: 8,
    medium: 12,
    hard: 20,
    expert: 30,
};

const OPERATION_DIFFICULTIES = {
    addition: {
        beginner: 5,
        easy: 10,
        medium: 15,
        hard: 20,
        expert: 30,
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