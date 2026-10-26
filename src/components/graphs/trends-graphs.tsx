import React, { useState } from 'react';
import { Text, View } from 'react-native';
import Svg, {
    Circle,
    Defs,
    G,
    Line,
    LinearGradient,
    Path,
    Stop,
    Text as SvgText,
} from 'react-native-svg';

/* ============================================================
    SAMPLE DATA
============================================================ */

const timelineData = [
  { day: 'Mon', value: 120 }, { day: 'Tue', value: 185 },
  { day: 'Wed', value: 160 }, { day: 'Thu', value: 240 },
  { day: 'Fri', value: 210 }, { day: 'Sat', value: 320 },
  { day: 'Sun', value: 260 },
];

const platformData = [
  { label: 'Facebook', value: 38 },
  { label: 'X (Twitter)', value: 27 },
  { label: 'TikTok', value: 18 },
  { label: 'Instagram', value: 11 },
  { label: 'Reddit', value: 6 },
];

// colors match the legend on the Trends page
const topicData = [
  { label: 'Prevention', value: 48, color: '#3BB329' },
  { label: 'Misinformation', value: 27, color: '#FFA400' },
  { label: 'Stigma', value: 25, color: 'red' },
];

/* ============================================================
    SHARED
============================================================ */

const BRAND = '#35408E';
const BRAND_SOFT = '#C5CAEA';
const GRID = '#D3D9E6';
const AXIS = '#B8C0D2';
const TRACK = '#D5DAE8';
const MUTED = '#64748B';

// graphBG has a fixed height per device, so measure the space it really gives
// us (inside its padding) and lay the graph out to fit exactly.
export function ChartFrame({ children }: { children: (w: number, h: number) => React.ReactNode }) {
  const [box, setBox] = useState<{ w: number; h: number } | null>(null);

  return (
    <View
      style={{ width: '100%', height: '100%' }}
      onLayout={(e) => {
        const { width, height } = e.nativeEvent.layout;
        setBox((prev) =>
          prev && Math.abs(prev.w - width) < 1 && Math.abs(prev.h - height) < 1
            ? prev
            : { w: width, h: height }
        );
      }}
    >
      {box && box.w > 0 && box.h > 0 ? children(box.w, box.h) : null}
    </View>
  );
}

const CAPTION_H = 16;

function Caption({ text }: { text: string }) {
  return (
    <Text
      style={{
        textAlign: 'center', color: MUTED, fontSize: 10,
        height: CAPTION_H, lineHeight: CAPTION_H,
      }}
    >
      {text}
    </Text>
  );
}

/* ============================================================
    MENTIONS TIMELINE (smooth area/line chart)
============================================================ */

export function MentionsTimelineGraph() {
  return <ChartFrame>{(w, h) => <Timeline width={w} height={h} />}</ChartFrame>;
}

function Timeline({ width, height }: { width: number; height: number }) {
  const svgH = Math.max(height - CAPTION_H, 60);
  const padL = 32;
  const padR = 16;
  const padT = 18; // room for the peak value label
  const padB = 18; // room for the day labels

  const plotW = width - padL - padR;
  const plotH = svgH - padT - padB;
  const baseY = padT + plotH;

  const max = Math.max(...timelineData.map((d) => d.value));
  const niceMax = Math.ceil(max / 100) * 100;
  const ticks = plotH >= 90 ? [0, niceMax / 4, niceMax / 2, (niceMax * 3) / 4, niceMax] : [0, niceMax / 2, niceMax];

  const xAt = (i: number) => padL + (i / (timelineData.length - 1)) * plotW;
  const yAt = (v: number) => padT + (1 - v / niceMax) * plotH;

  const pts = timelineData.map((d, i) => ({ x: xAt(i), y: yAt(d.value), ...d }));
  let line = `M ${pts[0].x} ${pts[0].y}`;
  for (let i = 1; i < pts.length; i++) {
    const cx = (pts[i - 1].x + pts[i].x) / 2;
    line += ` C ${cx} ${pts[i - 1].y}, ${cx} ${pts[i].y}, ${pts[i].x} ${pts[i].y}`;
  }
  const area = `${line} L ${pts[pts.length - 1].x} ${baseY} L ${pts[0].x} ${baseY} Z`;
  const peakIndex = timelineData.findIndex((d) => d.value === max);

  return (
    <View style={{ width, height }}>
      <Svg width={width} height={svgH}>
        <Defs>
          <LinearGradient id="mentionsFill" x1="0" y1="0" x2="0" y2="1">
            <Stop offset="0" stopColor={BRAND} stopOpacity={0.28} />
            <Stop offset="1" stopColor={BRAND} stopOpacity={0.02} />
          </LinearGradient>
        </Defs>

        {/* Gridlines + y labels */}
        {ticks.map((t) => (
          <G key={t}>
            <Line
              x1={padL} x2={padL + plotW} y1={yAt(t)} y2={yAt(t)}
              stroke={t === 0 ? AXIS : GRID} strokeWidth={1}
            />
            <SvgText x={padL - 6} y={yAt(t) + 3} fontSize={9} fill={MUTED} textAnchor="end">
              {t}
            </SvgText>
          </G>
        ))}

        {/* Area + line */}
        <Path d={area} fill="url(#mentionsFill)" />
        <Path d={line} stroke={BRAND} strokeWidth={2.5} fill="none" strokeLinecap="round" strokeLinejoin="round" />

        {/* Points */}
        {pts.map((p, i) => (
          <Circle
            key={p.day}
            cx={p.x} cy={p.y}
            r={i === peakIndex ? 4.5 : 3}
            fill={i === peakIndex ? BRAND : '#FFFFFF'}
            stroke={BRAND} strokeWidth={2}
          />
        ))}

        {/* Peak label */}
        <SvgText
          x={pts[peakIndex].x} y={pts[peakIndex].y - 9}
          fontSize={11} fontWeight="bold" fill={BRAND} textAnchor="middle"
        >
          {pts[peakIndex].value}
        </SvgText>

        {/* X labels */}
        {pts.map((p, i) => (
          <SvgText
            key={p.day} x={p.x} y={baseY + 13} fontSize={10}
            fill={i === peakIndex ? BRAND : MUTED}
            fontWeight={i === peakIndex ? 'bold' : 'normal'}
            textAnchor="middle"
          >
            {p.day}
          </SvgText>
        ))}
      </Svg>
      <Caption text="Daily mentions (sample data)" />
    </View>
  );
}

/* ============================================================
    DISTRIBUTION BY PLATFORM (horizontal bars)
============================================================ */

export function PlatformGraph() {
  return <ChartFrame>{(w, h) => <Platforms width={w} height={h} />}</ChartFrame>;
}

function Platforms({ width, height }: { width: number; height: number }) {
  const top = Math.max(...platformData.map((d) => d.value));
  const compact = height < 130;

  return (
    <View style={{ width, height }}>
      <View style={{ flex: 1, justifyContent: 'space-evenly' }}>
        {platformData.map((item) => {
          const isTop = item.value === top;
          return (
            <View key={item.label} style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
              <Text
                numberOfLines={1}
                style={{
                  width: 74, fontSize: compact ? 10 : 11,
                  color: isTop ? BRAND : '#475569', fontWeight: isTop ? '700' : '500',
                }}
              >
                {item.label}
              </Text>
              <View
                style={{
                  flex: 1, height: compact ? 8 : 12, borderRadius: 6,
                  backgroundColor: TRACK, overflow: 'hidden', marginHorizontal: 8,
                }}
              >
                <View
                  style={{
                    width: `${(item.value / top) * 100}%`, height: '100%', borderRadius: 6,
                    backgroundColor: isTop ? BRAND : BRAND_SOFT,
                  }}
                />
              </View>
              <Text
                style={{
                  width: 34, textAlign: 'right', fontSize: compact ? 10 : 11,
                  fontWeight: '600', color: '#1E293B',
                }}
              >
                {item.value}%
              </Text>
            </View>
          );
        })}
      </View>
      <Caption text="Mentions by platform (sample data)" />
    </View>
  );
}

/* ============================================================
    TOPIC BREAKDOWN (donut — legend is already on the page)
============================================================ */

export function TopicBreakdownGraph() {
  const [width, setWidth] = useState(0);

  // sized from the width left beside the legend, so it never overflows
  const size = Math.max(Math.min(width, 200), 0);
  const total = topicData.reduce((s, d) => s + d.value, 0);
  const dominant = topicData.reduce((a, b) => (b.value > a.value ? b : a));

  return (
    <View
      style={{ width: '100%', alignItems: 'center', justifyContent: 'center' }}
      onLayout={(e) => setWidth(e.nativeEvent.layout.width)}
    >
      {size >= 60 ? <Donut size={size} total={total} dominant={dominant} /> : null}
    </View>
  );
}

function Donut({
  size, total, dominant,
}: {
  size: number;
  total: number;
  dominant: { label: string; value: number; color: string };
}) {
  const center = size / 2;
  const strokeWidth = Math.max(size * 0.14, 10);
  const radius = (size - strokeWidth) / 2 - 1;
  const circumference = 2 * Math.PI * radius;
  const gap = 2;

  let start = 0;
  const segments = topicData.map((item) => {
    const length = (item.value / total) * circumference;
    const seg = { ...item, length, start };
    start += length;
    return seg;
  });

  return (
    <View style={{ width: size, height: size, alignItems: 'center', justifyContent: 'center' }}>
      <Svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <G rotation={-90} origin={`${center}, ${center}`}>
          <Circle cx={center} cy={center} r={radius} stroke={TRACK} strokeWidth={strokeWidth} fill="none" />
          {segments.map((seg) => {
            const visible = Math.max(seg.length - gap, 0);
            return (
              <Circle
                key={seg.label}
                cx={center} cy={center} r={radius}
                stroke={seg.color} strokeWidth={strokeWidth} fill="none"
                strokeDasharray={`${visible} ${circumference - visible}`}
                strokeDashoffset={-seg.start}
                strokeLinecap="butt"
              />
            );
          })}
        </G>
      </Svg>

      <View style={{ position: 'absolute', alignItems: 'center', justifyContent: 'center' }}>
        <Text style={{ fontSize: Math.max(size * 0.19, 13), fontWeight: '700', color: BRAND }}>
          {Math.round((dominant.value / total) * 100)}%
        </Text>
        <Text style={{ fontSize: Math.max(size * 0.08, 8), fontWeight: '600', color: MUTED }}>
          {dominant.label}
        </Text>
      </View>
    </View>
  );
}