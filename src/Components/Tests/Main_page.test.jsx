import { render, screen } from '@testing-library/react'
import Main_page from '@/Components/Main_page/Main_page.jsx'
import { describe, it, expect } from 'vitest'
import { MemoryRouter } from 'react-router-dom'

describe('Main_page component', () => {
    it('renders the about us section', () => {
        render(
            <MemoryRouter>
                <Main_page />
            </MemoryRouter>
        )
        expect(screen.getByText(/We live, breath and sleep two wheels/i)).toBeInTheDocument()
    })

    it('renders the about_us section', () => {
        const { container } = render(
            <MemoryRouter>
                <Main_page />
            </MemoryRouter>
        )
        const aboutUsDiv = container.querySelector('.about_us')
        expect(aboutUsDiv).toBeInTheDocument()
    })
    it('renders the bike_mainblock', () => {
        const { container } = render(
            <MemoryRouter>
                <Main_page />
            </MemoryRouter>
        )
        const aboutUsDiv = container.querySelector('.bike_mainblock')
        expect(aboutUsDiv).toBeInTheDocument()
    })

})
