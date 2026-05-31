import { useEffect, useRef } from "react";

function AchievementSound({ task }) {
  const audioRef = useRef(null);

  useEffect(() => {
    if (task.completed && audioRef.current) {
      audioRef.current.play().catch((err) => {
        console.log("Autoplay blocked:", err);
      });
    }
  }, [task]);

  return <audio ref={audioRef} src="/sounds/achievementSound.mp3" autoPlay />;
}
export default AchievementSound;
