import { string, z } from 'zod'

export const loginSchema = z.object({
	user_email: z.string().email(),
	user_password: z.string().min(4),
})

// Shadcn form qiymatni string shakda qabul qiladi, shuning uchun phoneni zod schemada numberga o'zgartirib oldik.
export const registerSchema = z
	.object({
		user_name: z.string().min(3),
		user_email: z.string().email(),
		user_password: z.string().min(4),
		user_phone: z.string().transform(v => Number(v) || 0), // shadcn input numberni stringda qayatradi. shuning uchun shu usul bilan uni number qilib olamiz
		confirmPassword: z.string(),
	})
	.refine(data => data.user_password === data.confirmPassword, {
		message: 'Passwords do not match, check passwords',
		path: ['confirmPassword'], // bu path yurqoirdagi hatolik paydo bo'lganda path ning ichidagi qismda message ni ko'rsatadi, ya'ni hatolik qaysi elementga tegishli ekanini belgilaydi
	})

// 1-bosqich: faqat emailni qabul qiladi
export const resetPasswordSchemaStep1 = z.object({
	user_email: z.string().email(),
})

// 2-bosqich: otp, yangi parol va emailni qabul qiladi
export const resetPasswordSchemaStep2 = z.object({
	user_email: z.string().email(),
	otp: z.string().transform(v => Number(v) || 0),
	new_password: z.string().min(4, 'Password must be at least 4 characters'),
})

export const addNodeSchema = z.object({
	startNumber: z.number(),
	endNumber: z.number(),
})

export const addGatewaychema = z.object({
	serial_number: string(),
	nodes: z.string().min(1, 'Password must be at least 1 characters'),
	selected_nodes: z.array(z.string()),
})

export const addBuildingSchema = z
	.object({
		building_name: z.string().min(3),
		building_num: z.number(),
		building_addr: z.string().min(4),
		gateway_sets: z
			.array(z.string())
			.min(1, '최소 1개 게이트웨이를 선택해야됩니다.'),
		users: z.array(z.string()).optional(),
		permit_date: z.string(),
		expiry_date: z.string(),
		floorplan_image: z
			.instanceof(File)
			.refine(file => file.type.startsWith('image/'), {
				message: '파일은 이미지 형식이어야 합니다.',
			})
			.optional(),
	})
	.refine(data => new Date(data.permit_date) < new Date(data.expiry_date), {
		message: '임대 날짜는 만료 날짜보다 이전이어야 합니다.',
		path: ['permit_date'], // Xato xabarini `permit_date` maydoniga bog‘laymiz
	})

export const addClientSchema = z.object({
	client_name: z.string().min(3),
	client_addr: z.string(),
	client_buildings: z
		.array(z.string())
		.min(1, '최소 1개 빌딩을을 선택해야됩니다.'),
	boss_users: z.array(z.string()).min(1, '최소 1개 담당자를를 선택해야됩니다.'),
})
