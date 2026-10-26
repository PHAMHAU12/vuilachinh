import React, { useState } from 'react';
import {
  Sliders,
  Scissors,
  Eye,
  BookOpen,
  RotateCw,
  RotateCcw,
  Play,
  Pause,
  Grid,
  Tag,
  Maximize2,
  ChevronDown,
  ChevronUp,
  Camera,
  Layers,
  Sparkles
} from 'lucide-react';
import { SolidDefinition, VisualStyle, CameraPreset } from '../types/geometry';
import { QuizSection } from './QuizSection';

interface ControlDockProps {
  solid: SolidDefinition;
  params: Record<string, number>;
  onParamChange: (key: string, value: number) => void;
  style: VisualStyle;
  onStyleChange: (style: VisualStyle) => void;
  isAutoRotating: boolean;
  onToggleAutoRotate: () => void;
  autoRotateSpeed?: number;
  onAutoRotateSpeedChange?: (speed: number) => void;
  autoRotateDirection?: 'cw' | 'ccw';
  onAutoRotateDirectionToggle?: () => void;
  explodedRatio: number;
  onExplodedRatioChange: (val: number) => void;
  enableSection: boolean;
  onToggleSection: () => void;
  sectionHeight: number;
  onSectionHeightChange: (val: number) => void;
  sectionTilt: number;
  onSectionTiltChange: (val: number) => void;
  showGrid: boolean;
  onToggleGrid: () => void;
  showLabels: boolean;
  onToggleLabels: () => void;
  cameraPreset: CameraPreset;
  onSelectCameraPreset: (preset: CameraPreset) => void;
  onResetAll: () => void;
}

export const ControlDock: React.FC<ControlDockProps> = ({
  solid,
  params,
  onParamChange,
  style,
  onStyleChange,
  isAutoRotating,
  onToggleAutoRotate,
  autoRotateSpeed = 1.2,
  onAutoRotateSpeedChange,
  autoRotateDirection = 'cw',
  onAutoRotateDirectionToggle,
  explodedRatio,
  onExplodedRatioChange,
  enableSection,
  onToggleSection,
  sectionHeight,
  onSectionHeightChange,
  sectionTilt,
  onSectionTiltChange,
  showGrid,
  onToggleGrid,
  showLabels,
  onToggleLabels,
  cameraPreset,
  onSelectCameraPreset,
  onResetAll
}) => {
  const [activeTab, setActiveTab] = useState<'params' | 'slice' | 'view' | 'quiz'>('params');
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div
      className="fixed z-30 transition-transform duration-300 pointer-events-auto"
      style={{
        bottom: '16px',
        left: '50%',
        transform: `translateX(-50%) translateY(${isCollapsed ? 'calc(100% - 38px)' : '0'})`,
        width: 'min(920px, calc(100vw - 24px))',
      }}
    >
      {/* Top Toggle Bar */}
      <div className="flex justify-center -mb-px">
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="flex items-center gap-1.5 px-4 py-1.5 bg-slate-900/95 hover:bg-slate-800 text-slate-300 text-xs font-semibold rounded-t-xl border-t border-x border-slate-700/80 shadow-lg backdrop-blur-md transition-colors"
        >
          {isCollapsed ? (
            <>
              <ChevronUp className="w-3.5 h-3.5 text-blue-400" />
              <span>Mở rộng bảng điều khiển</span>
            </>
          ) : (
            <>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              <span>Thu gọn điều khiển (Zen Mode)</span>
            </>
          )}
        </button>
      </div>

      {/* Main Dock Container */}
      <div className="bg-slate-900/95 border border-slate-700/80 rounded-2xl shadow-2xl backdrop-blur-xl overflow-hidden">
        {/* Navigation Tabs */}
        <div className="flex items-center justify-between border-b border-slate-800/80 px-3 bg-slate-950/60">
          <div className="flex space-x-1 py-1.5 overflow-x-auto scrollbar-none">
            <button
              onClick={() => { setActiveTab('params'); setIsCollapsed(false); }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition ${
                activeTab === 'params'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
              }`}
            >
              <Sliders className="w-3.5 h-3.5" />
              <span>Kích thước & Tham số</span>
            </button>

            <button
              onClick={() => { setActiveTab('slice'); setIsCollapsed(false); }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition ${
                activeTab === 'slice'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
              }`}
            >
              <Scissors className="w-3.5 h-3.5" />
              <span>Mặt cắt & Tách khối</span>
            </button>

            <button
              onClick={() => { setActiveTab('view'); setIsCollapsed(false); }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition ${
                activeTab === 'view'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
              }`}
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Hiển thị & Góc nhìn</span>
            </button>

            <button
              onClick={() => { setActiveTab('quiz'); setIsCollapsed(false); }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition ${
                activeTab === 'quiz'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Luyện tập trắc nghiệm</span>
            </button>
          </div>

          <div className="flex items-center gap-1.5 shrink-0 py-1">
            <button
              type="button"
              onClick={onToggleAutoRotate}
              title="Bật/Tắt tự động xoay 360 độ (Phím Space)"
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition shadow-sm ${
                isAutoRotating
                  ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-amber-500/25 ring-1 ring-amber-400/50'
                  : solid.category === 'revolution'
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 hover:bg-amber-500/30'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/80'
              }`}
            >
              <RotateCw className={`w-3.5 h-3.5 ${isAutoRotating ? 'animate-spin' : ''}`} />
              <span>{isAutoRotating ? 'Đang tự xoay' : 'Tự xoay vòng'}</span>
              {solid.category === 'revolution' && (
                <span className="hidden md:inline-block text-[9px] px-1 py-0.2 rounded bg-amber-400/20 text-amber-200 font-normal">
                  360°
                </span>
              )}
            </button>

            <button
              onClick={onResetAll}
              title="Đặt lại về mặc định"
              className="text-[11px] text-slate-400 hover:text-slate-200 hover:bg-slate-800 px-2.5 py-1.5 rounded-lg border border-slate-700/60 transition hidden sm:block"
            >
              Đặt lại
            </button>
          </div>
        </div>

        {/* Tab Content Panels */}
        <div className="p-4 max-h-[48vh] overflow-y-auto scrollbar-thin">
          {/* TAB 1: Tham số & Kích thước */}
          {activeTab === 'params' && (
            <div className="space-y-3">
              {/* Bảng điều khiển riêng cho Khối tròn xoay tự xoay vòng */}
              {solid.category === 'revolution' && (
                <div className="bg-gradient-to-r from-amber-950/30 via-slate-900/90 to-blue-950/30 p-3.5 rounded-2xl border border-amber-500/40 shadow-lg space-y-3">
                  <div className="flex flex-wrap items-center justify-between gap-2.5">
                    <div className="flex items-center gap-2.5">
                      <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-amber-500/30 to-orange-500/20 text-amber-400 flex items-center justify-center border border-amber-500/40 shrink-0">
                        <RotateCw className={`w-5 h-5 ${isAutoRotating ? 'animate-spin' : ''}`} />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="text-xs font-bold text-amber-200 tracking-wide uppercase">
                            Tự xoay vòng khối tròn xoay (360°)
                          </h3>
                          <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded-md bg-amber-500/20 text-amber-300 border border-amber-500/30">
                            SGK 12
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-300 mt-0.5">
                          {solid.id === 'cylinder' && 'Khối tròn xoay tạo bởi hình chữ nhật quay quanh trục OO\'. Trục quay Δ và đường sinh hiển thị rõ nét.'}
                          {solid.id === 'cone' && 'Khối tròn xoay tạo bởi tam giác vuông quay quanh trục đường cao SO.'}
                          {solid.id === 'sphere' && 'Khối tròn xoay tạo bởi nửa hình tròn quay quanh trục đường kính NS.'}
                          {solid.id === 'truncated_cone' && 'Khối tròn xoay tạo bởi hình thang vuông quay quanh trục OO\'.'}
                        </p>
                      </div>
                    </div>

                    {/* Nút Bật / Dừng Tự xoay vòng */}
                    <button
                      type="button"
                      onClick={onToggleAutoRotate}
                      className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition shadow-lg ${
                        isAutoRotating
                          ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-amber-500/30 hover:brightness-110 ring-2 ring-amber-400/50'
                          : 'bg-blue-600 hover:bg-blue-500 text-white shadow-blue-600/30'
                      }`}
                    >
                      <RotateCw className={`w-4 h-4 ${isAutoRotating ? 'animate-spin' : ''}`} />
                      <span>{isAutoRotating ? 'TẠM DỪNG TỰ XOAY' : 'BẬT TỰ XOAY VÒNG 360°'}</span>
                    </button>
                  </div>

                  {/* Tùy chỉnh tốc độ quay & hướng xoay */}
                  <div className="flex flex-wrap items-center justify-between gap-3 pt-2.5 border-t border-slate-800/80 text-xs">
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] font-semibold text-slate-400">Tốc độ quay:</span>
                      {[
                        { label: '0.6x Chậm', val: 0.6 },
                        { label: '1.2x Chuẩn', val: 1.2 },
                        { label: '2.4x Nhanh', val: 2.4 }
                      ].map((s) => (
                        <button
                          key={s.val}
                          type="button"
                          onClick={() => onAutoRotateSpeedChange?.(s.val)}
                          className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition ${
                            Math.abs((autoRotateSpeed || 1.2) - s.val) < 0.1
                              ? 'bg-amber-500 text-slate-950 shadow-sm'
                              : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                          }`}
                        >
                          {s.label}
                        </button>
                      ))}
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-[11px] font-semibold text-slate-400">Chiều xoay:</span>
                      <button
                        type="button"
                        onClick={onAutoRotateDirectionToggle}
                        className="flex items-center gap-1.5 px-3 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-[11px] font-semibold border border-slate-700 transition"
                      >
                        {autoRotateDirection === 'cw' ? (
                          <>
                            <RotateCw className="w-3.5 h-3.5 text-amber-400" />
                            <span>Thuận chiều kim đồng hồ (Phải)</span>
                          </>
                        ) : (
                          <>
                            <RotateCcw className="w-3.5 h-3.5 text-amber-400" />
                            <span>Ngược chiều kim đồng hồ (Trái)</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                {solid.params.map((param) => {
                  const val = params[param.key] ?? param.default;
                  return (
                    <div
                      key={param.key}
                      className="bg-slate-800/60 p-3 rounded-xl border border-slate-700/60 space-y-1.5"
                    >
                      <div className="flex justify-between items-center text-xs">
                        <span className="text-slate-300 font-medium">
                          {param.label} <span className="font-mono text-blue-400">({param.symbol})</span>:
                        </span>
                        <span className="font-mono font-bold text-blue-400 bg-slate-900/80 px-2 py-0.5 rounded border border-slate-700/50">
                          {val.toFixed(2)} {param.unit}
                        </span>
                      </div>
                      <input
                        type="range"
                        min={param.min}
                        max={param.max}
                        step={param.step}
                        value={val}
                        onChange={(e) => onParamChange(param.key, parseFloat(e.target.value))}
                        className="w-full h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-500"
                      />
                      <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                        <span>{param.min}</span>
                        <span>{param.max}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 2: Mặt cắt & Tách khối */}
          {activeTab === 'slice' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Exploded / Net Separation */}
              <div className="bg-slate-800/60 p-3.5 rounded-xl border border-slate-700/60 space-y-2">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-1.5">
                    <Layers className="w-4 h-4 text-purple-400" />
                    <span className="text-xs font-semibold text-slate-200">
                      Tách mặt / Khai triển không gian
                    </span>
                  </div>
                  <span className="text-xs font-mono font-bold text-purple-400">
                    {Math.round(explodedRatio * 100)}%
                  </span>
                </div>
                <p className="text-[11px] text-slate-400">
                  Tách các mặt đa diện theo phương vector pháp tuyến để quan sát từng mặt rời rạc.
                </p>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.02"
                  value={explodedRatio}
                  onChange={(e) => onExplodedRatioChange(parseFloat(e.target.value))}
                  className="w-full h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-purple-500"
                />
              </div>

              {/* Cross-section Slicing Plane */}
              <div className="bg-slate-800/60 p-3.5 rounded-xl border border-slate-700/60 space-y-2">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-1.5">
                    <Scissors className="w-4 h-4 text-cyan-400" />
                    <span className="text-xs font-semibold text-slate-200">
                      Mặt phẳng cắt (Thiết diện)
                    </span>
                  </div>
                  <button
                    onClick={onToggleSection}
                    className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition ${
                      enableSection
                        ? 'bg-cyan-600 text-white shadow'
                        : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                    }`}
                  >
                    {enableSection ? 'Đang bật' : 'Đang tắt'}
                  </button>
                </div>

                {enableSection ? (
                  <div className="space-y-2.5 pt-1">
                    <div className="space-y-1">
                      <div className="flex justify-between text-[11px]">
                        <span className="text-slate-400">Độ cao vị trí cắt (y):</span>
                        <span className="font-mono text-cyan-400 font-bold">{sectionHeight.toFixed(2)}</span>
                      </div>
                      <input
                        type="range"
                        min="-2.0"
                        max="2.0"
                        step="0.05"
                        value={sectionHeight}
                        onChange={(e) => onSectionHeightChange(parseFloat(e.target.value))}
                        className="w-full h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-cyan-500"
                      />
                    </div>

                    <div className="space-y-1">
                      <div className="flex justify-between text-[11px]">
                        <span className="text-slate-400">Góc nghiêng mặt cắt:</span>
                        <span className="font-mono text-cyan-400 font-bold">{sectionTilt}°</span>
                      </div>
                      <input
                        type="range"
                        min="-60"
                        max="60"
                        step="5"
                        value={sectionTilt}
                        onChange={(e) => onSectionTiltChange(parseFloat(e.target.value))}
                        className="w-full h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-cyan-500"
                      />
                    </div>
                  </div>
                ) : (
                  <p className="text-[11px] text-slate-400 italic">
                    Bật tính năng này để cắt xuyên qua khối và quan sát đa giác thiết diện sinh ra.
                  </p>
                )}
              </div>
            </div>
          )}

          {/* TAB 3: Hiển thị & Góc nhìn */}
          {activeTab === 'view' && (
            <div className="space-y-4">
              {/* Visual Styles */}
              <div className="space-y-1.5">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                  Phong cách vật liệu 3D
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  <button
                    onClick={() => onStyleChange('pbr')}
                    className={`py-2 px-3 rounded-xl border text-xs font-semibold flex items-center justify-center gap-1.5 transition ${
                      style === 'pbr'
                        ? 'bg-blue-600 border-blue-500 text-white shadow'
                        : 'bg-slate-800/80 border-slate-700 text-slate-300 hover:bg-slate-700'
                    }`}
                  >
                    <span>Studio Thực tế</span>
                  </button>

                  <button
                    onClick={() => onStyleChange('colorful')}
                    className={`py-2 px-3 rounded-xl border text-xs font-semibold flex items-center justify-center gap-1.5 transition ${
                      style === 'colorful'
                        ? 'bg-blue-600 border-blue-500 text-white shadow'
                        : 'bg-slate-800/80 border-slate-700 text-slate-300 hover:bg-slate-700'
                    }`}
                  >
                    <span>Mặt màu riêng biệt</span>
                  </button>

                  <button
                    onClick={() => onStyleChange('xray')}
                    className={`py-2 px-3 rounded-xl border text-xs font-semibold flex items-center justify-center gap-1.5 transition ${
                      style === 'xray'
                        ? 'bg-blue-600 border-blue-500 text-white shadow'
                        : 'bg-slate-800/80 border-slate-700 text-slate-300 hover:bg-slate-700'
                    }`}
                  >
                    <span>Thấu thị / Cạnh khuất</span>
                  </button>

                  <button
                    onClick={() => onStyleChange('wireframe')}
                    className={`py-2 px-3 rounded-xl border text-xs font-semibold flex items-center justify-center gap-1.5 transition ${
                      style === 'wireframe'
                        ? 'bg-blue-600 border-blue-500 text-white shadow'
                        : 'bg-slate-800/80 border-slate-700 text-slate-300 hover:bg-slate-700'
                    }`}
                  >
                    <span>Khung dây (Wireframe)</span>
                  </button>
                </div>
              </div>

              {/* Camera Presets & Navigation */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                {/* Camera presets */}
                <div className="space-y-1.5">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                    Hình chiếu chuẩn & Góc nhìn
                  </span>
                  <div className="grid grid-cols-4 gap-1.5">
                    <button
                      onClick={() => onSelectCameraPreset('perspective')}
                      className={`p-1.5 rounded-lg border text-[11px] font-semibold text-center transition ${
                        cameraPreset === 'perspective'
                          ? 'bg-blue-600 border-blue-500 text-white'
                          : 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700'
                      }`}
                    >
                      3D Tự do
                    </button>
                    <button
                      onClick={() => onSelectCameraPreset('front')}
                      className={`p-1.5 rounded-lg border text-[11px] font-semibold text-center transition ${
                        cameraPreset === 'front'
                          ? 'bg-blue-600 border-blue-500 text-white'
                          : 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700'
                      }`}
                    >
                      Đứng
                    </button>
                    <button
                      onClick={() => onSelectCameraPreset('top')}
                      className={`p-1.5 rounded-lg border text-[11px] font-semibold text-center transition ${
                        cameraPreset === 'top'
                          ? 'bg-blue-600 border-blue-500 text-white'
                          : 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700'
                      }`}
                    >
                      Bằng
                    </button>
                    <button
                      onClick={() => onSelectCameraPreset('side')}
                      className={`p-1.5 rounded-lg border text-[11px] font-semibold text-center transition ${
                        cameraPreset === 'side'
                          ? 'bg-blue-600 border-blue-500 text-white'
                          : 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700'
                      }`}
                    >
                      Cạnh
                    </button>
                  </div>
                </div>

                {/* Toggles */}
                <div className="space-y-1.5">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                    Tiện ích không gian
                  </span>
                  <div className="grid grid-cols-3 gap-1.5">
                    <button
                      onClick={onToggleAutoRotate}
                      className={`p-1.5 rounded-lg border text-[11px] font-semibold flex items-center justify-center gap-1 transition ${
                        isAutoRotating
                          ? 'bg-blue-600 border-blue-500 text-white'
                          : 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700'
                      }`}
                    >
                      <RotateCw className="w-3.5 h-3.5" />
                      <span>{isAutoRotating ? 'Đang xoay' : 'Dừng xoay'}</span>
                    </button>

                    <button
                      onClick={onToggleLabels}
                      className={`p-1.5 rounded-lg border text-[11px] font-semibold flex items-center justify-center gap-1 transition ${
                        showLabels
                          ? 'bg-blue-600 border-blue-500 text-white'
                          : 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700'
                      }`}
                    >
                      <Tag className="w-3.5 h-3.5" />
                      <span>Đỉnh A, B..</span>
                    </button>

                    <button
                      onClick={onToggleGrid}
                      className={`p-1.5 rounded-lg border text-[11px] font-semibold flex items-center justify-center gap-1 transition ${
                        showGrid
                          ? 'bg-blue-600 border-blue-500 text-white'
                          : 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700'
                      }`}
                    >
                      <Grid className="w-3.5 h-3.5" />
                      <span>Lưới sàn</span>
                    </button>
                  </div>

                  {/* Auto-rotate speed & direction micro-controls */}
                  <div className="flex items-center justify-between gap-2 pt-1 text-[11px]">
                    <div className="flex items-center gap-1">
                      <span className="text-slate-400 text-[10px]">Tốc độ:</span>
                      {[
                        { label: '0.6x', val: 0.6 },
                        { label: '1.2x', val: 1.2 },
                        { label: '2.4x', val: 2.4 }
                      ].map((s) => (
                        <button
                          key={s.val}
                          type="button"
                          onClick={() => onAutoRotateSpeedChange?.(s.val)}
                          className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${
                            Math.abs((autoRotateSpeed || 1.2) - s.val) < 0.1
                              ? 'bg-blue-600 text-white'
                              : 'bg-slate-800 text-slate-400 hover:text-slate-200'
                          }`}
                        >
                          {s.label}
                        </button>
                      ))}
                    </div>

                    <button
                      type="button"
                      onClick={onAutoRotateDirectionToggle}
                      className="text-[10px] text-slate-300 hover:text-white flex items-center gap-1 bg-slate-800 px-2 py-0.5 rounded border border-slate-700"
                    >
                      {autoRotateDirection === 'cw' ? <RotateCw className="w-2.5 h-2.5 text-amber-400" /> : <RotateCcw className="w-2.5 h-2.5 text-amber-400" />}
                      <span>{autoRotateDirection === 'cw' ? 'Xoay phải' : 'Xoay trái'}</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: Luyện tập trắc nghiệm */}
          {activeTab === 'quiz' && <QuizSection />}
        </div>
      </div>
    </div>
  );
};
