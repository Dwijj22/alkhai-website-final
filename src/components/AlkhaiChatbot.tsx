'use client';

import { useEffect, useRef, useState, useCallback, FormEvent, KeyboardEvent } from 'react';
import Image from 'next/image';

// ============================================================
// TYPES
// ============================================================
type Stage = 'welcome' | 'name' | 'phone' | 'email' | 'quiz' | 'result';
type Tier = 'safe' | 'warn' | 'danger';

interface Answer {
  question: string;
  answer: string;
  points: number;
}

interface Question {
  q: string;
  opts: string[];
}

interface ChatMessage {
  id: number;
  type: 'bot' | 'user' | 'options' | 'input-name' | 'input-phone' | 'input-email' | 'result';
  content?: string;
  options?: string[];
  selectedOption?: string;
  disabled?: boolean;
  onSelect?: (opt: string, i: number) => void;
  resultData?: ResultData;
}

interface ResultData {
  score: number;
  tier: Tier;
  status: string;
  tierLabel: string;
  desc: string;
  rec: string;
  consultBlurb: string;
}

// ============================================================
// DATA
// ============================================================
const QUESTIONS: Question[] = [
  { q: 'How frequently do tasks or projects exceed expected timelines?',
    opts: ['Never', 'Occasionally', 'Frequently', 'Almost always'] },
  { q: 'How often does your team spend time resolving recurring issues?',
    opts: ['Never', 'Occasionally', 'Frequently', 'Constantly'] },
  { q: 'How well-defined are your operational processes (roles, responsibilities, workflows)?',
    opts: ['Clearly defined', 'Mostly defined', 'Partially defined', 'Poorly defined'] },
  { q: 'How often do delays occur due to miscommunication or unclear ownership?',
    opts: ['Rarely', 'Sometimes', 'Often', 'Very often'] },
  { q: 'To what extent can you track time, cost, and resource utilization across operations?',
    opts: ['Fully tracked', 'Mostly tracked', 'Partially tracked', 'Not tracked'] },
  { q: 'How frequently do systems or tools (software, IT infrastructure) create delays?',
    opts: ['Never', 'Occasionally', 'Frequently', 'Very frequently'] },
  { q: 'How clearly can you identify the main source of delays or losses in your business?',
    opts: ['Clearly identified', 'Somewhat identified', 'Unclear', 'Not identified'] },
  { q: 'How often does work require reprocessing, corrections, or rework?',
    opts: ['Rarely', 'Sometimes', 'Often', 'Very often'] },
  { q: 'How often are decisions delayed due to fragmented or unclear data?',
    opts: ['Never', 'Sometimes', 'Often', 'Very often'] },
  { q: 'How would you rate the overall efficiency of your business operations?',
    opts: ['Highly efficient', 'Moderately efficient', 'Needs improvement', 'Inefficient'] },
];

const COUNTRY_CODES = [
  { code: '+1', name: 'US/CA' },
  { code: '+44', name: 'UK' },
  { code: '+91', name: 'IN' },
  { code: '+971', name: 'AE' },
  { code: '+966', name: 'SA' },
  { code: '+974', name: 'QA' },
  { code: '+965', name: 'KW' },
  { code: '+973', name: 'BH' },
  { code: '+968', name: 'OM' },
  { code: '+20', name: 'EG' },
  { code: '+61', name: 'AU' },
  { code: '+49', name: 'DE' },
  { code: '+33', name: 'FR' },
  { code: '+39', name: 'IT' },
  { code: '+34', name: 'ES' },
  { code: '+31', name: 'NL' },
  { code: '+46', name: 'SE' },
  { code: '+47', name: 'NO' },
  { code: '+45', name: 'DK' },
  { code: '+41', name: 'CH' },
  { code: '+81', name: 'JP' },
  { code: '+86', name: 'CN' },
  { code: '+65', name: 'SG' },
  { code: '+60', name: 'MY' },
  { code: '+62', name: 'ID' },
  { code: '+66', name: 'TH' },
  { code: '+63', name: 'PH' },
  { code: '+84', name: 'VN' },
  { code: '+82', name: 'KR' },
  { code: '+55', name: 'BR' },
  { code: '+52', name: 'MX' },
  { code: '+27', name: 'ZA' },
  { code: '+234', name: 'NG' },
  { code: '+254', name: 'KE' },
  { code: '+90', name: 'TR' },
  { code: '+92', name: 'PK' },
  { code: '+880', name: 'BD' },
];

// ============================================================
// STYLES — scoped via unique class prefix "akc-"
// ============================================================
const STYLES = `
.akc-launcher {
  position: fixed;
  bottom: 28px;
  right: 28px;
  width: 68px;
  height: 68px;
  border-radius: 50%;
  background: linear-gradient(135deg, #0f1f35 0%, #14283e 60%, #1a3a3a 100%);
  border: 1px solid rgba(46, 204, 113, 0.25);
  cursor: pointer;
  box-shadow: 0 12px 32px rgba(0,0,0,0.5), 0 0 0 0 rgba(46,204,113,0.4), inset 0 1px 0 rgba(255,255,255,0.06);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
  animation: akcLauncherPulse 2.5s ease-in-out infinite;
  padding: 0;
  overflow: visible;
}
@keyframes akcLauncherPulse {
  0%, 100% { box-shadow: 0 12px 32px rgba(0,0,0,0.5), 0 0 0 0 rgba(46,204,113,0.5), inset 0 1px 0 rgba(255,255,255,0.06); }
  50% { box-shadow: 0 12px 32px rgba(0,0,0,0.5), 0 0 0 18px rgba(46,204,113,0), inset 0 1px 0 rgba(255,255,255,0.06); }
}
.akc-launcher:hover { transform: scale(1.08) rotate(-5deg); }
.akc-launcher.akc-hidden { transform: scale(0); pointer-events: none; }
.akc-launcher * { pointer-events: none; }
.akc-launcher-img {
  width: 38px !important;
  height: 38px !important;
  object-fit: contain;
  filter: drop-shadow(0 2px 4px rgba(0,0,0,0.2));
}
.akc-tooltip {
  position: absolute;
  right: calc(100% + 14px);
  top: 50%;
  transform: translateY(-50%);
  background: #151e42;
  color: #fff;
  font-size: 13px;
  font-weight: 500;
  font-family: 'Inter', -apple-system, sans-serif;
  padding: 10px 14px;
  border-radius: 12px;
  border: 1px solid rgba(120, 144, 255, 0.3);
  white-space: nowrap;
  box-shadow: 0 8px 24px rgba(0,0,0,0.4);
  animation: akcTooltipFloat 3s ease-in-out infinite;
  pointer-events: none;
}
.akc-tooltip::after {
  content: '';
  position: absolute;
  left: 100%;
  top: 50%;
  transform: translateY(-50%);
  border: 7px solid transparent;
  border-left-color: #151e42;
}
@keyframes akcTooltipFloat {
  0%, 100% { transform: translateY(-50%) translateX(0); }
  50% { transform: translateY(-50%) translateX(-4px); }
}
.akc-launcher.akc-hidden .akc-tooltip { display: none; }

.akc-panel {
  position: fixed;
  bottom: 28px;
  right: 28px;
  width: 420px;
  max-width: calc(100vw - 32px);
  height: 640px;
  max-height: calc(100vh - 56px);
  background: #0f1737;
  border: 1px solid rgba(120, 144, 255, 0.3);
  border-radius: 24px;
  box-shadow: 0 24px 60px rgba(0,0,0,0.5), 0 0 0 1px rgba(61, 124, 240, 0.1);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  z-index: 10000;
  transform: scale(0.8) translateY(30px);
  opacity: 0;
  pointer-events: none;
  transition: transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.25s ease;
  transform-origin: bottom right;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  color: #fff;
}
.akc-panel.akc-open {
  transform: scale(1) translateY(0);
  opacity: 1;
  pointer-events: all;
}

.akc-header {
  padding: 18px 20px;
  background: linear-gradient(135deg, #151e42 0%, #0f1737 100%);
  border-bottom: 1px solid rgba(120, 144, 255, 0.15);
  display: flex;
  align-items: center;
  gap: 14px;
  position: relative;
}
.akc-avatar {
  width: 44px;
  height: 44px;
  border-radius: 12px;
  background: linear-gradient(135deg, #0f1f35 0%, #14283e 60%, #1a3a3a 100%);
  border: 1px solid rgba(46, 204, 113, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  box-shadow: 0 4px 12px rgba(46, 204, 113, 0.2);
  overflow: hidden;
}
.akc-avatar-img {
  width: 28px !important;
  height: 28px !important;
  object-fit: contain;
}
.akc-title-block { flex: 1; }
.akc-title {
  font-family: 'Fraunces', Georgia, serif;
  font-size: 17px;
  font-weight: 700;
  color: #fff;
  letter-spacing: -0.01em;
}
.akc-status {
  font-size: 12px;
  color: #7a83a8;
  display: flex;
  align-items: center;
  gap: 6px;
  margin-top: 2px;
}
.akc-status-dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: #2ecc71;
  box-shadow: 0 0 8px #2ecc71;
  animation: akcStatusBlink 2s ease-in-out infinite;
}
@keyframes akcStatusBlink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}
.akc-close {
  width: 34px;
  height: 34px;
  border-radius: 10px;
  border: 1px solid rgba(120, 144, 255, 0.15);
  background: rgba(255, 255, 255, 0.04);
  color: #b4bde0;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  padding: 0;
}
.akc-close:hover {
  background: rgba(255, 71, 87, 0.15);
  border-color: #ff4757;
  color: #ff4757;
}

.akc-progress {
  height: 3px;
  background: rgba(255, 255, 255, 0.06);
  position: relative;
  overflow: hidden;
}
.akc-progress-fill {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  background: linear-gradient(135deg, #3d7cf0 0%, #3ad6c7 100%);
  width: 0;
  transition: width 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 0 8px rgba(61, 124, 240, 0.4);
}

.akc-body {
  flex: 1;
  overflow-y: auto;
  padding: 20px 18px 28px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  scroll-behavior: smooth;
}
.akc-body::-webkit-scrollbar { width: 6px; }
.akc-body::-webkit-scrollbar-track { background: transparent; }
.akc-body::-webkit-scrollbar-thumb {
  background: rgba(120, 144, 255, 0.3);
  border-radius: 3px;
}

.akc-msg {
  max-width: 85%;
  padding: 12px 16px;
  border-radius: 16px;
  font-size: 14px;
  line-height: 1.5;
  animation: akcMsgSlide 0.35s cubic-bezier(0.34, 1.56, 0.64, 1);
  word-wrap: break-word;
}
@keyframes akcMsgSlide {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
.akc-msg.akc-bot {
  align-self: flex-start;
  background: #151e42;
  border: 1px solid rgba(120, 144, 255, 0.15);
  border-bottom-left-radius: 4px;
  color: #fff;
}
.akc-msg.akc-bot strong { color: #3ad6c7; font-weight: 600; }
.akc-msg.akc-user {
  align-self: flex-end;
  background: linear-gradient(135deg, #3d7cf0 0%, #3ad6c7 100%);
  border-bottom-right-radius: 4px;
  color: #fff;
  font-weight: 500;
  box-shadow: 0 4px 12px rgba(61, 124, 240, 0.25);
}

.akc-typing {
  align-self: flex-start;
  background: #151e42;
  border: 1px solid rgba(120, 144, 255, 0.15);
  padding: 14px 16px;
  border-radius: 16px;
  border-bottom-left-radius: 4px;
  display: flex;
  gap: 5px;
}
.akc-typing span {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: #3d7cf0;
  animation: akcTypingBounce 1.2s ease-in-out infinite;
}
.akc-typing span:nth-child(2) { animation-delay: 0.15s; }
.akc-typing span:nth-child(3) { animation-delay: 0.3s; }
@keyframes akcTypingBounce {
  0%, 60%, 100% { transform: translateY(0); opacity: 0.5; }
  30% { transform: translateY(-6px); opacity: 1; }
}

.akc-options {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-top: 4px;
  animation: akcMsgSlide 0.35s ease;
}
.akc-option-btn {
  text-align: left;
  padding: 12px 16px;
  background: rgba(61, 124, 240, 0.08);
  border: 1px solid rgba(120, 144, 255, 0.3);
  border-radius: 12px;
  color: #fff;
  font-family: inherit;
  font-size: 13.5px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: 10px;
}
.akc-option-btn:hover:not(:disabled) {
  background: rgba(61, 124, 240, 0.18);
  border-color: #3d7cf0;
  transform: translateX(3px);
}
.akc-opt-dot {
  width: 18px;
  height: 18px;
  border: 2px solid rgba(120, 144, 255, 0.3);
  border-radius: 50%;
  flex-shrink: 0;
  transition: all 0.2s ease;
}
.akc-option-btn:hover:not(:disabled) .akc-opt-dot {
  border-color: #3d7cf0;
  box-shadow: inset 0 0 0 4px #3d7cf0;
}
.akc-option-btn:disabled { opacity: 0.4; cursor: not-allowed; }
.akc-option-btn.akc-selected {
  background: rgba(61, 124, 240, 0.25);
  border-color: #3d7cf0;
}
.akc-option-btn.akc-selected .akc-opt-dot {
  border-color: #3d7cf0;
  box-shadow: inset 0 0 0 4px #3d7cf0;
}

.akc-input-form {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 6px;
  animation: akcMsgSlide 0.35s ease;
}
.akc-input-row { display: flex; gap: 8px; }
.akc-input-field {
  width: 100%;
  padding: 12px 14px;
  background: #151e42;
  border: 1px solid rgba(120, 144, 255, 0.3);
  border-radius: 12px;
  color: #fff;
  font-family: inherit;
  font-size: 14px;
  outline: none;
  transition: all 0.2s ease;
}
.akc-input-field:focus {
  border-color: #3d7cf0;
  box-shadow: 0 0 0 3px rgba(61, 124, 240, 0.15);
  background: #1a2450;
}
.akc-input-field::placeholder { color: #7a83a8; }
.akc-input-field.akc-error { border-color: #ff4757; }

.akc-country-select {
  flex: 0 0 95px;
  padding: 12px 8px;
  background: #151e42;
  border: 1px solid rgba(120, 144, 255, 0.3);
  border-radius: 12px;
  color: #fff;
  font-family: inherit;
  font-size: 13px;
  outline: none;
  cursor: pointer;
  appearance: none;
  -webkit-appearance: none;
  background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23b4bde0' d='M2 4l4 4 4-4'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 8px center;
  padding-right: 24px;
}
.akc-submit-btn {
  padding: 12px 20px;
  background: linear-gradient(135deg, #3d7cf0 0%, #3ad6c7 100%);
  color: #fff;
  border: none;
  border-radius: 12px;
  font-family: inherit;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  box-shadow: 0 4px 14px rgba(61, 124, 240, 0.3);
}
.akc-submit-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(61, 124, 240, 0.5);
}

/* Result card */
.akc-result-card {
  background: linear-gradient(135deg, #151e42 0%, #1a2450 100%);
  border: 1px solid rgba(120, 144, 255, 0.3);
  border-radius: 20px;
  padding: 24px 22px 22px;
  margin-top: 6px;
  animation: akcResultReveal 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
  position: relative;
  display: block;
  width: 100%;
  align-self: stretch;
  flex-shrink: 0;
}
.akc-result-card > * { display: block; }
.akc-result-card .akc-result-status-row { display: flex; }
.akc-result-card .akc-result-score-block { display: flex; }
.akc-result-card .akc-result-contact { display: flex; }

@keyframes akcResultReveal {
  from { opacity: 0; transform: scale(0.92) translateY(16px); }
  to { opacity: 1; transform: scale(1) translateY(0); }
}

.akc-result-card.akc-tier-safe {
  background:
    radial-gradient(circle at 50% 0%, rgba(46, 204, 113, 0.22) 0%, transparent 55%),
    linear-gradient(135deg, #0d2b1f 0%, #0a1f18 100%);
  border: 1px solid rgba(46, 204, 113, 0.35);
  box-shadow: 0 0 30px rgba(46, 204, 113, 0.12), inset 0 0 60px rgba(46, 204, 113, 0.04);
  --akc-result-color: #2ecc71;
  --akc-result-glow: rgba(46, 204, 113, 0.4);
}
.akc-result-card.akc-tier-warn {
  background:
    radial-gradient(circle at 50% 0%, rgba(255, 167, 38, 0.24) 0%, transparent 55%),
    linear-gradient(135deg, #2b1f0a 0%, #1f1608 100%);
  border: 1px solid rgba(255, 167, 38, 0.4);
  box-shadow: 0 0 30px rgba(255, 167, 38, 0.14), inset 0 0 60px rgba(255, 167, 38, 0.04);
  --akc-result-color: #ffa726;
  --akc-result-glow: rgba(255, 167, 38, 0.4);
}
.akc-result-card.akc-tier-danger {
  background:
    radial-gradient(circle at 50% 0%, rgba(255, 71, 87, 0.26) 0%, transparent 55%),
    linear-gradient(135deg, #2b0d13 0%, #1f080d 100%);
  border: 1px solid rgba(255, 71, 87, 0.45);
  box-shadow: 0 0 30px rgba(255, 71, 87, 0.16), inset 0 0 60px rgba(255, 71, 87, 0.05);
  --akc-result-color: #ff4757;
  --akc-result-glow: rgba(255, 71, 87, 0.5);
}
.akc-result-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: var(--akc-result-color);
  box-shadow: 0 0 16px var(--akc-result-color);
  border-radius: 20px 20px 0 0;
}
.akc-result-status-row {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 14px;
}
.akc-status-indicator {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: var(--akc-result-color);
  box-shadow: 0 0 10px var(--akc-result-color), 0 0 0 4px rgba(255, 255, 255, 0.04);
  flex-shrink: 0;
}
.akc-result-tier-text {
  font-size: 11px;
  font-weight: 700;
  color: var(--akc-result-color);
  letter-spacing: 0.15em;
  text-transform: uppercase;
}
.akc-result-score-block {
  display: flex;
  align-items: baseline;
  gap: 10px;
  margin-bottom: 6px;
}
.akc-result-score {
  font-family: 'Fraunces', Georgia, serif;
  font-size: 52px;
  font-weight: 700;
  line-height: 1;
  color: var(--akc-result-color);
  letter-spacing: -0.03em;
  text-shadow: 0 0 24px var(--akc-result-glow);
}
.akc-result-score-max {
  font-size: 18px;
  color: #7a83a8;
  font-weight: 400;
}
.akc-result-label {
  font-size: 10px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.18em;
  color: #7a83a8;
  margin-bottom: 4px;
}
.akc-result-status {
  font-family: 'Fraunces', Georgia, serif;
  font-size: 22px;
  font-weight: 700;
  color: #fff;
  margin-bottom: 12px;
  letter-spacing: -0.01em;
}
.akc-result-desc {
  font-size: 13px;
  line-height: 1.65;
  color: #b4bde0;
  margin-bottom: 16px;
}
.akc-result-rec {
  padding: 14px;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-left: 3px solid var(--akc-result-color);
  border-radius: 10px;
  font-size: 13px;
  color: #fff;
  line-height: 1.5;
}
.akc-result-rec-label {
  font-size: 10px;
  font-weight: 700;
  color: var(--akc-result-color);
  letter-spacing: 0.15em;
  text-transform: uppercase;
  margin-bottom: 4px;
  display: block;
}
.akc-result-consult {
  margin-top: 10px;
  padding: 14px;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 10px;
  font-size: 13px;
  color: #b4bde0;
  line-height: 1.5;
}
.akc-result-contact {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 10px;
  flex-wrap: wrap;
}
.akc-result-contact a {
  color: var(--akc-result-color);
  text-decoration: none;
  font-weight: 600;
  font-size: 12.5px;
  transition: opacity 0.2s ease;
}
.akc-result-contact a:hover { opacity: 0.75; text-decoration: underline; }
.akc-result-contact .akc-dot { color: #7a83a8; font-weight: 700; }
.akc-result-cta {
  margin-top: 14px;
  width: 100%;
  padding: 13px;
  background: linear-gradient(135deg, #3d7cf0 0%, #3ad6c7 100%);
  color: #fff;
  border: none;
  border-radius: 12px;
  font-family: inherit;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}
.akc-result-cta:hover {
  transform: translateY(-1px);
  box-shadow: 0 6px 18px rgba(61, 124, 240, 0.4);
}

.akc-footer {
  padding: 10px 18px;
  border-top: 1px solid rgba(120, 144, 255, 0.15);
  background: rgba(10, 16, 40, 0.6);
  text-align: center;
  font-size: 10.5px;
  color: #7a83a8;
  letter-spacing: 0.05em;
}
.akc-footer strong {
  background: linear-gradient(135deg, #3d7cf0 0%, #3ad6c7 100%);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  font-weight: 700;
}

/* Responsive */
@media (max-width: 900px) {
  .akc-panel { width: 400px; height: 620px; }
}
@media (max-width: 768px) {
  .akc-panel { width: 380px; height: 600px; bottom: 20px; right: 20px; }
  .akc-launcher { width: 62px; height: 62px; bottom: 20px; right: 20px; }
}
@media (max-width: 600px) {
  .akc-panel {
    bottom: 0; right: 0; left: 0; top: 0;
    width: 100vw; width: 100dvw;
    height: 100vh; height: 100dvh;
    max-width: 100vw; max-height: 100dvh;
    border-radius: 0; border: none;
  }
  .akc-launcher { width: 58px; height: 58px; bottom: 18px; right: 18px; }
  .akc-tooltip { display: none; }
  .akc-header { padding: 16px 18px; }
  .akc-input-field { font-size: 16px; padding: 13px 14px; }
  .akc-result-card { padding: 22px 18px 18px; border-radius: 16px; }
  .akc-result-score { font-size: 46px; }
  .akc-result-status { font-size: 20px; }
}
@media (hover: none) and (pointer: coarse) {
  .akc-launcher:hover { transform: none; }
  .akc-option-btn:hover:not(:disabled) { transform: none; }
  .akc-submit-btn:hover { transform: none; }
  .akc-result-cta:hover { transform: none; }
  .akc-launcher:active { transform: scale(0.95); }
}
@supports (padding: max(0px)) {
  @media (max-width: 600px) {
    .akc-launcher {
      bottom: max(18px, env(safe-area-inset-bottom));
      right: max(18px, env(safe-area-inset-right));
    }
  }
}
@media (prefers-reduced-motion: reduce) {
  .akc-launcher, .akc-tooltip, .akc-msg, .akc-typing span,
  .akc-result-card, .akc-status-dot {
    animation: none !important;
  }
}
`;

// ============================================================
// COMPONENT
// ============================================================
export default function AlkhaiChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [stage, setStage] = useState<Stage>('welcome');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [score, setScore] = useState(0);
  const [userData, setUserData] = useState({
    name: '',
    phone: '',
    countryCode: '+1',
    email: '',
  });

  const bodyRef = useRef<HTMLDivElement>(null);
  const msgIdRef = useRef(0);
  const userDataRef = useRef(userData);

  // Keep ref in sync with state so closures always see latest
  useEffect(() => { userDataRef.current = userData; }, [userData]);

  const nextId = () => ++msgIdRef.current;

  const scrollToBottom = useCallback(() => {
    const el = bodyRef.current;
    if (!el) return;
    const force = () => { el.scrollTop = el.scrollHeight; };
    force();
    requestAnimationFrame(force);
    [100, 300, 600, 900, 1200].forEach(ms => setTimeout(force, ms));
  }, []);

  useEffect(() => { scrollToBottom(); }, [messages, isTyping, scrollToBottom]);

  const addBotMsg = useCallback((content: string, delay = 600): Promise<void> => {
    return new Promise(resolve => {
      setIsTyping(true);
      setTimeout(() => {
        setIsTyping(false);
        setMessages(prev => [...prev, { id: nextId(), type: 'bot', content }]);
        resolve();
      }, delay);
    });
  }, []);

  const addUserMsg = useCallback((content: string) => {
    setMessages(prev => [...prev, { id: nextId(), type: 'user', content }]);
  }, []);

  // Progress calculation
  const getProgress = () => {
    if (stage === 'name') return 5;
    if (stage === 'phone') return 10;
    if (stage === 'email') return 15;
    if (stage === 'quiz') return 20 + (currentQ / QUESTIONS.length) * 75;
    if (stage === 'result') return 100;
    return 0;
  };

  // ============================================================
  // FLOW HANDLERS
  // ============================================================
  const startFlow = useCallback(async () => {
    setMessages([]);
    setStage('welcome');
    setCurrentQ(0);
    setAnswers([]);
    setScore(0);
    msgIdRef.current = 0;
    userDataRef.current = { name: '', phone: '', countryCode: '+1', email: '' };
    setUserData(userDataRef.current);

    await addBotMsg(`👋 Hi there! I'm your <strong>Alkhai Assistant</strong>.`, 500);
    await addBotMsg(`Most SMBs lose up to <strong>20% throughput</strong> to hidden bottlenecks. Let's find yours.`, 900);
    await addBotMsg(`I'll ask you <strong>10 quick questions</strong> (about 2 minutes) and send your personalized efficiency score to your email. Sound good?`, 1100);

    setMessages(prev => [...prev, {
      id: nextId(),
      type: 'options',
      options: ["✓ Yes, let's start", 'Tell me more first'],
      onSelect: (opt, i) => {
        addUserMsg(opt);
        if (i === 0) askName();
        else explainMore();
      }
    }]);
  }, [addBotMsg, addUserMsg]);

  const explainMore = useCallback(async () => {
    await addBotMsg(`Here's what you'll get:<br><br>📊 <strong>Your Bottleneck Score</strong> (10–40 scale)<br>🎯 Personalized diagnosis of your operations<br>💡 A free recommendation on next steps<br><br>Takes about <strong>2 minutes</strong>. Ready?`, 800);
    setMessages(prev => [...prev, {
      id: nextId(),
      type: 'options',
      options: ["✓ Let's go", 'Maybe later'],
      onSelect: (opt, i) => {
        addUserMsg(opt);
        if (i === 0) askName();
        else addBotMsg(`No problem! Whenever you're ready, just tap the chat icon again. 👋`, 500);
      }
    }]);
  }, [addBotMsg, addUserMsg]);

  const askName = useCallback(async () => {
    setStage('name');
    await addBotMsg(`Great! First — what should I call you?`, 600);
    setMessages(prev => [...prev, { id: nextId(), type: 'input-name' }]);
  }, [addBotMsg]);

  const handleNameSubmit = useCallback(async (name: string) => {
    userDataRef.current = { ...userDataRef.current, name };
    setUserData(userDataRef.current);
    setMessages(prev => prev.filter(m => m.type !== 'input-name'));
    addUserMsg(name);
    setStage('phone');

    await addBotMsg(`Nice to meet you, <strong>${escapeHtml(name)}</strong>! What's the best phone number to reach you?`, 700);
    await addBotMsg(`We'll only use this to share your report and follow up on your results.`, 800);
    setMessages(prev => [...prev, { id: nextId(), type: 'input-phone' }]);
  }, [addBotMsg, addUserMsg]);

  const handlePhoneSubmit = useCallback(async (countryCode: string, phone: string) => {
    userDataRef.current = { ...userDataRef.current, countryCode, phone };
    setUserData(userDataRef.current);
    setMessages(prev => prev.filter(m => m.type !== 'input-phone'));
    addUserMsg(`${countryCode} ${phone}`);
    setStage('email');

    await addBotMsg(`Perfect. And your email address? We'll send your full assessment report here.`, 700);
    setMessages(prev => [...prev, { id: nextId(), type: 'input-email' }]);
  }, [addBotMsg, addUserMsg]);

  const handleEmailSubmit = useCallback(async (email: string) => {
    userDataRef.current = { ...userDataRef.current, email };
    setUserData(userDataRef.current);
    setMessages(prev => prev.filter(m => m.type !== 'input-email'));
    addUserMsg(email);
    setStage('quiz');

    await addBotMsg(`Excellent! Now let's dive in. ${QUESTIONS.length} quick questions coming up — just tap the option that best describes your current operations. 🚀`, 800);
    askQuestion(0, [], 0);
  }, [addBotMsg, addUserMsg]);

  const askQuestion = useCallback(async (qIdx: number, accAnswers: Answer[], accScore: number) => {
    if (qIdx >= QUESTIONS.length) {
      showResult(accAnswers, accScore);
      return;
    }

    setCurrentQ(qIdx);
    const q = QUESTIONS[qIdx];
    await addBotMsg(`<strong>Question ${qIdx + 1} of ${QUESTIONS.length}</strong><br>${q.q}`, 700);

    setMessages(prev => [...prev, {
      id: nextId(),
      type: 'options',
      options: q.opts,
      onSelect: (opt, i) => {
        addUserMsg(opt);
        const newAnswers = [...accAnswers, { question: q.q, answer: opt, points: i + 1 }];
        const newScore = accScore + (i + 1);
        setAnswers(newAnswers);
        setScore(newScore);
        const delay = qIdx + 1 >= QUESTIONS.length ? 150 : 400;
        setTimeout(() => askQuestion(qIdx + 1, newAnswers, newScore), delay);
      }
    }]);
  }, [addBotMsg, addUserMsg]);

  const showResult = useCallback((finalAnswers: Answer[], finalScore: number) => {
    setStage('result');
    setScore(finalScore);

    let tier: Tier, status: string, tierLabel: string, desc: string, rec: string, consultBlurb: string;

    if (finalScore <= 18) {
      tier = 'safe';
      status = 'Operationally Efficient';
      tierLabel = 'Low Risk';
      desc = 'Your processes are well-structured with minimal inefficiencies. There may still be opportunities for targeted optimization to push performance even higher.';
      rec = 'Performance Optimization Review';
      consultBlurb = 'We help identify optimization opportunities and provide a clear roadmap to maintain and improve performance.';
    } else if (finalScore <= 28) {
      tier = 'warn';
      status = 'Emerging Bottlenecks';
      tierLabel = 'Moderate Risk';
      desc = 'Your operations show signs of inefficiencies that may be impacting performance, turnaround times, and operational costs. These bottlenecks are often not immediately visible but can significantly affect scalability and decision-making. The good news — these issues are measurable and fixable with the right analysis.';
      rec = 'Bottleneck Identification & Analysis';
      consultBlurb = 'We help identify exactly where inefficiencies exist and provide a clear, actionable roadmap to improve performance.';
    } else {
      tier = 'danger';
      status = 'Critical Bottlenecks';
      tierLabel = 'High Risk';
      desc = 'Your operations likely have significant inefficiencies causing delays, rework, and increased costs. The good news — these issues are measurable and fixable with the right analysis.';
      rec = 'Immediate Bottleneck Assessment & Intervention';
      consultBlurb = 'We help identify critical bottlenecks and deliver a step-by-step recovery roadmap to restore operational performance.';
    }

    setMessages(prev => [...prev, {
      id: nextId(),
      type: 'result',
      resultData: { score: finalScore, tier, status, tierLabel, desc, rec, consultBlurb }
    }]);

    // ====================================================================
    // 🔔 Save lead to Supabase (name, phone, email only)
    // ====================================================================
    const currentUser = userDataRef.current;
    fetch('/api/leads', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: currentUser.name,
        phone: currentUser.phone,
        countryCode: currentUser.countryCode,
        email: currentUser.email,
      }),
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          console.log('✓ Lead saved to Supabase, id:', data.id);
        } else {
          console.error('Lead save failed:', data.error);
        }
      })
      .catch(err => console.error('Lead save error:', err));

    // Keep full data in console for debugging (score + answers not sent to DB)
    console.log('Alkhai Quiz Completed:', {
      ...currentUser,
      score: finalScore,
      category: status,
      answers: finalAnswers,
      timestamp: new Date().toISOString(),
    });
  }, []);

  const bookingFlow = useCallback(async () => {
    const currentUser = userDataRef.current;
    addUserMsg("I'd like to book a consultation");
    await addBotMsg(`📩 Perfect! I've got your details. Your full assessment report is on its way to <strong>${escapeHtml(currentUser.email)}</strong>.`, 800);
    await addBotMsg(`A free 30-minute consultation with an Alkhai operations analyst is the fastest way to get a clear roadmap. We'll reach out within <strong>24 hours</strong> at <strong>${currentUser.countryCode} ${currentUser.phone}</strong>.<br><br>Prefer to email us directly? → <strong style="color:#3ad6c7;">contact@alkhai.com</strong>`, 1000);
    await addBotMsg(`Thanks for using Alkhai, ${escapeHtml(currentUser.name)}! 🚀`, 600);
  }, [addBotMsg, addUserMsg]);

  // ============================================================
  // Open / close
  // ============================================================
  const handleOpen = () => {
    setIsOpen(true);
    if (messages.length === 0) startFlow();
  };
  const handleClose = () => setIsOpen(false);

  // ============================================================
  // RENDER
  // ============================================================
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: STYLES }} />

      <button
        className={`akc-launcher ${isOpen ? 'akc-hidden' : ''}`}
        onClick={handleOpen}
        aria-label="Open Alkhai Bottleneck Assessment"
      >
        <Image
          src="/AlkhaiFavicon.png"
          alt=""
          width={38}
          height={38}
          className="akc-launcher-img"
          priority
        />
        <span className="akc-tooltip">Bottleneck Score</span>
      </button>

      <div
        className={`akc-panel ${isOpen ? 'akc-open' : ''}`}
        role="dialog"
        aria-label="Alkhai Bottleneck Assessment"
      >
        <div className="akc-header">
          <div className="akc-avatar">
            <Image
              src="/AlkhaiFavicon.png"
              alt=""
              width={28}
              height={28}
              className="akc-avatar-img"
            />
          </div>
          <div className="akc-title-block">
            <div className="akc-title">Alkhai Assistant</div>
            <div className="akc-status">
              <span className="akc-status-dot"></span>
              <span>Find your Bottleneck Score</span>
            </div>
          </div>
          <button className="akc-close" onClick={handleClose} aria-label="Close">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M4 4 L12 12 M12 4 L4 12" />
            </svg>
          </button>
        </div>

        <div className="akc-progress">
          <div className="akc-progress-fill" style={{ width: `${getProgress()}%` }} />
        </div>

        <div className="akc-body" ref={bodyRef}>
          {messages.map((msg) => (
            <MessageRenderer
              key={msg.id}
              msg={msg}
              onNameSubmit={handleNameSubmit}
              onPhoneSubmit={handlePhoneSubmit}
              onEmailSubmit={handleEmailSubmit}
              onBookConsultation={bookingFlow}
              setMessages={setMessages}
            />
          ))}
          {isTyping && (
            <div className="akc-typing">
              <span></span><span></span><span></span>
            </div>
          )}
        </div>

        <div className="akc-footer">
          Powered by <strong>Alkhai</strong> · Operational Intelligence for SMBs
        </div>
      </div>
    </>
  );
}

// ============================================================
// SUB-COMPONENTS
// ============================================================
function MessageRenderer({
  msg,
  onNameSubmit,
  onPhoneSubmit,
  onEmailSubmit,
  onBookConsultation,
  setMessages,
}: {
  msg: ChatMessage;
  onNameSubmit: (n: string) => void;
  onPhoneSubmit: (c: string, p: string) => void;
  onEmailSubmit: (e: string) => void;
  onBookConsultation: () => void;
  setMessages: React.Dispatch<React.SetStateAction<ChatMessage[]>>;
}) {
  if (msg.type === 'bot') {
    return <div className="akc-msg akc-bot" dangerouslySetInnerHTML={{ __html: msg.content || '' }} />;
  }
  if (msg.type === 'user') {
    return <div className="akc-msg akc-user">{msg.content}</div>;
  }
  if (msg.type === 'options' && msg.options) {
    return <OptionsBlock msg={msg} setMessages={setMessages} />;
  }
  if (msg.type === 'input-name') {
    return <NameInput onSubmit={onNameSubmit} />;
  }
  if (msg.type === 'input-phone') {
    return <PhoneInput onSubmit={onPhoneSubmit} />;
  }
  if (msg.type === 'input-email') {
    return <EmailInput onSubmit={onEmailSubmit} />;
  }
  if (msg.type === 'result' && msg.resultData) {
    return <ResultCard data={msg.resultData} onBook={onBookConsultation} />;
  }
  return null;
}

function OptionsBlock({
  msg,
  setMessages,
}: {
  msg: ChatMessage;
  setMessages: React.Dispatch<React.SetStateAction<ChatMessage[]>>;
}) {
  const [selected, setSelected] = useState<number | null>(null);

  const handleClick = (opt: string, i: number) => {
    if (selected !== null) return;
    setSelected(i);
    // Mark message as disabled so it won't re-render as clickable
    setMessages(prev => prev.map(m => m.id === msg.id ? { ...m, disabled: true, selectedOption: opt } : m));
    msg.onSelect?.(opt, i);
  };

  return (
    <div className="akc-options">
      {msg.options?.map((opt, i) => {
        const isDisabled = msg.disabled || selected !== null;
        const isSelected = msg.selectedOption === opt || selected === i;
        return (
          <button
            key={i}
            className={`akc-option-btn ${isSelected ? 'akc-selected' : ''}`}
            disabled={isDisabled}
            onClick={() => handleClick(opt, i)}
          >
            <span className="akc-opt-dot"></span>
            <span>{opt}</span>
          </button>
        );
      })}
    </div>
  );
}

function NameInput({ onSubmit }: { onSubmit: (n: string) => void }) {
  const [value, setValue] = useState('');
  const [error, setError] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => { inputRef.current?.focus(); }, []);

  const submit = () => {
    const v = value.trim();
    if (v.length < 2) { setError(true); return; }
    onSubmit(v);
  };

  const handleKey = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') submit();
  };

  return (
    <div className="akc-input-form">
      <input
        ref={inputRef}
        type="text"
        className={`akc-input-field ${error ? 'akc-error' : ''}`}
        placeholder="Your name"
        maxLength={60}
        value={value}
        onChange={e => { setValue(e.target.value); setError(false); }}
        onKeyDown={handleKey}
      />
      <button className="akc-submit-btn" onClick={submit}>Continue →</button>
    </div>
  );
}

function PhoneInput({ onSubmit }: { onSubmit: (c: string, p: string) => void }) {
  const [countryCode, setCountryCode] = useState('+1');
  const [value, setValue] = useState('');
  const [error, setError] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => { inputRef.current?.focus(); }, []);

  const submit = () => {
    const phone = value.trim().replace(/[^\d]/g, '');
    if (phone.length < 6) { setError(true); return; }
    onSubmit(countryCode, phone);
  };

  return (
    <div className="akc-input-form">
      <div className="akc-input-row">
        <select
          className="akc-country-select"
          value={countryCode}
          onChange={e => setCountryCode(e.target.value)}
        >
          {COUNTRY_CODES.map(c => (
            <option key={c.code + c.name} value={c.code}>{c.code} {c.name}</option>
          ))}
        </select>
        <input
          ref={inputRef}
          type="tel"
          className={`akc-input-field ${error ? 'akc-error' : ''}`}
          placeholder="Phone number"
          maxLength={20}
          value={value}
          onChange={e => { setValue(e.target.value); setError(false); }}
          onKeyDown={e => { if (e.key === 'Enter') submit(); }}
        />
      </div>
      <button className="akc-submit-btn" onClick={submit}>Continue →</button>
    </div>
  );
}

function EmailInput({ onSubmit }: { onSubmit: (e: string) => void }) {
  const [value, setValue] = useState('');
  const [error, setError] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => { inputRef.current?.focus(); }, []);

  const submit = () => {
    const email = value.trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { setError(true); return; }
    onSubmit(email);
  };

  return (
    <div className="akc-input-form">
      <input
        ref={inputRef}
        type="email"
        className={`akc-input-field ${error ? 'akc-error' : ''}`}
        placeholder="you@company.com"
        value={value}
        onChange={e => { setValue(e.target.value); setError(false); }}
        onKeyDown={e => { if (e.key === 'Enter') submit(); }}
      />
      <button className="akc-submit-btn" onClick={submit}>Start Assessment →</button>
    </div>
  );
}

function ResultCard({ data, onBook }: { data: ResultData; onBook: () => void }) {
  return (
    <div className={`akc-result-card akc-tier-${data.tier}`}>
      <div className="akc-result-status-row">
        <span className="akc-status-indicator"></span>
        <span className="akc-result-tier-text">{data.tierLabel}</span>
      </div>
      <div className="akc-result-label">Your Bottleneck Score</div>
      <div className="akc-result-score-block">
        <span className="akc-result-score">{data.score}</span>
        <span className="akc-result-score-max">/ 40</span>
      </div>
      <div className="akc-result-status">{data.status}</div>
      <div className="akc-result-desc">{data.desc}</div>
      <div className="akc-result-rec">
        <span className="akc-result-rec-label">Recommended Next Step</span>
        {data.rec}
      </div>
      <div className="akc-result-consult">
        <span className="akc-result-rec-label">Free Consultation Available</span>
        {data.consultBlurb}
        <div className="akc-result-contact">
          <a href="mailto:contact@alkhai.com">contact@alkhai.com</a>
          <span className="akc-dot">·</span>
          <a href="https://www.alkhai.com" target="_blank" rel="noopener noreferrer">www.alkhai.com</a>
        </div>
      </div>
      <button className="akc-result-cta" onClick={onBook}>
        Book Your Free Consultation
      </button>
    </div>
  );
}

// ============================================================
// UTILS
// ============================================================
function escapeHtml(str: string): string {
  const div = typeof document !== 'undefined' ? document.createElement('div') : null;
  if (!div) return str;
  div.textContent = str;
  return div.innerHTML;
}