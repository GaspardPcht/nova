'use client';
import React, { ReactNode, useEffect, useState } from 'react';
import { FiChevronDown } from 'react-icons/fi';
import { AnimatePresence, motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

interface Category {
  name: string;
  description: string;
  href: string;
  icon?: React.ComponentType<{ className: string }>;
}

interface NavPopoverProps {
  buttonText: string;
  categories: Category[];
}

const NavPopover = ({ buttonText, categories }: NavPopoverProps) => {
  const [selected, setSelected] = useState<boolean>(false);
  const router = useRouter();

  const handleCategoryClick = (href: string) => {
    router.push(href);
  };

  return (
    <div
      onMouseEnter={() => setSelected(true)}
      onMouseLeave={() => setSelected(false)}
      className="relative"
    >
      <button
        id={`nav-tab-${buttonText}`}
        className={`flex items-center gap-1 px-3 py-1.5 text-sm hover:scale-110 transition-all duration-300 ${
          selected ? 'text-[#E6AACE]' : 'text-black'
        }`}
      >
        <span className="font-light">{buttonText}</span>
        <FiChevronDown
          className={`transition-transform duration-300 ${
            selected ? 'rotate-180' : ''
          }`}
        />
      </button>

      <AnimatePresence>
        {selected && (
          <Content categories={categories} buttonText={buttonText} />
        )}
      </AnimatePresence>
    </div>
  );
};

const Content = ({ categories, buttonText }: NavPopoverProps) => {
  const router = useRouter();

  const handleCategoryClick = (href: string) => {
    router.push(href);
  };

  return (
    <motion.div
      id={`overlay-content-${buttonText}`}
      initial={{
        opacity: 0,
        y: -20,
        scale: 0.95
      }}
      animate={{
        opacity: 1,
        y: 0,
        scale: 1
      }}
      exit={{
        opacity: 0,
        y: -10,
        scale: 0.95
      }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 30
      }}
      className="absolute left-0 top-[calc(100%_+_24px)] w-96 p-3 shadow-xl border border-[#1F2937] bg-[#F0F4EF] rounded-xl"
    >
      <Bridge />
      <div className="grid gap-2">
        {categories.map((item, index) => (
          <motion.div
            key={item.name}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: index * 0.05,
              duration: 0.2
            }}
            className="group relative flex items-center gap-x-3 p-2 transition-all duration-300"
          >
            {item.icon && (
              <div className="flex h-10 w-10 flex-none items-center justify-center">
                <item.icon
                  className="h-6 w-6 text-gray-600 group-hover:text-[#E6AACE] transition-colors duration-300"
                  aria-hidden="true"
                />
              </div>
            )}
            <div>
              <a
                href={item.href}
                className="font-medium text-gray-900 group-hover:text-[#E6AACE] transition-colors duration-300"
                onClick={(e) => {
                  e.preventDefault();
                  handleCategoryClick(item.href);
                }}
              >
                {item.name}
                <span className="absolute inset-0" />
              </a>
              <p className="mt-0.5 text-sm text-gray-500 group-hover:text-gray-600 transition-colors duration-300">{item.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

const Bridge = () => (
  <div className="absolute -top-[24px] left-0 right-0 h-[24px]" />
);

export default NavPopover;
