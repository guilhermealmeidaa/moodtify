import { FaGithub, FaXTwitter } from "react-icons/fa6";

export const Footer = () => {
  return (
    <footer className="border-t border-[#E2E8F0] py-6 text-sm text-[#64748B]">
      <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Links à esquerda */}
        <div className="flex gap-6">
          <p className="text-center"></p>
        </div>

        {/* Texto centralizado */}
        <p className="text-center">© 2025 Moodtify. All rights reserved.</p>

        {/* Redes sociais à direita */}
        <div className="flex gap-4">
          <a
            href="https://twitter.com/guimasiko"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#1E293B] transition-colors"
          >
            <FaXTwitter size={18} />
          </a>
          <a
            href="https://github.com/guilhermealmeidaa"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#1E293B] transition-colors"
          >
            <FaGithub size={18} />
          </a>
        </div>
      </div>
    </footer>
  );
};
