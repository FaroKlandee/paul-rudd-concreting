"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Box, Maximize2, Minimize2, RotateCcw } from "lucide-react"
import { useEffect, useRef, useState } from "react"
import * as THREE from "three"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js"

interface ModelViewerProps {
    modelType: "countertop" | "driveway" | "stamped"
    title: string
    description: string
}

export function ModelViewer({ modelType, title, description }: ModelViewerProps) {
    const containerRef = useRef<HTMLDivElement>(null)
    const rendererRef = useRef<THREE.WebGLRenderer | null>(null)
    const sceneRef = useRef<THREE.Scene | null>(null)
    const cameraRef = useRef<THREE.PerspectiveCamera | null>(null)
    const controlsRef = useRef<OrbitControls | null>(null)
    const [isFullscreen, setIsFullscreen] = useState(false)

    // Initialize Three.js scene
    useEffect(() => {
        if (!containerRef.current) return

        // Create scene
        const scene = new THREE.Scene()
        scene.background = new THREE.Color(0xf5f5f5)
        sceneRef.current = scene

        // Create camera
        const camera = new THREE.PerspectiveCamera(
            45,
            containerRef.current.clientWidth / containerRef.current.clientHeight,
            0.1,
            1000
        )
        camera.position.set(5, 5, 5)
        cameraRef.current = camera

        // Create renderer
        const renderer = new THREE.WebGLRenderer({ antialias: true })
        renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight)
        renderer.shadowMap.enabled = true
        containerRef.current.appendChild(renderer.domElement)
        rendererRef.current = renderer

        // Add controls
        const controls = new OrbitControls(camera, renderer.domElement)
        controls.enableDamping = true
        controls.dampingFactor = 0.05
        controlsRef.current = controls

        // Add lights
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
        scene.add(ambientLight)

        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8)
        directionalLight.position.set(5, 10, 5)
        directionalLight.castShadow = true
        scene.add(directionalLight)

        // Create model based on type
        createModel(modelType, scene)

        // Animation loop
        const animate = () => {
            requestAnimationFrame(animate)
            controls.update()
            renderer.render(scene, camera)
        }
        animate()

        // Handle resize
        const handleResize = () => {
            if (!containerRef.current || !cameraRef.current || !rendererRef.current) return

            const width = containerRef.current.clientWidth
            const height = containerRef.current.clientHeight

            cameraRef.current.aspect = width / height
            cameraRef.current.updateProjectionMatrix()

            rendererRef.current.setSize(width, height)
        }

        window.addEventListener('resize', handleResize)

        // Cleanup
        return () => {
            window.removeEventListener('resize', handleResize)

            if (containerRef.current && rendererRef.current) {
                containerRef.current.removeChild(rendererRef.current.domElement)
            }

            rendererRef.current?.dispose()
        }
    }, [modelType])

    // Create model based on type
    const createModel = (type: string, scene: THREE.Scene) => {
        // Clear existing model
        scene.children = scene.children.filter((child: THREE.Object3D) =>
            child instanceof THREE.Light || child instanceof THREE.AmbientLight
        )

        // Add ground plane
        const groundGeometry = new THREE.PlaneGeometry(10, 10)
        const groundMaterial = new THREE.MeshStandardMaterial({
            color: 0xcccccc,
            roughness: 0.8,
            metalness: 0.2
        })
        const ground = new THREE.Mesh(groundGeometry, groundMaterial)
        ground.rotation.x = -Math.PI / 2
        ground.receiveShadow = true
        scene.add(ground)

        // Create model based on type
        switch (type) {
            case "countertop":
                createCountertopModel(scene)
                break
            case "driveway":
                createDrivewayModel(scene)
                break
            case "stamped":
                createStampedConcreteModel(scene)
                break
        }
    }

    // Create countertop model
    const createCountertopModel = (scene: THREE.Scene) => {
        // Base cabinet
        const cabinetGeometry = new THREE.BoxGeometry(4, 2.5, 2)
        const cabinetMaterial = new THREE.MeshStandardMaterial({
            color: 0x5c4033,
            roughness: 0.7,
            metalness: 0.2
        })
        const cabinet = new THREE.Mesh(cabinetGeometry, cabinetMaterial)
        cabinet.position.y = 1.25
        cabinet.castShadow = true
        cabinet.receiveShadow = true
        scene.add(cabinet)

        // Countertop
        const countertopGeometry = new THREE.BoxGeometry(4.4, 0.1, 2.4)
        const countertopMaterial = new THREE.MeshStandardMaterial({
            color: 0xd3d3d3,
            roughness: 0.3,
            metalness: 0.6
        })
        const countertop = new THREE.Mesh(countertopGeometry, countertopMaterial)
        countertop.position.y = 2.55
        countertop.castShadow = true
        countertop.receiveShadow = true
        scene.add(countertop)

        // Sink
        const sinkGeometry = new THREE.BoxGeometry(1.5, 0.5, 1.2)
        const sinkMaterial = new THREE.MeshStandardMaterial({
            color: 0xc0c0c0,
            roughness: 0.1,
            metalness: 0.9
        })
        const sink = new THREE.Mesh(sinkGeometry, sinkMaterial)
        sink.position.set(0, 2.3, 0)
        scene.add(sink)

        // Faucet
        const faucetBaseGeometry = new THREE.CylinderGeometry(0.05, 0.05, 0.3, 16)
        const faucetMaterial = new THREE.MeshStandardMaterial({
            color: 0xc0c0c0,
            roughness: 0.1,
            metalness: 0.9
        })
        const faucetBase = new THREE.Mesh(faucetBaseGeometry, faucetMaterial)
        faucetBase.position.set(0, 2.7, -0.5)
        scene.add(faucetBase)

        const faucetArmGeometry = new THREE.CylinderGeometry(0.03, 0.03, 0.8, 16)
        const faucetArm = new THREE.Mesh(faucetArmGeometry, faucetMaterial)
        faucetArm.rotation.x = Math.PI / 2
        faucetArm.position.set(0, 2.85, -0.1)
        scene.add(faucetArm)
    }

    // Create driveway model
    const createDrivewayModel = (scene: THREE.Scene) => {
        // Ground
        scene.children = scene.children.filter((child: THREE.Object3D) =>
            child instanceof THREE.Light || child instanceof THREE.AmbientLight
        )

        // Terrain
        const terrainGeometry = new THREE.PlaneGeometry(10, 10, 20, 20)
        const terrainMaterial = new THREE.MeshStandardMaterial({
            color: 0x7cfc00,
            roughness: 0.8,
            metalness: 0.1
        })

        // Add some random elevation to the terrain
        const vertices = terrainGeometry.attributes.position.array
        for (let i = 0; i < vertices.length; i += 3) {
            // Skip the center area where the driveway will be
            const x = vertices[i]
            const z = vertices[i + 2]

            if (Math.abs(x) > 1.5 || z < -1) {
                vertices[i + 1] = Math.random() * 0.3
            }
        }

        const terrain = new THREE.Mesh(terrainGeometry, terrainMaterial)
        terrain.rotation.x = -Math.PI / 2
        terrain.receiveShadow = true
        scene.add(terrain)

        // Driveway
        const drivewayGeometry = new THREE.PlaneGeometry(3, 8)
        const drivewayMaterial = new THREE.MeshStandardMaterial({
            color: 0xaaaaaa,
            roughness: 0.7,
            metalness: 0.2
        })
        const driveway = new THREE.Mesh(drivewayGeometry, drivewayMaterial)
        driveway.rotation.x = -Math.PI / 2
        driveway.position.set(0, 0.01, 1)
        driveway.receiveShadow = true
        scene.add(driveway)

        // House (simple box)
        const houseGeometry = new THREE.BoxGeometry(4, 2.5, 3)
        const houseMaterial = new THREE.MeshStandardMaterial({
            color: 0xf5deb3,
            roughness: 0.7,
            metalness: 0.1
        })
        const house = new THREE.Mesh(houseGeometry, houseMaterial)
        house.position.set(0, 1.25, -3)
        house.castShadow = true
        house.receiveShadow = true
        scene.add(house)

        // Roof
        const roofGeometry = new THREE.ConeGeometry(3, 1.5, 4)
        const roofMaterial = new THREE.MeshStandardMaterial({
            color: 0x8b4513,
            roughness: 0.7,
            metalness: 0.1
        })
        const roof = new THREE.Mesh(roofGeometry, roofMaterial)
        roof.position.set(0, 3, -3)
        roof.rotation.y = Math.PI / 4
        roof.castShadow = true
        scene.add(roof)

        // Garage door
        const garageGeometry = new THREE.PlaneGeometry(2, 1.8)
        const garageMaterial = new THREE.MeshStandardMaterial({
            color: 0xffffff,
            roughness: 0.5,
            metalness: 0.3
        })
        const garage = new THREE.Mesh(garageGeometry, garageMaterial)
        garage.position.set(0, 0.9, -1.51)
        garage.receiveShadow = true
        scene.add(garage)
    }

    // Create stamped concrete model
    const createStampedConcreteModel = (scene: THREE.Scene) => {
        // Ground
        scene.children = scene.children.filter((child: THREE.Object3D) =>
            child instanceof THREE.Light || child instanceof THREE.AmbientLight
        )

        // Create a textured patio area
        const textureLoader = new THREE.TextureLoader()

        // Create a procedural texture for stamped concrete
        const canvas = document.createElement('canvas')
        canvas.width = 512
        canvas.height = 512
        const context = canvas.getContext('2d')

        if (context) {
            // Base color
            context.fillStyle = '#a88'
            context.fillRect(0, 0, canvas.width, canvas.height)

            // Create stone pattern
            const stoneCount = 100
            for (let i = 0; i < stoneCount; i++) {
                const x = Math.random() * canvas.width
                const y = Math.random() * canvas.height
                const size = 20 + Math.random() * 40

                context.beginPath()
                context.moveTo(x, y)

                // Create irregular polygon
                const points = 5 + Math.floor(Math.random() * 3)
                for (let j = 0; j < points; j++) {
                    const angle = (j / points) * Math.PI * 2
                    const distance = size * (0.7 + Math.random() * 0.3)
                    const px = x + Math.cos(angle) * distance
                    const py = y + Math.sin(angle) * distance
                    context.lineTo(px, py)
                }

                context.closePath()

                // Fill with slightly varied color
                const colorVariation = Math.floor(Math.random() * 30)
                context.fillStyle = `rgb(${150 + colorVariation}, ${130 + colorVariation}, ${110 + colorVariation})`
                context.fill()

                // Add grout lines
                context.strokeStyle = '#555'
                context.lineWidth = 2
                context.stroke()
            }
        }

        const concreteTexture = new THREE.CanvasTexture(canvas)
        concreteTexture.wrapS = THREE.RepeatWrapping
        concreteTexture.wrapT = THREE.RepeatWrapping
        concreteTexture.repeat.set(2, 2)

        // Create bump map from the same texture
        const bumpTexture = concreteTexture.clone()

        // Create patio
        const patioGeometry = new THREE.CircleGeometry(4, 32)
        const patioMaterial = new THREE.MeshStandardMaterial({
            map: concreteTexture,
            bumpMap: bumpTexture,
            bumpScale: 0.05,
            roughness: 0.8,
            metalness: 0.2
        })
        const patio = new THREE.Mesh(patioGeometry, patioMaterial)
        patio.rotation.x = -Math.PI / 2
        patio.receiveShadow = true
        scene.add(patio)

        // Add some furniture

        // Table
        const tableTopGeometry = new THREE.CylinderGeometry(1, 1, 0.1, 16)
        const tableMaterial = new THREE.MeshStandardMaterial({
            color: 0x8b4513,
            roughness: 0.7,
            metalness: 0.2
        })
        const tableTop = new THREE.Mesh(tableTopGeometry, tableMaterial)
        tableTop.position.set(0, 0.75, 0)
        tableTop.castShadow = true
        scene.add(tableTop)

        const tableLegGeometry = new THREE.CylinderGeometry(0.1, 0.1, 0.7, 8)
        const tableLeg = new THREE.Mesh(tableLegGeometry, tableMaterial)
        tableLeg.position.set(0, 0.35, 0)
        tableLeg.castShadow = true
        scene.add(tableLeg)

        // Chairs (simplified as cylinders)
        const chairPositions = [
            [1.5, 0, 0],
            [-1.5, 0, 0],
            [0, 0, 1.5],
            [0, 0, -1.5]
        ]

        chairPositions.forEach(position => {
            const chairGeometry = new THREE.CylinderGeometry(0.4, 0.3, 0.1, 16)
            const chairMaterial = new THREE.MeshStandardMaterial({
                color: 0x666666,
                roughness: 0.8,
                metalness: 0.2
            })
            const chair = new THREE.Mesh(chairGeometry, chairMaterial)
            chair.position.set(position[0], 0.5, position[2])
            chair.castShadow = true
            scene.add(chair)

            const chairLegGeometry = new THREE.CylinderGeometry(0.05, 0.05, 0.5, 8)
            const chairLeg = new THREE.Mesh(chairLegGeometry, chairMaterial)
            chairLeg.position.set(position[0], 0.25, position[2])
            chairLeg.castShadow = true
            scene.add(chairLeg)
        })
    }

    // Handle fullscreen toggle
    const toggleFullscreen = () => {
        setIsFullscreen(!isFullscreen)

        // Need to update renderer size after DOM changes
        setTimeout(() => {
            if (!containerRef.current || !cameraRef.current || !rendererRef.current) return

            const width = containerRef.current.clientWidth
            const height = containerRef.current.clientHeight

            cameraRef.current.aspect = width / height
            cameraRef.current.updateProjectionMatrix()

            rendererRef.current.setSize(width, height)
        }, 100)
    }

    // Reset camera position
    const resetCamera = () => {
        if (!cameraRef.current || !controlsRef.current) return

        cameraRef.current.position.set(5, 5, 5)
        controlsRef.current.target.set(0, 0, 0)
        controlsRef.current.update()
    }

    return (
        <Card className={`${isFullscreen ? 'fixed inset-0 z-50 rounded-none' : ''}`}>
            <CardHeader className="relative">
                <div className="flex items-center gap-2">
                    <Box className="h-6 w-6 text-orange-500" />
                    <CardTitle>{title}</CardTitle>
                </div>
                <CardDescription>{description}</CardDescription>
                <div className="absolute top-4 right-4 flex gap-2">
                    <Button
                        variant="outline"
                        size="icon"
                        onClick={resetCamera}
                        className="h-8 w-8 p-0"
                        title="Reset view"
                    >
                        <RotateCcw className="h-4 w-4" />
                    </Button>
                    <Button
                        variant="outline"
                        size="icon"
                        onClick={toggleFullscreen}
                        className="h-8 w-8 p-0"
                        title={isFullscreen ? "Exit fullscreen" : "Fullscreen"}
                    >
                        {isFullscreen ? (
                            <Minimize2 className="h-4 w-4" />
                        ) : (
                            <Maximize2 className="h-4 w-4" />
                        )}
                    </Button>
                </div>
            </CardHeader>
            <CardContent className="p-0">
                <div
                    ref={containerRef}
                    className={`w-full ${isFullscreen ? 'h-[calc(100vh-80px)]' : 'h-[400px]'}`}
                ></div>
                <div className="p-4 bg-gray-50 dark:bg-gray-800 text-sm text-gray-500 dark:text-gray-400">
                    <p>Click and drag to rotate. Scroll to zoom. Right-click and drag to pan.</p>
                </div>
            </CardContent>
        </Card>
    )
}
