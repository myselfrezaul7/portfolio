'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { useTheme } from '@/contexts/ThemeContext';
import styles from './SupplyChainCanvas.module.css';

interface SupplyChainCanvasProps {
    className?: string;
}

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
    start: THREE.Vector3;
    end: THREE.Vector3;
    alphaStart: number;
    alphaEnd: number;
}

interface PacketData {
    routeIndex: number;
    progress: number;
    speed: number;
}

interface PulseRingData {
    hubIndex: number;
    progress: number;
    speed: number;
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
    haloColor: new THREE.Color(0x4a9b9b),
    globalRouteOpacity: 0.55,
    globalNodeOpacity: 0.90,
});

const getLightPalette = (): PaletteColors => ({
    nodeColor: new THREE.Color(0x0f766e),
    nodeCoreColor: new THREE.Color(0x1e7b78),
    hubColor: new THREE.Color(0x042f2e),
    routeColor: new THREE.Color(0x1e7b78),
    packetColor: new THREE.Color(0x0f4c4a),
    haloColor: new THREE.Color(0x1e7b78),
    globalRouteOpacity: 0.40,
    globalNodeOpacity: 0.85,
});

function calculateSpatialAlpha(x: number): number {
    const factor = (x + 3.0) / 5.5;
    return THREE.MathUtils.clamp(factor, 0.08, 0.95);
}

const BASE_NODES_CONFIG = [
    // Tier 1: Major Global Logistics Hubs
    { x: 1.8, y: 0.8, z: 0.3, tier: 1, radius: 0.13 },
    { x: 2.9, y: -0.5, z: -0.2, tier: 1, radius: 0.14 },
    { x: 1.1, y: -1.2, z: 0.4, tier: 1, radius: 0.12 },
    { x: 2.5, y: 1.5, z: -0.4, tier: 1, radius: 0.13 },
    { x: -0.7, y: 0.4, z: 0.1, tier: 1, radius: 0.11 },

    // Tier 2: Regional Distribution Centers
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

    // Tier 3: Edge Facilities and Sensor Data Streams
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
            start: new THREE.Vector3(nodes[i].x, nodes[i].y, nodes[i].z),
            end: new THREE.Vector3(nodes[j].x, nodes[j].y, nodes[j].z),
            alphaStart: nodes[i].alpha,
            alphaEnd: nodes[j].alpha,
        });
    };

    // Primary backbone routes between Tier 1 Hubs
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

    // Connect Tier 2 Regional Centers to hubs and neighbors
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

    // Connect Tier 3 Edge Nodes to closest distribution centers
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

function createPackets(routeCount: number, packetCount: number): PacketData[] {
    const packets: PacketData[] = [];
    for (let i = 0; i < packetCount; i++) {
        packets.push({
            routeIndex: i % routeCount,
            progress: i / packetCount,
            speed: 0.003 + (i % 5) * 0.001,
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

export default function SupplyChainCanvas({ className }: SupplyChainCanvasProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const { theme } = useTheme();

    const targetPaletteRef = useRef<PaletteColors>(
        theme === 'light' ? getLightPalette() : getDarkPalette()
    );
    const isReducedMotionRef = useRef(false);
    const renderStaticFrameRef = useRef<(() => void) | null>(null);

    // Keep target palette synced when theme changes without resetting WebGL
    useEffect(() => {
        targetPaletteRef.current = theme === 'light' ? getLightPalette() : getDarkPalette();
        if (isReducedMotionRef.current && renderStaticFrameRef.current) {
            renderStaticFrameRef.current();
        }
    }, [theme]);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        // Clean any existing canvas elements
        while (container.firstChild) {
            container.removeChild(container.firstChild);
        }

        const width = container.clientWidth || 800;
        const height = container.clientHeight || 600;

        // 1. Scene, Camera, Renderer initialization
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
        camera.position.set(0, 0, 7.8);
        camera.lookAt(0, 0, 0);

        const renderer = new THREE.WebGLRenderer({
            antialias: true,
            alpha: true,
            powerPreference: 'high-performance',
        });
        const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
        renderer.setPixelRatio(dpr);
        renderer.setSize(width, height);
        renderer.domElement.className = styles.webglCanvas;
        renderer.domElement.style.pointerEvents = 'none';
        container.appendChild(renderer.domElement);

        // Palettes for smooth color interpolation
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
        updateResponsiveLayout(width);

        // 2. Network Routes (LineSegments with vertex alpha)
        const routePositions: number[] = [];
        const routeAlphas: number[] = [];
        for (const route of NETWORK_ROUTES) {
            routePositions.push(route.start.x, route.start.y, route.start.z);
            routePositions.push(route.end.x, route.end.y, route.end.z);
            routeAlphas.push(route.alphaStart);
            routeAlphas.push(route.alphaEnd);
        }

        const routeGeometry = new THREE.BufferGeometry();
        routeGeometry.setAttribute('position', new THREE.Float32BufferAttribute(routePositions, 3));
        routeGeometry.setAttribute('aAlpha', new THREE.Float32BufferAttribute(routeAlphas, 1));

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

        // 3a. Tier 1 Hub Mesh
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
                    vec3 col = mix(uColor, uCoreColor, diff * 0.7);
                    gl_FragColor = vec4(col, vAlpha * uOpacity);
                }
            `,
            transparent: true,
            depthWrite: false,
        });

        const hubMesh = new THREE.InstancedMesh(hubGeometry, hubMaterial, hubCount);
        for (let i = 0; i < hubCount; i++) {
            dummy.position.set(NODES[i].x, NODES[i].y, NODES[i].z);
            dummy.scale.setScalar(NODES[i].radius);
            dummy.updateMatrix();
            hubMesh.setMatrixAt(i, dummy.matrix);
        }
        hubMesh.instanceMatrix.needsUpdate = true;
        sceneGroup.add(hubMesh);

        // 3b. Tier 2 and Tier 3 Nodes Mesh
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

        // 4. Data Packets traveling along network routes
        const packetCount = 20;
        const packets = createPackets(NETWORK_ROUTES.length, packetCount);
        const packetGeometry = new THREE.SphereGeometry(0.045, 12, 12);
        const packetAlphas = new Float32Array(packetCount);
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

        const packetMesh = new THREE.InstancedMesh(packetGeometry, packetMaterial, packetCount);
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

        // Motion and mouse tracking
        let baseRotation = 0;
        let targetMouseX = 0;
        let targetMouseY = 0;
        let currentMouseX = 0;
        let currentMouseY = 0;

        const handlePointerMove = (event: PointerEvent) => {
            targetMouseX = (event.clientX / window.innerWidth) * 2 - 1;
            targetMouseY = -(event.clientY / window.innerHeight) * 2 + 1;
        };
        window.addEventListener('pointermove', handlePointerMove, { passive: true });

        // Reduced motion check
        const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
        isReducedMotionRef.current = motionQuery.matches;

        // Static single render function for pause or reduced motion states
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

            renderer.render(scene, camera);
        };
        renderStaticFrameRef.current = renderStaticFrame;

        // Render loop control
        let animationFrameId: number | null = null;
        let isIntersecting = false;
        let isTabVisible = !document.hidden;

        const updateScene = () => {
            const target = targetPaletteRef.current;
            const lerpFactor = 0.05;

            // Interpolate theme colors smoothly frame by frame
            currentPalette.nodeColor.lerp(target.nodeColor, lerpFactor);
            currentPalette.nodeCoreColor.lerp(target.nodeCoreColor, lerpFactor);
            currentPalette.hubColor.lerp(target.hubColor, lerpFactor);
            currentPalette.routeColor.lerp(target.routeColor, lerpFactor);
            currentPalette.packetColor.lerp(target.packetColor, lerpFactor);
            currentPalette.haloColor.lerp(target.haloColor, lerpFactor);
            currentPalette.globalRouteOpacity += (target.globalRouteOpacity - currentPalette.globalRouteOpacity) * lerpFactor;
            currentPalette.globalNodeOpacity += (target.globalNodeOpacity - currentPalette.globalNodeOpacity) * lerpFactor;

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

            // Update packets
            const packetAttr = packetGeometry.getAttribute('aAlpha') as THREE.InstancedBufferAttribute;
            for (let i = 0; i < packets.length; i++) {
                const p = packets[i];
                p.progress += p.speed;
                if (p.progress >= 1.0) {
                    p.progress = 0.0;
                }
                const route = NETWORK_ROUTES[p.routeIndex];
                const x = THREE.MathUtils.lerp(route.start.x, route.end.x, p.progress);
                const y = THREE.MathUtils.lerp(route.start.y, route.end.y, p.progress);
                const z = THREE.MathUtils.lerp(route.start.z, route.end.z, p.progress);

                dummy.position.set(x, y, z);
                dummy.scale.setScalar(1.0);
                dummy.updateMatrix();
                packetMesh.setMatrixAt(i, dummy.matrix);

                const packetSpatialAlpha = calculateSpatialAlpha(x);
                packetAttr.setX(i, packetSpatialAlpha * 0.95);
            }
            packetMesh.instanceMatrix.needsUpdate = true;
            packetAttr.needsUpdate = true;

            // Update pulse halos for major hubs
            const haloAttr = haloGeometry.getAttribute('aAlpha') as THREE.InstancedBufferAttribute;
            for (let i = 0; i < pulses.length; i++) {
                const pulse = pulses[i];
                pulse.progress += pulse.speed;
                if (pulse.progress >= 1.0) {
                    pulse.progress = 0.0;
                }
                const hub = NODES[pulse.hubIndex];
                dummy.position.set(hub.x, hub.y, hub.z);
                const scale = 1.0 + pulse.progress * 1.8;
                dummy.scale.set(scale, scale, 1.0);
                dummy.updateMatrix();
                haloMesh.setMatrixAt(i, dummy.matrix);

                const fade = Math.sin((1.0 - pulse.progress) * Math.PI * 0.5);
                haloAttr.setX(i, fade * 0.5 * hub.alpha);
            }
            haloMesh.instanceMatrix.needsUpdate = true;
            haloAttr.needsUpdate = true;

            // Subtle rotation and mouse parallax
            baseRotation += 0.0008;
            currentMouseX += (targetMouseX - currentMouseX) * 0.04;
            currentMouseY += (targetMouseY - currentMouseY) * 0.04;

            sceneGroup.rotation.y = baseRotation + currentMouseX * 0.12;
            sceneGroup.rotation.x = currentMouseY * 0.08;
        };

        const tick = () => {
            updateScene();
            renderer.render(scene, camera);
            animationFrameId = requestAnimationFrame(tick);
        };

        const startAnimationLoop = () => {
            if (animationFrameId !== null) return;
            if (!isIntersecting || !isTabVisible || isReducedMotionRef.current) {
                renderStaticFrame();
                return;
            }
            animationFrameId = requestAnimationFrame(tick);
        };

        const stopAnimationLoop = () => {
            if (animationFrameId !== null) {
                cancelAnimationFrame(animationFrameId);
                animationFrameId = null;
            }
        };

        // Visibility listener
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

        // Motion preference listener
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

        // ResizeObserver
        const resizeObserver = new ResizeObserver((entries) => {
            for (const entry of entries) {
                const { width: newWidth, height: newHeight } = entry.contentRect;
                if (newWidth === 0 || newHeight === 0) return;
                camera.aspect = newWidth / newHeight;
                camera.updateProjectionMatrix();
                renderer.setSize(newWidth, newHeight);
                updateResponsiveLayout(newWidth);
                if (isReducedMotionRef.current || !isIntersecting || !isTabVisible) {
                    renderStaticFrame();
                }
            }
        });
        resizeObserver.observe(container);

        // IntersectionObserver to pause loop when offscreen
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

        // Initial frame render
        renderStaticFrame();

        // Strict WebGL cleanup on unmount
        return () => {
            stopAnimationLoop();
            resizeObserver.disconnect();
            intersectionObserver.disconnect();
            document.removeEventListener('visibilitychange', handleVisibilityChange);
            window.removeEventListener('pointermove', handlePointerMove);
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

    return (
        <div
            ref={containerRef}
            className={`${styles.canvasContainer} ${className || ''}`}
            aria-hidden="true"
        />
    );
}
