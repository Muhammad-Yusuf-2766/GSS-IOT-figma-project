import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { AlertCircle, RotateCcw } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { io } from 'socket.io-client'
import * as THREE from 'three'
const socket = io(`${import.meta.env.VITE_SERVER_BASE_URL}`) // Backend server manzilini o'zgartiring

// Define the type for angle data
interface AngleType {
	doorNum: number
	angle_x: number
	angle_y: number
}

// Use your actual socket implementation here
// This is just a placeholder to maintain the structure of your original code

export default function ScaffoldingView() {
	const [orientation, setOrientation] = useState<AngleType>({
		doorNum: 0,
		angle_x: 0,
		angle_y: 0,
	})

	const [isWarning, setIsWarning] = useState(false)
	const orientationRef = useRef<AngleType>(orientation)
	const mountRef = useRef<HTMLDivElement>(null)
	const platformRef = useRef<THREE.Mesh>()

	// Calculate warning status
	useEffect(() => {
		const isAngleExceeded =
			Math.abs(orientation.angle_x) > 30 || Math.abs(orientation.angle_y) > 30
		setIsWarning(isAngleExceeded)
	}, [orientation])

	// Subscribe to MQTT topic
	useEffect(() => {
		const topic = `mqtt/angle/0010`
		const handleAngleUpdate = (updatedAngle: AngleType) => {
			console.log('MPU-6500 sensor data:', updatedAngle)
			setOrientation(updatedAngle)
			orientationRef.current = updatedAngle
		}

		socket.on(topic, handleAngleUpdate)

		return () => {
			socket.off(topic, handleAngleUpdate) // to‘g‘ri usul: xuddi shu function reference bilan
		}
	}, [])

	// Initialize and update 3D scene
	useEffect(() => {
		if (!mountRef.current) return

		// Scene setup
		const scene = new THREE.Scene()
		scene.background = new THREE.Color(0xf5f5f5)

		// Camera setup
		const camera = new THREE.PerspectiveCamera(
			50,
			mountRef.current.clientWidth / mountRef.current.clientHeight,
			0.1,
			1000
		)
		camera.position.set(0, 0, 10)

		// Renderer setup
		const renderer = new THREE.WebGLRenderer({ antialias: true })
		renderer.setSize(
			mountRef.current.clientWidth,
			mountRef.current.clientHeight
		)
		renderer.shadowMap.enabled = true
		mountRef.current.appendChild(renderer.domElement)

		// Lighting
		const ambientLight = new THREE.AmbientLight(0xffffff, 0.6)
		scene.add(ambientLight)

		const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8)
		directionalLight.position.set(5, 10, 7)
		directionalLight.castShadow = true
		scene.add(directionalLight)

		// Create platform to visualize tilt
		const platformGeometry = new THREE.BoxGeometry(6, 0.2, 4)
		const platformMaterial = new THREE.MeshStandardMaterial({
			color: 0x4682b4,
			metalness: 0.2,
			roughness: 0.7,
		})
		const platform = new THREE.Mesh(platformGeometry, platformMaterial)
		platform.castShadow = true
		platform.receiveShadow = true
		scene.add(platform)
		platformRef.current = platform

		// Add grid for reference
		const gridHelper = new THREE.GridHelper(10, 10, 0x888888, 0xcccccc)
		gridHelper.position.y = -2
		scene.add(gridHelper)

		// Add axes indicators
		const axesHelper = new THREE.AxesHelper(3)
		axesHelper.position.set(-4, -1, -2)
		scene.add(axesHelper)

		// Add text labels for axes
		const createLabel = (
			text: string,
			position: THREE.Vector3,
			color: number
		) => {
			const canvas = document.createElement('canvas')
			canvas.width = 100
			canvas.height = 50
			const context = canvas.getContext('2d')
			if (context) {
				context.fillStyle = '#ffffff'
				context.fillRect(0, 0, canvas.width, canvas.height)
				context.font = 'Bold 20px Arial'
				context.fillStyle = `#${color.toString(16).padStart(6, '0')}`
				context.fillText(text, 10, 30)

				const texture = new THREE.CanvasTexture(canvas)
				const material = new THREE.MeshBasicMaterial({
					map: texture,
					transparent: true,
					side: THREE.DoubleSide,
				})
				const geometry = new THREE.PlaneGeometry(1, 0.5)
				const mesh = new THREE.Mesh(geometry, material)
				mesh.position.copy(position)
				scene.add(mesh)
			}
		}

		createLabel('X', new THREE.Vector3(-1.5, -1, -2), 0xff0000)
		createLabel('Y', new THREE.Vector3(-4, 0, -2), 0x00ff00)
		createLabel('Z', new THREE.Vector3(-4, -1, -0.5), 0x0000ff)

		// Add reference lines
		const lineMaterial = new THREE.LineBasicMaterial({
			color: 0x000000,
			linewidth: 2,
		})

		// Horizontal reference line
		const horizontalLineGeometry = new THREE.BufferGeometry().setFromPoints([
			new THREE.Vector3(-3, 0, 0),
			new THREE.Vector3(3, 0, 0),
		])
		const horizontalLine = new THREE.Line(horizontalLineGeometry, lineMaterial)
		scene.add(horizontalLine)

		// Handle window resize
		const handleResize = () => {
			if (!mountRef.current) return

			camera.aspect =
				mountRef.current.clientWidth / mountRef.current.clientHeight
			camera.updateProjectionMatrix()
			renderer.setSize(
				mountRef.current.clientWidth,
				mountRef.current.clientHeight
			)
		}

		window.addEventListener('resize', handleResize)

		// Animation loop
		const animate = () => {
			requestAnimationFrame(animate)

			if (platformRef.current) {
				const { angle_x, angle_y } = orientationRef.current

				// Update rotation
				platformRef.current.rotation.x = THREE.MathUtils.degToRad(angle_x)
				platformRef.current.rotation.z = THREE.MathUtils.degToRad(-angle_y) // Using Z for Y-axis tilt for better visualization

				// Update color based on angle thresholds
				const material = platformRef.current
					.material as THREE.MeshStandardMaterial
				if (Math.abs(angle_x) > 30 || Math.abs(angle_y) > 30) {
					material.color.set(0xff3333)
				} else {
					material.color.set(0x4682b4)
				}
			}

			renderer.render(scene, camera)
		}

		animate()

		// Cleanup
		return () => {
			window.removeEventListener('resize', handleResize)
			renderer.dispose()
			if (mountRef.current && mountRef.current.contains(renderer.domElement)) {
				mountRef.current.removeChild(renderer.domElement)
			}
		}
	}, [])

	// Function to reset the view
	const resetView = () => {
		if (platformRef.current) {
			platformRef.current.rotation.set(0, 0, 0)
		}
	}

	return (
		<div className='lg:flex flex-col lg:flex-row gap-4 w-full grid'>
			<Card className='flex-1'>
				<CardHeader className='pb-2'>
					<div className='flex justify-between items-center'>
						<CardTitle>Scaffolding Tilt Visualization</CardTitle>
						<button
							onClick={resetView}
							className='p-2 rounded-full hover:bg-gray-100'
							title='Reset view'
						>
							<RotateCcw className='h-4 w-4' />
						</button>
					</div>
				</CardHeader>
				<CardContent>
					<div
						ref={mountRef}
						className='w-full h-[350px] rounded-md overflow-hidden'
					/>
					<div className='flex justify-center gap-8 mt-4 text-sm'>
						<div className='flex items-center gap-2'>
							<div className='w-3 h-3 rounded-full bg-red-500'></div>
							<span>X-Axis</span>
						</div>
						<div className='flex items-center gap-2'>
							<div className='w-3 h-3 rounded-full bg-green-500'></div>
							<span>Y-Axis</span>
						</div>
					</div>
				</CardContent>
			</Card>

			<div className='flex flex-col gap-4 w-full lg:w-80'>
				<Card>
					<CardHeader className='pb-2'>
						<CardTitle>Angle Data</CardTitle>
					</CardHeader>
					<CardContent>
						<div className='space-y-4'>
							<div className='flex justify-between items-center'>
								<span className='text-sm font-medium'>Door Number:</span>
								<Badge variant='outline'>{orientation.doorNum}</Badge>
							</div>

							<div className='space-y-2'>
								<div className='flex justify-between items-center'>
									<span className='text-sm font-medium'>X-Axis Angle:</span>
									<Badge
										variant={
											Math.abs(orientation.angle_x) > 30
												? 'destructive'
												: 'outline'
										}
									>
										{orientation.angle_x.toFixed(2)}°
									</Badge>
								</div>

								<div className='w-full bg-gray-200 rounded-full h-2.5'>
									<div
										className={`h-2.5 rounded-full ${
											Math.abs(orientation.angle_x) > 30
												? 'bg-red-500'
												: 'bg-blue-500'
										}`}
										style={{
											width: `${Math.min(
												Math.abs(orientation.angle_x) * 1.5,
												100
											)}%`,
											marginLeft:
												orientation.angle_x < 0
													? 0
													: `${50 - Math.min(orientation.angle_x * 0.75, 50)}%`,
										}}
									/>
								</div>

								<div className='flex justify-between text-xs text-muted-foreground'>
									<span>-60°</span>
									<span>0°</span>
									<span>+60°</span>
								</div>
							</div>

							<div className='space-y-2'>
								<div className='flex justify-between items-center'>
									<span className='text-sm font-medium'>Y-Axis Angle:</span>
									<Badge
										variant={
											Math.abs(orientation.angle_y) > 30
												? 'destructive'
												: 'outline'
										}
									>
										{orientation.angle_y.toFixed(2)}°
									</Badge>
								</div>

								<div className='w-full bg-gray-200 rounded-full h-2.5'>
									<div
										className={`h-2.5 rounded-full ${
											Math.abs(orientation.angle_y) > 30
												? 'bg-red-500'
												: 'bg-blue-500'
										}`}
										style={{
											width: `${Math.min(
												Math.abs(orientation.angle_y) * 1.5,
												100
											)}%`,
											marginLeft:
												orientation.angle_y < 0
													? 0
													: `${50 - Math.min(orientation.angle_y * 0.75, 50)}%`,
										}}
									/>
								</div>

								<div className='flex justify-between text-xs text-muted-foreground'>
									<span>-60°</span>
									<span>0°</span>
									<span>+60°</span>
								</div>
							</div>
						</div>
					</CardContent>
				</Card>

				{isWarning && (
					<Alert variant='destructive'>
						<AlertCircle className='h-4 w-4' />
						<AlertTitle>Warning</AlertTitle>
						<AlertDescription>
							Angle exceeds safe limits (±30°). Please check the scaffolding
							immediately.
						</AlertDescription>
					</Alert>
				)}

				<Card>
					<CardHeader className='pb-2'>
						<CardTitle>Status</CardTitle>
					</CardHeader>
					<CardContent>
						<div className='flex items-center gap-2'>
							<div
								className={`w-4 h-4 rounded-full ${
									isWarning ? 'bg-red-500' : 'bg-green-500'
								}`}
							></div>
							<span className='font-medium'>
								{isWarning ? 'Unsafe' : 'Safe'}
							</span>
						</div>
						<p className='text-sm text-muted-foreground mt-2'>
							{isWarning
								? 'The scaffolding is tilted beyond safe limits. Immediate attention required.'
								: 'The scaffolding is within safe tilt parameters.'}
						</p>
					</CardContent>
				</Card>
			</div>
		</div>
	)
}
