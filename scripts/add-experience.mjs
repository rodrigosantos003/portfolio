import fs from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';
import { fileURLToPath } from 'node:url';
import readline from 'node:readline/promises';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_PATH = path.resolve(__dirname, '../src/lib/data.json');

function printHelp() {
    console.log(`Usage:
  npm run add:experience
  npm run add:experience --company "Acme" --role "Engineer" --start "2026-01-01" --description "Did X" --description "Did Y"

Options:
  --company <string>           Company name (required)
  --role <string>              Role title (required)
  --start <YYYY|YYYY-MM-DD>    Start date or year (required)
  --end <YYYY|YYYY-MM-DD>      End date or year (optional)
  --description <string>       Description bullet (repeatable)
  --help                        Show this help message
`);
}

function parseArgs(argv) {
    const parsed = {
        description: []
    };

    for (let i = 0; i < argv.length; i += 1) {
        const arg = argv[i];

        if (arg === '--help') {
            parsed.help = true;
            continue;
        }

        if (!arg.startsWith('--')) {
            continue;
        }

        const key = arg.slice(2);
        const value = argv[i + 1];

        if (!value || value.startsWith('--')) {
            throw new Error(`Missing value for --${key}`);
        }

        if (key === 'description') {
            parsed.description.push(value.trim());
        } else {
            parsed[key] = value.trim();
        }

        i += 1;
    }

    return parsed;
}

function isValidDateOrYear(input) {
    const value = (input || '').trim();
    if (!value) {
        return false;
    }

    const yearPattern = /^\d{4}$/;
    const fullDatePattern = /^\d{4}-(0[1-9]|1[0-2])-([0-2]\d|3[01])$/;

    return yearPattern.test(value) || fullDatePattern.test(value);
}

async function askRequired(rl, question, validator) {
    while (true) {
        const answer = (await rl.question(question)).trim();
        if (!answer) {
            console.log('This field is required.');
            continue;
        }

        if (validator && !validator(answer)) {
            console.log('Invalid value. Please try again.');
            continue;
        }

        return answer;
    }
}

async function askOptional(rl, question, validator) {
    while (true) {
        const answer = (await rl.question(question)).trim();
        if (!answer) {
            return undefined;
        }

        if (validator && !validator(answer)) {
            console.log('Invalid value. Please try again or leave it empty.');
            continue;
        }

        return answer;
    }
}

async function askDescriptions(rl) {
    const input = (await rl.question('Description bullets (separate with ;): ')).trim();
    const items = input
        .split(';')
        .map((item) => item.trim())
        .filter(Boolean);

    if (items.length === 0) {
        console.log('Please provide at least one description bullet.');
        return askDescriptions(rl);
    }

    return items;
}

async function loadData() {
    const fileContent = await fs.readFile(DATA_PATH, 'utf8');
    const parsed = JSON.parse(fileContent);

    if (!Array.isArray(parsed.experiences)) {
        throw new Error('data.json is missing an experiences array.');
    }

    return parsed;
}

function buildExperience(input) {
    if (!input.company || !input.role || !input.start) {
        throw new Error('company, role, and start are required.');
    }

    if (!isValidDateOrYear(input.start)) {
        throw new Error('start must be in YYYY or YYYY-MM-DD format.');
    }

    if (input.end && !isValidDateOrYear(input.end)) {
        throw new Error('end must be in YYYY or YYYY-MM-DD format.');
    }

    if (!Array.isArray(input.description) || input.description.length === 0) {
        throw new Error('At least one description bullet is required.');
    }

    const experience = {
        company: input.company,
        role: input.role,
        start: input.start,
        description: input.description
    };

    if (input.end) {
        experience.end = input.end;
    }

    return experience;
}

async function collectInputFromPrompt() {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    try {
        const company = await askRequired(rl, 'Company: ');
        const role = await askRequired(rl, 'Role: ');
        const start = await askRequired(rl, 'Start (YYYY or YYYY-MM-DD): ', isValidDateOrYear);
        const end = await askOptional(rl, 'End (optional, YYYY or YYYY-MM-DD): ', isValidDateOrYear);
        const description = await askDescriptions(rl);

        return { company, role, start, end, description };
    } finally {
        rl.close();
    }
}

async function main() {
    const args = parseArgs(process.argv.slice(2));

    if (args.help) {
        printHelp();
        return;
    }

    const hasCliInput = args.company || args.role || args.start || args.end || args.description.length > 0;
    const input = hasCliInput ? args : await collectInputFromPrompt();

    const data = await loadData();
    const newExperience = buildExperience(input);

    // Place newest entries first to preserve current-role behavior.
    data.experiences.unshift(newExperience);

    await fs.writeFile(DATA_PATH, `${JSON.stringify(data, null, 2)}\n`, 'utf8');

    console.log('\nExperience added successfully.');
    console.log(`Company: ${newExperience.company}`);
    console.log(`Role: ${newExperience.role}`);
}

main().catch((error) => {
    console.error(`Error: ${error.message}`);
    process.exitCode = 1;
});
