import { render, screen } from '@testing-library/react'
import Navigation_bar from '../Navigation_bar/Navigation_bar.jsx'
import { describe, it, expect } from 'vitest'
import { MemoryRouter } from 'react-router-dom'

describe('Main_page component', () => {

    it('renders the about_us section', () => {
        const { container } = render(
            <MemoryRouter>
                <Navigation_bar />
            </MemoryRouter>
        )
        const aboutUsDiv = container.querySelector('.test-navbar')
        expect(aboutUsDiv).toBeInTheDocument()
    })


    it('renders Rondo logo', () => {
        render(
            <MemoryRouter>
                <Navigation_bar />
            </MemoryRouter>
        )
        const logo = screen.getByAltText('Rondo logo')
        expect(logo).toBeInTheDocument()
    })

})
