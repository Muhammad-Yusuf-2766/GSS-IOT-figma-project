import { z } from 'zod'

export const loginSchema = z.object({
	email: z.string().email(),
	password: z.string().min(4),
})

// Shadcn form qiymatni string shakda qabul qiladi, shuning uchun phonni zod schemada numberga o'zgartirib oldik.
export const registerSchema = z
	.object({
		email: z.string().email(),
		password: z.string().min(4),
		phone: z.string().transform(v => Number(v) || 0),
		confirmPassword: z.string(),
	})
	.refine(data => data.password === data.confirmPassword, {
		message: 'Passwords do not match, check passwords',
		path: ['confirmPassword'], // bu path yurqoirdagi hatolik paydo bo'lganda path ning ichidagi qismda message ni ko'rsatadi, ya'ni hatolik qaysi elementga tegishli ekanini belgilaydi
	})
