import React, { useState, useEffect, useRef } from "react";
import {
  Plus,
  X,
  Calendar,
  CheckCircle2,
  Award,
  Upload,
  Trash2,
  Edit3,
} from "lucide-react";

import { ICON_LIST, ICON_REGISTRY } from "../utils/iconRegistry.js";
import IconPicker from "../components/IconPicker.jsx";

/**
 * MAIN PAGE COMPONENTS
 */

const AchievementCard = ({ achievement, index, onEdit, onDelete }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const cardRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), index * 100);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 },
    );
    if (cardRef.current) observer.observe(cardRef.current);
    return () => observer.disconnect();
  }, [index]);

  const IconComp = ICON_REGISTRY[achievement.iconName] || CheckCircle2;
  const cardStyle = achievement.image
    ? { width: "100%", height: "auto", aspectRatio: "auto" }
    : {
        height: achievement.height || "320px",
        width: achievement.width || "100%",
      };

  return (
    <div
      ref={cardRef}
      className={`relative perspective-1000 transition-all duration-700 ease-out transform
        ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
      style={cardStyle}
    >
      <div
        onClick={() => !showDeleteConfirm && setIsFlipped(!isFlipped)}
        className={`relative w-full h-full transition-transform duration-500 cursor-pointer preserve-3d group ${isFlipped ? "rotate-y-180" : ""}`}
      >
        {/* FRONT FACE */}
        <div
          className={`absolute inset-0 backface-hidden bg-white rounded-xl border border-slate-300 shadow-sm overflow-hidden flex flex-col group-hover:shadow-md transition-shadow ${achievement.image ? "relative" : ""}`}
        >
          <div
            className={`${achievement.image ? "w-full" : "h-2/3"} bg-gray-50 flex items-center justify-center overflow-hidden relative`}
          >
            {achievement.image ? (
              <img
                src={achievement.image}
                alt={achievement.title}
                className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-110"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-purple-50 transition-transform duration-500 group-hover:rotate-6 group-hover:scale-110">
                <IconComp size={64} className="text-purple-400" />
              </div>
            )}
          </div>
          <div className="p-4 flex flex-col justify-between flex-grow relative">
            <div>
              <h3 className="text-gray-800 font-semibold text-lg leading-tight">
                {achievement.title}
              </h3>
              <p className="text-gray-500 text-sm mt-1 line-clamp-2">
                {achievement.description}
              </p>
            </div>
            <div className="flex items-center text-gray-400 text-xs mt-3">
              <Calendar size={12} className="mr-1" />
              {achievement.date}
            </div>

            {/* Action Buttons Container */}
            <div className="absolute bottom-4 right-4 flex gap-2">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setShowDeleteConfirm(true);
                }}
                className="p-2 rounded-lg bg-white border border-slate-200 text-slate-400 opacity-20 group-hover:opacity-100 hover:text-red-500 transition-all duration-300"
                title="Delete Achievement"
              >
                <Trash2 size={14} />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onEdit(achievement);
                }}
                className="p-2 rounded-lg bg-white border border-slate-200 text-slate-400 opacity-20 group-hover:opacity-100 hover:text-purple-600 transition-all duration-300"
                title="Edit Achievement"
              >
                <Edit3 size={14} />
              </button>
            </div>
          </div>

          {/* Delete Confirmation Overlay (Internal to card) */}
          {showDeleteConfirm && (
            <div className="absolute inset-0 z-10 bg-white/90 backdrop-blur-sm p-6 flex flex-col items-center justify-center text-center animate-in fade-in duration-200">
              <p className="text-gray-800 font-medium mb-4">
                Delete this achievement?
              </p>
              <div className="flex gap-2 w-full">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowDeleteConfirm(false);
                  }}
                  className="flex-1 py-2 text-sm bg-gray-50 text-gray-500 hover:bg-gray-300 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onDelete(achievement.id);
                    setShowDeleteConfirm(false);
                  }}
                  className="flex-1 py-2 text-sm bg-slate-100 text-gray-700 hover:bg-[red] rounded-lg font-semibold transition-colors"
                >
                  Confirm
                </button>
              </div>
            </div>
          )}
        </div>

        {/* BACK FACE */}
        <div className="absolute inset-0 backface-hidden rotate-y-180 bg-purple-600 border border-slate-300 rounded-xl p-6 text-white flex flex-col shadow-xl overflow-hidden">
          <div className="flex justify-between items-start mb-4 flex-shrink-0">
            <IconComp size={32} className="text-purple-200" />
            <span className="text-xs bg-purple-500 px-2 py-1 rounded-full text-purple-100">
              Details
            </span>
          </div>
          <h3 className="font-bold text-xl mb-2 flex-shrink-0">
            {achievement.title}
          </h3>
          <div className="overflow-y-auto custom-scrollbar flex-grow pr-1">
            <p className="text-purple-100 text-sm leading-relaxed whitespace-normal break-words overflow-wrap-anywhere">
              {achievement.description}
            </p>
          </div>
          <div className="pt-4 mt-auto border-t border-purple-500/50 flex items-center justify-between text-xs flex-shrink-0">
            <span>Milestone Achieved</span>
            <span>{achievement.date}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function Milestone() {
  const [achievements, setAchievements] = useState([
    {
      id: 1,
      title: "7-Day Streak",
      description: "Completed all focus sessions for a full week.",
      date: "Oct 12, 2023",
      iconName: "Flame",
      height: "340px",
      width: "100%",
    },
    {
      id: 2,
      title: "Deep Work Master",
      description:
        "Successfully finished a 4-hour deep work session without distractions.",
      date: "Oct 15, 2023",
      iconName: "Target",
      height: "310px",
      width: "95%",
    },
    {
      id: 3,
      title: "Early Bird",
      description: "Started a focus session before 6 AM.",
      date: "Oct 20, 2023",
      iconName: "Star",
      height: "360px",
      width: "100%",
    },
    {
      id: 4,
      title: "100 Tasks Done",
      description: "You've officially checked off 100 items from your list!",
      date: "Nov 02, 2023",
      iconName: "CheckCircle2",
      height: "300px",
      width: "98%",
    },
    {
      id: 5,
      title: "Zen Mode",
      description:
        "Reached a state of total focus during the 'Quiet Hour' challenge.",
      date: "Nov 05, 2023",
      iconName: "Zap",
      height: "330px",
      width: "100%",
    },
    {
      id: 6,
      title: "Zen Mode",
      description:
        "Reached a state of total focus during the 'Quiet Hour' challenge.",
      date: "Nov 05, 2023",
      iconName: "Zap",
      height: "330px",
      width: "100%",
    },
    {
      id: 7,
      title: "Zen Mode",
      description:
        "Reached a state of total focus during the 'Quiet Hour' challenge.",
      date: "Nov 05, 2023",
      iconName: "Zap",
      height: "330px",
      width: "100%",
    },
    {
      id: 8,
      title: "Zen Mode",
      description:
        "Reached a state of total focus during the 'Quiet Hour' challenge.",
      date: "Nov 05, 2023",
      iconName: "Zap",
      height: "330px",
      width: "100%",
    },
    {
      id: 9,
      title: "Zen Mode",
      description:
        "Reached a state of total focus during the 'Quiet Hour' challenge.",
      date: "Nov 05, 2023",
      iconName: "Zap",
      height: "330px",
      width: "100%",
    },
    {
      id: 10,
      title: "Zen Mode",
      description:
        "Reached a state of total focus during the 'Quiet Hour' challenge.",
      date: "Nov 05, 2023",
      iconName: "Zap",
      height: "330px",
      width: "100%",
    },
    {
      id: 11,
      title: "Zen Mode",
      description:
        "Reached a state of total focus during the 'Quiet Hour' challenge.",
      date: "Nov 05, 2023",
      iconName: "Zap",
      height: "330px",
      width: "100%",
    },
    {
      id: 12,
      title: "Zen Mode",
      description:
        "Reached a state of total focus during the 'Quiet Hour' challenge.",
      date: "Nov 05, 2023",
      iconName: "Zap",
      height: "330px",
      width: "100%",
    },
    {
      id: 13,
      title: "Zen Mode",
      description:
        "Reached a state of total focus during the 'Quiet Hour' challenge.",
      date: "Nov 05, 2023",
      iconName: "Zap",
      height: "330px",
      width: "100%",
    },
    {
      id: 14,
      title: "Zen Mode",
      description:
        "Reached a state of total focus during the 'Quiet Hour' challenge.",
      date: "Nov 05, 2023",
      iconName: "Zap",
      height: "330px",
      width: "100%",
    },
    {
      id: 15,
      title: "Zen Mode",
      description:
        "Reached a state of total focus during the 'Quiet Hour' challenge.",
      date: "Nov 05, 2023",
      iconName: "Zap",
      height: "330px",
      width: "100%",
    },
    {
      id: 16,
      title: "Zen Mode",
      description:
        "Reached a state of total focus during the 'Quiet Hour' challenge.",
      date: "Nov 05, 2023",
      iconName: "Zap",
      height: "330px",
      width: "100%",
    },
    {
      id: 17,
      title: "Zen Mode",
      description:
        "Reached a state of total focus during the 'Quiet Hour' challenge.",
      date: "Nov 05, 2023",
      iconName: "Zap",
      height: "330px",
      width: "100%",
    },
    {
      id: 18,
      title: "Zen Mode",
      description:
        "Reached a state of total focus during the 'Quiet Hour' challenge.",
      date: "Nov 05, 2023",
      iconName: "Zap",
      height: "330px",
      width: "100%",
    },
    {
      id: 19,
      title: "Zen Mode",
      description:
        "Reached a state of total focus during the 'Quiet Hour' challenge.",
      date: "Nov 05, 2023",
      iconName: "Zap",
      height: "330px",
      width: "100%",
    },
    {
      id: 20,
      title: "Zen Mode",
      description:
        "Reached a state of total focus during the 'Quiet Hour' challenge.",
      date: "Nov 05, 2023",
      iconName: "Zap",
      height: "330px",
      width: "100%",
    },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [newDesc, setNewDesc] = useState("");
  const [selectedIconName, setSelectedIconName] = useState("CheckCircle2");
  const [uploadedImage, setUploadedImage] = useState(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setUploadedImage(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const openEditModal = (achievement) => {
    setEditingId(achievement.id);
    setNewDesc(achievement.description);
    setSelectedIconName(achievement.iconName);
    setUploadedImage(achievement.image);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingId(null);
    setNewDesc("");
    setSelectedIconName("CheckCircle2");
    setUploadedImage(null);
  };

  const handleDeleteAchievement = (id) => {
    setAchievements((prev) => prev.filter((a) => a.id !== id));
  };

  const handleAddAchievement = (e) => {
    e.preventDefault();
    const isImageMode = !!uploadedImage;

    if (editingId) {
      setAchievements((prev) =>
        prev.map((item) => {
          if (item.id === editingId) {
            return {
              ...item,
              description: newDesc,
              iconName: selectedIconName,
              image: uploadedImage,
              height:
                isImageMode && !item.image
                  ? null
                  : !isImageMode && item.image
                    ? `${Math.floor(Math.random() * (380 - 300 + 1) + 300)}px`
                    : item.height,
              width:
                isImageMode && !item.image
                  ? null
                  : !isImageMode && item.image
                    ? `${Math.floor(Math.random() * (100 - 92 + 1) + 92)}%`
                    : item.width,
            };
          }
          return item;
        }),
      );
    } else {
      const newEntry = {
        id: Date.now(),
        title: "New Milestone",
        description: newDesc || "A new win for FocusFlow!",
        date: new Date().toLocaleDateString("en-US", {
          month: "short",
          day: "2-digit",
          year: "numeric",
        }),
        iconName: selectedIconName,
        image: uploadedImage,
        height: isImageMode
          ? null
          : `${Math.floor(Math.random() * (380 - 300 + 1) + 300)}px`,
        width: isImageMode
          ? null
          : `${Math.floor(Math.random() * (100 - 92 + 1) + 92)}%`,
      };
      setAchievements([...achievements, newEntry]);
    }
    handleCloseModal();
  };

  return (
    <div className="min-h-screen bg-[#F9FAFB] text-gray-900 font-sans selection:bg-purple-100 selection:text-purple-900">
      <style>{`
        .perspective-1000 { perspective: 1000px; }
        .preserve-3d { transform-style: preserve-3d; }
        .backface-hidden { backface-visibility: hidden; }
        .rotate-y-180 { transform: rotateY(180deg); }
      `}</style>

      <header className="max-w-6xl mx-auto pt-16 pb-12 px-6 text-center">
        <div className="inline-flex items-center justify-center p-2 bg-purple-50 rounded-full mb-4">
          <Award className="text-purple-500 w-5 h-5" />
        </div>
        <h1 className="text-4xl font-bold tracking-tight text-gray-900">
          Achievements
        </h1>
        <p className="mt-3 text-gray-500 text-lg max-w-lg mx-auto">
          Tracking your wins, milestones, and moments of peak productivity.
        </p>
      </header>

      <main className="max-w-[1500px] mx-auto px-6 pb-24">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3  gap-6 items-start">
          {achievements.map((achievement, idx) => (
            <AchievementCard
              key={achievement.id}
              achievement={achievement}
              index={idx}
              onEdit={openEditModal}
              onDelete={handleDeleteAchievement}
            />
          ))}

          <button
            onClick={() => setIsModalOpen(true)}
            className="w-full h-[300px] border-2 border-dashed border-gray-200 bg-purple-50/30 rounded-xl flex flex-col items-center justify-center transition-all duration-300 hover:border-purple-300 hover:bg-purple-50 hover:scale-[1.02] hover:shadow-lg group"
          >
            <div className="p-4 rounded-full bg-white shadow-sm border border-gray-100 group-hover:shadow-purple-100 transition-all">
              <Plus
                className="text-gray-400 group-hover:text-purple-500"
                size={32}
              />
            </div>
            <span className="mt-4 font-medium text-gray-500 group-hover:text-purple-600">
              Add Achievement
            </span>
          </button>
        </div>
      </main>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-gray-900/40 backdrop-blur-sm"
            onClick={handleCloseModal}
          />

          <div className="relative bg-white w-full max-w-md rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center">
              <div>
                <h2 className="text-xl font-bold text-gray-800">
                  {editingId ? "Edit Achievement" : "New Achievement"}
                </h2>
              </div>
              <button
                onClick={handleCloseModal}
                className="p-1 rounded-full hover:bg-gray-100 text-gray-400 transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleAddAchievement} className="p-6 space-y-8">
              <div className="flex flex-col items-center">
                <label className="block text-sm font-semibold text-gray-700 mb-6 text-center">
                  Visual Representation
                </label>
                <div className="flex items-center justify-around w-full max-w-[240px]">
                  <div className="flex flex-col items-center gap-2">
                    <IconPicker
                      value={selectedIconName}
                      onChange={setSelectedIconName}
                    />
                    <span className="text-[10px] uppercase tracking-widest text-gray-400 font-bold">
                      Icon
                    </span>
                  </div>
                  <div className="h-8 w-[1px] bg-gray-100" />
                  <div className="flex flex-col items-center gap-2">
                    <label
                      className={`w-12 h-12 flex items-center justify-center border border-slate-200 rounded-xl cursor-pointer transition-all shadow-sm icon-btn-press ${uploadedImage ? "bg-purple-600 border-purple-600 text-white" : "bg-slate-50 text-slate-400 hover:bg-purple-50 hover:border-purple-300 hover:text-purple-600"}`}
                    >
                      <Upload size={20} className="icon-hover-effect" />
                      <input
                        type="file"
                        className="hidden"
                        onChange={handleImageUpload}
                        accept="image/*"
                      />
                    </label>
                    <span className="text-[10px] uppercase tracking-widest text-gray-400 font-bold">
                      Image
                    </span>
                  </div>
                </div>
                {uploadedImage && (
                  <button
                    type="button"
                    onClick={() => setUploadedImage(null)}
                    className="mt-4 text-[10px] text-gray-400 hover:text-red-500 transition-colors"
                  >
                    Remove Image
                  </button>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Achievement Details
                </label>
                <textarea
                  required
                  placeholder="What did you achieve today?"
                  value={newDesc}
                  onChange={(e) => setNewDesc(e.target.value)}
                  className="w-full h-24 p-4 rounded-xl bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-4 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-xl shadow-lg shadow-purple-200 active:scale-95 transition-all flex items-center justify-center gap-2"
              >
                {editingId ? "Update Achievement" : "Log Achievement"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
