import { Fragment } from 'react'
import { Route, Routes } from 'react-router-dom'
import AddProject from './Admin/AddProject'
import AdminDashboard from './Admin/AdminDashboard'
import AdminEditProject from './Admin/AdminEditProject'
import AdminLogin from './Admin/AdminLogin'
import AdminMessages from './Admin/AdminMessage'
import AdminProject from './Admin/AdminProject'
import AdminRegister from './Admin/AdminRegister'
import AdminReplyMessage from './Admin/AdminReplyMessage'
import AdminViewMessage from './Admin/AdminViewMessage'
import AdminViewProject from './Admin/AdminViewProject'
import './App.css'
import Navbar from './components/Navbar'
import ProtectedRoute from './components/ProtectedRoute'
import About from './pages/About'
import Contact from './pages/Contact'
import Education from './pages/Education'
import Home from './pages/Home'
import Project from './pages/Project'
import Service from './pages/Service'
import Skills from './pages/Skills'
const App = () => {
	return (
		<Fragment>
			<Navbar />
			<Routes>
				<Route path='/' element={<Home />} />
				<Route path='/about' element={<About />} />
				<Route path='/projects' element={<Project />} />
				<Route path='/skills' element={<Skills />} />
				<Route path='/education' element={<Education />} />
				<Route path='/service' element={<Service />} />
				<Route path='/contact' element={<Contact />} />

				{/* 🔐 ADMIN ROUTES */}
				<Route path='/admin-login' element={<AdminLogin />} />
				<Route path='/admin-register' element={<AdminRegister />} />

				<Route
					path='/admin-dashboard'
					element={
						<ProtectedRoute>
							<AdminDashboard />
						</ProtectedRoute>
					}
				/>
				<Route
					path='/admin-messages'
					element={
						<ProtectedRoute>
							<AdminMessages />
						</ProtectedRoute>
					}
				/>
				<Route
					path='/admin-project'
					element={
						<ProtectedRoute>
							<AdminProject />
						</ProtectedRoute>
					}
				/>
				<Route
					path='/add-project'
					element={
						<ProtectedRoute>
							<AddProject />
						</ProtectedRoute>
					}
				/>
				<Route
					path='/edit-project/:id'
					element={
						<ProtectedRoute>
							<AdminEditProject />
						</ProtectedRoute>
					}
				/>
				<Route
					path='/view-project/:id'
					element={
						<ProtectedRoute>
							<AdminViewProject />
						</ProtectedRoute>
					}
				/>
				<Route
					path='/view-message/:id'
					element={
						<ProtectedRoute>
							<AdminViewMessage />
						</ProtectedRoute>
					}
				/>
				<Route
					path='/reply-message/:id'
					element={
						<ProtectedRoute>
							<AdminReplyMessage />
						</ProtectedRoute>
					}
				/>
			</Routes>
		</Fragment>
	)
}

export default App
