import { render, screen } from '@testing-library/react';
import { Navigation } from '@/components/layout/Navigation';
import '@testing-library/jest-dom';
import { usePathname } from 'next/navigation';

// Mock usePathname hook
jest.mock('next/navigation', () => ({
  usePathname: jest.fn()
}));

describe('Navigation Component', () => {
  beforeEach(() => {
    // Reset mocks
    (usePathname as jest.Mock).mockReset();
    (usePathname as jest.Mock).mockReturnValue('/');
  });

  it('renders the site name', () => {
    render(<Navigation />);
    expect(screen.getByText('Clay')).toBeInTheDocument();
  });

  it('renders the main navigation links', () => {
    render(<Navigation />);
    
    const aboutLink = screen.getByRole('link', { name: /關於我/i });
    const blogLink = screen.getByRole('link', { name: /我的文章/i });
    
    expect(aboutLink).toBeInTheDocument();
    expect(blogLink).toBeInTheDocument();
    
    expect(aboutLink.getAttribute('href')).toBe('/about');
    expect(blogLink.getAttribute('href')).toBe('/blog');
  });

  it('shows active state for current path', () => {
    // Mock that we're on the about page
    (usePathname as jest.Mock).mockReturnValue('/about');
    
    render(<Navigation />);
    
    // Get all navigation links
    const aboutLink = screen.getByRole('link', { name: /關於我/i });
    const blogLink = screen.getByRole('link', { name: /我的文章/i });
    
    // Check if about link has the active class
    expect(aboutLink.className).toContain('text-blue-600');
    expect(blogLink.className).not.toContain('text-blue-600');
  });

  it('is responsive with mobile menu toggle on small screens', () => {
    render(<Navigation />);
    
    // Check that mobile menu button exists
    const menuButton = screen.getByRole('button', { name: /選單/i });
    expect(menuButton).toBeInTheDocument();
    
    // The desktop menu should be hidden on mobile
    const desktopNav = screen.getByTestId('desktop-nav');
    expect(desktopNav).toHaveClass('hidden');
    expect(desktopNav).toHaveClass('md:flex');
  });
});