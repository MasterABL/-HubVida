import React from 'react';

export const RadarChart = ({ data }) => {
  const size = 260;
  const center = size / 2;
  const radius = size / 2 - 30;
  const levels = 5;
  const axes = [
    { key: 'gestao', label: 'GESTÃO (ADM)' },
    { key: 'ingles', label: 'INGLÊS' },
    { key: 'pesquisa', label: 'PESQUISA CIENTÍFICA' },
    { key: 'ferramentas', label: 'FERRAMENTAS DIGITAIS' },
    { key: 'comunicacao', label: 'COMUNICAÇÃO' },
  ];

  const getPoint = (value, index) => {
    const angle = (Math.PI * 2 * index) / axes.length - Math.PI / 2;
    const r = (value / 100) * radius;
    return `${center + r * Math.cos(angle)},${center + r * Math.sin(angle)}`;
  };

  const webLines = Array.from({ length: levels }).map((_, levelIndex) => {
    const levelRadius = (radius / levels) * (levelIndex + 1);
    const points = axes
      .map((_, i) => {
        const angle = (Math.PI * 2 * i) / axes.length - Math.PI / 2;
        return `${center + levelRadius * Math.cos(angle)},${
          center + levelRadius * Math.sin(angle)
        }`;
      })
      .join(' ');
    return (
      <polygon
        key={levelIndex}
        points={points}
        fill="none"
        stroke="#2d333b"
        strokeWidth="1"
      />
    );
  });

  const axisLines = axes.map((_, i) => {
    const angle = (Math.PI * 2 * i) / axes.length - Math.PI / 2;
    return (
      <line
        key={i}
        x1={center}
        y1={center}
        x2={center + radius * Math.cos(angle)}
        y2={center + radius * Math.sin(angle)}
        stroke="#2d333b"
        strokeWidth="1"
      />
    );
  });

  const dataPoints = axes
    .map((axis, i) => getPoint(data[axis.key] || 0, i))
    .join(' ');

  const labels = axes.map((axis, i) => {
    const angle = (Math.PI * 2 * i) / axes.length - Math.PI / 2;
    const labelRadius = radius + 20;
    const x = center + labelRadius * Math.cos(angle);
    const y = center + labelRadius * Math.sin(angle);
    return (
      <text
        key={i}
        x={x}
        y={y}
        fill="#9ca3af"
        fontSize="10"
        fontWeight="bold"
        textAnchor="middle"
        dominantBaseline="middle"
      >
        {axis.label}
      </text>
    );
  });

  return (
    <svg width={size} height={size} className="mx-auto block">
      {webLines}
      {axisLines}
      <polygon
        points={dataPoints}
        fill="rgba(234, 179, 8, 0.2)"
        stroke="#eab308"
        strokeWidth="2"
      />
      {axes.map((axis, i) => (
        <circle
          key={`dot-${i}`}
          cx={getPoint(data[axis.key], i).split(',')[0]}
          cy={getPoint(data[axis.key], i).split(',')[1]}
          r="4"
          fill="#eab308"
        />
      ))}
      {labels}
    </svg>
  );
};
