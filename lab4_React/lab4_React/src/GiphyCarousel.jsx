import { useState } from "react";
import { useFetch } from "./useFetch";

const API_KEY = import.meta.env.VITE_GIPHY_API_KEY; 

export default function GiphyCarousel() {
  const [term, setTerm] = useState("");
  const [query, setQuery] = useState("");
  const [index, setIndex] = useState(0);

  const { data, loading, error } = useFetch(
    query
      ? `https://api.giphy.com/v1/gifs/search?api_key=${API_KEY}&q=${encodeURIComponent(
          query
        )}&limit=15&rating=g`
      : null
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    setQuery(term.trim());
    setIndex(0); // reiniciar carrusel en nueva búsqueda
  };

  const handleNext = () => {
    if (data?.data && index < data.data.length - 1) {
      setIndex(index + 1);
    }
  };

  const handlePrev = () => {
    if (index > 0) {
      setIndex(index - 1);
    }
  };

  const gifs = data?.data || [];
  const currentGif = gifs[index];

  return (
    <div style={{ maxWidth: 600, margin: "2rem auto", textAlign: "center" }}>
      <h1>🎬  GIFs </h1>

      {/* Formulario de búsqueda */}
      <form onSubmit={handleSubmit} style={{ marginBottom: "1rem" }}>
        <input
          type="text"
          value={term}
          placeholder="Ej: cats, Star Wars, memes..."
          onChange={(e) => setTerm(e.target.value)}
          style={{ padding: "0.5rem", width: "70%" }}
        />
        <button type="submit" style={{ padding: "0.55rem 1rem", marginLeft: 8 }}>
          Buscar
        </button>
      </form>

      {loading && <p>Cargando GIFs...</p>}
      {error && <p style={{ color: "red" }}>Error al cargar los datos</p>}

      {/* Mostrar un GIF a la vez */}
      {currentGif && (
        <div>
          <img
            src={currentGif.images.fixed_height.url}
            alt={currentGif.title}
            style={{
              borderRadius: 12,
              maxWidth: "100%",
              height: "auto",
              marginBottom: "1rem",
            }}
          />
          <p>{currentGif.title || "Sin título"}</p>

          <div style={{ display: "flex", justifyContent: "center", gap: 16 }}>
            <button onClick={handlePrev} disabled={index === 0}>
              ⟵ Anterior
            </button>
            <button onClick={handleNext} disabled={index === gifs.length - 1}>
              Siguiente ⟶
            </button>
          </div>
        </div>
      )}

      {/* Si no hay resultados */}
      {query && !loading && gifs.length === 0 && (
        <p>No se encontraron GIFs para “{query}”.</p>
      )}
    </div>
  );
}
