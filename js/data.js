export const initialData = {
    dailyFocus: [], 
    taskBank: {
        chores: ["Deep Clean House", "Inventory/Restock", "House Tidy", "Pets – Daily"],
        work: ["Instagram – Light", "AI Course – Theory", "Outreach", "Email Wipe"],
        clients: ["Video Client A", "Video Client B", "App Dev Sync"]
    },
    weeklyPlanner: {
        MON: { mission: "Run + Video Client A (Vid 1/1)", length: "1-2 Hours" },
        TUE: { mission: "Gym (Arms/Back/Core) + App Dev", length: "2-3 Hours" },
        WED: { mission: "Run + Video Client B (Vid 1/2)", length: "1-2 Hours" },
        THU: { mission: "Gym (Legs) + App Dev", length: "2-3 Hours" },
        FRI: { mission: "Run + Video Client B (Vid 2/2)", length: "1-2 Hours" },
        SAT: { mission: "Planning & Review + Course Prep", length: "2-4 Hours" },
        SUN: { mission: "Gym (Pilates) + Job/Grant Apps", length: "2 Hours" }
    },
    study: [
        { name: "Mathematics", url: "https://www.khanacademy.org/math/" },
        { name: "AI Specialization", url: "https://platform.outskill.com/" },
        { name: "Language Protocol", url: "https://learn.mangolanguages.com/login" }
    ],
    subscriptions: [
        { name: "Perplexity", url: "https://www.perplexity.ai/" },
        { name: "Canva", url: "https://www.canva.com/" },
        { name: "Lovable", url: "https://lovable.dev" },
        { name: "Bolt", url: "https://bolt.new/" },
        { name: "NotebookLM", url: "https://notebooklm.google/" }
        // ... (Full 38 tools included in final build)
    ]
};