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
  node scripts/edit-bullets.mjs

What it does:
  1. Shows your experiences list
  2. Lets you choose one with arrow keys + Enter
  3. Shows bullets from that experience
  4. Lets you choose one bullet and replace its text
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

function clearCurrentLine() {
    process.stdout.write('\u001b[2K\r');
}

function moveCursorToRow(offsetFromCurrent) {
    if (offsetFromCurrent < 0) {
        process.stdout.write(`\u001b[${-offsetFromCurrent}A`);
    } else if (offsetFromCurrent > 0) {
        process.stdout.write(`\u001b[${offsetFromCurrent}B`);
    }
}

function renderSelectableLine(text, isSelected) {
    const prefix = isSelected ? '>' : ' ';
    const green = '\u001b[32m';
    const reset = '\u001b[0m';
    const content = `${prefix} ${text}`;
    process.stdout.write(`\r${isSelected ? `${green}${content}${reset}` : content}\n`);
}

async function chooseFromList(items, title, itemLabel) {
    if (items.length === 0) {
        throw new Error('Nothing to choose from.');
    }

    if (!process.stdin.isTTY || !process.stdout.isTTY) {
        throw new Error('Interactive selection requires a TTY terminal.');
    }

    let selectedIndex = 0;

    process.stdout.write(`${title}\n`);
    for (let i = 0; i < items.length; i++) {
        renderSelectableLine(itemLabel(items[i], i), i === selectedIndex);
    }

    let cursorRow = items.length;

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
                moveCursorToRow(items.length - cursorRow);
                process.stdout.write('\n');
                process.stdin.setRawMode(false);
                process.stdin.pause();
                process.stdin.off('data', onData);
                resolve(selectedIndex);
                return;
            }

            let newIndex = selectedIndex;
            if (key === '\u001b[A') {
                newIndex = (selectedIndex - 1 + items.length) % items.length;
            } else if (key === '\u001b[B') {
                newIndex = (selectedIndex + 1) % items.length;
            } else {
                return;
            }

            if (newIndex === selectedIndex) return;

            moveCursorToRow(selectedIndex - cursorRow);
            clearCurrentLine();
            renderSelectableLine(itemLabel(items[selectedIndex], selectedIndex), false);
            cursorRow = selectedIndex + 1;

            moveCursorToRow(newIndex - cursorRow);
            clearCurrentLine();
            renderSelectableLine(itemLabel(items[newIndex], newIndex), true);
            cursorRow = newIndex + 1;

            selectedIndex = newIndex;
        };

        process.stdin.setRawMode(true);
        process.stdin.resume();
        process.stdin.on('data', onData);
    });
}

async function askReplacementText(currentBullet) {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    try {
        while (true) {
            console.log(`Current bullet: ${currentBullet}`);
            const input = (await rl.question('New bullet text: ')).trim();

            if (!input) {
                console.log('Bullet text cannot be empty.');
                continue;
            }

            return input;
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

    const experienceIndex = await chooseFromList(
        data.experiences,
        'Select an experience (use Arrow Up/Down, then Enter):',
        (experience) => formatExperience(experience)
    );
    const experience = data.experiences[experienceIndex];

    if (!Array.isArray(experience.description) || experience.description.length === 0) {
        throw new Error('The selected experience has no bullets to edit.');
    }

    const bulletIndex = await chooseFromList(
        experience.description,
        'Select a bullet to edit (use Arrow Up/Down, then Enter):',
        (bullet, index) => `[${index + 1}] ${bullet}`
    );

    const oldBullet = experience.description[bulletIndex];
    const newBullet = await askReplacementText(oldBullet);

    experience.description[bulletIndex] = newBullet;

    await fs.writeFile(DATA_PATH, `${JSON.stringify(data, null, 2)}\n`, 'utf8');

    console.log(`Updated bullet ${bulletIndex + 1} for: ${formatExperience(experience)}`);
}

main().catch((error) => {
    console.error(`Error: ${error.message}`);
    process.exitCode = 1;
});
