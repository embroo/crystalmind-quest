import { useState } from 'react';
import { Share2, Check } from 'lucide-react';
import { motion } from 'framer-motion';

interface ShareButtonProps {
  isMobile?: boolean;
}

export function ShareButton({ isMobile = false }: ShareButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    const shareData = {
      title: 'Connect AI LAB',
      text: 'Check out Connect AI LAB - The Neuroscience of Manifestation',
      url: window.location.href,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        if ((err as Error).name !== 'AbortError') {
          console.error('Error sharing:', err);
        }
      }
    } else {
      // Fallback: Copy to clipboard
      try {
        await navigator.clipboard.writeText(window.location.href);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (err) {
        console.error('Failed to copy text:', err);
      }
    }
  };

  if (isMobile) {
    return (
      <motion.button
        className="h-9 w-9 bg-white/15 backdrop-blur-md rounded-[10px] flex items-center justify-center cursor-pointer border-none text-white/85 transition-colors hover:bg-white/20 shrink-0"
        whileTap={{ scale: 0.95 }}
        onClick={handleShare}
        aria-label="Share"
      >
        {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Share2 className="w-4 h-4" />}
      </motion.button>
    );
  }

  return (
    <motion.button
      className="h-12 w-12 bg-white/10 backdrop-blur-md rounded-[14px] flex items-center justify-center cursor-pointer border-none text-white/85 hover:bg-white/20 transition-colors shrink-0"
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      onClick={handleShare}
      aria-label="Share"
    >
      {copied ? <Check className="w-5 h-5 text-emerald-400" /> : <Share2 className="w-5 h-5" />}
    </motion.button>
  );
}
