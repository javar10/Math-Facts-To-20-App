export const difficultyOptions = ['beginner', 'easy', 'medium', 'hard', 'expert']

const DEFAULT_DIFFICULTIES = {
    beginner: 5,
    easy: 10,
    medium: 15,
    hard: 30,
    expert: 50,
};

const OPERATION_DIFFICULTIES = {
    addition: {
        beginner: 5,
        easy: 12,
        medium: 20,
        hard: 40,
        expert: 60,
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