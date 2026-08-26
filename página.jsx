import React, { useEffect, useRef, useState } from 'react';

export default function QuizGame() {
  const [preguntaActual, setPreguntaActual] = useState(0);
  const [respondidas, setRespondidas] = useState(false);
  const [mouseX, setMouseX] = useState(null);
  const [mouseY, setMouseY] = useState(null);
  const [empezado, setEmpezado] = useState(false);
  const [fallo, setFallo] = useState(false);
  const [fondoColor, setFondoColor] = useState('linear-gradient(135deg, #667eea 0%, #764ba2 100%)');

  const preguntas = [
    {
      pregunta: '6 + 6 = ?',
      respuestaCorrecta: 12,
      opciones: [10, 12, 14, 11],
    },
    {
      pregunta: '10 - 3 = ?',
      respuestaCorrecta: 7,
      opciones: [5, 8, 7, 6],
    },
    {
      pregunta: '5 × 4 = ?',
      respuestaCorrecta: 20,
      opciones: [15, 25, 20, 18],
    },
    {
      pregunta: '100 ÷ 5 = ?',
      respuestaCorrecta: 20,
      opciones: [15, 25, 20, 30],
    },
  ];

  const handleRespuesta = (respuesta) => {
    if (respuesta === preguntas[preguntaActual].respuestaCorrecta) {
      if (preguntaActual < 4) {
        setPreguntaActual(preguntaActual + 1);
        setRespondidas(false);
        setFallo(false);
      }
    } else {
      setFallo(true);
    }
  };

  const handleNo = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const maxX = Math.max(10, window.innerWidth - rect.width - 20);
    const maxY = Math.max(10, window.innerHeight - rect.height - 20);
    setMouseX(Math.random() * maxX + 10);
    setMouseY(Math.random() * maxY + 10);
  };

  const handleSi = () => {
    setRespondidas(true);
    setFondoColor('linear-gradient(135deg, #ff7e5f 0%, #feb47b 100%)');
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        background: fondoColor,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
        fontFamily: 'Arial, sans-serif',
        transition: 'background 0.5s ease',
      }}
    >
      <div
        style={{
          backgroundColor: 'white',
          borderRadius: '20px',
          padding: '40px',
          textAlign: 'center',
          maxWidth: '500px',
          width: '100%',
          boxShadow: '0 10px 40px rgba(0,0,0,0.3)',
        }}
      >
        {!empezado ? (
          <>
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                marginBottom: '30px',
              }}
            >
              <div
                style={{
                  width: '60px',
                  height: '60px',
                  border: '4px solid #667eea',
                  borderTop: '4px solid #764ba2',
                  borderRadius: '50%',
                  animation: 'spin 1s linear infinite',
                }}
              ></div>
              <style>{`
                @keyframes spin {
                  0% { transform: rotate(0deg); }
                  100% { transform: rotate(360deg); }
                }
              `}</style>
            </div>

            <h1 style={{ color: '#333', marginBottom: '20px', fontSize: '28px' }}>
              ¿Eres mi bro? 🤜🤛
            </h1>

            <p
              style={{
                color: '#666',
                marginBottom: '30px',
                fontSize: '16px',
                lineHeight: '1.6',
              }}
            >
              Responde estas preguntas para saber si eres mi bro
            </p>

            <p
              style={{
                color: '#764ba2',
                marginBottom: '40px',
                fontSize: '14px',
                fontWeight: 'bold',
              }}
            >
              Hecho por erisen 🤑
            </p>

            <button
              onClick={() => setEmpezado(true)}
              style={{
                padding: '15px 50px',
                fontSize: '18px',
                backgroundColor: '#667eea',
                color: 'white',
                border: 'none',
                borderRadius: '10px',
                cursor: 'pointer',
                fontWeight: 'bold',
                transition: 'transform 0.2s',
              }}
              onMouseEnter={(e) => (e.target.style.transform = 'scale(1.05)')}
              onMouseLeave={(e) => (e.target.style.transform = 'scale(1)')}
            >
              Empezar 🚀
            </button>
          </>
        ) : preguntaActual < 4 ? (
          fallo ? (
            <>
              <h1 style={{ color: '#f44336', marginBottom: '30px', fontSize: '32px' }}>
                ¡De verdad que tonto eres! 😂
              </h1>
              <p style={{ color: '#666', marginBottom: '40px', fontSize: '16px' }}>
                Vuelve a intentarlo...
              </p>
              <button
                onClick={() => setFallo(false)}
                style={{
                  padding: '15px 40px',
                  fontSize: '18px',
                  backgroundColor: '#667eea',
                  color: 'white',
                  border: 'none',
                  borderRadius: '10px',
                  cursor: 'pointer',
                  fontWeight: 'bold',
                  transition: 'transform 0.2s',
                }}
                onMouseEnter={(e) => (e.target.style.transform = 'scale(1.05)')}
                onMouseLeave={(e) => (e.target.style.transform = 'scale(1)')}
              >
                🔄 Volver a la pregunta
              </button>
            </>
          ) : (
            <>
              <h2 style={{ color: '#333', marginBottom: '30px', fontSize: '24px' }}>
                Pregunta {preguntaActual + 1}
              </h2>
              <h1 style={{ color: '#667eea', marginBottom: '40px', fontSize: '32px' }}>
                {preguntas[preguntaActual].pregunta}
              </h1>

              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '15px',
                  justifyContent: 'center',
                }}
              >
                {preguntas[preguntaActual].opciones.map((opcion, index) => (
                  <button
                    key={index}
                    onClick={() => handleRespuesta(opcion)}
                    style={{
                      padding: '20px 30px',
                      fontSize: '20px',
                      backgroundColor: '#667eea',
                      color: 'white',
                      border: 'none',
                      borderRadius: '10px',
                      cursor: 'pointer',
                      fontWeight: 'bold',
                      transition: 'transform 0.2s',
                    }}
                    onMouseEnter={(e) => (e.target.style.transform = 'scale(1.05)')}
                    onMouseLeave={(e) => (e.target.style.transform = 'scale(1)')}
                  >
                    {opcion}
                  </button>
                ))}
              </div>
            </>
          )
        ) : !respondidas ? (
          <>
            <h2 style={{ color: '#333', marginBottom: '30px', fontSize: '24px' }}>
              Pregunta 5
            </h2>
            <h1 style={{ color: '#764ba2', marginBottom: '40px', fontSize: '28px' }}>
              ¿Eres gay? 🏳️‍🌈
            </h1>

            <p
              style={{
                color: '#666',
                marginBottom: '30px',
                fontSize: '16px',
                minHeight: '40px',
              }}
            >
              Venga, di que sí 😏
            </p>

            <div
              style={{
                display: 'flex',
                gap: '15px',
                justifyContent: 'center',
                flexWrap: 'wrap',
              }}
            >
              <button
                onClick={handleSi}
                style={{
                  padding: '15px 40px',
                  fontSize: '18px',
                  backgroundColor: '#4CAF50',
                  color: 'white',
                  border: 'none',
                  borderRadius: '10px',
                  cursor: 'pointer',
                  fontWeight: 'bold',
                  transition: 'transform 0.2s',
                }}
                onMouseEnter={(e) => (e.target.style.transform = 'scale(1.05)')}
                onMouseLeave={(e) => (e.target.style.transform = 'scale(1)')}
              >
                ✓ Sí
              </button>

              <button
                onMouseEnter={handleNo}
                onClick={handleNo}
                style={{
                  padding: '15px 40px',
                  fontSize: '18px',
                  backgroundColor: '#f44336',
                  color: 'white',
                  border: 'none',
                  borderRadius: '10px',
                  cursor: 'pointer',
                  fontWeight: 'bold',
                  position: mouseX !== null ? 'fixed' : 'relative',
                  left: mouseX !== null ? `${mouseX}px` : 'auto',
                  top: mouseY !== null ? `${mouseY}px` : 'auto',
                  transition: 'all 0.3s ease',
                }}
              >
                ✗ No
              </button>
            </div>
          </>
        ) : (
          <div style={{ textAlign: 'center' }}>
            <h1 style={{ color: '#764ba2', marginBottom: '20px', fontSize: '28px' }}>
              ¡Ya lo sabía bro! 🤜🤛
            </h1>
            <p style={{ color: '#666', fontSize: '18px', marginBottom: '30px' }}>
              Pero aún eres mi amigo 😊
            </p>

            <button
              onClick={() => {
                setPreguntaActual(0);
                setRespondidas(false);
                setMouseX(null);
                setMouseY(null);
                setEmpezado(false);
                setFallo(false);
                setFondoColor('linear-gradient(135deg, #667eea 0%, #764ba2 100%)');
              }}
              style={{
                padding: '15px 40px',
                fontSize: '16px',
                backgroundColor: '#667eea',
                color: 'white',
                border: 'none',
                borderRadius: '10px',
                cursor: 'pointer',
                fontWeight: 'bold',
                transition: 'transform 0.2s',
              }}
              onMouseEnter={(e) => (e.target.style.transform = 'scale(1.05)')}
              onMouseLeave={(e) => (e.target.style.transform = 'scale(1)')}
            >
              🔄 Jugar de nuevo
            </button>
          </div>
        )}
      </div>
    </div>
  );
}