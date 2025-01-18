import '@/styles/index.css'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.tsx'
import AuthProvider from './components/providers/auth.providers.tsx'

createRoot(document.getElementById('root')!).render(
	// <StrictMode>
	<BrowserRouter>
		<AuthProvider>
			<App />
		</AuthProvider>
	</BrowserRouter>
	// {/* </StrictMode> */}
)
