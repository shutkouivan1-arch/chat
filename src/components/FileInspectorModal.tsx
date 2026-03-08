import { useEffect } from 'react';
import { X, Download, FileText } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface FileInspectorModalProps {
  fileName: string;
  fileSize: number;
  fileUrl: string;
  onClose: () => void;
}

function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

export function FileInspectorModal({ fileName, fileSize, fileUrl, onClose }: FileInspectorModalProps) {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleEsc);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  const ext = fileName.split('.').pop()?.toUpperCase() || 'FILE';

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="fixed inset-0 z-[100] bg-background/95 backdrop-blur-sm flex items-center justify-center p-4"
        onClick={onClose}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-[101] w-10 h-10 rounded-full bg-background border border-foreground flex items-center justify-center text-foreground hover:bg-foreground hover:text-background transition-colors btn-press"
          aria-label="Close file inspector"
        >
          <X className="w-5 h-5" />
        </button>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.2 }}
          className="w-full max-w-sm bg-card rounded-lg border border-foreground/20 overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* File icon area */}
          <div className="flex items-center justify-center py-10 border-b border-foreground/10">
            <div className="relative">
              <FileText className="w-16 h-16 text-foreground/30" strokeWidth={1} />
              <span className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1 text-[9px] font-mono font-bold text-foreground/60 bg-card px-1">
                {ext}
              </span>
            </div>
          </div>

          {/* Metadata */}
          <div className="p-4 space-y-3">
            <div className="space-y-1">
              <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-wider">File Name</span>
              <p className="text-sm font-mono text-foreground break-all leading-relaxed">{fileName}</p>
            </div>
            <div className="space-y-1">
              <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-wider">Size</span>
              <p className="text-sm font-mono text-foreground">{formatFileSize(fileSize)}</p>
            </div>
          </div>

          {/* Download button */}
          <div className="p-4 pt-0">
            <a
              href={fileUrl}
              download={fileName}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-md border border-foreground text-foreground text-sm font-mono hover:bg-foreground hover:text-background transition-colors btn-press"
            >
              <Download className="w-4 h-4" />
              Download
            </a>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
