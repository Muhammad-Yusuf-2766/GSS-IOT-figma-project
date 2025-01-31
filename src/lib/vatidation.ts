import { z } from 'zod'

export const loginSchema = z.object({
	user_email: z.string().email(),
	user_password: z.string().min(4),
})

// Shadcn form qiymatni string shakda qabul qiladi, shuning uchun phonni zod schemada numberga o'zgartirib oldik.
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
