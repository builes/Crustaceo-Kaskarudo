import { useRef, useState } from "react";
import { Button } from "@/components/ui/Button";

const characters = [
  { name: "Bob Esponja", img: "/images/bob.avif", audio: "bob.mp3" },
  { name: "Patricio", img: "/images/patricio.jpg", audio: "patricio.mp3" },
  { name: "Calamardo", img: "/images/calamardo.avif", audio: "calamardo.mp3" },
  { name: "Arenita", img: "/images/arenita.jpg", audio: "arenita.mp3" },
  { name: "Don Cangrejo", img: "/images/cangrejo.webp", audio: "krabs.mp3" },
];

export const Home = () => {
  const [explode, setExplode] = useState(false);
  const currentVoice = useRef(null);

  const handleExplosion = () => {
    setExplode(true);

    const laugh = new Audio("/audios/risa.mp3");
    laugh.play();

    setTimeout(() => setExplode(false), 1600);
  };

  const playVoice = (audioFile) => {
    // Detiene cualquier audio en reproducción
    if (currentVoice.current) {
      currentVoice.current.pause();
      currentVoice.current.currentTime = 0;
    }

    const voice = new Audio(`/audios/${audioFile}`);
    currentVoice.current = voice;
    voice.play();
  };

  return (
    <div className="container py-5 text-center text-white position-relative">
      <h1 className="display-4 text-warning">
        Bienvenido al Crustáceo Cascarudo 🍔
      </h1>
      <p className="lead mb-4">¡Conoce a nuestro equipo submarino!</p>

      {/* Personajes */}
      <div className="row justify-content-center g-4 mb-5">
        {characters.map((char) => (
          <div className="col-6 col-sm-4 col-md-2" key={char.name}>
            <div
              className="card bg-transparent border-0"
              style={{ cursor: "pointer" }}
              onClick={() => playVoice(char.audio)}
            >
              <img
                src={char.img}
                alt={char.name}
                className="img-fluid mb-2"
                style={{
                  width: "120px",
                  height: "120px",
                  objectFit: "cover",
                  borderRadius: "12px",
                }}
              />
              <p className="fw-bold text-white">{char.name}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Botón Explosión de mar */}
      <Button className="btn-warning fw-bold mb-4" onClick={handleExplosion}>
        🌊 ¡Explosión de mar!
      </Button>

      {/* Burbujas dinámicas */}
      {explode &&
        [...Array(150)].map((_, i) => (
          <div
            key={i}
            className="bubble"
            style={{
              top: `${Math.random() * 100}vh`,
              left: `${Math.random() * 100}vw`,
              width: `${8 + Math.random() * 24}px`,
              height: `${8 + Math.random() * 24}px`,
              animationDelay: `${Math.random() * 0.3}s`,
            }}
          ></div>
        ))}
    </div>
  );
};
