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
  node scripts/add-bullets.mjs

What it does:
  1. Shows your experiences list
  2. Lets you choose one with arrow keys + Enter
  3. Appends new bullets to that experience
`);
}

async function loadData() {
    const fileContent = await fs.readFile(DATA_PATH, 'utf8');
    const parsed = JSON.parse(fileContent);

    if (!Array.isArray(parsed.experiences)) {
        throw new Error('data.json is missing an experiences array.');
    }

    return parsed;
}

function formatExperience(experience) {
    const company = experience.company || 'Unknown company';
    const role = experience.role || 'Unknown role';
    const start = experience.start || '?';
    const end = experience.end || 'Present';
    return `${role} @ ${company} (${start} - ${end})`;
}

function moveCursorUp(lines) {
    if (lines > 0) {
        process.stdout.write(`\u001b[${lines}A`);
    }
}

function clearCurrentLine() {
    process.stdout.write('\u001b[2K\r');
}

function renderExperienceList(experiences, selectedIndex) {
    console.log('Select an experience (use Arrow Up/Down, then Enter):');
    experiences.forEach((experience, index) => {
        const prefix = index === selectedIndex ? '❯' : ' ';
        console.log(`${prefix} ${formatExperience(experience)}`);
    });
}

function renderExperienceLine(experience, index, isSelected) {
    const prefix = isSelected ? '>' : ' ';
    const green = '\u001b[32m';
    const reset = '\u001b[0m';
    const text = `${prefix} ${formatExperience(experience)}`;
    process.stdout.write(`\r${isSelected ? `${green}${text}${reset}` : text}\n`);
}

function moveCursorToRow(offsetFromCurrent) {
    if (offsetFromCurrent < 0) {
        process.stdout.write(`\u001b[${-offsetFromCurrent}A`);
    } else if (offsetFromCurrent > 0) {
        process.stdout.write(`\u001b[${offsetFromCurrent}B`);
    }
}

async function chooseExperienceIndex(experiences) {
    if (experiences.length === 0) {
        throw new Error('No experiences found to edit.');
    }

    if (!process.stdin.isTTY || !process.stdout.isTTY) {
        throw new Error('Interactive selection requires a TTY terminal.');
    }

    let selectedIndex = 0;

    // Initial render — cursor ends up below the last item
    process.stdout.write('Select an experience (use Arrow Up/Down, then Enter):\n');
    for (let i = 0; i < experiences.length; i++) {
        renderExperienceLine(experiences[i], i, i === selectedIndex);
    }
    // Cursor is now on the line AFTER the last item.
    // Track how many lines below the header the cursor currently sits.
    // "cursorRow" = index of the item row the cursor is on, or experiences.length if past the end.
    let cursorRow = experiences.length; // cursor is one past the last item

    return new Promise((resolve) => {
        const onData = (buffer) => {
            const key = buffer.toString('utf8');

            if (key === '\u0003') {
                process.stdout.write('\nCancelled.\n');
                process.stdin.setRawMode(false);
                process.stdin.pause();
                process.stdin.off('data', onData);
                process.exit(1);
            }

            if (key === '\r' || key === '\n') {
                // Move cursor past the list before resolving
                moveCursorToRow(experiences.length - cursorRow);
                process.stdout.write('\n');
                process.stdin.setRawMode(false);
                process.stdin.pause();
                process.stdin.off('data', onData);
                resolve(selectedIndex);
                return;
            }

            let newIndex = selectedIndex;
            if (key === '\u001b[A') {
                newIndex = (selectedIndex - 1 + experiences.length) % experiences.length;
            } else if (key === '\u001b[B') {
                newIndex = (selectedIndex + 1) % experiences.length;
            } else {
                return;
            }

            if (newIndex === selectedIndex) return;

            // 1. Move cursor to the old selected row and deselect it
            moveCursorToRow(selectedIndex - cursorRow);
            clearCurrentLine();
            renderExperienceLine(experiences[selectedIndex], selectedIndex, false);
            cursorRow = selectedIndex + 1;

            // 2. Move cursor to the new selected row and highlight it
            moveCursorToRow(newIndex - cursorRow);
            clearCurrentLine();
            renderExperienceLine(experiences[newIndex], newIndex, true);
            cursorRow = newIndex + 1;

            selectedIndex = newIndex;
        };

        process.stdin.setRawMode(true);
        process.stdin.resume();
        process.stdin.on('data', onData);
    });
}

async function askBullets() {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    try {
        while (true) {
            const input = (await rl.question('New bullets (separate with ;): ')).trim();
            const bullets = input
                .split(';')
                .map((item) => item.trim())
                .filter(Boolean);

            if (bullets.length === 0) {
                console.log('Please provide at least one bullet.');
                continue;
            }

            return bullets;
        }
    } finally {
        rl.close();
    }
}

async function main() {
    const args = process.argv.slice(2);
    if (args.includes('--help')) {
        printHelp();
        return;
    }

    const data = await loadData();
    const selectedIndex = await chooseExperienceIndex(data.experiences);
    const target = data.experiences[selectedIndex];

    console.log(`Selected: ${formatExperience(target)}`);
    const bullets = await askBullets();

    if (!Array.isArray(target.description)) {
        target.description = [];
    }

    target.description.push(...bullets);

    await fs.writeFile(DATA_PATH, `${JSON.stringify(data, null, 2)}\n`, 'utf8');

    console.log(`Added ${bullets.length} bullet(s) successfully.`);
}

main().catch((error) => {
    console.error(`Error: ${error.message}`);
    process.exitCode = 1;
});
