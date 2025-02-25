import React from 'react';
import Header from './Header';
import Footer from './Footer';
import Divider from './Divider';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen bg-[#F8F2E6]">
      <Header />
      <main>
        {children}
      </main>
      <Divider />
      <Footer />
    </div>
  );
};

export default Layout; 