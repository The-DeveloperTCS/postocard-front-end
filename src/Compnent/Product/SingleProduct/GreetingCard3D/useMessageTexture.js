import { useCallback, useEffect, useMemo, useRef } from "react";
import * as THREE from "three";

function roundRect(ctx, x, y, w, h, r) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + r);
  ctx.lineTo(x + w, y + h - r);
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  ctx.lineTo(x + r, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - r);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.closePath();
}

function wrapText(ctx, text, x, y, maxWidth, lineHeight) {
  const chunks = text.split(/\s+/);
  const tokens = chunks.length > 1 ? chunks : text.split("");
  let line = "";
  let cy = y;

  for (let i = 0; i < tokens.length; i += 1) {
    const piece = chunks.length > 1 ? tokens[i] : tokens[i];
    const test = line
      ? chunks.length > 1
        ? `${line} ${piece}`
        : `${line}${piece}`
      : piece;

    if (ctx.measureText(test).width > maxWidth && line) {
      ctx.fillText(line, x, cy);
      line = chunks.length > 1 ? piece : tokens[i];
      cy += lineHeight;
    } else {
      line = test;
    }
  }
  if (line) ctx.fillText(line, x, cy);
}

export function useMessageTexture(content = "", displayName = "") {
  const stateRef = useRef(null);

  const texture = useMemo(() => {
    const canvas = document.createElement("canvas");
    canvas.width = 768;
    canvas.height = 1024;
    const tex = new THREE.CanvasTexture(canvas);
    tex.colorSpace = THREE.SRGBColorSpace;
    tex.minFilter = THREE.LinearFilter;
    tex.magFilter = THREE.LinearFilter;
    stateRef.current = { canvas, tex };
    return tex;
  }, []);

  const paint = useCallback(() => {
    const pack = stateRef.current;
    if (!pack) return;

    const { canvas, tex } = pack;
    const ctx = canvas.getContext("2d");
    const w = canvas.width;
    const h = canvas.height;

    ctx.clearRect(0, 0, w, h);

    const pad = 44;
    const panelX = pad;
    const panelY = pad + 16;
    const panelW = w - pad * 2;
    const panelH = h - pad * 2 - 40;

    ctx.fillStyle = "rgba(255, 252, 248, 0.93)";
    roundRect(ctx, panelX, panelY, panelW, panelH, 18);
    ctx.fill();

    ctx.strokeStyle = "rgba(48, 64, 77, 0.1)";
    ctx.lineWidth = 2;
    roundRect(ctx, panelX, panelY, panelW, panelH, 18);
    ctx.stroke();

    const message = content?.trim();
    const hasMessage = Boolean(message);

    ctx.textAlign = "left";
    ctx.textBaseline = "top";
    ctx.font = hasMessage
      ? '600 34px "Dancing Script", "Segoe Script", cursive'
      : '400 28px "Dancing Script", "Segoe Script", cursive';
    ctx.fillStyle = hasMessage ? "#24303a" : "rgba(48, 64, 77, 0.42)";

    wrapText(
      ctx,
      hasMessage ? message : "Type your message on the left — it appears here.",
      panelX + 26,
      panelY + 32,
      panelW - 52,
      42
    );

    if (displayName?.trim()) {
      ctx.strokeStyle = "rgba(48, 64, 77, 0.28)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(panelX + panelW - 180, panelY + panelH - 58);
      ctx.lineTo(panelX + panelW - 26, panelY + panelH - 58);
      ctx.stroke();

      ctx.textAlign = "right";
      ctx.font = '700 38px "Dancing Script", "Segoe Script", cursive';
      ctx.fillStyle = "#30404d";
      ctx.fillText(
        displayName.trim(),
        panelX + panelW - 26,
        panelY + panelH - 48
      );
    }

    tex.needsUpdate = true;
  }, [content, displayName]);

  useEffect(() => {
    paint();
  }, [paint]);

  return texture;
}
