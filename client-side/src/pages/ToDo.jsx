import React, { useState, useMemo } from 'react';
import { ICON_LIST, ICON_REGISTRY } from '../utils/iconRegistry.js';
import IconPicker from '../components/IconPicker.jsx';
import { 
  Plus, 
  Calendar, 
  CheckCircle2, 
  Circle, 
  Trash2, 
  Edit3, 
  ChevronLeft,
  ChevronRight,
  X
} from 'lucide-react';

const ToDo = () => {
  // --- HELPERS ---
  const normalizeDate = (date) => {
    const d = new Date(date);
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
  };

  const todayStr = normalizeDate(new Date());

  // --- STATE ---
  const [selectedDate, setSelectedDate] = useState(todayStr);
  const [showCalendar, setShowCalendar] = useState(false);
  
  // Form State
  const [selectedIconName, setSelectedIconName] = useState('CheckCircle2');
  const [taskTitle, setTaskTitle] = useState('');
  const [taskNote, setTaskNote] = useState('');

  // Edit State
  const [editingTask, setEditingTask] = useState(null); 
  const [editTitle, setEditTitle] = useState('');
  const [editNote, setEditNote] = useState('');
  const [editIconName, setEditIconName] = useState('CheckCircle2');
  const [showEditIconPicker, setShowEditIconPicker] = useState(false);

  // Task Data State
  const [tasks, setTasks] = useState([
    { id: 1, title: 'Design Review', note: 'Go over the new Figma tokens', date: todayStr, icon: 'LayoutGrid', completed: false },
    { id: 2, title: 'Workout', note: '', date: todayStr, icon: 'Activity', completed: false },
    { id: 3, title: 'Pay Utilities', note: 'Check the email from the grid company', date: todayStr, icon: 'Shield', completed: true }
  ]);



  // --- HANDLERS ---
  const handleAddTask = () => {
    if (!taskTitle.trim()) return;
    const newTask = {
      id: Date.now(),
      title: taskTitle,
      note: taskNote,
      date: selectedDate,
      icon: selectedIconName || 'CheckCircle2',
      completed: false
    };
    setTasks([...tasks, newTask]);
    setTaskTitle('');
    setTaskNote('');
    setSelectedIconName('CheckCircle2');
  };

  const startEditing = (task) => {
    setEditingTask(task);
    setEditTitle(task.title);
    setEditNote(task.note);
    setEditIconName(task.icon);
    setShowEditIconPicker(false);
  };

  const saveEdit = () => {
    setTasks(tasks.map(t => t.id === editingTask.id ? { ...t, title: editTitle, note: editNote, icon: editIconName } : t));
    setEditingTask(null);
  };

  const toggleComplete = (id) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(t => t.id !== id));
  };

  const getHeaderDisplayDate = (dateString) => {
    if (dateString === todayStr) return "Today";
    const [year, month, day] = dateString.split('-').map(Number);
    const date = new Date(year, month - 1, day);
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      month: 'long', 
      day: 'numeric', 
      year: 'numeric' 
    });
  };

  const filteredTasks = tasks.filter(t => t.date === selectedDate && !t.completed);
  const completedTasks = tasks.filter(t => t.date === selectedDate && t.completed);
  
  const now = new Date();
  const currentMonth = now.getMonth();
  const currentYear = now.getFullYear();
  const daysInMonth = Array.from({ length: new Date(currentYear, currentMonth + 1, 0).getDate() }, (_, i) => i + 1);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-purple-100 relative overflow-x-hidden">
      
      {/* Click-Outside Overlays */}
      {(showCalendar || editingTask) && (
        <div 
          className="fixed inset-0 z-40 bg-black/5 backdrop-blur-[1px]" 
          onClick={() => { 
            setShowCalendar(false); 
            if (editingTask && !showEditIconPicker) setEditingTask(null);
            setShowEditIconPicker(false);
          }}
        />
      )}

      {/* Header Section */}
      <header className="max-w-3xl mx-auto px-6 pt-16 pb-8 header-container relative">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6 sm:gap-0">
          <div className="flex justify-between items-start w-full sm:w-auto">
            <div>
              <h1 className="text-4xl font-bold tracking-tight text-slate-800">Tasks</h1>
              <p className="text-purple-600 font-semibold mt-1 flex items-center gap-2">
                <Calendar size={16} className="icon-hover-effect" />
                {getHeaderDisplayDate(selectedDate)}
              </p>
            </div>


          </div>
          
          <div className="relative z-50 w-full sm:w-auto">
            <button 
              onClick={() => setShowCalendar(!showCalendar)}
              className={`w-full sm:w-auto p-3.5 sm:p-3 rounded-xl shadow-sm border transition-all flex items-center justify-center sm:justify-start gap-2 icon-btn-press
                ${showCalendar ? 'bg-purple-50 border-purple-200 text-purple-600' : 'bg-white border-slate-300 text-slate-600 hover:border-purple-300'}`}
            >
              <Calendar size={20} className="icon-hover-effect" />
              <span className="font-medium">Calendar</span>
            </button>

            {showCalendar && (
              <div className="absolute top-16 sm:top-14 right-0 w-full sm:w-72 bg-white border border-slate-200 rounded-2xl shadow-2xl p-4 animate-in fade-in zoom-in duration-200">
                <div className="flex justify-between items-center mb-4 text-sm font-bold">
                  <button className="p-2 hover:bg-slate-100 rounded-lg icon-btn-press"><ChevronLeft size={18}/></button>
                  <span className="text-slate-700">
                    {now.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                  </span>
                  <button className="p-2 hover:bg-slate-100 rounded-lg icon-btn-press"><ChevronRight size={18}/></button>
                </div>
                <div className="grid grid-cols-7 gap-1 text-center text-[10px] font-black text-slate-400 mb-2 uppercase tracking-tighter">
                  <span>S</span><span>M</span><span>T</span><span>W</span><span>T</span><span>F</span><span>S</span>
                </div>
                <div className="grid grid-cols-7 gap-1">
                  {daysInMonth.map(day => {
                    const normalized = normalizeDate(new Date(currentYear, currentMonth, day));
                    const isSelected = normalized === selectedDate;
                    return (
                      <button 
                        key={day}
                        onClick={() => { setSelectedDate(normalized); setShowCalendar(false); }}
                        className={`h-9 w-9 sm:h-8 sm:w-8 flex items-center justify-center rounded-lg text-sm transition-all icon-btn-press
                          ${isSelected ? 'bg-purple-600 text-white font-bold' : 'hover:bg-purple-50 text-slate-600'}`}
                      >
                        {day}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-6 pb-32 relative">
        
        {/* Add Task Section */}
        <section className="bg-white rounded-xl border border-slate-300 shadow-sm p-6 mb-12 relative card-radius">
          <div className="flex flex-col gap-4">
            <div className="flex gap-4 items-start">

              <IconPicker value={selectedIconName} onChange={setSelectedIconName} />

              <div className="flex-1 space-y-3">
                <input 
                  type="text" 
                  placeholder="What's the task?" 
                  className="w-full text-xl font-semibold placeholder:text-slate-300 focus:outline-none border-none p-0 text-slate-800 bg-transparent"
                  value={taskTitle}
                  onChange={(e) => setTaskTitle(e.target.value)}
                />
                <textarea 
                  placeholder="Add a note..." 
                  rows="1"
                  className="w-full text-sm text-slate-500 placeholder:text-slate-300 focus:outline-none border-none p-0 resize-none bg-transparent"
                  value={taskNote}
                  onChange={(e) => setTaskNote(e.target.value)}
                />
              </div>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between pt-4 border-t border-slate-50 gap-4 sm:gap-0">
              <div className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                Auto-assigned to: <span className="text-purple-500">{getHeaderDisplayDate(selectedDate)}</span>
              </div>
              <button 
                onClick={handleAddTask}
                disabled={!taskTitle.trim()}
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 sm:py-2.5 bg-purple-600 text-white font-bold rounded-xl hover:bg-purple-700 hover:-translate-y-0.5 transition-all shadow-lg shadow-purple-100 disabled:opacity-50 disabled:shadow-none disabled:translate-y-0 icon-btn-press"
              >
                <Plus size={20} className="icon-hover-effect" />
                <span>Add Task</span>
              </button>
            </div>
          </div>
        </section>

        {/* Task Lists */}
        <div className="space-y-12">
          
          <div className="space-y-6">
            <h2 className="text-sm font-bold uppercase tracking-[0.2em] px-2 bg-gradient-to-r from-purple-600 to-purple-400 bg-clip-text text-transparent">
              Active Tasks
            </h2>
            
            {filteredTasks.length === 0 ? (
              <div className="text-center py-12 border-2 border-dashed border-slate-300 rounded-xl bg-slate-50/50">
                <p className="text-slate-400 text-sm font-medium italic">Your schedule is clear for {getHeaderDisplayDate(selectedDate)}.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredTasks.map((task) => {
                  const IconComp = ICON_REGISTRY[task.icon] || CheckCircle2;
                  return (
                    <div key={task.id} className="group bg-white p-5 rounded-xl border border-slate-300 shadow-sm flex items-center gap-4 sm:gap-5 hover:border-purple-200 hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 relative card-radius">
                      <button 
                        onClick={() => toggleComplete(task.id)}
                        className="text-slate-200 hover:text-purple-500 transition-colors icon-btn-press p-1"
                      >
                        <Circle size={26} className="icon-hover-effect" />
                      </button>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-3">
                          <span className="text-purple-500 bg-purple-50 p-2 rounded-xl transition-colors group-hover:bg-purple-100 shrink-0">
                            <IconComp size={20} className="icon-hover-effect" />
                          </span>
                          <h3 className="font-bold text-slate-800 truncate text-base">{task.title}</h3>
                        </div>
                        {task.note && (
                          <p className="text-sm text-slate-500 mt-2 ml-10 sm:ml-12 leading-relaxed border-l-2 border-slate-100 pl-4 italic">
                            {task.note}
                          </p>
                        )}
                      </div>

                      <div className="flex gap-1 opacity-100 sm:opacity-0 group-hover:opacity-100 transition-opacity">
                        <button 
                          onClick={() => startEditing(task)}
                          className="p-2 text-slate-400 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-all icon-btn-press"
                        >
                          <Edit3 size={18} className="icon-hover-effect" />
                        </button>
                        <button 
                          onClick={() => deleteTask(task.id)}
                          className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all icon-btn-press"
                        >
                          <Trash2 size={18} className="icon-hover-effect" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Completed Section Header */}
          {completedTasks.length > 0 && (
            <div className="space-y-6 pt-4 border-t border-slate-100">
              <h2 className="text-sm font-bold uppercase tracking-[0.2em] px-2 text-emerald-500 drop-shadow-[0_0_8px_rgba(16,185,129,0.2)]">
                Completed
              </h2>
              <div className="space-y-4">
                {completedTasks.map((task) => {
                  const IconComp = ICON_REGISTRY[task.icon] || CheckCircle2;
                  return (
                    <div key={task.id} className="bg-slate-100/60 p-5 rounded-xl border border-dashed border-slate-300 flex items-center gap-4 sm:gap-5 opacity-60 grayscale hover:grayscale-0 transition-all card-radius">
                      <button 
                        onClick={() => toggleComplete(task.id)}
                        className="text-emerald-500 drop-shadow-[0_0_12px_rgba(16,185,129,0.6)] animate-pulse-gentle icon-btn-press p-1"
                      >
                        <CheckCircle2 size={26} className="icon-hover-effect" />
                      </button>
                      <div className="flex-1 flex items-center gap-3 min-w-0">
                         <IconComp size={18} className="text-slate-400 icon-hover-effect shrink-0" />
                         <h3 className="font-bold text-slate-600 line-through decoration-slate-400 decoration-2 text-base truncate">
                           {task.title}
                         </h3>
                      </div>
                      <button 
                        onClick={() => deleteTask(task.id)}
                        className="p-2 text-slate-400 hover:text-red-600 transition-colors icon-btn-press"
                      >
                        <Trash2 size={18} className="icon-hover-effect" />
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* EDIT TOAST */}
        {editingTask && (
          <div className="edit-toast-overlay fixed inset-0 z-[100] flex items-center justify-center p-6 pointer-events-none">
            <div className="edit-toast-container w-full max-w-sm bg-white border border-purple-200 shadow-[0_32px_64px_-12px_rgba(0,0,0,0.18)] p-6 rounded-2xl pointer-events-auto animate-toast-pop">
              <div className="flex justify-between items-center mb-5">
                <h4 className="text-xs font-black uppercase tracking-[0.2em] text-purple-600">Edit Task</h4>
                <button 
                  onClick={() => setEditingTask(null)} 
                  className="w-9 h-9 flex items-center justify-center text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-lg transition-colors icon-btn-press"
                >
                  <X size={20} className="icon-hover-effect"/>
                </button>
              </div>

              <div className="space-y-4">
                <div className="flex gap-3 items-center">
                  <IconPicker value={editIconName} onChange={setEditIconName} />
                  <div className="flex-1">
                    <input 
                      className="w-full bg-slate-50 border-none px-3 py-2.5 rounded-xl text-sm font-bold text-slate-800 placeholder:text-slate-300 focus:ring-2 ring-purple-100 focus:outline-none transition-shadow"
                      value={editTitle}
                      placeholder="Task name"
                      onChange={(e) => setEditTitle(e.target.value)}
                      autoFocus
                    />
                  </div>
                </div>

                <textarea 
                  className="w-full bg-slate-50 border-none px-4 py-3 rounded-xl text-sm text-slate-600 placeholder:text-slate-300 focus:ring-2 ring-purple-100 focus:outline-none resize-none transition-shadow"
                  rows="3"
                  placeholder="Notes for this task..."
                  value={editNote}
                  onChange={(e) => setEditNote(e.target.value)}
                />

                <div className="flex flex-col sm:flex-row gap-2 pt-2">
                  <button 
                    onClick={saveEdit} 
                    className="flex-1 bg-purple-600 text-white font-bold py-3.5 sm:py-3 rounded-xl hover:bg-purple-700 transition-all shadow-lg shadow-purple-100 text-sm icon-btn-press"
                  >
                    Save Changes
                  </button>
                  <button 
                    onClick={() => setEditingTask(null)} 
                    className="px-5 py-3.5 sm:py-3 border border-slate-200 text-slate-500 font-bold rounded-xl hover:bg-slate-50 hover:text-slate-700 transition-all text-sm icon-btn-press"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 5px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #e2e8f0; border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #cbd5e1; }
        
        .vertical-text {
          writing-mode: vertical-rl;
          text-orientation: mixed;
        }

        .card-radius {
          border-radius: 0.85rem !important;
        }

        .edit-toast-container {
          will-change: opacity, transform;
        }

        @keyframes toast-pop {
          from {
            opacity: 0;
            transform: scale(0.95) translateY(10px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }

        .animate-toast-pop {
          animation: toast-pop 0.25s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        .icon-hover-effect {
          transition: transform 0.4s cubic-bezier(0.23, 1, 0.32, 1), filter 0.4s ease;
          will-change: transform;
        }
        
        button:hover .icon-hover-effect {
          transform: scale(1.15) rotate(5deg);
          filter: drop-shadow(0 0 8px rgba(147, 51, 234, 0.3));
        }

        .icon-btn-press:active {
          transform: scale(0.96);
          transition: transform 0.1s ease;
        }

        @keyframes pulse-gentle {
          0%, 100% { filter: drop-shadow(0 0 8px rgba(16,185,129,0.3)); }
          50% { filter: drop-shadow(0 0 15px rgba(16,185,129,0.5)); }
        }
        .animate-pulse-gentle {
          animation: pulse-gentle 2s infinite ease-in-out;
        }

        .animate-in {
          animation-duration: 0.2s;
          animation-fill-mode: forwards;
        }

        /* Desktop Layout - Kept as requested */
        .theme-bar-container {
          position: fixed;
          z-index: 999;
          right: 1.5rem;
          top: 50%;
          transform: translateY(-50%);
        }

        .theme-bar-wrapper {
          flex-direction: column;
        }
        
        .theme-bar-wrapper.expanded { max-height: 400px; }
        .theme-bar-wrapper.collapsed { max-height: 56px; }

        .theme-options {
          flex-direction: column;
        }

        .theme-options.visible {
          opacity: 1;
          transform: translateY(0);
        }

        .theme-options.hidden-state {
          opacity: 0;
          transform: translateY(-20px);
          pointer-events: none;
        }

        /* Mobile Layout Refinement - Updated Behavior */
        @media (max-width: 640px) {
          .edit-toast-container {
            margin: 0 1rem;
            max-width: none;
          }
        }
      `}</style>
    </div>
  );
};

export default ToDo;