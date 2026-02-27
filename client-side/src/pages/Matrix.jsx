import React, { useState, useRef, useEffect } from 'react';
import {
  Plus, Calendar, Smile, CheckCircle2, Circle, Trash2, Edit3,
  LayoutGrid, Coffee, Code, Heart, Briefcase, Star, Clock,
  ChevronLeft, ChevronRight, Target, Flag, Book, Camera,
  Music, ShoppingBag, Home, Activity, Bell, Cloud, Compass,
  Database, Gift, Globe, Inbox, Layers, Map, Mic, Navigation,
  Package, Phone, Rocket, Shield, Smartphone, Truck, Video,
  Watch, Wifi, X, Check, Edit2, Move
} from 'lucide-react';

// ==========================================
// 1. ICON REGISTRY
// ==========================================
export const ICON_REGISTRY = {
  Plus, Calendar, Smile, CheckCircle2, Circle, Trash2, Edit3,
  LayoutGrid, Coffee, Code, Heart, Briefcase, Star, Clock,
  ChevronLeft, ChevronRight, Target, Flag, Book, Camera,
  Music, ShoppingBag, Home, Activity, Bell, Cloud, Compass,
  Database, Gift, Globe, Inbox, Layers, Map, Mic, Navigation,
  Package, Phone, Rocket, Shield, Smartphone, Truck, Video,
  Watch, Wifi, X, Move
};

export const ICON_LIST = Object.keys(ICON_REGISTRY);

// ==========================================
// 2. REUSABLE ICON PICKER COMPONENT
// ==========================================
function IconPicker({ value = 'CheckCircle2', onChange }) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef(null);

  return (
    <>
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/5 backdrop-blur-[1px]"
          onClick={() => setOpen(false)}
        />
      )}

      <div className="relative z-50" ref={containerRef}>
        <button
          type="button"
          onClick={() => setOpen((prev) => !prev)}
          className="w-12 h-12 flex items-center justify-center 
          bg-slate-50 border border-slate-200 rounded-xl 
          text-purple-600 hover:bg-purple-50 hover:border-purple-300 
          transition-all shadow-sm icon-btn-press"
        >
          {(() => {
            const Icon = ICON_REGISTRY[value] || CheckCircle2;
            return <Icon size={24} className="icon-hover-effect" />;
          })()}
        </button>

        {open && (
          <div
            className="absolute top-14 left-0 
            w-64 bg-white border border-slate-200 
            rounded-xl shadow-2xl p-3 
            animate-in fade-in zoom-in duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="grid grid-cols-5 gap-1 max-h-56 overflow-y-auto custom-scrollbar p-1">
              {ICON_LIST.map((iconId) => {
                const Icon = ICON_REGISTRY[iconId];
                const isActive = iconId === value;

                return (
                  <button
                    key={iconId}
                    type="button"
                    onClick={() => {
                      onChange?.(iconId);
                      setOpen(false);
                    }}
                    className={`p-3 rounded-lg flex items-center justify-center 
                    transition-all icon-btn-press
                    ${
                      isActive
                        ? 'bg-purple-100 text-purple-700 shadow-inner'
                        : 'hover:bg-slate-50 text-slate-400 hover:text-purple-500'
                    }`}
                  >
                    <Icon size={20} className="icon-hover-effect" />
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>

      <style>{`
        .icon-hover-effect {
          transition: transform 0.4s cubic-bezier(0.23, 1, 0.32, 1),
            filter 0.4s ease;
        }
        button:hover .icon-hover-effect {
          transform: scale(1.15) rotate(6deg);
          filter: drop-shadow(0 0 8px rgba(147, 51, 234, 0.35));
        }
        .icon-btn-press:active {
          transform: scale(0.96);
        }
        .custom-scrollbar::-webkit-scrollbar { width: 5px; }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #e2e8f0;
          border-radius: 10px;
        }
      `}</style>
    </>
  );
}

// ==========================================
// 3. MAIN EISENHOWER MATRIX PAGE
// ==========================================
const Matrix = () => {
  const [tasks, setTasks] = useState([
    { id: 1, title: 'Fix production bug', note: 'Critical fix', icon: 'Rocket', type: 'urgent_important', completed: false },
    { id: 2, title: 'Quarterly Review', note: 'Prepare slides', icon: 'Target', type: 'important_not_urgent', completed: false },
    { id: 3, title: 'Admin emails', note: '', icon: 'Inbox', type: 'urgent_not_important', completed: true },
  ]);

  const [modalOpen, setModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  
  const [targetQuadrant, setTargetQuadrant] = useState('urgent_important');
  const [newTask, setNewTask] = useState({ title: '', note: '', icon: 'CheckCircle2' });
  const [editingTask, setEditingTask] = useState(null);

  const quadrants = [
    { 
      id: 'urgent_important', 
      title: 'Do First', 
      subtitle: 'Urgent & Important', 
      theme: 'rose', 
      accent: 'bg-rose-500', 
      bg: 'bg-rose-50/40',
      text: 'text-rose-600'
    },
    { 
      id: 'important_not_urgent', 
      title: 'Schedule', 
      subtitle: 'Important & Not Urgent', 
      theme: 'purple', 
      accent: 'bg-purple-500', 
      bg: 'bg-purple-50/40',
      text: 'text-purple-600'
    },
    { 
      id: 'urgent_not_important', 
      title: 'Delegate', 
      subtitle: 'Urgent & Not Important', 
      theme: 'blue', 
      accent: 'bg-blue-500', 
      bg: 'bg-blue-50/40',
      text: 'text-blue-600'
    },
    { 
      id: 'not_urgent_not_important', 
      title: 'Eliminate', 
      subtitle: 'Not Urgent & Not Important', 
      theme: 'slate', 
      accent: 'bg-slate-400', 
      bg: 'bg-slate-50/40',
      text: 'text-slate-600'
    },
  ];

  const handleMoveTask = (taskId, targetType) => {
    setTasks(tasks.map(t => t.id === taskId ? { ...t, type: targetType } : t));
  };

  const handleToggleTask = (id) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const handleAddTask = () => {
    if (!newTask.title.trim()) return;
    const task = {
      ...newTask,
      id: Date.now(),
      type: targetQuadrant,
      completed: false
    };
    setTasks([...tasks, task]);
    setNewTask({ title: '', note: '', icon: 'CheckCircle2' });
    setModalOpen(false);
  };

  const handleUpdateTask = () => {
    if (!editingTask.title.trim()) return;
    setTasks(tasks.map(t => t.id === editingTask.id ? editingTask : t));
    setEditModalOpen(false);
    setEditingTask(null);
  };

  const removeTask = (id) => {
    setTasks(tasks.filter(t => t.id !== id));
  };

  const openEdit = (task) => {
    setEditingTask({ ...task });
    setEditModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#FDFDFF] text-slate-900 px-4 py-8 md:p-8 font-sans">
      <header className="max-w-7xl mx-auto mb-8 md:mb-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Eisenhower Matrix</h1>
          <p className="text-purple-800 font-[500] mt-1 text-sm md:text-base">Focus on what's truly essential.</p>
        </div>
      </header>

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
        {quadrants.map((quad) => (
          <div 
            key={quad.id} 
            className={`group/quad flex flex-col rounded-2xl border border-slate-300 ${quad.bg} p-5 md:p-6 min-h-[350px] md:min-h-[480px] transition-all duration-300 hover:shadow-xl hover:shadow-slate-200/50 hover:scale-[1.01]`}
          >
            <div className="flex items-center justify-between mb-4 md:mb-6">
              <div>
                <h2 className={`text-[10px] font-black uppercase tracking-[0.2em] ${quad.text} opacity-80`}>
                  {quad.title}
                </h2>
                <p className="text-xs md:text-sm font-semibold text-slate-800">{quad.subtitle}</p>
              </div>
              <button 
                onClick={() => {
                  setTargetQuadrant(quad.id);
                  setModalOpen(true);
                }}
                className={`group/plus p-2.5 rounded-full ${quad.accent} text-white shadow-lg shadow-${quad.theme}-100 hover:scale-105 active:scale-95 transition-all`}
              >
                <Plus 
                  size={20} 
                  className="transition-transform duration-500 ease-in-out group-hover/plus:rotate-[180deg]" 
                />
              </button>
            </div>

            <div className="flex-1 space-y-4 md:space-y-6 overflow-y-auto custom-scrollbar pr-1 max-h-[360px]">
              <div className="space-y-3 ">
                {tasks.filter(t => t.type === quad.id && !t.completed).map(task => (
                  <TaskItem 
                    key={task.id} 
                    task={task} 
                    onToggle={handleToggleTask} 
                    onRemove={removeTask} 
                    onEdit={() => openEdit(task)}
                    onMove={(targetType) => handleMoveTask(task.id, targetType)}
                    allQuadrants={quadrants}
                    theme={quad.theme} 
                  />
                ))}
              </div>

              {tasks.some(t => t.type === quad.id && t.completed) && (
                <div className="pt-4 border-t border-slate-200/50">
                  <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3 px-2">Completed</h3>
                  <div className="space-y-2 opacity-60 ">
                    {tasks.filter(t => t.type === quad.id && t.completed).map(task => (
                      <TaskItem 
                        key={task.id} 
                        task={task} 
                        onToggle={handleToggleTask} 
                        onRemove={removeTask} 
                        onEdit={() => openEdit(task)}
                        onMove={(targetType) => handleMoveTask(task.id, targetType)}
                        allQuadrants={quadrants}
                        theme={quad.theme} 
                      />
                    ))}
                  </div>
                </div>
              )}

              {tasks.filter(t => t.type === quad.id).length === 0 && (
                <div className="h-full flex flex-col items-center justify-center text-slate-300 py-10">
                  <LayoutGrid size={40} strokeWidth={1} className="opacity-20 mb-2" />
                  <span className="text-xs font-medium">No tasks yet</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Add Task Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-[100] flex items-end md:items-center justify-center p-0 md:p-4">
          <div className="absolute inset-0 bg-slate-900/20 backdrop-blur-md" onClick={() => setModalOpen(false)} />
          <div className="relative bg-white w-full max-w-md rounded-t-3xl md:rounded-2xl shadow-2xl border-x border-t md:border border-slate-300 overflow-hidden animate-in slide-in-from-bottom md:zoom-in duration-300">
            <div className="p-6 md:p-8">
              <div className="flex justify-between items-center mb-6 md:mb-8">
                <h2 className="text-xl font-bold">New Priority</h2>
                <button onClick={() => setModalOpen(false)} className="p-2 hover:bg-slate-100 rounded-full text-slate-400 transition-colors">
                  <X size={20} />
                </button>
              </div>

              <div className="space-y-6">
                <div className="flex gap-4 items-start">
                  <IconPicker value={newTask.icon} onChange={(icon) => setNewTask({ ...newTask, icon })} />
                  <div className="flex-1">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5 block">Task Title</label>
                    <input 
                      type="text" 
                      placeholder="Enter task name..."
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm focus:ring-2 focus:ring-purple-200 outline-none transition-all"
                      value={newTask.title}
                      onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                      autoFocus
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5 block">Additional Note</label>
                  <textarea 
                    placeholder="Describe the task (optional)..."
                    rows="3"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 text-sm focus:ring-2 focus:ring-purple-200 outline-none transition-all resize-none"
                    value={newTask.note}
                    onChange={(e) => setNewTask({ ...newTask, note: e.target.value })}
                  />
                </div>

                <div className="grid grid-cols-2 gap-3 pt-4">
                  <button 
                    onClick={() => setModalOpen(false)}
                    className="py-4 rounded-xl text-sm font-bold text-slate-400 hover:bg-slate-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button 
                    disabled={!newTask.title}
                    onClick={handleAddTask}
                    className="py-4 rounded-xl text-sm font-bold bg-purple-600 text-white shadow-lg shadow-purple-200 hover:bg-purple-700 active:scale-95 transition-all disabled:opacity-50"
                  >
                    Add Task
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Task Modal */}
      {editModalOpen && editingTask && (
        <div className="fixed inset-0 z-[100] flex items-end md:items-center justify-center p-0 md:p-4">
          <div className="absolute inset-0 bg-slate-900/20 backdrop-blur-md" onClick={() => setEditModalOpen(false)} />
          <div className="relative bg-white w-full max-w-md rounded-t-3xl md:rounded-2xl shadow-2xl border-x border-t md:border border-slate-300 overflow-hidden animate-in slide-in-from-bottom md:zoom-in duration-200">
            <div className="p-6 md:p-8">
              <div className="flex justify-between items-center mb-6 md:mb-8">
                <h2 className="text-xl font-bold">Edit Task</h2>
                <button onClick={() => setEditModalOpen(false)} className="p-2 hover:bg-slate-100 rounded-full text-slate-400 transition-colors">
                  <X size={20} />
                </button>
              </div>

              <div className="space-y-6">
                <div className="flex gap-4 items-start">
                  <IconPicker 
                    value={editingTask.icon} 
                    onChange={(icon) => setEditingTask({ ...editingTask, icon })} 
                  />
                  <div className="flex-1">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5 block">Task Title</label>
                    <input 
                      type="text" 
                      placeholder="Task name"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm focus:ring-2 focus:ring-purple-200 outline-none transition-all"
                      value={editingTask.title}
                      onChange={(e) => setEditingTask({ ...editingTask, title: e.target.value })}
                      autoFocus
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5 block">Note</label>
                  <textarea 
                    placeholder="Add details..."
                    rows="3"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 text-sm focus:ring-2 focus:ring-purple-200 outline-none transition-all resize-none"
                    value={editingTask.note}
                    onChange={(e) => setEditingTask({ ...editingTask, note: e.target.value })}
                  />
                </div>

                <div className="grid grid-cols-2 gap-3 pt-4">
                  <button 
                    onClick={() => setEditModalOpen(false)}
                    className="py-4 rounded-xl text-sm font-bold text-slate-400 hover:bg-slate-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button 
                    disabled={!editingTask.title}
                    onClick={handleUpdateTask}
                    className="py-4 rounded-xl text-sm font-bold bg-purple-600 text-white shadow-lg shadow-purple-200 hover:bg-purple-700 active:scale-95 transition-all"
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Sub-component for Task Items
const TaskItem = ({ task, onToggle, onRemove, onEdit, onMove, allQuadrants, theme }) => {
  const Icon = ICON_REGISTRY[task.icon] || CheckCircle2;
  const [moveMenuOpen, setMoveMenuOpen] = useState(false);
  const menuRef = useRef(null);

  const colors = {
    rose: 'text-rose-600 bg-rose-50 border-rose-100',
    purple: 'text-purple-600 bg-purple-50 border-purple-100',
    blue: 'text-blue-600 bg-blue-50 border-blue-100',
    slate: 'text-slate-600 bg-slate-50 border-slate-100',
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMoveMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className={`group flex items-start gap-3 md:gap-4 p-3 md:p-4 rounded-xl bg-white border border-slate-300 shadow-sm transition-all duration-300 md:hover:shadow-md md:hover:border-slate-300 relative`}>
      <button 
        onClick={() => onToggle(task.id)}
        className={`mt-1 h-5 w-5 flex-shrink-0 rounded-full border-2 flex items-center justify-center transition-all ${
          task.completed ? 'bg-emerald-500 border-emerald-500 text-white' : 'border-slate-200 md:hover:border-purple-400'
        }`}
      >
        {task.completed && <Check size={12} strokeWidth={4} className="transition-transform duration-200 hover:scale-110" />}
      </button>

      <div className={`p-2 rounded-lg md:rounded-lg ${colors[theme]} transition-colors flex-shrink-0`}>
        <Icon size={18} className="w-4 h-4 md:w-4.5 md:h-4.5" />
      </div>

      <div className="flex-1 min-w-0">
        <h4 className={`text-sm font-bold truncate ${task.completed ? 'line-through text-slate-400' : 'text-slate-800'}`}>
          {task.title}
        </h4>
        {task.note && (
          <p className="text-[11px] md:text-xs text-slate-400 mt-0.5 line-clamp-1">{task.note}</p>
        )}
      </div>

      <div className="flex items-center gap-0.5 md:gap-1 opacity-100 md:opacity-0 group-hover:opacity-100 transition-all duration-200">
        <div className="relative" ref={menuRef}>
          <button 
            onMouseEnter={() => setMoveMenuOpen(true)}
            className={`p-1.5 md:p-2 rounded-lg transition-all ${moveMenuOpen ? 'text-purple-600 bg-purple-50' : 'text-slate-300 hover:text-purple-500 hover:bg-purple-50'}`}
          >
            <LayoutGrid size={14} className="md:size-[16px]" />
          </button>

          {moveMenuOpen && (
            <div 
              className="absolute right-0 top-[calc(100%+8px)] w-48 bg-white border border-slate-200 rounded-xl shadow-xl p-2 z-[110] animate-in fade-in slide-in-from-top-2 zoom-in-95 duration-200"
              onMouseLeave={() => setMoveMenuOpen(false)}
            >
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-2 py-1 mb-1">Move to...</p>
              <div className="space-y-0.5">
                {allQuadrants.filter(q => q.id !== task.type).map(quad => (
                  <button
                    key={quad.id}
                    onClick={() => {
                      onMove(quad.id);
                      setMoveMenuOpen(false);
                    }}
                    className="w-full text-left px-2 py-2 rounded-lg text-xs font-semibold text-slate-600 hover:bg-slate-50 hover:text-purple-600 transition-colors flex items-center justify-between group/item"
                  >
                    <span>{quad.title}</span>
                    <Move size={12} className="opacity-0 group-hover/item:opacity-100 transition-opacity" />
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        <button 
          onClick={onEdit}
          className="p-1.5 md:p-2 text-slate-300 hover:text-purple-500 hover:bg-purple-50 rounded-lg transition-all"
        >
          <Edit2 size={14} className="md:size-[16px]" />
        </button>
        <button 
          onClick={() => onRemove(task.id)}
          className="p-1.5 md:p-2 text-slate-300 hover:text-rose-500 hover:bg-rose-50 rounded-lg transition-all"
        >
          <Trash2 size={14} className="md:size-[16px]" />
        </button>
      </div>
    </div>
  );
};

export default Matrix;