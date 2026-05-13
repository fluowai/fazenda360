import React, { useState, useEffect } from 'react';
import { 
  Plus, Search, Filter, MoreVertical, CheckCircle2, 
  Circle, Trash2, Edit3, Calendar, AlertCircle,
  CheckCircle
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Task } from '../../types';
import { cn } from '../../lib/utils';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

export default function TaskManagement() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState<'ALL' | 'COMPLETED' | 'PENDING'>('ALL');

  // Form State
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    priority: 'MEDIUM' as const,
    dueDate: format(new Date(), 'yyyy-MM-dd')
  });

  // Load mock tasks or from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('nexus_tasks');
    if (saved) {
      setTasks(JSON.parse(saved));
    } else {
      const initial: Task[] = [
        {
          id: '1',
          userId: 'admin',
          title: 'Vistoria Fazenda Rio Negro',
          description: 'Acompanhar perito para avaliação técnica do solo e infraestrutura.',
          completed: false,
          priority: 'HIGH',
          dueDate: format(new Date(), 'yyyy-MM-dd'),
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: '2',
          userId: 'admin',
          title: 'Reunião com Investidor Chinês',
          description: 'Apresentar portfólio de soja no Mato Grosso.',
          completed: true,
          priority: 'MEDIUM',
          dueDate: format(new Date(), 'yyyy-MM-dd'),
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ];
      setTasks(initial);
      localStorage.setItem('nexus_tasks', JSON.stringify(initial));
    }
  }, []);

  const saveTasks = (newTasks: Task[]) => {
    setTasks(newTasks);
    localStorage.setItem('nexus_tasks', JSON.stringify(newTasks));
  };

  const handleToggleComplete = (id: string) => {
    const newTasks = tasks.map(t => 
      t.id === id ? { ...t, completed: !t.completed, updatedAt: new Date() } : t
    );
    saveTasks(newTasks);
  };

  const handleDeleteTask = (id: string) => {
    if (confirm('Tem certeza que deseja excluir esta tarefa?')) {
      const newTasks = tasks.filter(t => t.id !== id);
      saveTasks(newTasks);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingTask) {
      const newTasks = tasks.map(t => 
        t.id === editingTask.id 
          ? { ...t, ...formData, updatedAt: new Date() } 
          : t
      );
      saveTasks(newTasks);
    } else {
      const newTask: Task = {
        id: Math.random().toString(36).substr(2, 9),
        userId: 'admin',
        title: formData.title,
        description: formData.description,
        completed: false,
        priority: formData.priority,
        dueDate: formData.dueDate,
        createdAt: new Date(),
        updatedAt: new Date()
      };
      saveTasks([newTask, ...tasks]);
    }
    closeModal();
  };

  const openModal = (task?: Task) => {
    if (task) {
      setEditingTask(task);
      setFormData({
        title: task.title,
        description: task.description,
        priority: task.priority,
        dueDate: task.dueDate || format(new Date(), 'yyyy-MM-dd')
      });
    } else {
      setEditingTask(null);
      setFormData({
        title: '',
        description: '',
        priority: 'MEDIUM',
        dueDate: format(new Date(), 'yyyy-MM-dd')
      });
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingTask(null);
  };

  const filteredTasks = tasks.filter(t => {
    const matchesSearch = t.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         t.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filter === 'ALL' || 
                         (filter === 'COMPLETED' && t.completed) || 
                         (filter === 'PENDING' && !t.completed);
    return matchesSearch && matchesFilter;
  });

  const priorityColors = {
    LOW: 'bg-blue-100 text-blue-700',
    MEDIUM: 'bg-amber-100 text-amber-700',
    HIGH: 'bg-red-100 text-red-700'
  };

  return (
    <div className="p-8 space-y-8 max-w-5xl mx-auto">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <p className="text-sm text-neutral-500 font-medium">Gestão de Atividades</p>
          <h1 className="text-3xl font-bold text-neutral-900 tracking-tight">Tarefas</h1>
        </div>
        <button 
          onClick={() => openModal()}
          className="flex items-center justify-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg text-sm font-medium shadow-sm shadow-primary-200 hover:bg-primary-700 transition-colors"
        >
          <Plus className="w-4 h-4" /> Nova Tarefa
        </button>
      </header>

      {/* Filters and Search */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400 w-4 h-4" />
          <input 
            type="text" 
            placeholder="Buscar tarefas..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-neutral-200 rounded-xl text-sm focus:ring-2 focus:ring-primary-500 transition-all outline-none"
          />
        </div>
        <div className="flex bg-neutral-100 p-1 rounded-xl w-full md:w-auto">
          {(['ALL', 'PENDING', 'COMPLETED'] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={cn(
                "flex-1 md:flex-none px-4 py-1.5 text-xs font-bold rounded-lg transition-all",
                filter === f ? "bg-white text-primary-600 shadow-sm" : "text-neutral-500 hover:text-neutral-900"
              )}
            >
              {f === 'ALL' ? 'Todas' : f === 'PENDING' ? 'Pendentes' : 'Concluídas'}
            </button>
          ))}
        </div>
      </div>

      {/* Task List */}
      <div className="space-y-3">
        <AnimatePresence mode="popLayout">
          {filteredTasks.length > 0 ? (
            filteredTasks.map((task) => (
              <motion.div
                key={task.id}
                layout
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className={cn(
                  "group bg-white p-4 rounded-2xl border border-neutral-200 shadow-sm flex items-start gap-4 transition-all hover:shadow-md",
                  task.completed && "opacity-75"
                )}
              >
                <button 
                  onClick={() => handleToggleComplete(task.id)}
                  className="mt-1 flex-shrink-0"
                >
                  {task.completed ? (
                    <CheckCircle2 className="w-6 h-6 text-primary-600" />
                  ) : (
                    <Circle className="w-6 h-6 text-neutral-300 hover:text-primary-400" />
                  )}
                </button>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className={cn(
                      "font-bold text-neutral-900 truncate tracking-tight",
                      task.completed && "line-through text-neutral-400"
                    )}>
                      {task.title}
                    </h3>
                    <span className={cn(
                      "px-2 py-0.5 rounded-[4px] text-[10px] font-bold uppercase",
                      priorityColors[task.priority]
                    )}>
                      {task.priority}
                    </span>
                  </div>
                  <p className={cn(
                    "text-sm text-neutral-500 line-clamp-2 leading-relaxed mb-3",
                    task.completed && "text-neutral-400"
                  )}>
                    {task.description}
                  </p>
                  
                  <div className="flex items-center gap-4 text-[10px] font-bold text-neutral-400 uppercase tracking-widest">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {task.dueDate ? format(new Date(task.dueDate), "dd MMM, yyyy", { locale: ptBR }) : 'Sem data'}
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button 
                    onClick={() => openModal(task)}
                    className="p-2 text-neutral-400 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors"
                  >
                    <Edit3 className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={() => handleDeleteTask(task.id)}
                    className="p-2 text-neutral-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            ))
          ) : (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20 bg-neutral-50 rounded-3xl border-2 border-dashed border-neutral-200"
            >
              <div className="inline-flex items-center justify-center w-12 h-12 bg-neutral-100 rounded-2xl text-neutral-400 mb-4">
                <CheckCircle className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-neutral-900">Tudo em dia!</h3>
              <p className="text-sm text-neutral-500">Nenhuma tarefa encontrada neste filtro.</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeModal}
              className="absolute inset-0 bg-neutral-900/40 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl overflow-hidden"
            >
              <div className="px-6 py-4 border-b border-neutral-100 flex items-center justify-between">
                <h2 className="font-bold text-neutral-900">
                  {editingTask ? 'Editar Tarefa' : 'Nova Tarefa'}
                </h2>
                <button onClick={closeModal} className="text-neutral-400 hover:text-neutral-900">
                  <Plus className="w-6 h-6 rotate-45" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="p-6 space-y-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest">Título</label>
                  <input 
                    required
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full px-4 py-2.5 bg-neutral-50 border border-neutral-200 rounded-xl text-sm focus:ring-2 focus:ring-primary-500 transition-all outline-none"
                    placeholder="O que precisa ser feito?"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest">Descrição</label>
                  <textarea 
                    rows={3}
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full px-4 py-2.5 bg-neutral-50 border border-neutral-200 rounded-xl text-sm focus:ring-2 focus:ring-primary-500 transition-all outline-none resize-none"
                    placeholder="Detalhes adicionais..."
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest">Prioridade</label>
                    <select
                      value={formData.priority}
                      onChange={(e) => setFormData({ ...formData, priority: e.target.value as any })}
                      className="w-full px-4 py-2.5 bg-neutral-50 border border-neutral-200 rounded-xl text-sm focus:ring-2 focus:ring-primary-500 transition-all outline-none cursor-pointer"
                    >
                      <option value="LOW">Baixa</option>
                      <option value="MEDIUM">Média</option>
                      <option value="HIGH">Alta</option>
                    </select>
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest">Data Limite</label>
                    <input 
                      type="date"
                      value={formData.dueDate}
                      onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                      className="w-full px-4 py-2.5 bg-neutral-50 border border-neutral-200 rounded-xl text-sm focus:ring-2 focus:ring-primary-500 transition-all outline-none"
                    />
                  </div>
                </div>

                <div className="pt-4 flex gap-3">
                  <button 
                    type="button" 
                    onClick={closeModal}
                    className="flex-1 px-4 py-2.5 border border-neutral-200 text-neutral-600 rounded-xl text-sm font-bold hover:bg-neutral-50 transition-all"
                  >
                    Cancelar
                  </button>
                  <button 
                    type="submit"
                    className="flex-1 px-4 py-2.5 bg-primary-600 text-white rounded-xl text-sm font-bold hover:bg-primary-700 shadow-md shadow-primary-600/20 active:scale-95 transition-all"
                  >
                    Salvar Tarefa
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
