import { appData } from './data.js?v=final';

let state = JSON.parse(localStorage.getItem('THE_GRID_ALPHA_MASTER')) || appData;

const save = () => {
    localStorage.setItem('THE_GRID_ALPHA_MASTER', JSON.stringify(state));
    render();
};

document.addEventListener('click', (e) => {
    const task = e.target.dataset.task;
    const action = e.target.dataset.action;
    if (action === 'add' && task) {
        if (!state.dailyFocus.includes(task)) { state.dailyFocus.push(task); save(); }
    }
    if (action === 'remove' && task) {
        state.dailyFocus = state.dailyFocus.filter(t => t !== task); save();
    }
});

const toggleMode = (isFocus) => {
    document.getElementById('hub-view').classList.toggle('hidden', isFocus);
    document.getElementById('focus-view').classList.toggle('hidden', !isFocus);
};

const render = () => {
    // 1. Header Protocol
    const days = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
    const today = days[new Date().getDay()];
    document.getElementById('calendar-bar').innerHTML = Object.entries(state.weeklyPlanner).map(([day, info]) => `
        <div class="flex flex-col items-center group cursor-help" title="${info.mission} (${info.length})">
            <span class="${day === today ? 'text-cyan-500 font-bold' : 'text-slate-300'} transition-all">${day}</span>
            <div class="w-1 h-1 rounded-full mt-1 ${day === today ? 'bg-cyan-500 shadow-[0_0_8px_#00E5FF]' : 'bg-transparent'}"></div>
        </div>
    `).join('');

    // 2. Daily Battlefield
    document.getElementById('daily-list').innerHTML = state.dailyFocus.map(task => `
        <li class="flex items-center justify-between group border-l-2 border-transparent hover:border-cyan-400 pl-3 transition-all">
            <span class="text-slate-600">${task}</span>
            <button data-task="${task}" data-action="remove" class="opacity-0 group-hover:opacity-100 text-[9px] text-red-300 hover:text-red-500">REMOVE</button>
        </li>
    `).join('') || `<li class="text-slate-300 italic text-[11px] pl-3">Awaiting commands...</li>`;

    // 3. Category Grid
    document.getElementById('category-grid').innerHTML = Object.entries(state.taskBank).map(([cat, tasks]) => `
        <div class="tron-glow p-5 bg-white rounded-sm">
            <h3 class="mono text-[9px] uppercase text-slate-400 mb-4 tracking-[0.2em] font-bold">${cat}</h3>
            <div class="flex flex-wrap gap-2">
                ${tasks.map(t => `<button data-task="${t}" data-action="add" class="text-[10px] border border-gray-100 px-2 py-1 hover:border-cyan-400 hover:text-cyan-500 transition-all">+ ${t}</button>`).join('')}
            </div>
        </div>
    `).join('');

    // 4. Armory Tools
    document.getElementById('subscription-grid').innerHTML = state.subscriptions.map(tool => `
        <a href="${tool.url}" target="_blank" class="tron-glow aspect-square flex items-center justify-center text-[8px] mono text-center p-2 grayscale hover:grayscale-0 hover:text-cyan-500 hover:border-cyan-300">
            ${tool.name}
        </a>
    `).join('');

    // 5. Study Protocol
    document.getElementById('study-nav').innerHTML = Object.entries(state.study).map(([id, s]) => `
        <button onclick="document.getElementById('subject-title').innerText='${s.name}'; window.open('${s.url}', '_blank');" 
                class="block w-full text-left text-[10px] text-slate-500 hover:text-cyan-400 uppercase mono pl-4 border-l border-transparent hover:border-cyan-400 transition-all py-1">
            ${s.name}
        </button>
    `).join('');
};

document.getElementById('study-trigger').onclick = () => toggleMode(true);
document.getElementById('exit-focus').onclick = () => toggleMode(false);
document.getElementById('quick-add').onkeypress = (e) => {
    if(e.key === 'Enter' && e.target.value) {
        if(!state.dailyFocus.includes(e.target.value)) { state.dailyFocus.push(e.target.value); e.target.value = ''; save(); }
    }
};

render();