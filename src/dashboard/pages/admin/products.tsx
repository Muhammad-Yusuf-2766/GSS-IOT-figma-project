import { GatewaysCard, NodesCard } from '@/components/pages.comp/productsCard'
import { Link } from 'react-router-dom'
import Header from '../../components/shared-dash/Header'

const Products = () => {
	return (
		<div className='w-full h-full'>
			<Header />
			<div className='w-full flex flex-col h-full items-center justify-center md:gap-y-3'>
				<div className='flex justify-center mt-4'>
					<h1 className='leading-none md:text-3xl text-xl font-bold text-gray-700 pb-2 underline underline-offset-4'>
						제품 리스트
					</h1>
				</div>
				<div className='w-full grid grid-cols-1 md:flex items-center gap-6 max-w-7xl mx-auto my-4'>
					<Link
						to={`${
							import.meta.env.VITE_REACT_BASE_URL
						}/admin/dashboard/product/gateways`}
						className='md:w-1/2'
					>
						<GatewaysCard />
					</Link>

					<Link
						to={`${
							import.meta.env.VITE_REACT_BASE_URL
						}/admin/dashboard/product/nodes`}
						className='md:w-1/2'
					>
						<NodesCard />
					</Link>
				</div>
			</div>
		</div>
	)
}

export default Products

// ========= It is not using component. it is just for testing ======== //
// type Current = {
// 	time: string
// 	temperature_2m: number
// 	weather_code: number
// 	wind_speed_10m: number
// 	relative_humidity_2m: number
// }
// type Daily = {
// 	time: string[]
// 	temperature_2m_max: number[]
// 	temperature_2m_min: number[]
// 	weather_code: number[]
// }
// type OpenMeteo = {
// 	timezone?: string
// 	current?: Current
// 	daily?: Daily
// }

// type Place = {
// 	city?: string
// 	countryName?: string
// 	latitude: number
// 	longitude: number
// }

// const WMO_TEXT: Record<number, string> = {
// 	0: 'Ochiq osmon',
// 	1: 'Asosan ochiq',
// 	2: 'Qisman bulutli',
// 	3: 'Bulutli',
// 	45: 'Tuman',
// 	48: 'Muzli tuman',
// 	51: 'Mayda yomg‘ir',
// 	53: 'O‘rtacha yomg‘ir',
// 	55: 'Kuchli mayda yomg‘ir',
// 	56: 'Yengil muz yomg‘iri',
// 	57: 'Kuchli muz yomg‘iri',
// 	61: 'Yengil yomg‘ir',
// 	63: 'O‘rtacha yomg‘ir',
// 	65: 'Kuchli yomg‘ir',
// 	66: 'Yengil muz yomg‘iri',
// 	67: 'Kuchli muz yomg‘iri',
// 	71: 'Yengil qor',
// 	73: 'Qor',
// 	75: 'Kuchli qor',
// 	77: 'Qor donachalari',
// 	80: 'Yengil jala',
// 	81: 'Jala',
// 	82: 'Kuchli jala',
// 	85: 'Yengil qor jala',
// 	86: 'Kuchli qor jala',
// 	95: 'Momaqaldiroq',
// 	96: 'Momaqaldiroq, do‘l',
// 	99: 'Kuchli momaqaldiroq, do‘l',
// }

// function getPosition(options?: PositionOptions): Promise<GeolocationPosition> {
// 	return new Promise((resolve, reject) => {
// 		if (!('geolocation' in navigator))
// 			return reject(new Error('Geolokatsiya yo‘q'))
// 		navigator.geolocation.getCurrentPosition(resolve, reject, options)
// 	})
// }

// // Fallback: BigDataCloud (kalitsiz) – koordinata bo‘lmasa IP asosida taxmin qiladi
// async function getPlaceFallback(): Promise<Place> {
// 	const url =
// 		'https://api.bigdatacloud.net/data/reverse-geocode-client?localityLanguage=en'
// 	const r = await fetch(url)
// 	if (!r.ok) throw new Error('Fallback geolokatsiya xatosi')
// 	const j = await r.json()
// 	return {
// 		city: j.city || j.locality,
// 		countryName: j.countryName,
// 		latitude: j.latitude,
// 		longitude: j.longitude,
// 	}
// }

// async function getPlace(): Promise<Place> {
// 	try {
// 		const pos = await getPosition({
// 			enableHighAccuracy: false,
// 			timeout: 8000,
// 			maximumAge: 300000,
// 		})
// 		const { latitude, longitude } = pos.coords
// 		// Koordinatani nomga aylantirish (ixtiyoriy), lekin BigDataCloud’ni shu yerda ham ishlatish mumkin:
// 		const nameUrl =
// 			`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}` +
// 			`&longitude=${longitude}&localityLanguage=en`
// 		const nr = await fetch(nameUrl)
// 		const nj = nr.ok ? await nr.json() : null
// 		return {
// 			city: nj?.city || nj?.locality,
// 			countryName: nj?.countryName,
// 			latitude,
// 			longitude,
// 		}
// 	} catch {
// 		// ruxsat berilmasa yoki xato bo‘lsa:
// 		return getPlaceFallback()
// 	}
// }

// export function WeatherWidgetClientOnly() {
// 	const [place, setPlace] = useState<Place | null>(null)
// 	const [data, setData] = useState<OpenMeteo | null>(null)
// 	const [loading, setLoading] = useState(true)
// 	const [err, setErr] = useState<string | null>(null)

// 	useEffect(() => {
// 		let cancel = false
// 		;(async () => {
// 			try {
// 				const p = await getPlace()
// 				if (cancel) return
// 				setPlace(p)

// 				const params = new URLSearchParams({
// 					latitude: String(p.latitude),
// 					longitude: String(p.longitude),
// 					// Joriy + 3 kunlik prognoz
// 					current:
// 						'temperature_2m,weather_code,wind_speed_10m,relative_humidity_2m',
// 					daily: 'weather_code,temperature_2m_max,temperature_2m_min',
// 					forecast_days: '3',
// 					timezone: 'auto',
// 				})
// 				const url = `https://api.open-meteo.com/v1/forecast?${params.toString()}`
// 				const r = await fetch(url)
// 				if (!r.ok) throw new Error('Ob‑havo olinmadi')
// 				const j = (await r.json()) as OpenMeteo
// 				if (!cancel) setData(j)
// 			} catch (e: unknown) {
// 				const errorMessage =
// 					typeof e === 'object' &&
// 					e !== null &&
// 					'message' in e &&
// 					typeof (e as { message?: unknown }).message === 'string'
// 						? (e as { message: string }).message
// 						: 'Noma’lum xatolik'
// 				if (!cancel) setErr(errorMessage)
// 			} finally {
// 				if (!cancel) setLoading(false)
// 			}
// 		})()
// 		return () => {
// 			cancel = true
// 		}
// 	}, [])

// 	if (loading) return <div>⛅ Ob‑havo yuklanmoqda…</div>
// 	if (err) return <div>⚠️ Xato: {err}</div>
// 	if (!data || !data.current) return null

// 	const c = data.current
// 	const where = place
// 		? `${place.city ? place.city + ', ' : ''}${place.countryName ?? ''}`
// 		: ''

// 	return (
// 		<div className='grid gap-3 w-full max-w-7xl p-4 border rounded-lg border-slate-400 text-gray-700 '>
// 			<div style={{ fontWeight: 700, fontSize: 18 }}>
// 				{where || 'Sizning joylashuvingiz'} — {Math.round(c.temperature_2m)}°C{' '}
// 				{/*Math.round bu butun songa yaxlitlaydi*/}
// 			</div>
// 			<div style={{ opacity: 0.75 }}>
// 				{WMO_TEXT[c.weather_code] ?? `Kodni aniqlash: ${c.weather_code}`} •{' '}
// 				Namlik {Math.round(c.relative_humidity_2m)}% • Shamol{' '}
// 				{Math.round(c.wind_speed_10m)} km/soat
// 			</div>

// 			{data.daily && data.daily.time && (
// 				<div style={{ display: 'flex', gap: 8 }}>
// 					{data.daily.time.map((t, i) => (
// 						<div
// 							key={t}
// 							className='flex-1 p-4 border rounded-lg border-slate-400 shadow-lg shadow-gray-200 cursor-pointer hover:shadow-gray-400 duration-200'
// 						>
// 							<div style={{ fontSize: 12, opacity: 0.7 }}>
// 								{new Date(t).toLocaleDateString()}
// 							</div>
// 							<div style={{ fontWeight: 600 }}>
// 								{Math.round(data.daily!.temperature_2m_max[i])}° /{' '}
// 								{Math.round(data.daily!.temperature_2m_min[i])}°
// 							</div>
// 							<div style={{ fontSize: 12, opacity: 0.7 }}>
// 								{WMO_TEXT[data.daily!.weather_code[i]] ?? '—'}
// 							</div>
// 						</div>
// 					))}
// 				</div>
// 			)}
// 		</div>
// 	)
// }
