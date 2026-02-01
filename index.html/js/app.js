import { initialData } from './data.js';

let state = JSON.parse(localStorage.getItem('THE_GRID_V6')) || initialData;

function saveState() {
    localStorage.setItem('THE_GRID_V6', JSON.stringify(state));
    render();
}

// Core Functions
window.sendToDaily = (task) => {
    if(!state.dailyFocus.includes(task)) {
        state.dailyFocus.push(task);
        saveState();
    }
};

window.toggleStudyMode = (active) => {
    document.getElementById('hub-view').classList.toggle('hidden', active);
    document.getElementById('focus-view').classList.toggle('hidden', !active);
};

function render() {
    // Render Battlefield
    const dailyList = document.getElementById('daily-list');
    dailyList.innerHTML = state.dailyFocus.map(task => `
        <li class="flex items-center gap-3 animate-fade-in">
            <div class="w-1.5 h-1.5 border border-cyan-400"></div>
            <span>${task}</span>
        </li>
    `).join('');

    // Render Armory (Categories)
    const taskBank = document.getElementById('task-bank');
    taskBank.innerHTML = Object.entries(state.taskBank).map(([key, list]) => `
        <div class="tron-glow p-4">
            <h3 class="mono text-[9px] uppercase text-gray-400 mb-3">${key}</h3>
            <div class="flex flex-wrap gap-2">
                ${list.map(t => `<button onclick="sendToDaily('${t}')" class="text-[10px] px-2 py-1 border border-gray-100 hover:border-cyan-400 transition-all">+ ${t}</button>`).join('')}
            </div>
        </div>
    `).join('');

    // Render Subscriptions
    const subGrid = document.getElementById('sub-grid');
    subGrid.innerHTML = state.subscriptions.map(tool => `
        <a href="${tool.url}" target="_blank" class="w-full aspect-square border border-gray-50 flex items-center justify-center text-[9px] mono text-center p-1 hover:shadow-halo transition-all grayscale hover:grayscale-0">
            ${tool.name}
        </a>
    `).join('');
}

// Initializing listeners
document.getElementById('quick-add').addEventListener('keypress', (e) => {
    if(e.key === 'Enter' && e.target.value) {
        sendToDaily(e.target.value);
        e.target.value = '';
    }
});

document.getElementById('study-trigger').onclick = () => toggleStudyMode(true);
document.getElementById('exit-focus').onclick = () => toggleStudyMode(false);

render();