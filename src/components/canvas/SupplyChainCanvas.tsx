'use client';

import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { useTheme } from '@/contexts/ThemeContext';
import styles from './SupplyChainCanvas.module.css';

interface SupplyChainCanvasProps {
  className?: string;
}

interface HubMetadata {
  code: string;
  label: string;
  telemetry: string;
  projectSlug: string;
}

const TIER1_HUB_METADATA: HubMetadata[] = [
  {
    code: 'HUB-01',
    label: 'SAP BW/4HANA EDW',
    telemetry: 'Star Schema · ADSO Layer · 99.8% Integrity',
    projectSlug: 'sap-bw4hana-edw',
  },
  {
    code: 'HUB-02',
    label: 'Signavio BPMN 2.0',
    telemetry: 'Process Mining · -25% Cycle Time',
    projectSlug: 'renaissance-diagnostic',
  },
  {
    code: 'HUB-03',
    label: 'Automated ETL Stream',
    telemetry: 'KNIME · SQL · Power BI Live',
    projectSlug: 'renaissance-diagnostic',
  },
  {
    code: 'HUB-04',
    label: 'Agile PMO & Jira',
    telemetry: 'Sprint Governance · 100% Delivery',
    projectSlug: 'fh-swf-digital-ops',
  },
  {
    code: 'HUB-05',
    label: 'Digital Platform Ops',
    telemetry: 'Web PWA + Android · Multi-Tier SKU',
    projectSlug: 'petbhai-ecosystem',
  },
];

interface NodeData {
  x: number;
  y: number;
  z: number;
  tier: number;
  radius: number;
  alpha: number;
}

interface RouteData {
  startIndex: number;
  endIndex: number;
  alphaStart: number;
  alphaEnd: number;
}

interface PacketData {
  routeIndex: number;
  progress: number;
  speed: number;
  reverse: boolean;
  isBurst: boolean;
  active: boolean;
}

interface PulseRingData {
  hubIndex: number;
  progress: number;
  speed: number;
}

interface EchoData {
  nodeIndex: number;
  startTime: number;
  active: boolean;
  intensity: number;
}

interface PaletteColors {
  nodeColor: THREE.Color;
  nodeCoreColor: THREE.Color;
  hubColor: THREE.Color;
  routeColor: THREE.Color;
  packetColor: THREE.Color;
  haloColor: THREE.Color;
  globalRouteOpacity: number;
  globalNodeOpacity: number;
}

const getDarkPalette = (): PaletteColors => ({
  nodeColor: new THREE.Color(0x38bdf8),
  nodeCoreColor: new THREE.Color(0x4a9b9b),
  hubColor: new THREE.Color(0x5eead4),
  routeColor: new THREE.Color(0x4a9b9b),
  packetColor: new THREE.Color(0xffffff),
  haloColor: new THREE.Color(0x5eead4),
  globalRouteOpacity: 0.28,
  globalNodeOpacity: 0.62,
});

const getLightPalette = (): PaletteColors => ({
  nodeColor: new THREE.Color(0x0f766e),
  nodeCoreColor: new THREE.Color(0x115e59),
  hubColor: new THREE.Color(0x042f2e),
  routeColor: new THREE.Color(0x0f766e),
  packetColor: new THREE.Color(0x0f4c4a),
  haloColor: new THREE.Color(0x0f766e),
  globalRouteOpacity: 0.22,
  globalNodeOpacity: 0.54,
});

function calculateSpatialAlpha(x: number): number {
  const factor = (x + 3.0) / 5.5;
  return THREE.MathUtils.clamp(factor, 0.1, 0.95);
}

const BASE_NODES_CONFIG = [
  // Tier 1: Major Operational & Systems Hubs (0..4)
  { x: 1.8, y: 0.8, z: 0.3, tier: 1, radius: 0.135 },
  { x: 2.9, y: -0.5, z: -0.2, tier: 1, radius: 0.145 },
  { x: 1.1, y: -1.2, z: 0.4, tier: 1, radius: 0.125 },
  { x: 2.5, y: 1.5, z: -0.4, tier: 1, radius: 0.135 },
  { x: -0.7, y: 0.4, z: 0.1, tier: 1, radius: 0.115 },

  // Tier 2: Regional Distribution & Process Nodes
  { x: 0.9, y: 1.3, z: 0.1, tier: 2, radius: 0.08 },
  { x: 2.1, y: 0.2, z: 0.5, tier: 2, radius: 0.08 },
  { x: 2.4, y: -0.2, z: -0.6, tier: 2, radius: 0.08 },
  { x: 3.5, y: -0.1, z: 0.3, tier: 2, radius: 0.08 },
  { x: 3.3, y: -1.2, z: -0.4, tier: 2, radius: 0.08 },
  { x: 1.9, y: -1.7, z: 0.2, tier: 2, radius: 0.08 },
  { x: 0.5, y: -0.6, z: 0.3, tier: 2, radius: 0.08 },
  { x: 1.8, y: 2.1, z: -0.2, tier: 2, radius: 0.08 },
  { x: 3.2, y: 1.1, z: 0.2, tier: 2, radius: 0.08 },
  { x: -0.1, y: 1.0, z: -0.3, tier: 2, radius: 0.07 },
  { x: -1.5, y: 0.1, z: 0.1, tier: 2, radius: 0.07 },
  { x: -1.1, y: -0.7, z: -0.3, tier: 2, radius: 0.07 },

  // Tier 3: Edge Facilities & Sensor Streams
  { x: 0.3, y: 1.8, z: 0.4, tier: 3, radius: 0.05 },
  { x: 1.3, y: 2.6, z: -0.5, tier: 3, radius: 0.05 },
  { x: 2.7, y: 2.2, z: 0.3, tier: 3, radius: 0.05 },
  { x: 3.8, y: 1.6, z: -0.2, tier: 3, radius: 0.05 },
  { x: 4.1, y: 0.6, z: 0.4, tier: 3, radius: 0.05 },
  { x: 4.0, y: -0.8, z: -0.3, tier: 3, radius: 0.05 },
  { x: 3.7, y: -1.8, z: 0.2, tier: 3, radius: 0.05 },
  { x: 2.6, y: -2.1, z: -0.3, tier: 3, radius: 0.05 },
  { x: 1.4, y: -2.3, z: 0.3, tier: 3, radius: 0.05 },
  { x: 0.1, y: -1.5, z: -0.2, tier: 3, radius: 0.05 },
  { x: -0.6, y: -1.4, z: 0.3, tier: 3, radius: 0.05 },
  { x: -1.8, y: -1.1, z: -0.2, tier: 3, radius: 0.05 },
  { x: -2.3, y: -0.3, z: 0.2, tier: 3, radius: 0.05 },
  { x: -2.6, y: 0.5, z: -0.2, tier: 3, radius: 0.05 },
  { x: -2.1, y: 1.2, z: 0.2, tier: 3, radius: 0.05 },
  { x: -1.0, y: 1.7, z: -0.3, tier: 3, radius: 0.05 },
  { x: -0.3, y: 2.1, z: 0.2, tier: 3, radius: 0.05 },
  { x: 0.7, y: 0.1, z: -0.4, tier: 3, radius: 0.05 },
  { x: 2.0, y: -0.7, z: -0.7, tier: 3, radius: 0.05 },
  { x: 3.1, y: 0.4, z: -0.8, tier: 3, radius: 0.05 },
];

const NODES: NodeData[] = BASE_NODES_CONFIG.map((item) => ({
  ...item,
  alpha: calculateSpatialAlpha(item.x),
}));

function generateRoutes(nodes: NodeData[]): RouteData[] {
  const routes: RouteData[] = [];
  const connectionCounts = new Array(nodes.length).fill(0);
  const existingPairs = new Set<string>();

  const linkNodes = (i: number, j: number) => {
    if (i === j) return;
    const key = i < j ? `${i}_${j}` : `${j}_${i}`;
    if (existingPairs.has(key)) return;
    if (connectionCounts[i] >= 4 || connectionCounts[j] >= 4) return;

    existingPairs.add(key);
    connectionCounts[i]++;
    connectionCounts[j]++;

    routes.push({
      startIndex: i,
      endIndex: j,
      alphaStart: nodes[i].alpha,
      alphaEnd: nodes[j].alpha,
    });
  };

  for (let i = 0; i < 5; i++) {
    for (let j = i + 1; j < 5; j++) {
      const distance = Math.hypot(
        nodes[i].x - nodes[j].x,
        nodes[i].y - nodes[j].y,
        nodes[i].z - nodes[j].z
      );
      if (distance < 3.2) {
        linkNodes(i, j);
      }
    }
  }

  for (let i = 5; i < 17; i++) {
    let nearestHub = 0;
    let minHubDist = Infinity;
    for (let h = 0; h < 5; h++) {
      const distance = Math.hypot(
        nodes[i].x - nodes[h].x,
        nodes[i].y - nodes[h].y,
        nodes[i].z - nodes[h].z
      );
      if (distance < minHubDist) {
        minHubDist = distance;
        nearestHub = h;
      }
    }
    linkNodes(i, nearestHub);

    for (let j = 5; j < 17; j++) {
      if (i !== j) {
        const distance = Math.hypot(
          nodes[i].x - nodes[j].x,
          nodes[i].y - nodes[j].y,
          nodes[i].z - nodes[j].z
        );
        if (distance < 1.6) {
          linkNodes(i, j);
        }
      }
    }
  }

  for (let i = 17; i < nodes.length; i++) {
    let nearestNode = 0;
    let minDist = Infinity;
    for (let j = 0; j < 17; j++) {
      const distance = Math.hypot(
        nodes[i].x - nodes[j].x,
        nodes[i].y - nodes[j].y,
        nodes[i].z - nodes[j].z
      );
      if (distance < minDist) {
        minDist = distance;
        nearestNode = j;
      }
    }
    linkNodes(i, nearestNode);
  }

  return routes;
}

const NETWORK_ROUTES = generateRoutes(NODES);

// Precompute connected routes per Tier-1 hub for instant zero-allocation click bursts
const HUB_CONNECTED_ROUTES: Array<Array<{ routeIndex: number; reverse: boolean }>> = Array.from(
  { length: 5 },
  (_, hubIndex) => {
    const connected: Array<{ routeIndex: number; reverse: boolean }> = [];
    for (let r = 0; r < NETWORK_ROUTES.length; r++) {
      if (NETWORK_ROUTES[r].startIndex === hubIndex) {
        connected.push({ routeIndex: r, reverse: false });
      } else if (NETWORK_ROUTES[r].endIndex === hubIndex) {
        connected.push({ routeIndex: r, reverse: true });
      }
    }
    return connected;
  }
);

function createPackets(routeCount: number, ambientCount: number, burstPoolCount: number): PacketData[] {
  const packets: PacketData[] = [];
  for (let i = 0; i < ambientCount; i++) {
    packets.push({
      routeIndex: i % routeCount,
      progress: i / ambientCount,
      speed: 0.003 + (i % 5) * 0.001,
      reverse: false,
      isBurst: false,
      active: true,
    });
  }
  for (let i = 0; i < burstPoolCount; i++) {
    packets.push({
      routeIndex: 0,
      progress: 0,
      speed: 0.015,
      reverse: false,
      isBurst: true,
      active: false,
    });
  }
  return packets;
}

function createPulses(): PulseRingData[] {
  const pulses: PulseRingData[] = [];
  for (let h = 0; h < 5; h++) {
    pulses.push({ hubIndex: h, progress: 0.0, speed: 0.007 });
    pulses.push({ hubIndex: h, progress: 0.5, speed: 0.007 });
  }
  return pulses;
}

function isInteractiveElement(target: EventTarget | null): boolean {
  if (!(target instanceof Element)) return false;
  return Boolean(
    target.closest(
      'a, button, input, textarea, select, [role="button"], [role="dialog"], nav, header'
    )
  );
}

export default function SupplyChainCanvas({ className }: SupplyChainCanvasProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const webglHostRef = useRef<HTMLDivElement>(null);
  const pillRef = useRef<HTMLDivElement>(null);

  const { theme } = useTheme();
  const [activeHubIndex, setActiveHubIndex] = useState<number | null>(null);
  const [burstPulseActive, setBurstPulseActive] = useState(false);

  const targetPaletteRef = useRef<PaletteColors>(
    theme === 'light' ? getLightPalette() : getDarkPalette()
  );
  const isReducedMotionRef = useRef(false);
  const renderStaticFrameRef = useRef<(() => void) | null>(null);
  const activeHubIndexRef = useRef<number | null>(null);
  const burstFlashUntilRef = useRef<number>(0);

  // Sync theme palette without re-initializing WebGL context
  useEffect(() => {
    targetPaletteRef.current = theme === 'light' ? getLightPalette() : getDarkPalette();
    if (isReducedMotionRef.current && renderStaticFrameRef.current) {
      renderStaticFrameRef.current();
    }
  }, [theme]);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const container = webglHostRef.current;
    if (!wrapper || !container) return;

    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }

    let viewportWidth = container.clientWidth || 800;
    let viewportHeight = container.clientHeight || 600;

    // 1. Scene, Camera, Renderer initialization
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, viewportWidth / viewportHeight, 0.1, 100);
    camera.position.set(0, 0, 7.8);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });

    const computeDpr = (w: number) =>
      Math.min(window.devicePixelRatio || 1, w < 768 ? 1.5 : 2.0);

    renderer.setPixelRatio(computeDpr(viewportWidth));
    renderer.setSize(viewportWidth, viewportHeight);
    renderer.domElement.className = styles.webglCanvas;
    renderer.domElement.style.pointerEvents = 'none';
    container.appendChild(renderer.domElement);

    const initialPalette = targetPaletteRef.current;
    const currentPalette: PaletteColors = {
      nodeColor: initialPalette.nodeColor.clone(),
      nodeCoreColor: initialPalette.nodeCoreColor.clone(),
      hubColor: initialPalette.hubColor.clone(),
      routeColor: initialPalette.routeColor.clone(),
      packetColor: initialPalette.packetColor.clone(),
      haloColor: initialPalette.haloColor.clone(),
      globalRouteOpacity: initialPalette.globalRouteOpacity,
      globalNodeOpacity: initialPalette.globalNodeOpacity,
    };

    const sceneGroup = new THREE.Group();
    scene.add(sceneGroup);

    const updateResponsiveLayout = (w: number) => {
      const isMobile = w < 768;
      if (isMobile) {
        sceneGroup.position.set(-0.2, -0.3, 0);
        sceneGroup.scale.setScalar(0.72);
      } else {
        sceneGroup.position.set(0.65, 0, 0);
        sceneGroup.scale.setScalar(1.0);
      }
    };
    updateResponsiveLayout(viewportWidth);

    // 2. Dynamic Network Routes (updated live from displaced node coordinates)
    const routePositions = new Float32Array(NETWORK_ROUTES.length * 6);
    const routeAlphas = new Float32Array(NETWORK_ROUTES.length * 2);
    for (let i = 0; i < NETWORK_ROUTES.length; i++) {
      const route = NETWORK_ROUTES[i];
      const nA = NODES[route.startIndex];
      const nB = NODES[route.endIndex];
      const pOffset = i * 6;
      routePositions[pOffset] = nA.x;
      routePositions[pOffset + 1] = nA.y;
      routePositions[pOffset + 2] = nA.z;
      routePositions[pOffset + 3] = nB.x;
      routePositions[pOffset + 4] = nB.y;
      routePositions[pOffset + 5] = nB.z;

      routeAlphas[i * 2] = route.alphaStart;
      routeAlphas[i * 2 + 1] = route.alphaEnd;
    }

    const routeGeometry = new THREE.BufferGeometry();
    const routePosAttr = new THREE.BufferAttribute(routePositions, 3);
    routePosAttr.setUsage(THREE.DynamicDrawUsage);
    routeGeometry.setAttribute('position', routePosAttr);
    routeGeometry.setAttribute('aAlpha', new THREE.BufferAttribute(routeAlphas, 1));

    const routeMaterial = new THREE.ShaderMaterial({
      uniforms: {
        uColor: { value: currentPalette.routeColor.clone() },
        uOpacity: { value: currentPalette.globalRouteOpacity },
      },
      vertexShader: `
        attribute float aAlpha;
        varying float vAlpha;
        void main() {
          vAlpha = aAlpha;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform vec3 uColor;
        uniform float uOpacity;
        varying float vAlpha;
        void main() {
          gl_FragColor = vec4(uColor, vAlpha * uOpacity);
        }
      `,
      transparent: true,
      depthWrite: false,
      blending: THREE.NormalBlending,
    });

    const routeMesh = new THREE.LineSegments(routeGeometry, routeMaterial);
    sceneGroup.add(routeMesh);

    // 3. Node Meshes (InstancedMesh)
    const hubCount = 5;
    const regularCount = NODES.length - hubCount;
    const dummy = new THREE.Object3D();

    const hubGeometry = new THREE.SphereGeometry(1, 24, 24);
    const hubAlphas = new Float32Array(hubCount);
    for (let i = 0; i < hubCount; i++) {
      hubAlphas[i] = NODES[i].alpha;
    }
    hubGeometry.setAttribute('aAlpha', new THREE.InstancedBufferAttribute(hubAlphas, 1));

    const hubMaterial = new THREE.ShaderMaterial({
      uniforms: {
        uColor: { value: currentPalette.hubColor.clone() },
        uCoreColor: { value: currentPalette.nodeCoreColor.clone() },
        uOpacity: { value: currentPalette.globalNodeOpacity },
      },
      vertexShader: `
        attribute float aAlpha;
        varying float vAlpha;
        varying vec3 vNormal;
        void main() {
          vAlpha = aAlpha;
          vNormal = normalMatrix * normal;
          vec4 mvPosition = modelViewMatrix * instanceMatrix * vec4(position, 1.0);
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
        uniform vec3 uColor;
        uniform vec3 uCoreColor;
        uniform float uOpacity;
        varying float vAlpha;
        varying vec3 vNormal;
        void main() {
          float diff = max(dot(vNormal, normalize(vec3(0.4, 0.6, 0.7))), 0.0);
          vec3 col = mix(uColor, uCoreColor, diff * 0.65);
          gl_FragColor = vec4(col, vAlpha * uOpacity);
        }
      `,
      transparent: true,
      depthWrite: false,
    });

    const hubMesh = new THREE.InstancedMesh(hubGeometry, hubMaterial, hubCount);
    const hubScaleBoost = new Float32Array(hubCount).fill(1.0);
    for (let i = 0; i < hubCount; i++) {
      dummy.position.set(NODES[i].x, NODES[i].y, NODES[i].z);
      dummy.scale.setScalar(NODES[i].radius);
      dummy.updateMatrix();
      hubMesh.setMatrixAt(i, dummy.matrix);
    }
    hubMesh.instanceMatrix.needsUpdate = true;
    sceneGroup.add(hubMesh);

    const regularGeometry = new THREE.SphereGeometry(1, 16, 16);
    const regularAlphas = new Float32Array(regularCount);
    for (let i = 0; i < regularCount; i++) {
      regularAlphas[i] = NODES[i + hubCount].alpha;
    }
    regularGeometry.setAttribute('aAlpha', new THREE.InstancedBufferAttribute(regularAlphas, 1));

    const regularMaterial = new THREE.ShaderMaterial({
      uniforms: {
        uColor: { value: currentPalette.nodeColor.clone() },
        uCoreColor: { value: currentPalette.nodeCoreColor.clone() },
        uOpacity: { value: currentPalette.globalNodeOpacity },
      },
      vertexShader: `
        attribute float aAlpha;
        varying float vAlpha;
        varying vec3 vNormal;
        void main() {
          vAlpha = aAlpha;
          vNormal = normalMatrix * normal;
          vec4 mvPosition = modelViewMatrix * instanceMatrix * vec4(position, 1.0);
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
        uniform vec3 uColor;
        uniform vec3 uCoreColor;
        uniform float uOpacity;
        varying float vAlpha;
        varying vec3 vNormal;
        void main() {
          float diff = max(dot(vNormal, normalize(vec3(0.4, 0.6, 0.7))), 0.0);
          vec3 col = mix(uColor, uCoreColor, diff * 0.7);
          gl_FragColor = vec4(col, vAlpha * uOpacity);
        }
      `,
      transparent: true,
      depthWrite: false,
    });

    const regularMesh = new THREE.InstancedMesh(regularGeometry, regularMaterial, regularCount);
    for (let i = 0; i < regularCount; i++) {
      const node = NODES[i + hubCount];
      dummy.position.set(node.x, node.y, node.z);
      dummy.scale.setScalar(node.radius);
      dummy.updateMatrix();
      regularMesh.setMatrixAt(i, dummy.matrix);
    }
    regularMesh.instanceMatrix.needsUpdate = true;
    sceneGroup.add(regularMesh);

    // 4. Data Packets (20 ambient + 16 burst pool)
    const ambientPacketCount = 20;
    const burstPoolCount = 16;
    const totalPacketCount = ambientPacketCount + burstPoolCount;
    const packets = createPackets(NETWORK_ROUTES.length, ambientPacketCount, burstPoolCount);
    const packetGeometry = new THREE.SphereGeometry(0.045, 12, 12);
    const packetAlphas = new Float32Array(totalPacketCount);
    packetGeometry.setAttribute('aAlpha', new THREE.InstancedBufferAttribute(packetAlphas, 1));

    const packetMaterial = new THREE.ShaderMaterial({
      uniforms: {
        uColor: { value: currentPalette.packetColor.clone() },
      },
      vertexShader: `
        attribute float aAlpha;
        varying float vAlpha;
        void main() {
          vAlpha = aAlpha;
          vec4 mvPosition = modelViewMatrix * instanceMatrix * vec4(position, 1.0);
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
        uniform vec3 uColor;
        varying float vAlpha;
        void main() {
          gl_FragColor = vec4(uColor, vAlpha);
        }
      `,
      transparent: true,
      depthWrite: false,
    });

    const packetMesh = new THREE.InstancedMesh(packetGeometry, packetMaterial, totalPacketCount);
    sceneGroup.add(packetMesh);

    // 5. Major Hub Pulse Halos
    const pulses = createPulses();
    const pulseCount = pulses.length;
    const haloGeometry = new THREE.RingGeometry(0.12, 0.16, 32);
    const haloAlphas = new Float32Array(pulseCount);
    haloGeometry.setAttribute('aAlpha', new THREE.InstancedBufferAttribute(haloAlphas, 1));

    const haloMaterial = new THREE.ShaderMaterial({
      uniforms: {
        uColor: { value: currentPalette.haloColor.clone() },
      },
      vertexShader: `
        attribute float aAlpha;
        varying float vAlpha;
        void main() {
          vAlpha = aAlpha;
          vec4 mvPosition = modelViewMatrix * instanceMatrix * vec4(position, 1.0);
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
        uniform vec3 uColor;
        varying float vAlpha;
        void main() {
          gl_FragColor = vec4(uColor, vAlpha);
        }
      `,
      transparent: true,
      depthWrite: false,
      side: THREE.DoubleSide,
    });

    const haloMesh = new THREE.InstancedMesh(haloGeometry, haloMaterial, pulseCount);
    sceneGroup.add(haloMesh);

    // 6. Echo Rings Pool (tracks live node coordinates via nodeIndex)
    const echoPoolSize = 14;
    const echoes: EchoData[] = Array.from({ length: echoPoolSize }, () => ({
      nodeIndex: 0,
      startTime: 0,
      active: false,
      intensity: 1.0,
    }));
    const echoGeometry = new THREE.RingGeometry(0.05, 0.075, 24);
    const echoAlphas = new Float32Array(echoPoolSize * 3);
    echoGeometry.setAttribute('aAlpha', new THREE.InstancedBufferAttribute(echoAlphas, 1));
    const echoMaterial = new THREE.ShaderMaterial({
      uniforms: {
        uColor: { value: currentPalette.haloColor.clone() },
      },
      vertexShader: `
        attribute float aAlpha;
        varying float vAlpha;
        void main() {
          vAlpha = aAlpha;
          vec4 mvPosition = modelViewMatrix * instanceMatrix * vec4(position, 1.0);
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
        uniform vec3 uColor;
        varying float vAlpha;
        void main() {
          gl_FragColor = vec4(uColor, vAlpha);
        }
      `,
      transparent: true,
      depthWrite: false,
      side: THREE.DoubleSide,
      blending: THREE.AdditiveBlending,
    });
    const echoMesh = new THREE.InstancedMesh(echoGeometry, echoMaterial, echoPoolSize * 3);
    sceneGroup.add(echoMesh);

    // Pre-allocated vectors (zero per-frame heap churn)
    const currentPositions = NODES.map((n) => new THREE.Vector3(n.x, n.y, n.z));
    const basePositions = NODES.map((n) => new THREE.Vector3(n.x, n.y, n.z));
    const scratchMouse = new THREE.Vector3();
    const scratchDir = new THREE.Vector3();
    const scratchWorldCursor = new THREE.Vector3();
    const scratchTargetPos = new THREE.Vector3();
    const scratchNodeToCursor = new THREE.Vector3();
    const scratchHubWorld = new THREE.Vector3();
    const scratchHubProj = new THREE.Vector3();

    // Projected 2D coordinates of the 5 Tier-1 hubs
    const hubScreenX = new Float32Array(hubCount);
    const hubScreenY = new Float32Array(hubCount);

    // Zero-allocation pointer & scroll tracking
    let baseRotation = 0;
    let targetMouseX = 0;
    let targetMouseY = 0;
    let currentMouseX = 0;
    let currentMouseY = 0;
    let pointerInHero = false;
    let pointerLocalX = -9999;
    let pointerLocalY = -9999;
    let lastPointerMoveTime = -Infinity;
    let lockedHubIndex: number | null = null;
    let lockedHubUntil = 0;
    let scrollRatio = 0;

    const triggerEchoAtNode = (nodeIndex: number, now: number, intensity = 1.0) => {
      for (let i = 0; i < echoPoolSize; i++) {
        if (!echoes[i].active) {
          echoes[i].active = true;
          echoes[i].nodeIndex = nodeIndex;
          echoes[i].startTime = now;
          echoes[i].intensity = intensity;
          return;
        }
      }
    };

    const triggerHubPacketBurst = (hubIndex: number, now: number) => {
      triggerEchoAtNode(hubIndex, now, 1.55);

      const connected = HUB_CONNECTED_ROUTES[hubIndex];
      let launched = 0;
      for (let pIdx = ambientPacketCount; pIdx < totalPacketCount && launched < connected.length * 2; pIdx++) {
        const packet = packets[pIdx];
        if (!packet.active) {
          const routeConn = connected[launched % connected.length];
          packet.active = true;
          packet.routeIndex = routeConn.routeIndex;
          packet.reverse = routeConn.reverse;
          packet.progress = (launched >= connected.length ? 0.14 : 0.0);
          packet.speed = 0.017 + (launched % 3) * 0.004;
          launched++;
        }
      }

      lockedHubIndex = hubIndex;
      lockedHubUntil = now + 2200;
      burstFlashUntilRef.current = now + 900;
      setBurstPulseActive(true);
    };

    const findNearestHubIn2D = (lx: number, ly: number, maxRadius: number): number | null => {
      let bestIndex: number | null = null;
      let bestDist = maxRadius;
      for (let h = 0; h < hubCount; h++) {
        const dist = Math.hypot(hubScreenX[h] - lx, hubScreenY[h] - ly);
        if (dist < bestDist) {
          bestDist = dist;
          bestIndex = h;
        }
      }
      return bestIndex;
    };

    const handlePointerMove = (event: PointerEvent) => {
      const now = performance.now();
      targetMouseX = (event.clientX / window.innerWidth) * 2 - 1;
      targetMouseY = -(event.clientY / window.innerHeight) * 2 + 1;
      lastPointerMoveTime = now;

      const rect = wrapper.getBoundingClientRect();
      const inside =
        event.clientX >= rect.left &&
        event.clientX <= rect.right &&
        event.clientY >= rect.top &&
        event.clientY <= rect.bottom;

      pointerInHero = inside && !isInteractiveElement(event.target);
      if (inside) {
        pointerLocalX = event.clientX - rect.left;
        pointerLocalY = event.clientY - rect.top;
      }
    };

    const handlePointerLeave = () => {
      pointerInHero = false;
      lastPointerMoveTime = -Infinity;
    };

    const handlePointerDown = (event: PointerEvent) => {
      if (event.button !== 0 && event.pointerType === 'mouse') return;
      if (isInteractiveElement(event.target)) return;

      const rect = wrapper.getBoundingClientRect();
      const inside =
        event.clientX >= rect.left &&
        event.clientX <= rect.right &&
        event.clientY >= rect.top &&
        event.clientY <= rect.bottom;
      if (!inside) return;

      const lx = event.clientX - rect.left;
      const ly = event.clientY - rect.top;
      const nearest = findNearestHubIn2D(lx, ly, viewportWidth < 768 ? 160 : 210);
      if (nearest !== null) {
        const now = performance.now();
        triggerHubPacketBurst(nearest, now);
      }
    };

    const handleScroll = () => {
      scrollRatio = THREE.MathUtils.clamp(window.scrollY / window.innerHeight, 0, 1);
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    window.addEventListener('pointerleave', handlePointerLeave, { passive: true });
    window.addEventListener('pointerdown', handlePointerDown, { passive: true });
    window.addEventListener('scroll', handleScroll, { passive: true });

    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    isReducedMotionRef.current = motionQuery.matches;

    const projectHubsTo2D = () => {
      sceneGroup.updateMatrixWorld();
      for (let h = 0; h < hubCount; h++) {
        scratchHubWorld.copy(currentPositions[h]).applyMatrix4(sceneGroup.matrixWorld);
        scratchHubProj.copy(scratchHubWorld).project(camera);
        hubScreenX[h] = (scratchHubProj.x * 0.5 + 0.5) * viewportWidth;
        hubScreenY[h] = (-scratchHubProj.y * 0.5 + 0.5) * viewportHeight;
      }
    };

    const renderStaticFrame = () => {
      const target = targetPaletteRef.current;
      currentPalette.nodeColor.copy(target.nodeColor);
      currentPalette.nodeCoreColor.copy(target.nodeCoreColor);
      currentPalette.hubColor.copy(target.hubColor);
      currentPalette.routeColor.copy(target.routeColor);
      currentPalette.packetColor.copy(target.packetColor);
      currentPalette.haloColor.copy(target.haloColor);
      currentPalette.globalRouteOpacity = target.globalRouteOpacity;
      currentPalette.globalNodeOpacity = target.globalNodeOpacity;

      routeMaterial.uniforms.uColor.value.copy(currentPalette.routeColor);
      routeMaterial.uniforms.uOpacity.value = currentPalette.globalRouteOpacity;
      regularMaterial.uniforms.uColor.value.copy(currentPalette.nodeColor);
      regularMaterial.uniforms.uCoreColor.value.copy(currentPalette.nodeCoreColor);
      regularMaterial.uniforms.uOpacity.value = currentPalette.globalNodeOpacity;
      hubMaterial.uniforms.uColor.value.copy(currentPalette.hubColor);
      hubMaterial.uniforms.uCoreColor.value.copy(currentPalette.nodeCoreColor);
      hubMaterial.uniforms.uOpacity.value = currentPalette.globalNodeOpacity;
      packetMaterial.uniforms.uColor.value.copy(currentPalette.packetColor);
      haloMaterial.uniforms.uColor.value.copy(currentPalette.haloColor);
      echoMaterial.uniforms.uColor.value.copy(currentPalette.haloColor);

      projectHubsTo2D();
      renderer.render(scene, camera);
    };
    renderStaticFrameRef.current = renderStaticFrame;

    let animationFrameId: number | null = null;
    let lastFrameTime = 0;
    let isIntersecting = false;
    let isTabVisible = !document.hidden;

    const updateScene = (dt: number, now: number) => {
      const target = targetPaletteRef.current;
      const frameScale = dt * 60;
      const lerpFactor = 1 - Math.exp(-3.0 * dt);
      const nodeLerpFactor = 1 - Math.exp(-6.0 * dt);
      const mouseLerpFactor = 1 - Math.exp(-2.8 * dt);

      // Smooth theme interpolation
      currentPalette.nodeColor.lerp(target.nodeColor, lerpFactor);
      currentPalette.nodeCoreColor.lerp(target.nodeCoreColor, lerpFactor);
      currentPalette.hubColor.lerp(target.hubColor, lerpFactor);
      currentPalette.routeColor.lerp(target.routeColor, lerpFactor);
      currentPalette.packetColor.lerp(target.packetColor, lerpFactor);
      currentPalette.haloColor.lerp(target.haloColor, lerpFactor);
      currentPalette.globalRouteOpacity +=
        (target.globalRouteOpacity - currentPalette.globalRouteOpacity) * lerpFactor;
      currentPalette.globalNodeOpacity +=
        (target.globalNodeOpacity - currentPalette.globalNodeOpacity) * lerpFactor;

      const globalAlpha = 1.0 - scrollRatio * 0.42;

      routeMaterial.uniforms.uColor.value.copy(currentPalette.routeColor);
      routeMaterial.uniforms.uOpacity.value = currentPalette.globalRouteOpacity * globalAlpha;
      regularMaterial.uniforms.uColor.value.copy(currentPalette.nodeColor);
      regularMaterial.uniforms.uCoreColor.value.copy(currentPalette.nodeCoreColor);
      regularMaterial.uniforms.uOpacity.value = currentPalette.globalNodeOpacity * globalAlpha;
      hubMaterial.uniforms.uColor.value.copy(currentPalette.hubColor);
      hubMaterial.uniforms.uCoreColor.value.copy(currentPalette.nodeCoreColor);
      hubMaterial.uniforms.uOpacity.value = currentPalette.globalNodeOpacity * globalAlpha;
      packetMaterial.uniforms.uColor.value.copy(currentPalette.packetColor);
      haloMaterial.uniforms.uColor.value.copy(currentPalette.haloColor);
      echoMaterial.uniforms.uColor.value.copy(currentPalette.haloColor);

      // Subtle continuous rotation + mouse parallax
      baseRotation += 0.00075 * frameScale;
      currentMouseX += (targetMouseX - currentMouseX) * mouseLerpFactor;
      currentMouseY += (targetMouseY - currentMouseY) * mouseLerpFactor;

      sceneGroup.rotation.y = baseRotation + currentMouseX * 0.11;
      sceneGroup.rotation.x = currentMouseY * 0.07;
      sceneGroup.rotation.z = scrollRatio * 0.08;
      sceneGroup.updateMatrixWorld();

      // Zero-allocation pointer active check (2.2s idle window)
      const isMouseActive = pointerInHero && now - lastPointerMoveTime < 2200;

      if (isMouseActive) {
        scratchMouse.set(targetMouseX, targetMouseY, 0.5).unproject(camera);
        scratchDir.copy(scratchMouse).sub(camera.position).normalize();
        const distToPlane = -camera.position.z / scratchDir.z;
        scratchWorldCursor.copy(camera.position).addScaledVector(scratchDir, distToPlane);
        sceneGroup.worldToLocal(scratchWorldCursor);
      }

      // 1. Update magnetic node positions
      for (let i = 0; i < NODES.length; i++) {
        const baseNode = NODES[i];
        const basePos = basePositions[i];
        const currentPos = currentPositions[i];

        scratchTargetPos.copy(basePos);

        if (isMouseActive) {
          scratchNodeToCursor.subVectors(scratchWorldCursor, basePos);
          const d = scratchNodeToCursor.length();
          const influenceRadius = 1.15;
          if (d < influenceRadius && d > 0.0001) {
            const strength = 1 - d / influenceRadius;
            const displacementMag = 0.22 * strength * strength;
            scratchTargetPos.addScaledVector(scratchNodeToCursor, displacementMag / d);
          }
        }

        currentPos.lerp(scratchTargetPos, nodeLerpFactor);

        if (i < hubCount) {
          const isHighlighted = activeHubIndexRef.current === i;
          const targetScale = isHighlighted ? 1.32 : 1.0;
          hubScaleBoost[i] += (targetScale - hubScaleBoost[i]) * nodeLerpFactor;
          dummy.position.copy(currentPos);
          dummy.scale.setScalar(baseNode.radius * hubScaleBoost[i]);
          dummy.updateMatrix();
          hubMesh.setMatrixAt(i, dummy.matrix);
        } else {
          dummy.position.copy(currentPos);
          dummy.scale.setScalar(baseNode.radius);
          dummy.updateMatrix();
          regularMesh.setMatrixAt(i - hubCount, dummy.matrix);
        }
      }
      hubMesh.instanceMatrix.needsUpdate = true;
      regularMesh.instanceMatrix.needsUpdate = true;

      // 2. Sync dynamic route LineSegments vertices with live displaced node positions
      const posArr = routePosAttr.array as Float32Array;
      for (let i = 0; i < NETWORK_ROUTES.length; i++) {
        const route = NETWORK_ROUTES[i];
        const pA = currentPositions[route.startIndex];
        const pB = currentPositions[route.endIndex];
        const offset = i * 6;
        posArr[offset] = pA.x;
        posArr[offset + 1] = pA.y;
        posArr[offset + 2] = pA.z;
        posArr[offset + 3] = pB.x;
        posArr[offset + 4] = pB.y;
        posArr[offset + 5] = pB.z;
      }
      routePosAttr.needsUpdate = true;

      // 3. Update packets along live displaced routes
      const packetAttr = packetGeometry.getAttribute('aAlpha') as THREE.InstancedBufferAttribute;
      for (let i = 0; i < totalPacketCount; i++) {
        const p = packets[i];
        if (!p.active) {
          dummy.position.set(0, 0, -999);
          dummy.scale.setScalar(0.0001);
          dummy.updateMatrix();
          packetMesh.setMatrixAt(i, dummy.matrix);
          packetAttr.setX(i, 0);
          continue;
        }

        p.progress += p.speed * frameScale;
        const route = NETWORK_ROUTES[p.routeIndex];
        const fromIdx = p.reverse ? route.endIndex : route.startIndex;
        const toIdx = p.reverse ? route.startIndex : route.endIndex;

        if (p.progress >= 1.0) {
          triggerEchoAtNode(toIdx, now, p.isBurst ? 1.2 : 0.85);
          if (p.isBurst) {
            p.active = false;
            dummy.scale.setScalar(0.0001);
            dummy.updateMatrix();
            packetMesh.setMatrixAt(i, dummy.matrix);
            packetAttr.setX(i, 0);
            continue;
          }
          p.progress = 0.0;
        }

        const pStart = currentPositions[fromIdx];
        const pEnd = currentPositions[toIdx];
        const x = THREE.MathUtils.lerp(pStart.x, pEnd.x, p.progress);
        const y = THREE.MathUtils.lerp(pStart.y, pEnd.y, p.progress);
        const z = THREE.MathUtils.lerp(pStart.z, pEnd.z, p.progress);

        dummy.position.set(x, y, z);
        dummy.scale.setScalar(p.isBurst ? 1.45 : 1.0);
        dummy.updateMatrix();
        packetMesh.setMatrixAt(i, dummy.matrix);

        const packetSpatialAlpha = calculateSpatialAlpha(x);
        packetAttr.setX(i, packetSpatialAlpha * (p.isBurst ? 1.0 : 0.92) * globalAlpha);
      }
      packetMesh.instanceMatrix.needsUpdate = true;
      packetAttr.needsUpdate = true;

      // 4. Update pulse halos anchored to live displaced Tier-1 hub positions
      const haloAttr = haloGeometry.getAttribute('aAlpha') as THREE.InstancedBufferAttribute;
      for (let i = 0; i < pulses.length; i++) {
        const pulse = pulses[i];
        pulse.progress += pulse.speed * frameScale;
        if (pulse.progress >= 1.0) {
          pulse.progress = 0.0;
        }
        const hubPos = currentPositions[pulse.hubIndex];
        const hubBase = NODES[pulse.hubIndex];
        const isHighlighted = activeHubIndexRef.current === pulse.hubIndex;
        dummy.position.copy(hubPos);
        const scale = (1.0 + pulse.progress * 1.9) * (isHighlighted ? 1.2 : 1.0);
        dummy.scale.set(scale, scale, 1.0);
        dummy.updateMatrix();
        haloMesh.setMatrixAt(i, dummy.matrix);

        const fade = Math.sin((1.0 - pulse.progress) * Math.PI * 0.5);
        haloAttr.setX(i, fade * (isHighlighted ? 0.72 : 0.48) * hubBase.alpha * globalAlpha);
      }
      haloMesh.instanceMatrix.needsUpdate = true;
      haloAttr.needsUpdate = true;

      // 5. Update echoes anchored to live displaced node coordinates
      const echoAttr = echoGeometry.getAttribute('aAlpha') as THREE.InstancedBufferAttribute;
      let echoInstanceIdx = 0;

      for (let i = 0; i < echoPoolSize; i++) {
        const echo = echoes[i];
        if (echo.active) {
          const elapsed = now - echo.startTime;
          let allDone = true;
          const livePos = currentPositions[echo.nodeIndex];

          for (let phase = 0; phase < 3; phase++) {
            const phaseElapsed = elapsed - phase * 115;
            let alpha = 0;
            let scale = 0.0001;

            if (phaseElapsed > 0 && phaseElapsed < 650) {
              allDone = false;
              const progress = phaseElapsed / 650;
              scale = 1.0 + progress * (1.8 * echo.intensity);
              alpha = (1.0 - progress) * Math.min(1.0, echo.intensity * 0.85) * globalAlpha;
            } else if (phaseElapsed <= 0) {
              allDone = false;
            }

            dummy.position.copy(livePos);
            dummy.scale.setScalar(scale);
            dummy.updateMatrix();
            echoMesh.setMatrixAt(echoInstanceIdx, dummy.matrix);
            echoAttr.setX(echoInstanceIdx, alpha);
            echoInstanceIdx++;
          }

          if (allDone && elapsed > 950) {
            echo.active = false;
          }
        } else {
          for (let phase = 0; phase < 3; phase++) {
            dummy.scale.setScalar(0.0001);
            dummy.updateMatrix();
            echoMesh.setMatrixAt(echoInstanceIdx, dummy.matrix);
            echoAttr.setX(echoInstanceIdx, 0);
            echoInstanceIdx++;
          }
        }
      }
      echoMesh.instanceMatrix.needsUpdate = true;
      echoAttr.needsUpdate = true;

      // 6. Project Tier-1 Hubs to 2D & position Live Node Telemetry Pill directly (zero React churn)
      projectHubsTo2D();

      let nextActiveHub: number | null = null;
      if (lockedHubIndex !== null && now < lockedHubUntil) {
        nextActiveHub = lockedHubIndex;
      } else {
        lockedHubIndex = null;
        if (isMouseActive) {
          nextActiveHub = findNearestHubIn2D(
            pointerLocalX,
            pointerLocalY,
            viewportWidth < 768 ? 115 : 145
          );
        }
      }

      if (nextActiveHub !== activeHubIndexRef.current) {
        activeHubIndexRef.current = nextActiveHub;
        setActiveHubIndex(nextActiveHub);
      }

      if (burstFlashUntilRef.current > 0 && now >= burstFlashUntilRef.current) {
        burstFlashUntilRef.current = 0;
        setBurstPulseActive(false);
      }

      const pillEl = pillRef.current;
      if (pillEl && nextActiveHub !== null) {
        const sx = hubScreenX[nextActiveHub];
        const sy = hubScreenY[nextActiveHub];
        const pillWidth = pillEl.offsetWidth || 260;
        const pillHeight = pillEl.offsetHeight || 54;
        const clampedX = THREE.MathUtils.clamp(
          sx - pillWidth * 0.5,
          16,
          Math.max(16, viewportWidth - pillWidth - 16)
        );
        const preferredY = sy - pillHeight - 22;
        const clampedY =
          preferredY < 86
            ? THREE.MathUtils.clamp(sy + 24, 86, Math.max(86, viewportHeight - pillHeight - 64))
            : THREE.MathUtils.clamp(preferredY, 86, Math.max(86, viewportHeight - pillHeight - 64));

        pillEl.style.transform = `translate3d(${clampedX.toFixed(1)}px, ${clampedY.toFixed(1)}px, 0)`;
      }
    };

    const tick = (now: number) => {
      const rawDt = lastFrameTime > 0 ? (now - lastFrameTime) / 1000 : 1 / 60;
      lastFrameTime = now;
      const dt = Math.min(Math.max(rawDt, 0.001), 0.1);
      updateScene(dt, now);
      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(tick);
    };

    const startAnimationLoop = () => {
      if (animationFrameId !== null) return;
      if (!isIntersecting || !isTabVisible || isReducedMotionRef.current) {
        renderStaticFrame();
        return;
      }
      lastFrameTime = 0;
      animationFrameId = requestAnimationFrame(tick);
    };

    const stopAnimationLoop = () => {
      if (animationFrameId !== null) {
        cancelAnimationFrame(animationFrameId);
        animationFrameId = null;
      }
    };

    const handleVisibilityChange = () => {
      isTabVisible = !document.hidden;
      if (document.hidden) {
        stopAnimationLoop();
      } else if (isIntersecting && !isReducedMotionRef.current) {
        startAnimationLoop();
      } else if (isIntersecting) {
        renderStaticFrame();
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    const handleMotionPreferenceChange = (e: MediaQueryListEvent) => {
      isReducedMotionRef.current = e.matches;
      if (e.matches) {
        stopAnimationLoop();
        renderStaticFrame();
      } else if (isIntersecting && isTabVisible) {
        startAnimationLoop();
      }
    };
    motionQuery.addEventListener('change', handleMotionPreferenceChange);

    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width: newWidth, height: newHeight } = entry.contentRect;
        if (newWidth === 0 || newHeight === 0) return;
        viewportWidth = newWidth;
        viewportHeight = newHeight;
        camera.aspect = newWidth / newHeight;
        camera.updateProjectionMatrix();
        renderer.setPixelRatio(computeDpr(newWidth));
        renderer.setSize(newWidth, newHeight);
        updateResponsiveLayout(newWidth);
        if (isReducedMotionRef.current || !isIntersecting || !isTabVisible) {
          renderStaticFrame();
        }
      }
    });
    resizeObserver.observe(container);

    const intersectionObserver = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        isIntersecting = entry.isIntersecting;
        if (entry.isIntersecting) {
          startAnimationLoop();
        } else {
          stopAnimationLoop();
        }
      },
      { threshold: 0.05 }
    );
    intersectionObserver.observe(container);

    renderStaticFrame();

    return () => {
      stopAnimationLoop();
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerleave', handlePointerLeave);
      window.removeEventListener('pointerdown', handlePointerDown);
      window.removeEventListener('scroll', handleScroll);
      motionQuery.removeEventListener('change', handleMotionPreferenceChange);

      scene.traverse((object) => {
        if (
          object instanceof THREE.Mesh ||
          object instanceof THREE.LineSegments ||
          object instanceof THREE.Points
        ) {
          if (object.geometry) {
            object.geometry.dispose();
          }
          if (object.material) {
            if (Array.isArray(object.material)) {
              object.material.forEach((m) => m.dispose());
            } else {
              object.material.dispose();
            }
          }
        }
      });

      while (scene.children.length > 0) {
        scene.remove(scene.children[0]);
      }

      renderer.dispose();
      renderer.forceContextLoss();

      const gl = renderer.getContext();
      if (gl) {
        const loseContextExt = gl.getExtension('WEBGL_lose_context');
        if (loseContextExt) {
          loseContextExt.loseContext();
        }
      }

      if (renderer.domElement && renderer.domElement.parentNode) {
        renderer.domElement.parentNode.removeChild(renderer.domElement);
      }
    };
  }, []);

  const activeHub = activeHubIndex !== null ? TIER1_HUB_METADATA[activeHubIndex] : null;

  return (
    <div
      ref={wrapperRef}
      className={`${styles.canvasWrapper} ${className || ''}`}
      aria-hidden="true"
    >
      {/* Masked WebGL Scene */}
      <div ref={webglHostRef} className={styles.webglLayer} />

      {/* Unmasked Telemetry Overlay (strictly pointer-events: none) */}
      <div className={styles.telemetryOverlay}>
        <div
          ref={pillRef}
          className={`${styles.telemetryPill} ${activeHub ? styles.telemetryPillVisible : ''} ${
            burstPulseActive ? styles.telemetryPillBurst : ''
          }`}
        >
          {activeHub && (
            <>
              <div className={styles.pillHeader}>
                <span className={styles.pillDot} />
                <span className={`${styles.pillCode} font-mono`}>{activeHub.code}</span>
                <span className={styles.pillTitle}>{activeHub.label}</span>
                {burstPulseActive && (
                  <span className={`${styles.burstTag} font-mono`}>SYNC</span>
                )}
              </div>
              <div className={`${styles.pillMeta} font-mono`}>{activeHub.telemetry}</div>
            </>
          )}
        </div>

        <div className={`${styles.hudCue} font-mono`}>
          <span className={styles.hudCueDot} />
          <span>Live Supply Chain Twin · Hover or click hubs</span>
        </div>
      </div>
    </div>
  );
}
